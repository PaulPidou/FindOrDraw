import * as PropTypes from 'prop-types';
import React, {Component} from 'react'
import {connect} from "react-redux";
import {StyleSheet, View} from "react-native";
import Text from "./Text";
import {Icon} from "native-base"

class ULoadingStatus extends Component{

    static propTypes = {
        tfReady: PropTypes.bool,
        drawModelReady: PropTypes.bool,
        findModelReady: PropTypes.bool
    }


    render() {
        return (
            <View style={styles.statusContainer}>
                <View style={styles.statusGroup}>
                    <Icon style={styles.statusIcon} name={this.props.tfReady ? 'md-checkmark' : 'md-close'}/>
                    <Text>TensorFlow</Text>
                </View>
                <View style={styles.statusGroup}>
                    <Icon style={styles.statusIcon} name={this.props.drawModelReady ? 'md-checkmark' : 'md-close'}/>
                    <Text>Draw Model</Text>
                </View>
                <View style={styles.statusGroup}>
                    <Icon style={styles.statusIcon} name={this.props.findModelReady ? 'md-checkmark' : 'md-close'}/>
                    <Text>Find Model</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    statusGroup: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusIcon: {
        fontSize: 20,
        marginHorizontal: 5
    },
})

function mapStateToProps(state) {
    return {
        tfReady: state.game.tfReady,
        drawModelReady: state.game.drawModelReady,
        findModelReady: state.game.findModelReady,
    }
}

const LoadingStatus = connect(mapStateToProps,null)(ULoadingStatus)
export default LoadingStatus
