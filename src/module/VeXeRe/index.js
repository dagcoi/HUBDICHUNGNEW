// import React, { Component } from 'react'
// import { View, Text, ActivityIndicator, Dimensions, ScrollView, SafeAreaView, TouchableHighlight, Platform } from 'react-native';
// import Header from '../../component/Header/HeaderImage'
// import WebView from 'react-native-webview';
// import * as link from '../../URL'

// class VeXeRe extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: null,
//             isLoading: true,
//         }
//         this.webView = null;
//     }
//     onMessage({ nativeEvent }) {
//         const data = nativeEvent.data;
//         console.log("Sending post message");
//         if (Platform.OS === 'android') {
//             document.addEventListener("message", function (data) {
//                 alert("you are in android");
//             });
//         }
//         else {
//             window.addEventListener("message", function (data) {
//                 alert("you are in iOS");
//             });
//         } if (data !== undefined && data !== null) {
//             Linking.openURL(data);
//         }
//     }

//     sendPostMessage() {
//         console.log("Sending post message");
//         this.webView.postMessage("Post message from react native");
//         if (Platform.OS === 'android') {
//             document.addEventListener("message", function (data) {
//                 alert("you are in android");
//             });
//         }
//         else {
//             document.addEventListener("message", function (data) {
//                 alert("you are in iOS");
//             });
//         }
//     }

//     gotoHomeScreen = () => {
//         this.props.navigation.navigate('Home')
//     }

//     render() {
//         var url = `https://uat-agentwebview.vexere.net/agent/webview/home?client_id=82739122-3f40-11e5-8306-2be757cb0074`;
//         return (
//             <SafeAreaView style={{ flex: 1 }}>
//                 <Header
//                     onPressLeft={() => { this.props.navigation.openDrawer() }}
//                     onPressCenter={this.gotoHomeScreen}
//                 />
//                 {/* <TouchableHighlight
//                     style={{ padding: 10, backgroundColor: 'blue', marginTop: 20 }}
//                     onPress={() => this.sendPostMessage()}
//                 >
//                     <Text style={{ color: 'white' }}>Send post message from react native</Text>
//                 </TouchableHighlight> */}
//                 <WebView
//                     source={{ uri: url }}
//                     onMessage={this.onMessage}
//                     ref={(webView) => this.webView = webView}
//                 />
//             </SafeAreaView>
//         )
//     }
// }

// export default VeXeRe;



import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    TextInput,
    StatusBar,
    Linking,
} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

export default class VeXeRe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: 'https://www.google.com',
            statusBarStyle: 'dark-content',
        };
    }

    sleep(timeout) {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    }

    async openLink() {
        const { statusBarStyle } = this.state;
        const url = `https://uat-agentwebview.vexere.net/agent/webview/home?client_id=82739122-3f40-11e5-8306-2be757cb0074`
        try {
            if (await InAppBrowser.isAvailable()) {
                // A delay to change the StatusBar when the browser is opened
                const animated = true;
                const delay = animated && Platform.OS === 'ios' ? 400 : 0;
                setTimeout(() => StatusBar.setBarStyle('light-content'), delay);
                const result = await InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: '#453AA4',
                    preferredControlTintColor: 'white',
                    readerMode: false,
                    animated,
                    modalPresentationStyle: 'fullScreen',
                    modalTransitionStyle: 'partialCurl',
                    modalEnabled: true,
                    enableBarCollapsing: false,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: '#6200EE',
                    secondaryToolbarColor: 'black',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: true,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right',
                    },
                    headers: {
                        'my-custom-header': 'my custom header value',
                    },
                });
                // A delay to show an alert when the browser is closed
                await this.sleep(100);
                Alert.alert('Response', JSON.stringify(result));
            } else {
                Linking.openURL(url);
            }
        } catch (error) {
            Alert.alert(error.message);
        } finally {
            // Restore the previous StatusBar of the App
            StatusBar.setBarStyle(statusBarStyle);
        }
    }

    onMessage({ nativeEvent }) {
        const data = nativeEvent.data;
        console.log("Sending post message");
        if (Platform.OS === 'android') {
            document.addEventListener("message", function (data) {
                alert("you are in android");
            });
        }
        else {
            window.addEventListener("message", function (data) {
                alert("you are in iOS");
            });
        } if (data !== undefined && data !== null) {
            Linking.openURL(data);
        }
    }

    render() {
        const { statusBarStyle } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar barStyle={statusBarStyle} />
                <Text style={styles.welcome}>
                    {'Welcome InAppBrowser\nfor React Native!'}
                </Text>
                <Text style={styles.instructions}>Type the url</Text>
                <TextInput
                    style={styles.urlInput}
                    onChangeText={(text) => this.setState({ url: text })}
                    value={this.state.url}
                />
                <View style={styles.openButton}>
                    <Button title="Open link" onPress={() => this.openLink()} />
                </View>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 30,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    urlInput: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
    },
    openButton: {
        paddingTop: Platform.OS === 'ios' ? 0 : 20,
        paddingBottom: Platform.OS === 'ios' ? 0 : 20,
    },
});