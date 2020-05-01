import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Constants from "../../constants/Colors"
import {connect} from "react-redux";
import Text from "../../components/Text";
import * as PropTypes from "prop-types";
import BlueButton from "../../components/BlueButton";
import GameStepStyle from "../../constants/GameStepStyle";
import ButtonBar from "../../components/ButtonBar";
import GameGraph from "../../../store/gameModel/GameGraph";
import {transitionBuilder} from "../../../helpers/Utils";

class UPickScreen extends Component {

    static propTypes = {
        makeTransition: PropTypes.func,
        wordToDraw: PropTypes.string,
        wordToFind: PropTypes.string
    }

    getRandomElement(classes) {
        return classes[Math.floor(Math.random() * classes.length)];
    }

    render() {
        return (
            <View style={GameStepStyle.container}>
                <View style={GameStepStyle.body}>
                    <View style={styles.gameChoiceBox}>
                        <Text style={styles.choiceHeader}>Find a:</Text>
                        <Text style={styles.choice} bold>{this.props.wordToFind}</Text>
                    </View>
                    <View style={styles.splitterContainer}>
                        <View style={styles.splitter}/>
                        <Text style={styles.or}>OR</Text>
                        <View style={styles.splitter}/>
                    </View>
                    <View style={styles.gameChoiceBox}>
                        <Text style={styles.choiceHeader}>Draw a:</Text>
                        <Text style={styles.choice} bold>{this.props.wordToDraw}</Text>
                    </View>

                    <ButtonBar
                        style={{marginTop: 20}}>
                        <BlueButton title={'FIND'} onPress={() => {
                            this.props.makeTransition(GameGraph.PICK.goToFind)
                        }}/>
                        <BlueButton title={'DRAW'} onPress={() => {
                            this.props.makeTransition(GameGraph.PICK.goToDraw)
                        }}/>
                    </ButtonBar>
                </View>

            </View>)
    }
}

function mapStateToProps(state) {
    return {
        isModelReady: state.game.drawModelReady,
        wordToDraw: state.game.wordToDraw,
        wordToFind: state.game.wordToFind,
    }
}

function mapActionToProps(dispatch) {
    return {
        makeTransition: transitionBuilder(dispatch)
    }
}

const PickScreen = connect(mapStateToProps, mapActionToProps)(UPickScreen)
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
