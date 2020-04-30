import * as ExpoPixi from 'expo-pixi';
import React, {Component} from 'react';
import {AppState, View} from 'react-native';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button} from 'native-base';

import Text from "../../components/Text";
import GenericStyles from "../../constants/GenericStyle";
import {transposeAndApplyAlpha} from "../../../helpers/ImageTransformer";
import {predictFromDraw} from "../../../helpers/Prediction";
import * as GameActions from "../../../store/actions/GameActions";
import GameSteps from "../../../helpers/GameSteps";
import * as PropTypes from "prop-types";
import {isAndroid, uuidv4} from "../../../helpers/Utils";

class UDrawScreen extends Component {

    static propTypes = {
        moveGameStep: PropTypes.func,
        isModelReady: PropTypes.bool,
        drawElement: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            strokeColor: 0x000000,
            strokeWidth: 15,
            lines: [],
            prediction: null,
            appState: AppState.currentState,
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

        this.setState({prediction, thinking: false})
    };

    render() {
        return (
            <View style={GenericStyles.container}>
                <View>
                    <Text style={GenericStyles.title}>{`Draw a ${this.props.drawElement}`}</Text>
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
                        if (!this.props.isModelReady) {
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
                <View style={{flexDirection: 'row', position: 'absolute', bottom: 0}}>
                    <Button full
                            style={GenericStyles.button}
                            onPress={() => {
                                this.sketch.undo();
                            }}>
                        <Text>UNDO</Text>
                    </Button>
                    <Button full
                            style={GenericStyles.button}
                            onPress={() => {
                                this.clearSketch();
                            }}>
                        <Text>CLEAR</Text>
                    </Button>
                    <Button full
                            style={GenericStyles.button}
                            onPress={() => {
                                this.props.moveGameStep(GameSteps.PICK)
                            }}>
                        <Text>OK</Text>
                    </Button>
                </View>

            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        isModelReady : state.game.drawModelReady,
        drawElement: state.game.gameElement
    }
}

function mapActionToProps(dispatch) {
    return {
        moveGameStep: bindActionCreators(GameActions.moveGameStep, dispatch),
    }
}

const DrawScreen = connect(mapStateToProps, mapActionToProps)(UDrawScreen);
export default DrawScreen
