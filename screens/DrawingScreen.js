import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Dimensions, Image, Button, Platform, AppState, StyleSheet, Text, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';

const modelJson = require('../assets/model/model.json');
//const modelWeights = require('../assets/model/group1-shard1of4.bin');

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
    state = {
        image: null,
        strokeColor: 0x000000,
        strokeWidth: 15,
        lines: [],
        appState: AppState.currentState,
    };

    handleAppStateChangeAsync = nextAppState => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            if (isAndroid && this.sketch) {
                this.setState({ appState: nextAppState, id: uuidv4(), lines: this.sketch.lines });
                return;
            }
        }
        this.setState({ appState: nextAppState });
    };

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChangeAsync);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChangeAsync);
    }

    onChangeAsync = async () => {
        const options = {
            format: 'png', /// PNG because the view has a clear background
            quality: 0.2, /// Low quality works because it's just a line
            result: 'file'
        };

        const { uri } = await this.sketch.takeSnapshotAsync(options);

        this.setState({
            image: { uri },
            //strokeWidth: Math.random() * 30 + 10,
            //strokeColor: Math.random() * 0xffffff,
        });
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
                            <Text>Snapshot</Text>
                        </View>
                        <Image style={styles.image} source={this.state.image} />
                    </View>
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
    },
    imageContainer: {
        height: '50%',
        borderTopWidth: 4,
        borderTopColor: '#E44262',
    },
    label: {
        width: '100%',
        padding: 5,
        alignItems: 'center',
    },
    button: {
        // position: 'absolute',
        // bottom: 8,
        // left: 8,
        zIndex: 1,
        padding: 12,
        minWidth: 56,
        minHeight: 48,
    },
});