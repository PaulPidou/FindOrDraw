import * as ExpoPixi from 'expo-pixi';
import React, {Component} from 'react';
import {Dimensions, Platform, AppState, StyleSheet, View, StatusBar} from 'react-native';
import {Button} from 'native-base'
import Constants from "expo-constants";

import * as Colors from "../constants/Constants";
import Text from "../components/Text";
import {transposeAndApplyAlpha} from "../helpers/ImageTransformer";
import {predictFromDraw} from "../helpers/Prediction";

const isAndroid = Platform.OS === 'android';

function uuidv4() {
    //https://stackoverflow.com/a/2117523/4047926
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export default class DrawScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            strokeColor: 0x000000,
            strokeWidth: 15,
            lines: [],
            prediction: null,
            appState: AppState.currentState,
            ready: false,
            thinking: false
        };
    }

    handleAppStateChangeAsync = nextAppState => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            if (isAndroid && this.sketch) {
                this.setState({appState: nextAppState, id: uuidv4(), lines: this.sketch.lines});
                return;
            }
        }
        this.setState({appState: nextAppState});
    };

    async componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChangeAsync);
        await loadModel()
        this.setState({ready: true})
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChangeAsync);
    }

    clearSketch() {
        if (this.sketch.stage.children.length > 0) {
            this.sketch.stage.removeChildren();
            this.sketch.renderer._update();
        }
    }

    onChangeAsync = async () => {
        this.setState({thinking: true})
        const pixels = this.sketch.renderer.extract.pixels()
        const length = Math.sqrt(pixels.length / 4)

        const normalizedRGBPixels = transposeAndApplyAlpha(pixels, length, length)
        const prediction = await predictFromDraw(normalizedRGBPixels, length, length)

        this.setState({
            prediction,
            thinking: false
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor={"rgba(0,0,0,0)"} translucent={true}/>
                <View>
                    <Text style={styles.title}>Draw me something !</Text>
                </View>
                <View style={styles.gameZone}>
                    <View style={styles.sketchContainer}>
                        <ExpoPixi.Sketch
                            ref={ref => (this.sketch = ref)}
                            style={styles.sketch}
                            strokeColor={this.state.strokeColor}
                            strokeWidth={this.state.strokeWidth}
                            strokeAlpha={1}
                            onChange={this.onChangeAsync}
                            onReady={this.onReady}
                            initialLines={this.state.lines}
                        />
                    </View>
                </View>
                <View style={styles.result}>
                    {(() => {
                        if (!this.state.ready) {
                            return <Text style={styles.resultContextText}>Loading...</Text>
                        }
                        if (this.state.thinking) {
                            return <Text style={styles.resultContextText}>Let's see...</Text>
                        } else if (this.state.prediction) {
                            return <>
                                <Text style={styles.resultContextText}>I see:</Text>
                                <Text style={styles.resultText}>{`${this.state.prediction}`}</Text>
                            </>
                        } else {
                            return null
                        }
                    })()}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Button full
                        style={styles.button}
                        onPress={() => {this.sketch.undo();}}>
                        <Text>UNDO</Text>
                    </Button>
                    <Button full
                        style={styles.button}
                        onPress={() => {this.clearSketch();}}>
                        <Text>CLEAR</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gameZone: {
        flex: 1,
        alignItems: 'center',
        padding: 30
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        width: '100%',
        paddingVertical: 20,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: Colors.BackgroundColor,
        paddingTop: Constants.statusBarHeight
    },
    sketchContainer: {
        flex: 1
    },
    sketch: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width - 120,
        height: Dimensions.get('window').width - 120,
    },
    result: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50
    },
    resultContextText: {
        fontWeight: 'bold',
        fontSize: 50,
        paddingBottom: 20
    },
    resultText: {
        fontWeight: 'bold',
        fontSize: 70,
    },
    label: {
        width: '100%',
        padding: 5,
        alignItems: 'center',
    },
    button: {
        zIndex: 1,
        flex: 1,
        backgroundColor: Colors.VertLogo,
        borderColor: '#fff',
        borderWidth: 0.2
    },
});