import React, {Component} from "react";
import {Button, StyleSheet, View} from "react-native";

import MainContainer from "../components/MainContainer";
import {bindActionCreators} from "redux";
import * as GameActions from '../../store/actions/GameActions'
import {connect} from 'react-redux'
import DrawScreen from "./gamePhases/DrawScreen";
import FindScreen from "./gamePhases/FindScreen";
import PickScreen from "./gamePhases/PickScreen";
import ScoresScreen from "./gamePhases/ScoresScreen";
import MenuScreen from "./gamePhases/MenuScreen";
import Text from "../components/Text";
import Timer from "../components/Timer";

class UGameScreenManager extends Component {

    componentDidMount() {
        this.props.startGame()
    }

    componentWillUnmount() {
        this.props.endGame()
    }

    static gameStep = {
        "menu": <MenuScreen/>,
        "pick": <PickScreen/>,
        "draw": <DrawScreen/>,
        "find": <FindScreen/>,
        "scores": <ScoresScreen/>,
    };

    renderGameStep() {
        return UGameScreenManager.gameStep[this.props.gameStep]
    }

    render() {
        return <MainContainer>
            <Text>{this.props.gameStep}</Text>
            <Timer/>
            {this.renderGameStep()}
        </MainContainer>
    }
}

const styles = StyleSheet.create({

})

function mapStateToProps(state) {
    return {
        gameStep: state.game.gameStep,
    }
}

function mapActionToProps(dispatch) {
    return {
        startGame: bindActionCreators(GameActions.startGame, dispatch),
        moveGameStep: bindActionCreators(GameActions.moveGameStep, dispatch),
        endGame: bindActionCreators(GameActions.stopGame, dispatch)
    }
}

const GameScreenManager = connect(mapStateToProps, mapActionToProps)(UGameScreenManager)
export default GameScreenManager