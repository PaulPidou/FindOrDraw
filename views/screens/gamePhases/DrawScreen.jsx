import * as ExpoPixi from 'expo-pixi';
import React, {Component} from 'react';
import {AppState, StyleSheet, View} from 'react-native';
import {connect} from "react-redux";

import Text from "../../components/Text";
import GenericStyles from "../../constants/GenericStyle";
import {predictFromDraw} from "../../../helpers/Prediction";
import * as PropTypes from "prop-types";
import {isAndroid, transitionBuilder, uuidv4} from "../../../helpers/Utils";
import ButtonBar from "../../components/ButtonBar";
import BlueButton from "../../components/BlueButton";
import GameStepStyle from "../../constants/GameStepStyle";
import GameGraph from "../../../store/gameModel/GameGraph";

class UDrawScreen extends Component {

    static propTypes = {
        makeTransition: PropTypes.func,
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
        this.setState({thinking: true})

        const pixels = this.sketch.renderer.extract.pixels()
        const length = Math.sqrt(pixels.length / 4)

        const prediction = await predictFromDraw(pixels, length, length)
        this.setState({prediction, thinking: false})

        if(this.props.drawElement === prediction){
            this.props.makeTransition(GameGraph.DRAW.win)
        }
    }

    render() {
        return (
            <View style={GameStepStyle.container}>
                <Text style={styles.title}>Draw a <Text bold>{this.props.drawElement}</Text></Text>
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
                        if (this.state.thinking) {
                            return <Text style={styles.prediction}>Let's see...</Text>
                        } else {
                            return <Text style={styles.prediction}>
                                I see{this.state.prediction && ':'} {this.state.prediction || 'nothing'}</Text>
                        }
                    })()}
                </View>
                <ButtonBar
                    style={{marginTop: 40}}
                >
                    <BlueButton
                        title={'CLEAR'}
                        onPress={() => {
                            this.clearSketch();
                        }}
                    />
                    <BlueButton
                        title={'UNDO'}
                        onPress={() => {
                            this.sketch.undo();
                        }}
                    />
                </ButtonBar>
                <ButtonBar>
                    <BlueButton
                        title={'FIND'}
                        onPress={() => {
                            this.props.makeTransition(GameGraph.DRAW.goToFind)
                        }}
                    />
                    <BlueButton
                        title={'SKIP'}
                        onPress={() => {
                            this.props.makeTransition(GameGraph.DRAW.skip)
                        }}
                    />
                </ButtonBar>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    result: {
        alignItems: "center"
    },
    prediction: {
        fontSize: 15,
        textAlign: 'center'
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 15
    }
});

function mapStateToProps(state) {
    return {
        isModelReady: state.game.drawModelReady,
        drawElement: state.game.wordToDraw
    }
}

function mapActionToProps(dispatch) {
    return {
        makeTransition: transitionBuilder(dispatch)
    }
}

const DrawScreen = connect(mapStateToProps, mapActionToProps)(UDrawScreen);
export default DrawScreen
