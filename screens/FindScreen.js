import React from 'react';
import {ActivityIndicator, StyleSheet, View, Platform, Text, StatusBar, Dimensions} from 'react-native';

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';
import * as Colors from "../constants/Constants";
import Constants from "expo-constants";

const inputTensorWidth = 152;
const inputTensorHeight = 200;

const AUTORENDER = true;

const TensorCamera = cameraWithTensors(Camera);

export default class FindScreen extends React.Component {
    rafID

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            cameraType: Camera.Constants.Type.back,
            results: []
        };
        this.handleImageTensorReady = this.handleImageTensorReady.bind(this);
    }

    async loadMobilenetModel() {
        return await mobilenet.load()
    }

    async handleImageTensorReady(images, updatePreview, gl) {
        const loop = async () => {
            if(!AUTORENDER) {
                updatePreview();
            }

            if (this.state.mobilenetModel != null) {
                const imageTensor = images.next().value;
                const prediction = await this.state.mobilenetModel.classify(imageTensor);

                this.setState({results: prediction});
                tf.dispose(imageTensor);
            }

            if(!AUTORENDER) {
                gl.endFrameEXP();
            }
            this.rafID = requestAnimationFrame(loop);
        };
        loop();
    }

    componentWillUnmount() {
        if(this.rafID) {
            cancelAnimationFrame(this.rafID);
        }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);

        const [mobilenetModel] =
            await Promise.all([this.loadMobilenetModel()]);

        this.setState({
            hasCameraPermission: status === 'granted',
            isLoading: false,
            mobilenetModel
        });
    }

    render() {
        const {isLoading} = this.state;

        // TODO File issue to be able get this from expo.
        // Caller will still need to account for orientation/phone rotation changes
        let textureDims = null;
        if (Platform.OS === 'ios') {
            textureDims = {
                height: 1920,
                width: 1080,
            };
        } else {
            textureDims = {
                height: 1200,
                width: 1600,
            };
        }

        const camView = <View>
            <TensorCamera
                // Standard Camera props
                style={styles.camera}
                type={this.state.cameraType}
                zoom={0}
                // tensor related props
                cameraTextureHeight={textureDims.height}
                cameraTextureWidth={textureDims.width}
                resizeHeight={inputTensorHeight}
                resizeWidth={inputTensorWidth}
                resizeDepth={3}
                onReady={this.handleImageTensorReady}
                autorender={AUTORENDER}
            />
        </View>;

        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor={"rgba(0,0,0,0)"} translucent={true}/>
                {isLoading ? <View style={[styles.loadingIndicator]}>
                    <ActivityIndicator size='large' color='#FF0266' />
                </View> : camView}
                {
                    this.state.results.length > 0 && (
                        <View style={{flex: 1}}>
                            <Text style={{color: "#fff"}}>{this.state.results[0].className}</Text>
                        </View>
                    )
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BackgroundColor,
        paddingTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    camera : {
        //width: 600/2,
        //height: 800/2,
        width: Dimensions.get('window').width - 120,
        height: Dimensions.get('window').width - 120,
    }
});