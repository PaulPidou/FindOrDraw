import React, {Component} from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import {BackgroundColor} from "../constants/Colors";
import * as PropTypes from "prop-types";
import {Icon} from "native-base";

export default class LoadingScreen extends Component {

    static propTypes = {
        tfReady: PropTypes.bool,
        drawModelReady: PropTypes.bool,
        findModelReady: PropTypes.bool
    }

    render() {
        return (
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: BackgroundColor }}
            >
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
                <View style={styles.loadingContainer}>
                    <Image
                        style={{ width : 120, height: 120 }}
                        source={require('../../assets/loading.gif')}
                    />
                </View>
                <Text style={{ fontFamily: 'BigStomach', fontSize: 50, color: '#fff', marginTop: 150}}>
                    FindOrDraw</Text>
            </View>
        )
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
    loadingContainer: {
        width: 170, height: 170, borderRadius: 170/2,
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#fff', marginTop: 150,
        shadowColor: "#000", shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34, shadowRadius: 6.27, elevation: 10}
})