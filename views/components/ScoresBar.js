import * as PropTypes from 'prop-types';
import React, {Component} from 'react'
import {connect} from "react-redux";
import {StyleSheet, View} from "react-native";
import Text from "./Text";

class UScoresBar extends Component{
    static propTypes = {
        time: PropTypes.number,
        score: PropTypes.number,
    }

    formatTime(){
        return `${Math.floor(this.props.time / 60)}:${this.props.time % 60}`
    }

    render() {
        return (
            <View style={styles.scoreBar}>
                <View style={styles.timerContainer}>
                    <Text style={styles.contentText}>{this.formatTime()}</Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Text style={styles.contentText}>{this.formatTime()}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scoreBar: {
        flexDirection: 'row',
        marginVertical: 15,
        marginHorizontal: 40,
    },
    timerContainer: {
        flex: 1,
    },
    scoreContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'flex-end'
    },

    contentText: {
        fontSize: 20
    }
})

function mapStateToProps(state) {
    return {
        time: state.game.timerTime,
        score: state.game.timerTime
    }
}

const ScoresBar = connect(mapStateToProps,null)(UScoresBar)
export default ScoresBar
