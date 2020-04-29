import React from "react";
import {StyleSheet, Text as NativeText } from "react-native";
import {FontColorPrimary} from "../constants/Constants";

export default function Text({style, children, ...rest}){
    return <NativeText style={{...styles.text, ...style}} {...rest} >
        {children}
    </NativeText>
}

const styles = StyleSheet.create({
    text: {
        color: FontColorPrimary,
        fontFamily: 'Roboto'
    }
})
