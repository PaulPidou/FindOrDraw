import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as PropTypes from "prop-types";
import {connect} from "react-redux";

import HomeScreen from "../screens/HomeScreen";
import DrawScreen from "../screens/DrawScreen";
import FindScreen from "../screens/FindScreen";
import RulesScreen from "../screens/RulesScreen";

const Stack = createStackNavigator();

class UnconnectedAppNavigator extends Component {

    static propTypes = {
        gameMode: PropTypes.string,
        isGameRunning: PropTypes.boolean,
    }


    renderMenu() {
        return <>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Rules" component={RulesScreen}/>
        </>
    }

    renderScore() {

    }

    renderGame() {
        switch (this.props.gameMode) {
            case "draw":
                return <Stack.Screen name="Draw" component={DrawScreen}/>;
            case "find":
                return <Stack.Screen name="Find" component={FindScreen}/>;
            default:
                return null
        }
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
                    {
                        this.props.gameStarted
                            ? this.renderMenu()
                            : <Stack.Screen name="Game" component={HomeScreen}/>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

function maStateToProps(state) {
    return {
        isGameRunning: state.game.gameRunning,
        gameMode: state.game.gameMode
    }
}


const AppNavigator = connect(null, null)(UnconnectedAppNavigator);
export default AppNavigator;
