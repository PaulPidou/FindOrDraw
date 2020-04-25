import React, {Component} from 'react';
import {StyleSheet, View, Button, StatusBar, Image} from 'react-native';
import * as Colors from "./Constants/Constants";
import Constants from "expo-constants";

import logo_bleu from "../assets/logo_transparent_vert.png"

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor={"rgba(0,0,0,0)"} translucent={true}/>
                <Image style={styles.logo} height={300} width={300} source={logo_bleu}/>
                <View style={styles.menu}>
                    <Button
                        style={styles.button}
                        title="Let's draw"
                        color={Colors.VertLogo}
                        onPress={() => this.props.navigation.navigate('Draw')}
                    />
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
    logo: {
        alignSelf: "center",
        marginVertical: 30
    },
    menu: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    button: {
    }
});