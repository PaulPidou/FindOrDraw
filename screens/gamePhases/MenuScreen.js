import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import Text from "../../components/Text";
import {moveGameStep} from "../../store/actions/GameActions";
import GameSteps from "../../helpers/GameSteps";
import * as PropTypes from "prop-types";
import {connect} from "react-redux"
import {bindActionCreators} from "redux";

class UMenuScreen extends Component {

    static propTypes = {
        moveGameStep: PropTypes.func
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Menu !</Text>
                    <Button title={'GO'} onPress={() => {
                        this.props.moveGameStep(GameSteps.PICK)
                    }}/>
                </View>
            </View>)
    }
}

function mapActionToProps(dispatch) {
    return {
        moveGameStep: bindActionCreators(moveGameStep, dispatch)
    }
}

const MenuScreen = connect(null, mapActionToProps)(UMenuScreen)
export default MenuScreen

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        justifyContent: "center"
    },

    menuEntry: {
        marginVertical: 10
    }
});