import React, {Component} from "react";
import Text from "../components/Text";
import {Button, StyleSheet, View} from "react-native";

import MainContainer from "../components/MainContainer";
import {bindActionCreators} from "redux";
import * as GameActions from '../store/actions/GameActions'
import {connect} from 'react-redux'

class UGameScreenManager extends Component {

    componentDidMount() {
        this.props.startGame()
    }

    renderMenu() {
        return <>
            <Button title={'Start'} style={styles.menuEntry} onPress={() => {
                this.props.navigation.navigate('Draw')
            }
            }/>
            <Button title={'Find'} style={styles.menuEntry} onPress={() => {
                this.props.navigation.navigate('Find')
            }
            }/>
        </>
    }

    render() {
        return <MainContainer>
            <View style={styles.menu}>
                {this.props.gameStatus === "started" && this.renderMenu()}
            </View>
        </MainContainer>
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        justifyContent: "center"
    },

    menuEntry: {
        marginVertical: 10
    }
})

function mapStateToProps(state) {
    return {
        gameStatus: state.game.gameMode,
    }
}

function mapActionToProps(dispatch) {
    return {
        startGame: bindActionCreators(GameActions.startGame, dispatch)
    }
}

const GameScreenManager = connect(mapStateToProps, mapActionToProps)(UGameScreenManager)
export default GameScreenManager