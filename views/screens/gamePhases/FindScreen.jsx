import React from 'react';
import {ActivityIndicator, View, Platform, Text, StatusBar} from 'react-native';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button} from "native-base";
import * as PropTypes from "prop-types";

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import * as tf from '@tensorflow/tfjs';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';

import * as GameActions from "../../../store/actions/GameActions";
import GameSteps from "../../../helpers/GameSteps";
import {predictFromCamera} from "../../../helpers/Prediction"
import GenericStyles from "../../constants/GenericStyle";

const inputTensorWidth = 152;
const inputTensorHeight = 200;

const AUTORENDER = true;

const TensorCamera = cameraWithTensors(Camera);

class UFindScreen extends React.Component {

    static propTypes = {
        isModelReady: PropTypes.bool,
        findElement: PropTypes.string,
        moveGameStep: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            cameraType: Camera.Constants.Type.back,
            results: []
        };
        this.rafID = null
        this.handleImageTensorReady = this.handleImageTensorReady.bind(this);
    }

    async handleImageTensorReady(images, updatePreview, gl) {
        const loop = async () => {
            if(!AUTORENDER) {
                updatePreview();
            }

            if (this.props.isModelReady) {
                const imageTensor = images.next().value;
                const prediction = await predictFromCamera(imageTensor);

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

        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
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

        const camView = <View style={GenericStyles.gameZone}>
            <TensorCamera
                // Standard Camera props
                style={GenericStyles.camera}
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
            <View style={GenericStyles.container}>
                <View>
                    <Text style={GenericStyles.title}>{`Find a ${this.props.findElement}`}</Text>
                </View>
                {!this.props.isModelReady ? <ActivityIndicator size='large' color='#FF0266' /> : camView}
                <View style={GenericStyles.result}>
                    {(() => {
                        if (this.state.results.length > 0) {
                            return (<Text style={{color: "#fff"}}>{this.state.results[0].className}</Text>)
                        } else {
                            return null
                        }
                    })()}
                </View>
                <View>
                    <Button full
                            style={GenericStyles.button}
                            onPress={() => {this.props.moveGameStep(GameSteps.PICK)}}>
                        <Text>OK</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state){
    return {
        isModelReady : state.game.findModelReady,
        findElement: state.game.gameElement
    }
}

function mapActionToProps(dispatch) {
    return {
        moveGameStep: bindActionCreators(GameActions.moveGameStep, dispatch),
    }
}

const FindScreen = connect(mapStateToProps,mapActionToProps)(UFindScreen);
export default FindScreen
