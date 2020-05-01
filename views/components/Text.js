import React from "react";
import {StyleSheet, Text as NativeText } from "react-native";
import {FontColorPrimary} from "../constants/Colors";

export default function Text({style, children, bold, ...rest}){
    const baseStyle = bold ? styles.textBold : styles.text
    return <NativeText style={{...baseStyle, ...style}} {...rest} >
        {children}
    </NativeText>
}

const styles = StyleSheet.create({
    text: {
        color: FontColorPrimary,
        fontFamily: 'Monospace'
    },
    textBold: {
        color: FontColorPrimary,
        fontFamily: 'MonospaceBold'
    }
})
