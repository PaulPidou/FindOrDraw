import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import Constants from "expo-constants";

import * as Colors from "../../constants/Constants";
import Text from "../../components/Text";
import {connect} from "react-redux";
import {moveGameStep, resetGame} from "../../store/actions/GameActions";
import GameSteps from "../../helpers/GameSteps";
import * as PropTypes from "prop-types";
import {bindActionCreators} from "redux";

class UPickScreen extends Component {

    static propTypes = {
        moveGameStep: PropTypes.func
    }


    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>PICK !</Text>

                    <Button title={'Draw'} style={styles.menuEntry} onPress={() => {
                        this.props.moveGameStep(GameSteps.DRAW)
                    }}/>
                    <Button title={'Find'} style={styles.menuEntry} onPress={() => {
                        this.props.moveGameStep(GameSteps.FIND)
                    }}/>

                    <Button title={'Reset la partie'} color="red" style={styles.menuEntry} onPress={() => {
                        this.props.resetGame()
                    }}/>
                </View>
            </View>)
    }
}

function mapActionToProps(dispatch) {
    return {
        moveGameStep: bindActionCreators(moveGameStep, dispatch),
        resetGame: bindActionCreators(resetGame, dispatch),
    }
}

const PickScreen = connect(null, mapActionToProps)(UPickScreen)
export default PickScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BackgroundColor,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 20
    },

});