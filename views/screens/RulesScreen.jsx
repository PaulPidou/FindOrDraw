import React, {Component} from 'react';
import {StyleSheet, View, Button, StatusBar, Image} from 'react-native';
import Constants from "expo-constants";

import * as Colors from "../constants/Constants";
import logo_bleu from "../../assets/logo_transparent_vert.png"
import Text from "../components/Text";

export default class RulesScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor={"rgba(0,0,0,0)"} translucent={true}/>

                <View>
                    <Text>Rules !</Text>
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BackgroundColor,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 20
    },

});