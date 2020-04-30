import React from "react";
import {StyleSheet, Text as NativeText } from "react-native";
import {FontColorPrimary} from "../constants/Colors";

export default function Logo({style}){
    return <NativeText style={styles.text} >
        FindOrDraw
    </NativeText>
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 65,
        color: "black",
        fontFamily: 'BigStomach',
        marginVertical: 20
    }
})

