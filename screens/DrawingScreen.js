import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Dimensions, Button, Platform, AppState, StyleSheet, Text, View, Image } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

import QUICKDRAW_CLASSES from '../assets/model/quickdraw_classes.json'

const modelJson = require('../assets/model/model.json');
const modelWeights = require('../assets/model/group1-shard1of1.bin');

const isAndroid = Platform.OS === 'android';
function uuidv4() {
    //https://stackoverflow.com/a/2117523/4047926
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
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
            prediction: 'potato',
            appState: AppState.currentState,
            model: null
        };
        console.log(QUICKDRAW_CLASSES)
    }


    handleAppStateChangeAsync = nextAppState => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            if (isAndroid && this.sketch) {
                this.setState({ appState: nextAppState, id: uuidv4(), lines: this.sketch.lines });
                return;
            }
        }
        this.setState({ appState: nextAppState });
    };

    async componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChangeAsync);
        const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
        this.setState({ model })
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChangeAsync);
    }

    onChangeAsync = async () => {
        const img = await this.sketch.takeSnapshotAsync({ format: 'png' });
        this.setState({ image: { uri: img.uri } });
        console.log(img)
        //console.log(this.state.lines.length)
        const arr = this.sketch.renderer.extract.pixels()
        //console.log(arr.length)

        const image = tf.tensor(arr).reshape([1080, 1080, 4])
        const grayScaleImg = tf.mean(image, 2).expandDims(2)
        //console.log(tf.mean(tensor).print())
        //console.log(tf.mean(tensor, 2).expandDims(2).shape)
        const resizedImage = tf.image.resizeBilinear(grayScaleImg, [64, 64])
        const batchedImage = resizedImage.expandDims(0)
        const scaledImage = batchedImage.toFloat().div(tf.scalar(255))

        const prediction = (await this.state.model.predict(scaledImage))
        const predictedTensor = prediction.as1D().argMax()
        const predictedValue = (await predictedTensor.data())[0]
        console.log(predictedValue)
        console.log(QUICKDRAW_CLASSES[predictedValue])

    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.label}>
                        <Text>Canvas - draw here</Text>
                    </View>
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
                    <View style={styles.imageContainer}>
                        <View style={styles.label}>
                            <Text>{`I see ${this.state.prediction}`}</Text>
                        </View>
                    </View>
                    <Image style={styles.image} source={this.state.image} />
                </View>
                <Button
                    color={'blue'}
                    title="undo"
                    style={styles.button}
                    onPress={() => { this.sketch.undo(); }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sketch: {
        flex: 1
    },
    sketchContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    },
    imageContainer: {
        borderTopWidth: 4,
        borderTopColor: '#E44262',
    },
    label: {
        width: '100%',
        padding: 5,
        alignItems: 'center',
    },
    button: {
        zIndex: 1,
        padding: 12,
        minWidth: 56,
        minHeight: 48,
    },
});