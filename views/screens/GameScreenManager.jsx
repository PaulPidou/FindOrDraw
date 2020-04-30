import React, {Component} from "react";
import {StatusBar, StyleSheet} from "react-native";

import MainContainer from "../components/MainContainer";
import {bindActionCreators} from "redux";
import * as GameActions from '../../store/actions/GameActions'
import {connect} from 'react-redux'
import DrawScreen from "./gamePhases/DrawScreen";
import FindScreen from "./gamePhases/FindScreen";
import PickScreen from "./gamePhases/PickScreen";
import ScoresScreen from "./gamePhases/ScoresScreen";
import ScoresBar from "../components/ScoresBar";
import BarTimer from "../components/BarTimer";
import Logo from "../components/Logo";
import GameSteps from "../../helpers/GameSteps";

class UGameScreenManager extends Component {

    componentDidMount() {
        this.props.startGame()
    }

    componentWillUnmount() {
        this.props.endGame()
    }

    static gameStep = {
        [GameSteps.PICK]: <PickScreen/>,
        [GameSteps.DRAW]: <DrawScreen/>,
        [GameSteps.FIND]: <FindScreen/>,
        [GameSteps.SCORE]: <ScoresScreen/>,
    };

    renderGameStep() {
        return UGameScreenManager.gameStep[this.props.gameStep]
    }

    render() {
        return <MainContainer style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={"rgba(0,0,0,0)"} translucent={true}/>
            <BarTimer maxTime={3 * 60} />
            <Logo/>
            <ScoresBar/>
            {this.renderGameStep()}
        </MainContainer>
    }
}

const styles = StyleSheet.create({
    step: {
        textAlign: "center",
        fontWeight: "bold",
        margin: 30
    },
    container: {
        paddingHorizontal: 0
    }
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
