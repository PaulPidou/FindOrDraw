import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import * as Constants from "../../constants/Colors"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Text from "../../components/Text";
import {moveGameStep, resetGame} from "../../../store/actions/GameActions";
import GameSteps from "../../../helpers/GameSteps";
import * as PropTypes from "prop-types";
import PickButton from "../../components/PickButton";

import QUICKDRAW_CLASSES from "../../../assets/model/quickdraw_classes";
import IMAGENET_CLASSES from "../../../assets/model/imagenet_classes.json";
import BlueButton from "../../components/BlueButton";
import GameStepStyle from "../../constants/GameStepStyle";
import ButtonBar from "../../components/ButtonBar";

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
            <View style={GameStepStyle.container}>

                <View style={GameStepStyle.body}>
                    <View style={styles.gameChoiceBox}>
                        <Text style={styles.choiceHeader}>Find a:</Text>
                        <Text style={styles.choice}>{findElement}</Text>
                    </View>
                    <View style={styles.splitterContainer}>
                        <View style={styles.splitter}/>
                        <Text style={styles.or}>OR</Text>
                        <View style={styles.splitter}/>
                    </View>
                    <View style={styles.gameChoiceBox}>
                        <Text style={styles.choiceHeader}>Draw a:</Text>
                        <Text style={styles.choice}>{drawElement}</Text>
                    </View>

                    <ButtonBar
                        style={{marginTop: 40}}>
                        <BlueButton title={'DRAW'} onPress={() => {
                            this.props.moveGameStep(GameSteps.DRAW)
                        }}/>
                        <BlueButton title={'FIND'} onPress={() => {
                            this.props.moveGameStep(GameSteps.FIND)
                        }}/>
                    </ButtonBar>
                </View>

                <View style={GameStepStyle.footer}>
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
    gameChoiceBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        maxHeight: 250,
    },
    choiceHeader: {
        fontSize: 40,
        marginVertical: 10
    },
    choice: {
        fontSize: 40,
        marginVertical: 10,
        fontWeight: 'bold'
    },
    splitterContainer: {
        flexDirection: "row",
        alignItems: 'center',
    },
    splitter: {
        flex: 1,
        marginHorizontal: 20,
        height: 1,
        backgroundColor: Constants.FontColorPrimary,
    },
    or: {
        fontSize: 30,
        marginHorizontal: 20,
    }
});
