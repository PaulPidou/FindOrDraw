import GameSteps from "../../helpers/GameSteps";
import Text from "./Text";
import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import * as Colors from "../constants/Colors";
import * as PropTypes from 'prop-types'
import {connect} from "react-redux";

export default class PickButton extends React.Component{
    static props = {
        title: PropTypes.func,
        style: PropTypes.any,
        onPress: PropTypes.func
    }

    render() {
        return <TouchableOpacity style={{...styles.menuEntry, ...this.props.style}} onPress={this.props.onPress}>
            <Text style={styles.value}>{this.props.title}</Text>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    menuEntry: {
        backgroundColor: Colors.ContrastColorPrimary,
        color: "white",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        margin: 10,
        flex: 1,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    value: {
        textAlign: "center",
        color: Colors.BackgroundColor,
        fontSize: 20,
        fontWeight: "bold"
    },

});
