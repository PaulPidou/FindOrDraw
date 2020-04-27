import React from 'react';
import {ActivityIndicator, Button, StyleSheet, View, Platform } from 'react-native';
import Svg, { Circle, Rect, G, Line} from 'react-native-svg';

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { ExpoWebGLRenderingContext } from 'expo-gl';

import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';
import * as posenet from '@tensorflow-models/posenet';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';

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
            cameraType: Camera.Constants.Type.front,
            modelName: 'posenet',
        };
        this.handleImageTensorReady = this.handleImageTensorReady.bind(this);
    }

    async loadPosenetModel() {
        const model =  await posenet.load({
            architecture: 'MobileNetV1',
            outputStride: 16,
            inputResolution: { width: inputTensorWidth, height: inputTensorHeight },
            multiplier: 0.75,
            quantBytes: 2
        });
        return model;
    }

    async loadBlazefaceModel() {
        const model = await blazeface.load();
        return model;
    }

    async handleImageTensorReady(images, updatePreview, gl) {
        const loop = async () => {
            const {modelName} = this.state;
            if(!AUTORENDER) {
                updatePreview();
            }

            if(modelName === 'posenet') {
                if (this.state.posenetModel != null) {
                    const imageTensor = images.next().value;
                    const flipHorizontal = Platform.OS === 'ios' ? false : true;
                    const pose = await this.state.posenetModel.estimateSinglePose(
                        imageTensor, { flipHorizontal });
                    this.setState({pose});
                    tf.dispose([imageTensor]);
                }
            } else {
                if (this.state.faceDetector != null) {
                    const imageTensor = images.next().value;
                    const returnTensors = false;
                    const faces = await this.state.faceDetector.estimateFaces(
                        imageTensor, returnTensors);

                    this.setState({faces});
                    tf.dispose(imageTensor);
                }
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

        const [blazefaceModel, posenetModel] =
            await Promise.all([this.loadBlazefaceModel(), this.loadPosenetModel()]);

        this.setState({
            hasCameraPermission: status === 'granted',
            isLoading: false,
            faceDetector: blazefaceModel,
            posenetModel,
        });
    }

    renderPose() {
        const MIN_KEYPOINT_SCORE = 0.2;
        const {pose} = this.state;
        if (pose != null) {
            const keypoints = pose.keypoints
                .filter(k => k.score > MIN_KEYPOINT_SCORE)
                .map((k,i) => {
                    return <Circle
                        key={`skeletonkp_${i}`}
                        cx={k.position.x}
                        cy={k.position.y}
                        r='2'
                        strokeWidth='0'
                        fill='blue'
                    />;
                });

            const adjacentKeypoints =
                posenet.getAdjacentKeyPoints(pose.keypoints, MIN_KEYPOINT_SCORE);

            const skeleton = adjacentKeypoints.map(([from, to], i) => {
                return <Line
                    key={`skeletonls_${i}`}
                    x1={from.position.x}
                    y1={from.position.y}
                    x2={to.position.x}
                    y2={to.position.y}
                    stroke='magenta'
                    strokeWidth='1'
                />;
            });

            return <Svg height='100%' width='100%'
                        viewBox={`0 0 ${inputTensorWidth} ${inputTensorHeight}`}>
                {skeleton}
                {keypoints}
            </Svg>;
        } else {
            return null;
        }
    }

    renderFaces() {
        const {faces} = this.state;
        if(faces != null) {
            const faceBoxes = faces.map((f, fIndex) => {
                const topLeft = f.topLeft;
                const bottomRight = f.bottomRight;

                const landmarks = f.landmarks.map((l, lIndex) => {
                    return <Circle
                        key={`landmark_${fIndex}_${lIndex}`}
                        cx={l[0]}
                        cy={l[1]}
                        r='2'
                        strokeWidth='0'
                        fill='blue'
                    />;
                });

                return <G key={`facebox_${fIndex}`}>
                    <Rect
                        x={topLeft[0]}
                        y={topLeft[1]}
                        fill={'red'}
                        fillOpacity={0.2}
                        width={(bottomRight[0] - topLeft[0])}
                        height={(bottomRight[1] - topLeft[1])}
                    />
                    {landmarks}
                </G>;
            });

            const flipHorizontal = Platform.OS === 'ios' ? 1 : -1;
            return <Svg height='100%' width='100%'
                        viewBox={`0 0 ${inputTensorWidth} ${inputTensorHeight}`}
                        scaleX={flipHorizontal}>
                {faceBoxes}
            </Svg>;
        } else {
            return null;
        }
    }

    render() {
        const {isLoading, modelName} = this.state;

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

        const camView = <View style={styles.cameraContainer}>
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
            <View style={styles.modelResults}>
                {modelName === 'posenet' ? this.renderPose() : this.renderFaces()}
            </View>
        </View>;

        return (
            <View style={{width:'100%'}}>
                <View style={styles.sectionContainer}>
                    <Button
                        onPress={this.props.returnToMain}
                        title='Back'
                    />
                </View>
                {isLoading ? <View style={[styles.loadingIndicator]}>
                    <ActivityIndicator size='large' color='#FF0266' />
                </View> : camView}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    loadingIndicator: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 200,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    cameraContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    camera : {
        position:'absolute',
        left: 50,
        top: 100,
        width: 600/2,
        height: 800/2,
        zIndex: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 0,
    },
    modelResults: {
        position:'absolute',
        left: 50,
        top: 100,
        width: 600/2,
        height: 800/2,
        zIndex: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 0,
    }
});