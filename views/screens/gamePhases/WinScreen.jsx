import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Constants from "expo-constants";

import * as Colors from "../../constants/Colors";
import Text from "../../components/Text";
import BlueButton from "../../components/BlueButton";
import {bindActionCreators} from "redux";
import {moveGameStep, resetGame, stopGame} from "../../../store/actions/GameActions";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import GenericStyles from "../../constants/GenericStyle";
import GameStepStyle from "../../constants/GameStepStyle";
import {transitionBuilder} from "../../../helpers/Utils";
import GameGraph from "../../../store/gameModel/GameGraph";

class UWinScreen extends Component {

    static propTypes = {
        makeTransition: PropTypes.func,
        score: PropTypes.number,
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.makeTransition(GameGraph.WIN.next)
        })
    }

    render() {
        return (
            <View style={GameStepStyle.container}>
                <View style={GameStepStyle.body}>
                    <Text style={styles.winText}>You Win !</Text>
                    <Text style={styles.scoreText}>Score:</Text>
                    <Text style={styles.score}>{this.props.score}</Text>
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    winText: {
        textAlign: 'center',
        marginTop: 60,
        fontSize: 70
    },
    scoreText: {
        textAlign: 'center',
        marginTop: 100,
        fontSize: 55
    },
    score: {
        textAlign: 'center',
        fontSize: 100
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

const WinScreen = connect(mapStateToProps, mapActionToProps)(UWinScreen)
export default WinScreen
