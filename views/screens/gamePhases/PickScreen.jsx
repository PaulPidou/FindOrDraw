import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import * as Constants from "../../constants/Constants"
import Text from "../../components/Text";
import {connect} from "react-redux";
import {moveGameStep, resetGame} from "../../../store/actions/GameActions";
import GameSteps from "../../../helpers/GameSteps";
import * as PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import PickButton from "../../components/PickButton";

class UPickScreen extends Component {

    static propTypes = {
        moveGameStep: PropTypes.func
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.mainTitle}>Pick !</Text>

                <View style={styles.picker}>
                    <PickButton type={GameSteps.DRAW} value={'Chameau'} style={styles.menuEntry} onPress={() => {
                        this.props.moveGameStep(GameSteps.DRAW)
                    }}/>
                    <View style={styles.splitter}/>
                    <PickButton type={GameSteps.FIND} value={'Helicoptère'} onPress={() => {
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