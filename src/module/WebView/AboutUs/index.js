import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';
import Header from '../../../component/Header'
// import { IGNORED_TAGS, alterNode, makeTableRenderer } from 'react-native-render-html-table-bridge';
import WebView from 'react-native-webview';
import * as link from '../../../URL'


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

class AboutUs extends Component {
    constructor() {
        super();
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

    render() {
        var url = link.URL_REALASE + `ve-chung-toi`;
        return (
            <View style={{ flex: 1 }}>
                <Header onPressLeft={() => this.props.navigation.openDrawer()} />
                <WebView
                    source={{ uri: url }}
                    onMessage={this.onMessage}
                    style={{ marginTop: -60 }} />
            </View>
        )
    }
}

export default AboutUs;
