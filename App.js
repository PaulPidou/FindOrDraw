import React, {Component} from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import AppNavigator from "./navigation/AppNavigator";
import {Provider} from "react-redux"
import {getReduxStore} from "./store/storeInit";
import {StyleProvider} from "native-base";
import {AppLoading} from 'expo';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTfReady: false,
        };
    }

    async componentDidMount() {
        // Wait for tf to be ready.
        await tf.ready();
        // Signal to the app that tensorflow.js can now be used.
        this.setState({
            isTfReady: true,
        });
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
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
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
