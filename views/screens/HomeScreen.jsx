import React, {Component} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

import * as PropTypes from "prop-types";
import {connect} from "react-redux"
import Text from "../components/Text";
import MainContainer from "../components/MainContainer";
import BlueButton from "../components/BlueButton";
import Logo from "../components/Logo";
import ButtonBar from "../components/ButtonBar";
import {transitionBuilder} from "../../helpers/Utils";
import GameGraph from "../../store/gameModel/GameGraph";

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
                <View style={styles.menu}>
                    <Text style={styles.textS1}>Welcome</Text>
                    <View style={styles.spaccer}/>
                    <Text style={styles.textS2}>This game app is simple as its title!</Text>
                    <View style={styles.spaccer}/>

                    <Text style={styles.textS2} bold>You are given two choices:</Text>
                    <Text style={styles.textS2} bold>Find a thing thanks to our camera</Text>
                    <Text style={styles.textS2} bold>Draw another thing</Text>

                    <View style={styles.spaccer}/>

                    <Text style={styles.textS2}>You'll have 3 minutes to Find Or Draw the maximum of things</Text>

                    <ButtonBar
                    style={styles.buttonBar}>
                        <BlueButton
                            title="Let's go"
                            onPress={() => {
                                this.props.makeTransition(GameGraph.COMMON.startGame)
                            }}
                        />
                    </ButtonBar>
                </View>
            </MainContainer>
        )
    }
}

const styles = StyleSheet.create({
    spaccer: {
        marginVertical: 8,
    },
    textS1:{
        textAlign: 'center',
        fontSize: 50,
        marginBottom: 10,
        marginTop: 0,
    },
    textS2:{
        textAlign: 'center',
        fontSize: 25,
    },
    menu: {
        flex: 1,
        justifyContent: 'space-evenly',
        maxHeight: 700,
        marginVertical: 5,
        alignItems: 'center',
    },
    buttonBar: {
        marginTop: 20,
    }
});

function mapStoreToProps(state) {
    return {
        tfReady: state.game.tfReady,
        drawModelReady: state.game.drawModelReady,
        findModelReady: state.game.findModelReady
    }
}

function mapActionToProps(dispatch) {
    return {
        makeTransition: transitionBuilder(dispatch)
    }
}

const HomeScreen = connect(mapStoreToProps, mapActionToProps)(UHomeScreen)
export default HomeScreen
