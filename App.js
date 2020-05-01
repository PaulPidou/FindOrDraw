import React, {Component} from 'react';
import '@tensorflow/tfjs-react-native';
import {Provider} from "react-redux"
import {getRedux, initStore} from "./store/storeInit";
import {AppLoading} from 'expo';
import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import MainScreenManager from "./views/MainScreenManager";


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
                Ionicons: require("native-base/Fonts/Ionicons.ttf"),
                MaterialCommunityIcons: require("native-base/Fonts/MaterialCommunityIcons.ttf"),
                BigStomach: require("./assets/Big-Stomach.ttf"),
                Monospace: require("./assets/monospace.medium.ttf"),
                MonospaceBold: require("./assets/monospace.bold.ttf"),
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
                <Provider store={getRedux()}>
                    <MainScreenManager/>
                </Provider>
            )
        }
    }
}


