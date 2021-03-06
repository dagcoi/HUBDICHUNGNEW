import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Dimensions, ScrollView, Linking } from 'react-native';
import HTML from 'react-native-render-html';
import Header from '../../../component/Header'
import WebView from 'react-native-webview'
import * as link from '../../../URL'


class FAQ extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: true,
        }
    }

    onMessage({ nativeEvent }) {
        const data = nativeEvent.data;
        if (data !== undefined && data !== null) {
            Linking.openURL(data);
        }
    }

    gotoHomeScreen = () =>{
        this.props.navigation.navigate('Home')
    }

    render() {
        var url = link.URL_REALASE + `cau-hoi-thuong-gap`;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    onPressLeft={() => { this.props.navigation.openDrawer() }}
                    onPressCenter={this.gotoHomeScreen}
                />
                <WebView
                    source={{ uri: url }}
                    onMessage={this.onMessage}
                    style={{ marginTop: -60 }} />
            </View>
        )
    }

}

export default FAQ;
