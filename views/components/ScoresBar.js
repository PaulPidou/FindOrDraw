import * as PropTypes from 'prop-types';
import React, {Component} from 'react'
import {connect} from "react-redux";
import {StyleSheet, View} from "react-native";
import Text from "./Text";
import {Icon} from "native-base"

class UScoresBar extends Component{
    static propTypes = {
        time: PropTypes.number,
        score: PropTypes.number,
    }

    formatTime(){
        return `${Math.floor(this.props.time / 60)}:${this.props.time % 60 < 10 ? 0 : ""}${this.props.time % 60}`
    }

    render() {
        return (
            <View style={styles.scoreBar}>
                <View style={styles.timerContainer}>
                    <Icon name={'timer'} type={"MaterialCommunityIcons"} />
                    <Text style={styles.contentText}>{this.formatTime()}</Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Icon name={'trophy-outline'} type={"MaterialCommunityIcons"} />
                    <Text style={styles.contentText}>{this.props.score || 0}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scoreBar: {
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 40,
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    scoreContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    contentText: {
        fontSize: 20,
        marginHorizontal: 5,
    }
})

function mapStateToProps(state) {
    return {
        time: state.game.timerTime,
        score: state.game.score
    }
}

const ScoresBar = connect(mapStateToProps,null)(UScoresBar)
export default ScoresBar
