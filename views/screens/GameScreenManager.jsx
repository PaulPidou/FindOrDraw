import React, {Component} from "react";
import {Button, StatusBar, StyleSheet, View} from "react-native";

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
import GameSteps from "../../store/gameModel/GameSteps";
import {transitionBuilder} from "../../helpers/Utils";
import * as PropTypes from "prop-types";
import GameGraph from "../../store/gameModel/GameGraph";
import GameStepStyle from "../constants/GameStepStyle";
import WinScreen from "./gamePhases/WinScreen";

class UGameScreenManager extends Component {

    static propTypes = {
        makeTransition: PropTypes.func
    }

    componentWillUnmount() {
        this.props.makeTransition(GameGraph.COMMON.exitGame)
    }

    static gameStep = {
        [GameSteps.PICK]: <PickScreen/>,
        [GameSteps.DRAW]: <DrawScreen/>,
        [GameSteps.FIND]: <FindScreen/>,
        [GameSteps.SCORE]: <ScoresScreen/>,
        [GameSteps.WIN]: <WinScreen/>,
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
            <View style={GameStepStyle.footer}>
                <Button title={'Quitter la partie'} color="red" style={styles.menuEntry} onPress={() => {
                    this.props.makeTransition(GameGraph.COMMON.exitGame)
                }}/>
            </View>
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
        makeTransition: transitionBuilder(dispatch)
    }
}

const GameScreenManager = connect(mapStateToProps, mapActionToProps)(UGameScreenManager)
export default GameScreenManager
