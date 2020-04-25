import React from "react";
import {StyleSheet, Text as NativeText } from "react-native";

export default function Text({style, children, ...rest}){
    return <NativeText style={{...styles.text, ...style}} {...rest} >
        {children}
    </NativeText>
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontFamily: 'Roboto'
    }
})
