import React, { Component } from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <Button
                    title="Let's draw"
                    onPress={() => this.props.navigation.navigate('Draw')}
                />
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});