import React, {Component} from 'react'
import {View, Image, StyleSheet, Dimensions, StatusBar} from 'react-native'
import * as PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";
import Text from "../components/Text";
import Logo from "../components/Logo";
import LoadingStatus from "../components/LoadingStatus";


export default class LoadingScreen extends Component {

    static propTypes = {
        tfReady: PropTypes.bool,
        drawModelReady: PropTypes.bool,
        findModelReady: PropTypes.bool
    }

    render() {
        return (
            <MainContainer style={{alignItems: 'center'}}>
                <StatusBar barStyle='dark-content' backgroundColor={"rgba(0,0,0,0)"} translucent={true}/>
                <Logo />
                <LoadingStatus />
                <View style={styles.loadingContainer}>
                    <Image
                        style={{width: 120, height: 120}}
                        source={require('../../assets/images/loading.gif')}
                    />
                </View>
                <Text style={{fontSize: 40}}>Loading...</Text>
            </MainContainer>
        )
    }
}

const halfOfScreen = Dimensions.get('window').width / 2

const styles = StyleSheet.create({
    loadingContainer: {
        width: halfOfScreen, height: halfOfScreen, borderRadius: halfOfScreen / 2,
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 100,
        shadowColor: "#000", shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.34, shadowRadius: 6.27, elevation: 10
    }
})