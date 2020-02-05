import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Alert,Linking } from 'react-native';
import InputTextDiChung from '../../component/InputTextDiChung'
import * as link from '../../URL'
import Header from '../../component/Header'

class SearchTicket extends Component {
    constructor() {
        super();
        this.state = {
            ticketId: '',
            phoneNumber: '',
            code: '',
            message: ''

        }
    }
    async callApiGetTicket() {
        if (this.state.ticketId.length < 5 || this.state.phoneNumber.length < 10) {
            Alert.alert('Vui lòng điền đúng thông tin!')
        } else if(this.state.ticketId.length <8) {
            const url = link.URL_DEBUG+`passenger/get_ticket_info`

            var formData = new FormData();
            formData.append('ticket_code', this.state.ticketId);
            formData.append('phone_number', this.state.phoneNumber);

            var res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "multipart/form-data",
                },
                body: formData,
            });
            var jsonRes = await res.json();
            console.log(jsonRes)
            if (jsonRes.code == 'success') {
                this.props.navigation.navigate('TicketInformation', {
                    'ticket_id': this.state.ticketId,
                    'phone_number': this.state.phoneNumber,
                })
            }
            return this.setState({
                code: jsonRes.code,
                message: jsonRes.message,
            });
        } else{
            const url = `https://api.chungxe.vn/booking/get-detail-booking/${this.state.ticketId}`

            var res = await fetch(url, {method : 'GET'});
            var jsonRes = await res.json();
            if(jsonRes.code = 'success'){
                this.props.navigation.navigate('ChungXeTicketInformation', {
                    'ticket_id': this.state.ticketId,
                    'phone_number': this.state.phoneNumber,
                })
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header onPressLeft={() => { this.props.navigation.openDrawer() }} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25 }}>Tra cứu mã vé</Text>
                        {/* <TouchableOpacity>
                            <Image
                                style={{ height: 50, width: 50, marginLeft: 8 }}
                                source={require('../../image/cancel.png')}
                            />
                        </TouchableOpacity> */}
                    </View>

                    <InputTextDiChung
                        placeholder='Nhập mã vé'
                        value={this.state.ticketId}
                        onChangeText={(text) => {
                            this.setState({
                                ticketId: text,
                            })
                        }}
                        keyboardType='ascii-capable'
                        onPress={() => this.setState({
                            ticketId: ''
                        })}
                    />

                    <InputTextDiChung
                        placeholder='Nhập số điện thoại'
                        value={this.state.phoneNumber}
                        onChangeText={(text) => {
                            this.setState({
                                phoneNumber: text,
                            })
                        }}
                        keyboardType='number'
                        onPress={() => this.setState({
                            phoneNumber: ''
                        })}
                    />
                    {this.state.code == 'error' ? <Text style={{ color: '#990000', fontSize: 14 }}>{this.state.message}</Text> : null}


                    <TouchableOpacity
                        style={{ backgroundColor: '#00363d', height: 45, justifyContent: 'center', alignItems: 'center', margin: 8, borderRadius: 8 }}
                        onPress={() => this.callApiGetTicket()}
                    >
                        <Text style={{ color: '#fff', fontSize: 20, padding: 8, borderRadius: 8 }}>TÌM KIẾM</Text>
                    </TouchableOpacity>

                    {/* {this.state.code == 'success' ? this.props.navigation.navigate('TicketInformation', {
                        'ticket_id': this.state.ticketId,
                        'phone_number': this.state.phoneNumber,
                    }) : null} */}
                    <TouchableOpacity
                        onPress= {()=> Linking.openURL(`tel: 19006022`)}
                    >
                        <Text style={{ color: '#77a300' }}>Gọi 19006022 để thay đổi thông tin vé miễn phí!</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

export default SearchTicket;