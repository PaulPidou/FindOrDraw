import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Constants from "expo-constants";

import * as Colors from "../../constants/Colors";
import Text from "../../components/Text";
import BlueButton from "../../components/BlueButton";
import {bindActionCreators} from "redux";
import {moveGameStep, resetGame, stopGame} from "../../../store/actions/GameActions";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import GenericStyles from "../../constants/GenericStyle";
import GameStepStyle from "../../constants/GameStepStyle";

class UScoresScreen extends Component {

    static propTypes = {
        stopGame: PropTypes.func,
        resetGame: PropTypes.func
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Scores !</Text>


                    <View style={GameStepStyle.footer}>
                        <View style={GenericStyles.buttonBar}>
                            <BlueButton
                                title={'Exit'}
                                onPress={() => {
                                    this.props.stopGame()
                                }}
                            />
                            <BlueButton
                                title={'Replay'}
                                onPress={() => {
                                    this.props.resetGame()
                                }}
                            />
                        </View>
                    </View>

                </View>
            </View>)
    }
}

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


function mapActionToProps(dispatch) {
    return {
        moveGameStep: bindActionCreators(moveGameStep, dispatch),
        stopGame: bindActionCreators(stopGame, dispatch),
        resetGame: bindActionCreators(resetGame, dispatch),
    }
}

const ScoresScreen = connect(null, mapActionToProps)(UScoresScreen)
export default ScoresScreen
