import * as PropTypes from 'prop-types';
import React, {Component} from 'react'
import {connect} from "react-redux";
import {View} from "react-native";
import Text from "./Text";

class UTimer extends Component{
    static propTypes = {
        time: PropTypes.number
    }

    render() {
        return (
            <View>
                <Text>{this.props.time}</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        time: state.game.timerTime
    }
}

const Timer = connect(mapStateToProps,null)(UTimer)
export default Timer