import React, { Component } from 'react'
import { View, Image, Text } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

class Splash extends React.Component {

    constructor() {
        super();
        this.state = {
            visible: 0,
        }
    }

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                2000
            )
        )
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState((state, props) => {
                return {
                    visible: this.state.visible + 1,
                };
            });
        }, 2000);
    }

    // componentDidUpdate() {
    //     if (this.state.visible == 1) {
    //         // this.props.navigation.navigate('Home');
    //         const resetAction = StackActions.reset({
    //             index: 0,
    //             key: null,
    //             actions: [NavigationActions.navigate({ routeName: 'Home' })],
    //         });
    //         this.props.navigation.dispatch(resetAction);
    //     }
    // }



    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00363e' }}>
                <Image
                    style={{ height: 150, width: 150, marginLeft: 8 }}
                    source={require('../../image/icon.png')}
                />
            </View>
        )
    }
}

export default Splash;