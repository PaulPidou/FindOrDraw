import React, {Component} from 'react';
import {Button, Image, StatusBar, StyleSheet, View} from 'react-native';

import * as Colors from "../constants/Constants";
import logo_bleu from "../../assets/logo_transparent_vert.png"
import * as PropTypes from "prop-types";
import {connect} from "react-redux"
import Text from "../components/Text";
import MainContainer from "../components/MainContainer";

class UHomeScreen extends Component {

    static propTypes = {
        tfReady: PropTypes.bool,
        modelReady: PropTypes.bool
    }

    render() {
        return (
            <MainContainer>
                <StatusBar barStyle='dark-content' backgroundColor={"rgba(0,0,0,0)"} translucent={true}/>
                <Image style={styles.logo} height={300} width={300} source={logo_bleu}/>
                <View style={styles.menu}>
                    {this.props.tfReady ? <Text>TF Ready</Text> : <Text>Tf pas ready</Text>}
                    {this.props.modelReady ? <Text>model Ready</Text> : <Text>model pas ready</Text>}
                    <Button
                        style={styles.button}
                        title="C'est parti !"
                        color={Colors.VertLogo}
                        onPress={() => this.props.navigation.navigate('Game')}
                    />
                </View>
            </MainContainer>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: "center",
        marginVertical: 30
    },
    menu: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    button: {
        flex: 1
    }
});

function mapStoreToProps(state) {
    return {
        tfReady: state.game.tfReady,
        modelReady: state.game.modelReady,
    }
}

const HomeScreen = connect(mapStoreToProps, null)(UHomeScreen)
export default HomeScreen