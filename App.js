import React, {Component} from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import AppNavigator from "./views/navigation/AppNavigator";
import {connect, Provider} from "react-redux"
import {getReduxStore, initStore} from "./store/storeInit";
import {AppLoading} from 'expo';
import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import {bindActionCreators} from "redux";
import * as GameActions from './store/actions/GameActions'
import * as PropTypes from "prop-types";


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadingComplete: false,
        };
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Font.loadAsync({
                ...Ionicons.font,
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                Ionicons: require("native-base/Fonts/Ionicons.ttf")
            }),
            initStore()
        ])
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.error(error)
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true})
    }

    render() {
        if (!this.state.isLoadingComplete) {
            return (
                <>
                    <AppLoading
                        startAsync={this._loadResourcesAsync}
                        onError={this._handleLoadingError}
                        onFinish={this._handleFinishLoading}
                    />
                </>
            )
        } else {
            return (
                <Provider store={getReduxStore()}>
                    <AppNavigator/>
                </Provider>
            )
        }
    }
}


