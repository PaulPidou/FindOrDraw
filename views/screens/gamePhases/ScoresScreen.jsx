import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Text from "../../components/Text";
import BlueButton from "../../components/BlueButton";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import GameStepStyle from "../../constants/GameStepStyle";
import {transitionBuilder} from "../../../helpers/Utils";
import GameGraph from "../../../store/gameModel/GameGraph";
import ButtonBar from "../../components/ButtonBar";

class UScoresScreen extends Component {

    static propTypes = {
        makeTransition: PropTypes.func,
        score: PropTypes.number,
    }

    render() {
        return (
            <View style={GameStepStyle.container}>

                    <View style={GameStepStyle.body}>
                        <Text style={styles.gameOverText}>Game Over!</Text>
                        <Text style={styles.scoreText}>Score:</Text>
                        <Text style={styles.score}>{this.props.score}</Text>
                        <ButtonBar>
                            <BlueButton
                                title={'Exit'}
                                onPress={() => {
                                    this.props.makeTransition(GameGraph.SCORE.exitGame)
                                }}
                            />
                            <BlueButton
                                title={'Replay'}
                                onPress={() => {
                                    this.props.makeTransition(GameGraph.SCORE.replay)
                                }}
                            />
                        </ButtonBar>
                    </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    gameOverText: {
        textAlign: 'center',
        fontSize: 60,
        marginTop: 20,
    },
    scoreText: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 55
    },
    score: {
        textAlign: 'center',
        fontSize: 100,
        marginBottom: 20
    }
});
function mapStateToProps(state) {
    return {
        score: state.game.score,
    }
}

function mapActionToProps(dispatch) {
    return {
        makeTransition: transitionBuilder(dispatch)
    }
}

const ScoresScreen = connect(mapStateToProps, mapActionToProps)(UScoresScreen)
export default ScoresScreen
