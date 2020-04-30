import React, {Component} from 'react';
import {Button, Image, StatusBar, StyleSheet, View} from 'react-native';

import * as Colors from "../constants/Colors";
import logo_bleu from "../../assets/logo_transparent_vert.png"
import * as PropTypes from "prop-types";
import {connect} from "react-redux"
import Text from "../components/Text";
import MainContainer from "../components/MainContainer";
import BlueButton from "../components/BlueButton";
import Logo from "../components/Logo";
import GenericStyles from "../constants/GenericStyle";
import ButtonBar from "../components/ButtonBar";
import {Icon} from "native-base";

class UHomeScreen extends Component {

    static propTypes = {
        tfReady: PropTypes.bool,
        drawModelReady: PropTypes.bool,
        findModelReady: PropTypes.bool
    }

    render() {
        return (
            <MainContainer>
                <StatusBar barStyle='dark-content' backgroundColor={"rgba(0,0,0,0)"} translucent={true}/>
                <Logo/>
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
                <View style={styles.menu}>

                    <Text style={styles.textS1}>Welcome</Text>
                    <View style={styles.spaccer}/>
                    <Text style={styles.textS2}>This game app is simple as its title!</Text>
                    <View style={styles.spaccer}/>

                    <Text style={styles.textBold}>You are given two choices:</Text>
                    <Text style={styles.textBold}>Find a thing thanks to our camera</Text>
                    <Text style={styles.textBold}>Draw another thing</Text>

                    <View style={styles.spaccer}/>

                    <Text style={styles.textS2}>You'll have 3 minutes to Find Or Draw the maximum of things.</Text>

                    <ButtonBar
                    style={{marginTop: 40}}>
                        <BlueButton
                            title="Let's go"
                            onPress={() => this.props.navigation.navigate('Game')}
                        />
                    </ButtonBar>
                </View>
            </MainContainer>
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

    spaccer: {
        marginVertical: 10,
    },
    textS1:{
        textAlign: 'center',
        fontSize: 50,
        marginVertical: 20
    },
    textS2:{
        textAlign: 'center',
        fontSize: 35,
    },
    textBold:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
    },
    menu: {
        flex: 2,
        justifyContent: 'center',
        marginVertical: 40,
        alignItems: 'stretch',
    },
});

function mapStoreToProps(state) {
    return {
        tfReady: state.game.tfReady,
        drawModelReady: state.game.drawModelReady,
        findModelReady: state.game.findModelReady
    }
}

const HomeScreen = connect(mapStoreToProps, null)(UHomeScreen)
export default HomeScreen
