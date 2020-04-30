import * as PropTypes from 'prop-types';
import React, {Component} from 'react'
import {connect} from "react-redux";
import {StyleSheet, View} from "react-native";
import Text from "./Text";
import * as Colors from "../constants/Colors";
import Constants from "expo-constants";

class UBarTimer extends Component{
    static propTypes = {
        time: PropTypes.number,
        maxTime: PropTypes.number
    }

    render() {
        const currentPerc = this.props.time ? this.props.time / this.props.maxTime : 0
        return (
            <View style={styles.container}>
                <View style={{...styles.bar, width: `${currentPerc*100}%`}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexDirection: 'row',
    },

    bar: {
        backgroundColor: Colors.ContrastColorPrimary,
        height: 3,
    }

});

function mapStateToProps(state) {
    return {
        time: state.game.timerTime
    }
}

const BarTimer = connect(mapStateToProps,null)(UBarTimer)
export default BarTimer
