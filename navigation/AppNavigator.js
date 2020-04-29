import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as PropTypes from "prop-types";
import {connect} from "react-redux";

import HomeScreen from "../screens/HomeScreen";
import DrawScreen from "../screens/gamePhases/DrawScreen";
import FindScreen from "../screens/gamePhases/FindScreen";
import RulesScreen from "../screens/RulesScreen";
import GameScreenManager from "../screens/GameScreenManager";
import {bindActionCreators} from "redux";
import * as GameActions from "../store/actions/GameActions";
import * as tf from "@tensorflow/tfjs";
import {loadModel} from "../helpers/Prediction";

const Stack = createStackNavigator();

class UnconnectedAppNavigator extends Component {

    static propTypes = {
        gameMode: PropTypes.string,
        isGameRunning: PropTypes.bool,
        markTfAsReady : PropTypes.func,
        markModelAsReady : PropTypes.func,
    }


    async initTf(){
        //Wait for tf to be ready.
        await tf.ready();
        // Signal to the app that tensorflow.js can now be used.
        this.props.markTfAsReady();
    }

    async loadDrawModel(){
        await loadModel()
        this.props.markModelAsReady()
    }

    async componentDidMount() {
            await this.initTf()
            this.loadDrawModel()
    }


    renderMenu() {
        return <>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Rules" component={RulesScreen}/>
        </>
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
                    {
                        !this.props.gameStatus
                            && this.renderMenu()
                    }
                    <Stack.Screen name="Game" component={GameScreenManager}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

function maStateToProps(state) {
    return {
        gameStatus: state.game.gameStatus,
        gameMode: state.game.gameStep,
    }
}

function mapActionsToProps(dispatch){
    return {
        markTfAsReady: bindActionCreators(GameActions.markTfAsReady, dispatch),
        markModelAsReady: bindActionCreators(GameActions.markModelAsReady, dispatch)
    }
}

const AppNavigator = connect(maStateToProps, mapActionsToProps)(UnconnectedAppNavigator);
export default AppNavigator;
