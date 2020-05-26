import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Dimensions, ScrollView, BackHandler, Platform, } from 'react-native';
import HTML from 'react-native-render-html';
import Header from '../../../component/Header'
import WebView from 'react-native-webview';
import * as link from '../../../URL'

class PoliciesAndServices extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            isLoading: true,
        }
    }
    webView = {
        canGoBack: false,
        ref: null,
    }

    onAndroidBackPress = () => {
        if (this.webView.canGoBack && this.webView.ref) {
            this.webView.ref.goBack();
            return true;
        }
        return false;
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }

    render() {
        var url = link.URL_REALASE + `van-chuyen`
        return (
            <View style={{ flex: 1 }}>
                <Header onPressLeft={() => this.props.navigation.openDrawer()} />
                <WebView
                    source={{ uri: url }}
                    style={{ marginTop: -60 }}
                    ref={(webView) => { this.webView.ref = webView; }}
                    onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
                    // onLoadEnd = {true}
                    dataDetectorTypes = {'phoneNumber'}
                />
            </View>
        )
    }
}

export default PoliciesAndServices;
