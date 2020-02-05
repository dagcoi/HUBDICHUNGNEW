import React, { Component } from 'react'
import { View } from 'react-native';
import * as link from '../../../URL'
import WebView from 'react-native-webview';

import { connect } from 'react-redux';

class PaymentOnline extends Component {
    
    componentDidMount() {
        const { navigation } = this.props;
        const url = link.URL_API + `payment/pay_online_request?pay_method=8&charge_type_id=2&url_return=http://hubdev.dichungtaxi.com/hoan-thanh-dat-xe-taxi&ticket_id=${navigation.getParam('ticket_id')}`
        this.setState({ url: url });
    }

    
    gotoTicketInformation(){
        const { navigation } = this.props;
        this.props.navigation.navigate("TicketInformation", {
            'ticket_id': navigation.getParam('ticket_id'),
            'phone_number': navigation.getParam('phone_number'),
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                
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