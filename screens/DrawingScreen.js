import * as ExpoPixi from 'expo-pixi';
import React, {Component} from 'react';
import {Dimensions, Button, Platform, AppState, StyleSheet, View, Image, StatusBar} from 'react-native';
import * as tf from '@tensorflow/tfjs';
import {bundleResourceIO} from '@tensorflow/tfjs-react-native';

import QUICKDRAW_CLASSES from '../assets/model/quickdraw_classes.json'
import Constants from "expo-constants";
import * as Colors from "./Constants/Constants";
import Text from "../Components/Text";

const modelJson = require('../assets/model/model.json');
const modelWeights = require('../assets/model/group1-shard1of1.bin');

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
            model: null,
            thinking: false
        };
        console.log(QUICKDRAW_CLASSES)
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
        const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
        this.setState({model})
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChangeAsync);
    }

    onChangeAsync = async () => {
        this.setState({thinking: true})
        //const img = await this.sketch.takeSnapshotAsync({ format: 'png' });
        //this.setState({ image: { uri: img.uri } });
        //console.log(img)

        const arr = this.sketch.renderer.extract.pixels()

        const scaledImage = tf.tidy(() => {
            const image = tf.tensor(arr).reshape([Math.sqrt(arr.length / 4), Math.sqrt(arr.length / 4), 4])
            const grayScaleImg = tf.mean(image, 2).expandDims(2)
            const resizedImage = tf.image.resizeBilinear(grayScaleImg, [64, 64])
            const batchedImage = resizedImage.expandDims(0)
            return batchedImage.toFloat().div(tf.scalar(255))
        });

        if (this.state.model) {

            const prediction = await this.state.model.predict(scaledImage)
            const predictedTensor = prediction.as1D().argMax()
            const predictedValue = (await predictedTensor.data())[0]
            this.setState({
                prediction: QUICKDRAW_CLASSES[predictedValue],
                thinking: false
            })
        } else {
            this.setState({thinking: false})
        }
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
                    <View style={styles.result}>

                        {(() => {
                            if (!this.state.model) {
                                return <Text style={styles.resultContextText}>Chargement..</Text>
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

                    </View>
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
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: 'white',
        width: Dimensions.get('window').width - 120,
        height: Dimensions.get('window').width - 120,
    },
    result: {
        flex: 1,
        alignItems: "center",

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