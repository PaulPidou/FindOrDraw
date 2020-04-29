import React from "react";
import {StyleSheet, View } from "react-native";
import * as Colors from "../constants/Constants";
import Constants from "expo-constants";

export default function MainContainer({style, children, ...rest}){
    return <View style={{...styles.mainContainer, ...style}} {...rest} >
        {children}
    </View>
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.BackgroundColor,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 20    }
})
