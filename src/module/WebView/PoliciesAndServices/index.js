import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Dimensions, ScrollView, BackHandler, Platform, SafeAreaView } from 'react-native';
import HTML from 'react-native-render-html';
import Header from '../../../component/Header/HeaderImage'
import WebView from 'react-native-webview';
import * as link from '../../../URL'

class PoliciesAndServices extends Component {
    constructor(props) {
        super(props);
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

    gotoHomeScreen = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        var url = link.URL_REALASE + `van-chuyen`
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header
                    onPressLeft={() => { this.props.navigation.openDrawer() }}
                    onPressCenter={this.gotoHomeScreen}
                />
                <WebView
                    source={{ uri: url }}
                    style={{ marginTop: -80 }}
                    ref={(webView) => { this.webView.ref = webView; }}
                    onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
                    // onLoadEnd = {true}
                    dataDetectorTypes={'phoneNumber'}
                />
            </SafeAreaView>
        )
    }
}

export default PoliciesAndServices;
