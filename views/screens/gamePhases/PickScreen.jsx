import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Constants from "expo-constants";
import * as PropTypes from "prop-types";

import * as Colors from "../../constants/Constants";
import Text from "../../components/Text";
import {moveGameStep, resetGame} from "../../../store/actions/GameActions";
import GameSteps from "../../../helpers/GameSteps";

import QUICKDRAW_CLASSES from "../../../assets/model/quickdraw_classes";
import IMAGENET_CLASSES from "../../../assets/model/imagenet_classes.json";

class UPickScreen extends Component {

    static propTypes = {
        moveGameStep: PropTypes.func
    }

    getRandomElement(classes) {
        return classes[Math.floor(Math.random() * classes.length)];
    }

    render() {
        const drawElement = this.getRandomElement(QUICKDRAW_CLASSES)
        const findElement = this.getRandomElement(IMAGENET_CLASSES)
        return (
            <View style={styles.container}>
                <View>
                    <Text>PICK !</Text>
                    <Button
                        title={`Draw a ${drawElement}`}
                        style={styles.menuEntry}
                        onPress={() => {this.props.moveGameStep(GameSteps.DRAW, {payload: drawElement})}}/>
                    <Button
                        title={`Find a ${findElement}`}
                        style={styles.menuEntry}
                        onPress={() => {this.props.moveGameStep(GameSteps.FIND, {payload: findElement})}}/>

                    <Button
                        title={'Reset la partie'}
                        color="red"
                        style={styles.menuEntry}
                        onPress={() => {this.props.resetGame()}}/>
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
