import GameSteps from "../../helpers/GameSteps";
import Text from "./Text";
import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import * as Constants from "../constants/Constants";
import * as PropTypes from 'prop-types'
import {connect} from "react-redux";

export default class PickButton extends React.Component{
    static props = {
        type: PropTypes.string,
        value: PropTypes.string,
        onPress: PropTypes.func
    }

    catchPhrase() {
        if(this.props.type === GameSteps.FIND){
            return <Text style={styles.catchPhrase}>Trouve un :</Text>
        }

        if(this.props.type === GameSteps.DRAW){
            return <Text style={styles.catchPhrase}>Dessine un :</Text>
        }
    }

    render() {
        return <TouchableOpacity style={styles.menuEntry} onPress={this.props.onPress}>
            {this.catchPhrase()}
            <Text style={styles.value}>{this.props.value}</Text>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    menuEntry: {
        backgroundColor: Constants.ContrastColorPrimary,
        color: "white",
        height: 220
    },
    catchPhrase: {
        textAlign: "center",
        color: 'white',
        fontSize: 40,
        marginVertical : 20
    },
    value: {
        textAlign: "center",
        color: 'white',
        fontSize: 60
    },

});
