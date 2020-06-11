import {
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    ScrollView,
} from 'react-native'

import React, { Component } from 'react'
import DetailTaxi from './DetailTaxi'
import DetailTuLai from './DetailTuLai'
import DetailExpress from './DetailExpress'
import DetailXeChung from './DetailXeChung'
import DetailHourlyTaxi from './DetailHourlyTaxi'

import * as link from '../../URL'
import { Button, ButtonGray } from '../../component/Button'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation';

const imageCancel = '../../image/cancel.png'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const cancel_booking = link.URL_API + `passenger/cancel_booking`
const cancel_booking_token = link.URL_API + `passenger/generate_cancel_booking_token`

class BookingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listBooking: [],
            selectLeft: true,
            isLoading: true,
            bookingDetail: {},
            isLoadingTicket: true,
            modalTicket: false,
            modalTicketHourly: false,
            ticket: '',
            otp: '',
            message: '',
            dialogOTP: false,
            modalVisible: false,
            modalWhyCancel: false,
            listWhyCan: [],
            value: 0,
            dialogCancelSuccess: false,
            showMessage: false,
            token: null,
            refreshing: false,
            modalTell: false,
        }
    }

    async componentDidMount() {
        const { navigation } = this.props;
        console.log(navigation.getParam('ticket_id'))

        this.getTicketInfoDC(navigation.getParam('ticket_id'))
    }

    async getTicketInfoDC(_id) {
        const url = link.URL_API_PORTAL + `booking/v1/user/bookings/${_id}`
        console.log(url)
        const res = await fetch(url, {
            headers: {
                'token': this.state.token,
            },
            method: 'GET',
        });
        const jsonRes = await res.json();
        this.setState({
            bookingDetail: jsonRes.data,
            isLoading: false,
        });
        console.log(jsonRes.data)
    }

    modalLoading() {
        return (

            <Modal
                visible={this.state.modalVisible}
                animationType="slide"
                onRequestClose={() => this.setState({ modalVisible: false })}
                onOrientationChange={true}
                transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000AA', zIndex: 5 }}>
                    <View style={{ width: '80%', justifyContent: 'center', borderRadius: 8, minHeight: 100, backgroundColor: '#eee', padding: 8, zIndex: 6 }}>
                        <View style={{ borderBottomWidth: 1, borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 20, }}>Hủy vé</Text>
                        </View>
                        <View style={{ padding: 8 }}>
                            <Text>Vui lòng liên hệ: <Text
                                style={{ color: '#77a300', textDecorationLine: 'underline' }}
                                onPress={() => Linking.openURL(`tel: 19006022`)}
                            >
                                19006022
                                        </Text> để được hỗ trợ</Text>


                        </View>

                        <View style={{ flexDirection: 'row', height: 48, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        modalVisible: false,
                                    })
                                }}
                                style={{ backgroundColor: '#77a300', margin: 4, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', margin: 8 }}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator
                    style={{ padding: 32, }}
                    size='large'
                />
            )
        }

        return (
            <View>
                <ScrollView style={{ height: SCREEN_HEIGHT - 80 }}>
                    <Text style={{ flex: 1, fontSize: 14, fontWeight: 'bold', marginHorizontal: 16, marginTop: 8 }}>Mã vé: <Text style={{ backgroundColor: '#77a300', color: '#fff' }}>{this.state.bookingDetail.code}</Text></Text>
                    <View style={{ justifyContent: 'center' }}>
                        <View>
                            {this.state.bookingDetail.productType == 'CAR_RENTAL' ? <DetailTuLai item={this.state.bookingDetail} />
                                : this.state.bookingDetail.productType == 'DRIVER_RENTAL' ? <DetailXeChung item={this.state.bookingDetail} />
                                    : this.state.bookingDetail.productType == 'EXPRESS' ? <DetailExpress item={this.state.bookingDetail} />
                                        : this.state.bookingDetail.productType == 'TRANSFER_SERVICE' ? <DetailTaxi item={this.state.bookingDetail} />
                                            : <DetailHourlyTaxi item={this.state.bookingDetail} />}
                        </View>
                        <View style={{ paddingHorizontal: 16 }}>
                            {(this.state.bookingDetail.status == 'cancelled' || this.state.bookingDetail.status == 'completed' || this.state.bookingDetail.status == 'picked_up') ? null :
                                <View style={{ paddingBottom: 8 }}>
                                    <ButtonGray
                                        value='HỦY VÉ'
                                        onPress={() => {
                                            this.setState({
                                                modalVisible: true,
                                            })
                                            // this.cancelBookingToken();
                                        }}
                                    />
                                </View>
                            }
                        </View>
                        {this.modalLoading()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default BookingDetail;