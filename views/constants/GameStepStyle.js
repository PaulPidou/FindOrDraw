import {Dimensions, StyleSheet} from "react-native";
import * as Colors from "./Colors";
import Constants from "expo-constants";

const GameStepStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },

    body: {
        flex: 1,
        flexDirection: 'column'
    }
});

export default GameStepStyle
