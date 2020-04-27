import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "../screens/HomeScreen";
import DrawScreen from "../screens/DrawScreen";
import FindScreen from "../screens/FindScreen";

const Stack = createStackNavigator();

export default class AppNavigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Draw" component={DrawScreen} />
                    <Stack.Screen name="Find" component={FindScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}