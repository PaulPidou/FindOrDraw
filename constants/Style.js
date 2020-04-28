import {Dimensions, StyleSheet} from "react-native";
import * as Colors from "./Constants";
import Constants from "expo-constants";

const GenericStyles = StyleSheet.create({
    gameZone: {
        flex: 1,
        alignItems: 'center',
        padding: 30
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        width: '100%',
        paddingVertical: 20,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: Colors.BackgroundColor,
        paddingTop: Constants.statusBarHeight
    },
    sketchContainer: {
        flex: 1
    },
    sketch: {
        backgroundColor: '#fff',
        width: Dimensions.get('window').width - 120,
        height: Dimensions.get('window').width - 120,
    },
    result: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50
    },
    resultContextText: {
        fontWeight: 'bold',
        fontSize: 50,
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
        borderWidth: 0.2
    },
});

export default GenericStyles