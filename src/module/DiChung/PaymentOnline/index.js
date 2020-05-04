import React, { Component } from 'react'
import { View, ActivityIndicator, Alert } from 'react-native';
import * as link from '../../../URL'
import WebView from 'react-native-webview';

import { connect } from 'react-redux';

class PaymentOnline extends Component {
    constructor() {
        super();
        this.state = {
            cookie: null,
            isLoading: true,
            url : '',
        }
    }

    componentDidMount() {
        this.getURL()
    }

    async getURL() {
        const { navigation } = this.props;
        console.log(navigation.getParam('ticket_id'));
        console.log(navigation.getParam('amount'));
        const url = `https://gateway.dichungtaxi.com/api/v1/transactions`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "amount": navigation.getParam('amount'),
                "currency": "VND",
                "paymentMethod": "ONLINE",
                "paymentProvider": "VNPAY",
                "bankCode": "",
                "language": "vi",
                "orderInfo": "test di chung",
                "ticketId": navigation.getParam('ticket_id'),
                "orderType": "topup"
            }),
        });
        const responseJson = await response.json();
        this.setState({
            url: responseJson.data.url,
            id: responseJson.data.transaction._id,
            isLoading: false,
        });

        console.log(responseJson)
        return responseJson.data;
    }

    callURLPaymentSuccess() {
        if (this.state.isLoading) {
            console.log('QQ')
        }
        console.log(this.state.id);
        const url = `https://gateway.dichungtaxi.com/api/v1/transactions/${this.state.id}`
        console.log(url)
        return fetch(url)
            .then((res) => res.json())
            .then((jsonRes) => {
                if (jsonRes.status == 'success') {
                    this.gotoTicketInformation();
                }
            })
    }

    _onNavigationStateChange(webViewState) {
        console.log(webViewState.url)
        const url = webViewState.url
        if (url.search("&vnp_ResponseCode=00") > 0) {
            this.callURLPaymentSuccess();
            // this.gotoTicketInformation();
        } else if (url.search('&vnp_ResponseCode=') > 0) {
            console.log('Lỗi')
            Alert.alert('Thanh toán không thành công!')
            this.props.navigation.goBack();
        }
    }
    gotoTicketInformation() {
        const { navigation } = this.props;
        this.props.navigation.replace("TicketInformation", {
            'ticket_id': navigation.getParam('ticket_id'),
            'phone_number': navigation.getParam('phone_number'),
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator
                        size='large'
                    />
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <WebView
                    ref="webview"
                    source={{ uri: this.state.url }}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    injectedJavaScript={this.state.cookie}
                    startInLoadingState={false}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        pay_method: state.info.pay_method,
        charge_type_id: state.info.charge_type_id,
    }
}

export default connect()(PaymentOnline);
