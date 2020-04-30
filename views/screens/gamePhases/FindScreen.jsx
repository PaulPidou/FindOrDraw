import React from 'react';
import {ActivityIndicator, Platform, StyleSheet, View} from 'react-native';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";

import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';

import * as tf from '@tensorflow/tfjs';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';

import * as GameActions from "../../../store/actions/GameActions";
import GameSteps from "../../../store/gameModel/GameSteps";
import {predictFromCamera} from "../../../helpers/Prediction"
import GenericStyles from "../../constants/GenericStyle";
import ButtonBar from "../../components/ButtonBar";
import BlueButton from "../../components/BlueButton";
import GameStepStyle from "../../constants/GameStepStyle";
import Text from "../../components/Text";
import {transitionBuilder} from "../../../helpers/Utils";
import GameGraph from "../../../store/gameModel/GameGraph";

const inputTensorWidth = 152;
const inputTensorHeight = 200;

const AUTORENDER = true;

const TensorCamera = cameraWithTensors(Camera);

class UFindScreen extends React.Component {

    static propTypes = {
        isModelReady: PropTypes.bool,
        makeTransition: PropTypes.func,
        wordToFind: PropTypes.string
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
            if (!AUTORENDER) {
                updatePreview();
            }

            if (this.props.isModelReady) {
                const imageTensor = images.next().value;
                const prediction = await predictFromCamera(imageTensor);

                this.setState({results: prediction});

                if(this.checkResponse(prediction)){
                    this.props.makeTransition(GameGraph.FIND.win)
                }

                tf.dispose(imageTensor);
            }

            if (!AUTORENDER) {
                gl.endFrameEXP();
            }
            this.rafID = requestAnimationFrame(loop);
        };
        loop();
    }

    componentWillUnmount() {
        if (this.rafID) {
            cancelAnimationFrame(this.rafID);
        }
    }

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({hasCameraPermission: status === 'granted'});
    }

    checkResponse(predictions){
        if(!predictions || predictions.length === 0){
            return false
        }

        return predictions[0].className.includes(this.props.wordToFind)

    }

    renderCamView() {
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


        return (
            <View style={GenericStyles.gameZone}>
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
            </View>
        )
    }

    render() {
        return (
            <View style={GameStepStyle.container}>

                <Text style={styles.title}>Find a <Text style={styles.titleBold}>{this.props.wordToFind}</Text></Text>
                <View style={GameStepStyle.body}>
                    {!this.props.isModelReady ?
                        <ActivityIndicator size='large' color='#FF0266'/> : this.renderCamView()}
                    <View style={styles.result}>
                        <Text style={styles.prediction}>
                            I
                            see{this.state.results.length > 0 && ':'} {this.state.results.length > 0 ? this.state.results[0].className : 'nothing'}
                        </Text>
                    </View>
                    <ButtonBar
                        style={{marginTop: 40}}
                    >
                        <BlueButton
                            title={'DRAW'}
                            onPress={() => {
                                this.props.makeTransition(GameGraph.FIND.goToDraw)
                            }}/>
                        <BlueButton
                            title={'SKIP'}
                            onPress={() => {
                                this.props.makeTransition(GameGraph.FIND.skip)
                            }}
                        />
                    </ButtonBar>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    result: {
        alignItems: "center"
    },
    prediction: {
        fontSize: 15
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 15
    },
    titleBold: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})


function mapStateToProps(state) {
    return {
        isModelReady: state.game.findModelReady,
        wordToFind: state.game.wordToFind
    }
}

function mapActionToProps(dispatch) {
    return {
        makeTransition: transitionBuilder(dispatch)
    }
}

const FindScreen = connect(mapStateToProps, mapActionToProps)(UFindScreen);
export default FindScreen
