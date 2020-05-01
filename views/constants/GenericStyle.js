import {Dimensions, StyleSheet} from "react-native";

const GenericStyles = StyleSheet.create({
    buttonBar: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: "flex-start",
        margin: 5
    },
    gameZone: {
        alignItems: 'center',
        padding: 30
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
    }
});

export default GenericStyles
