import {Dimensions, StyleSheet} from "react-native";
import * as Colors from "./Colors";
import Constants from "expo-constants";

const GenericStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BackgroundColor,
        paddingTop: Constants.statusBarHeight
    },
    gameZone: {
        alignItems: 'center',
        padding: 30
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        width: '100%',
        paddingVertical: 20,
        textAlign: 'center',
        color: "#fff"
    },
    sketchContainer: {},
    sketch: {
        backgroundColor: '#fff',
        width: Dimensions.get('window').width - 120,
        height: Dimensions.get('window').width - 120,
    },
    camera : {
        width: 600/2,
        height: 800/2,
    },
    result: {
        alignItems: "center"
    },
    resultContextText: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 20
    },
    resultText: {
        fontWeight: 'bold',
        fontSize: 70,
    },
    button: {
        zIndex: 1,
        flex: 1,
        backgroundColor: Colors.VertLogo,
        borderColor: '#fff',
        borderWidth: 0.2,
    },
});

export default GenericStyles
