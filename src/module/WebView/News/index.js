import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Dimensions, ScrollView, Linking } from 'react-native';
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import Header from '../../../component/Header'
import * as link from '../../../URL'

class News extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            isLoading: true,
        }
    }

    render() {
        var url = link.URL_REALASE+`blog`
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Header onPressLeft={() => this.props.navigation.openDrawer()} />
                <WebView
                    source={{ uri: url }}
                    style={{ marginTop: -60 }}
                    onNavigationStateChange={(event) => {
                        if (event.url !== url) {
                            // this.webview.stopLoading();  
                            // this.webview.current.goBack()
                            Linking.openURL(event.url);
                        }
                    }}
                />
            </View>
        )
    }

}
export default News;