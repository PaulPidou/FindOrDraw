import * as ExpoPixi from 'expo-pixi';
import React, {Component} from 'react';
import {Platform, AppState, View, StatusBar} from 'react-native';
import {Button} from 'native-base'

import Text from "../components/Text";
import GenericStyles from "../constants/Style";
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
        this.setState({ thinking: true })
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
            <View style={GenericStyles.container}>
                <StatusBar barStyle='light-content' backgroundColor={"rgba(0,0,0,0)"} translucent={true}/>
                <View>
                    <Text style={GenericStyles.title}>Draw me something !</Text>
                </View>
                <View style={GenericStyles.gameZone}>
                    <View style={GenericStyles.sketchContainer}>
                        <ExpoPixi.Sketch
                            ref={ref => (this.sketch = ref)}
                            style={GenericStyles.sketch}
                            strokeColor={this.state.strokeColor}
                            strokeWidth={this.state.strokeWidth}
                            strokeAlpha={1}
                            onChange={this.onChangeAsync}
                            onReady={this.onReady}
                            initialLines={this.state.lines}
                        />
                    </View>
                </View>
                <View style={GenericStyles.result}>
                    {(() => {
                        if (!this.state.ready) {
                            return <Text style={GenericStyles.resultContextText}>Loading...</Text>
                        }
                        if (this.state.thinking) {
                            return <Text style={GenericStyles.resultContextText}>Let's see...</Text>
                        } else if (this.state.prediction) {
                            return <>
                                <Text style={GenericStyles.resultContextText}>I see:</Text>
                                <Text style={GenericStyles.resultText}>{`${this.state.prediction}`}</Text>
                            </>
                        } else {
                            return null
                        }
                    })()}
                </View>
                <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                    <Button full
                        style={GenericStyles.button}
                        onPress={() => {this.sketch.undo();}}>
                        <Text>UNDO</Text>
                    </Button>
                    <Button full
                        style={GenericStyles.button}
                        onPress={() => {this.clearSketch();}}>
                        <Text>CLEAR</Text>
                    </Button>
                </View>
            </View>
        );
    }
}