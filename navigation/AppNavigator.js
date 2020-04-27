import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "../screens/HomeScreen";
import DrawingScreen from "../screens/DrawingScreen";

const Stack = createStackNavigator();

export default class AppNavigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Draw" component={DrawingScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}