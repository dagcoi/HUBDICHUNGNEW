import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Dimensions, ScrollView, Linking } from 'react-native';
import HTML from 'react-native-render-html';
import Header from '../../../component/Header'
import WebView from 'react-native-webview'
import * as link from '../../../URL'


class FAQ extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            isLoading: true,
        }
    }

    render() {
        var url = link.URL_REALASE + `cau-hoi-thuong-gap`
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Header onPressLeft={() => this.props.navigation.openDrawer()} />
                <WebView
                    source={{ uri: url }}
                    style={{ marginTop: -60 }}
                />
            </View>
        )
    }


}

export default FAQ;
