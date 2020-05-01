import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";

import * as tf from "@tensorflow/tfjs";
import {loadDrawModel, loadMobilenetModel} from "../helpers/Prediction";
import GameScreenManager from "./screens/GameScreenManager";
import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";
import * as GameActions from '../store/actions/GameActions';

class UMainScreenManager extends Component {

    static propTypes = {
        gameMode: PropTypes.string,
        isGameRunning: PropTypes.bool,
        tfReady: PropTypes.bool,
        drawModelReady: PropTypes.bool,
        findModelReady: PropTypes.bool,
        markTfAsReady : PropTypes.func,
        markModelAsReady : PropTypes.func,
    }


    async initTf(){
        //Wait for tf to be ready.
        await tf.ready();
        // Signal to the app that tensorflow.js can now be used.
        this.props.markTfAsReady();
    }

    async loadDrawModel(){
        await loadDrawModel()
        this.props.markModelAsReady('DRAW')
    }

    async loadFindModel() {
        await loadMobilenetModel()
        this.props.markModelAsReady('FIND')
    }

    async componentDidMount() {
        await this.initTf()
        Promise.all([
            this.loadDrawModel(),
            this.loadFindModel()
        ])
    }


    render() {
        if(this.props.tfReady && this.props.drawModelReady && this.props.findModelReady && false) {
            if(this.props.isGameRunning){
                return <GameScreenManager/>
            } else {
                return <HomeScreen/>
            }
        } else {
            return <LoadingScreen/>
        }
    }
}

function maStateToProps(state) {
    return {
        isGameRunning: state.game.gameStatus,
        gameMode: state.game.gameStep,
        tfReady: state.game.tfReady,
        drawModelReady: state.game.drawModelReady,
        findModelReady: state.game.findModelReady,
    }
}

function mapActionsToProps(dispatch){
    return {
        markTfAsReady: bindActionCreators(GameActions.markTfAsReady, dispatch),
        markModelAsReady: bindActionCreators(GameActions.markModelAsReady, dispatch)
    }
}

const MainScreenManager = connect(maStateToProps, mapActionsToProps)(UMainScreenManager);
export default MainScreenManager;
