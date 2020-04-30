import React from "react";
import {View} from "react-native";
import GenericStyles from "../constants/GenericStyle";

export default function ButtonBar({style, children, ...rest}){
    return <View style={{...GenericStyles.buttonBar, ...style}} {...rest} >
        {children}
    </View>
}
