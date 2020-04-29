import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import * as Constants from "../../constants/Constants"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as PropTypes from "prop-types";

import * as Colors from "../../constants/Constants";
import Text from "../../components/Text";
import {moveGameStep, resetGame} from "../../../store/actions/GameActions";
import GameSteps from "../../../helpers/GameSteps";
import * as PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import PickButton from "../../components/PickButton";

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
                <Text style={styles.mainTitle}>Pick !</Text>

                <View style={styles.picker}>
                    <PickButton type={GameSteps.DRAW} value={drawElement} style={styles.menuEntry} onPress={() => {
                        this.props.moveGameStep(GameSteps.DRAW)
                    }}/>
                    <View style={styles.splitter}/>
                    <PickButton type={GameSteps.FIND} value={findElement} onPress={() => {
                        this.props.moveGameStep(GameSteps.FIND)
                    }}
                    mode
                    />
                </View>
                <Button title={'Reset la partie'} color="red" style={styles.menuEntry} onPress={() => {
                    this.props.resetGame()
                }}/>
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
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    mainTitle: {
        textAlign: "center",
        fontSize: 70,
        padding: 10,
        marginTop: 30,
    },
    picker: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
        fontWeight: "800"
    },
    splitter: {
        marginVertical: 20,
        height: 1,
        backgroundColor: Constants.ContrastColorPrimary,
    },
});
