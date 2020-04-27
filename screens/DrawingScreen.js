import * as ExpoPixi from 'expo-pixi';
import React, {Component} from 'react';
import {Dimensions, Button, Platform, AppState, StyleSheet, View, StatusBar} from 'react-native';
import Constants from "expo-constants";

import * as Colors from "../constants/Constants";
import Text from "../components/Text";
import {transposeAndApplyAlpha} from "../helpers/ImageTransformer";
import {loadModel, predictFromDraw} from "../helpers/Prediction";

const isAndroid = Platform.OS === 'android';

function uuidv4() {
    //https://stackoverflow.com/a/2117523/4047926
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export default class DrawingScreen extends Component {
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

    onChangeAsync = async () => {
        this.setState({thinking: true})
        const img = await this.sketch.takeSnapshotAsync({format: 'png'})
        const pixels = this.sketch.renderer.extract.pixels()

        const normalizedRGBPixels = transposeAndApplyAlpha(pixels, img.width, img.height)
        const prediction = await predictFromDraw(normalizedRGBPixels, img.width, img.height)

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
                            return <Text style={styles.resultContextText}>Chargement...</Text>
                        }
                        if (this.state.thinking) {
                            return <Text style={styles.resultContextText}>Voyons voir...</Text>
                        } else if (this.state.prediction) {
                            return <>
                                <Text style={styles.resultContextText}>Je vois :</Text>
                                <Text style={styles.resultText}>{`${this.state.prediction}`}</Text>
                            </>
                        } else {
                            return null
                        }
                    })()}
                    <Button
                        title={'Recharger'}
                        onPress={() => {
                            this.onChangeAsync()
                        }}
                    />
                </View>
                <Button
                    color={Colors.VertLogo}
                    title="undo"
                    style={styles.button}
                    onPress={() => {
                        this.sketch.undo();
                    }}
                />
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
    image: {
        flex: 1,
        resizeMode: 'contain'
    },
    imageContainer: {},
    label: {
        width: '100%',
        padding: 5,
        alignItems: 'center',
    },
    button: {
        zIndex: 1,
        padding: 15,
        minWidth: 56,
        minHeight: 48,
    },
});