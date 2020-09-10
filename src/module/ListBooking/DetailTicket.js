import {
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    RefreshControl,
    Linking,
    AsyncStorage
} from 'react-native'
import WebView from 'react-native-webview';

import React, { Component } from 'react'
import DetailTaxi from './DetailTaxi'
import DetailCaro from './DetailCaro'
import DetailTuLai from './DetailTuLai'
import DetailExpress from './DetailExpress'
import DetailXeChung from './DetailXeChung'
import DetailHourlyTaxi from './DetailHourlyTaxi'
import DetailChungXe from './DetailChungXe'
import { HeaderText } from '../../component/Header'
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
            bookingDetail: null,
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
            modalPayment: false,
            urlPayment: null,
            refreshing: true,
        }
    }

    async componentDidMount() {
        this._retrieveData()
    }
    _retrieveData = async () => {
        try {
            const dataLogin = await AsyncStorage.getItem('dataLogin')
            if (dataLogin !== null) {
                let json = JSON.parse(dataLogin)
                const token = json.token
                this._refreshData(token)
            } else {
                console.log('lỗi token')
            }
        } catch (error) {
            console.log(error)
            this.setState({
                isLoading: false,
            })
        }
    };

    _refreshData = async (token) => {
        const { navigation } = this.props;
        this.setState({ refreshing: true })
        const ticket_id = navigation.getParam('ticket_id')
        const code = navigation.getParam('code')
        const phone = navigation.getParam('phone')
        console.log('ticket_id' + ticket_id)
        console.log('code' + code)
        console.log('phone' + phone)
        if (ticket_id) {
            this.getTicketInfoDC(ticket_id, token)

        } else {
            this.getTicketByCode(code, phone, token)
        }
    }

    async getTicketInfoDC(_id, token) {
        const url = link.URL_API_PORTAL + `booking/v1/user/bookings/${_id}`
        console.log('ticket_id' + url)
        const res = await fetch(url, {
            headers: {
                'token': token,
            },
            method: 'GET',
        });
        const jsonRes = await res.json();
        this.setState({
            bookingDetail: jsonRes.data,
            isLoading: false,
            refreshing: false
        });
        console.log(jsonRes.data)
    }

    async getTicketByCode(code, phone, token) {
        const url = link.URL_API_PORTAL + `booking/v1/bookings/code?code=${code}&phone=${phone}`
        console.log(url)
        const res = await fetch(url, {
            headers: {
                'token': token,
            },
            method: 'GET',
        });
        const jsonRes = await res.json();
        this.setState({
            bookingDetail: jsonRes.data,
            isLoading: false,
            refreshing: false,
        });
        console.log(jsonRes.data)
    }

    modalLoading() {
        return (

            <Modal
                visible={this.state.modalVisible}
                animationType="slide"
                onRequestClose={() => this.setState({ modalVisible: false })}
                // onOrientationChange={true}
                transparent={true}>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000AA', zIndex: 5 }}>
                    <View style={{ width: '80%', justifyContent: 'center', borderRadius: 8, minHeight: 100, backgroundColor: '#eee', padding: 8, zIndex: 6 }}>
                        <View style={{ borderBottomWidth: 1, borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 20, }}>Hủy vé</Text>
                        </View>
                        <View style={{ padding: 8 }}>
                            <Text>Vui lòng liên hệ:
                                <Text
                                    style={{ color: '#77a300', textDecorationLine: 'underline' }}
                                    onPress={() => Linking.openURL(`tel: 19006022`)}
                                >
                                    19006022
                                </Text> để được hỗ trợ
                            </Text>

                        </View>

                        <Button onPress={() => { this.setState({ modalVisible: false }) }} value={'Đóng'} />
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }

    renderPaymentOnline(item) {
        if (item.payment.method == 'online' && item.payment.status == 'draft')
            return (
                <Button
                    value='THANH TOÁN'
                    onPress={() => {
                        this.setState({
                            modalPayment: true,
                            urlPayment: item.payment.url,
                        })
                    }}
                />
            )
    }

    formWebView() {
        var url = this.state.urlPayment
        const { navigation } = this.props;
        return (
            <Modal
                visible={this.state.modalPayment}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', height: 60, borderBottomWidth: 1, borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
                        <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 'bold', }}>Thanh Toán</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ modalPayment: false })
                                this.getTicketInfoDC(navigation.getParam('ticket_id'))
                            }}
                        >
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require(imageCancel)}
                            />
                        </TouchableOpacity>
                    </View>

                    <WebView
                        source={{ uri: url }}
                        style={{ marginTop: -60, height: SCREEN_HEIGHT }}
                        onMessage={this.onMessage}
                        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    />

                </SafeAreaView>
            </Modal>
        )
    }

    _onNavigationStateChange(webViewState) {
        console.log('URL PAYMENT: ........' + webViewState.url)
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        if (this.state.isLoading) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <HeaderText textCenter={'Chi tiết vé'} onPressLeft={this.goBack} />
                    <ActivityIndicator
                        style={{ padding: 32, }}
                        size='large'
                    />
                </SafeAreaView>
            )
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderText textCenter={'Chi tiết vé'} onPressLeft={this.goBack} />
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ height: SCREEN_HEIGHT }} refreshControl={<RefreshControl onRefresh={this._refreshData} refreshing={this.state.refreshing} />}>
                        <Text style={{ flex: 1, fontSize: 14, marginHorizontal: 16, marginTop: 8 }}>Mã vé: <Text style={{ color: '#000', fontWeight: 'bold' }}>{this.state.bookingDetail.code}</Text></Text>
                        <View style={{ justifyContent: 'center' }}>
                            <View style={{ marginVertical: 0 }}>
                                {this.state.bookingDetail.productType == 'CAR_RENTAL' ? <DetailTuLai item={this.state.bookingDetail} />
                                    : this.state.bookingDetail.productType == 'DRIVER_RENTAL' ? <DetailXeChung item={this.state.bookingDetail} />
                                        : this.state.bookingDetail.productType == 'hourly_car_rental' ? <DetailChungXe item={this.state.bookingDetail} />
                                            : this.state.bookingDetail.productType == 'EXPRESS' ? <DetailExpress item={this.state.bookingDetail} />
                                                : this.state.bookingDetail.productType == 'TRANSFER_SERVICE' ? <DetailTaxi item={this.state.bookingDetail} />
                                                    : this.state.bookingDetail.productType == 'TRUCK' ? <DetailTaxi item={this.state.bookingDetail} />
                                                        : this.state.bookingDetail.productType == 'TOURIST_CAR' ? <DetailTaxi item={this.state.bookingDetail} />
                                                            : this.state.bookingDetail.productType == 'ride_share' ? <DetailTaxi item={this.state.bookingDetail} />
                                                                : this.state.bookingDetail.productType == 'transfer_service' ? <DetailCaro item={this.state.bookingDetail} />
                                                                    : <DetailHourlyTaxi item={this.state.bookingDetail} />}
                            </View>
                            <View style={{ paddingHorizontal: 16 }}>
                                {this.renderPaymentOnline(this.state.bookingDetail)}
                                {(this.state.bookingDetail.status == 'cancelled' || this.state.bookingDetail.status == 'completed' || this.state.bookingDetail.status == 'picked_up' || this.state.bookingDetail.productType == 'transfer_service') ? null :
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
                            {this.formWebView()}
                            {this.modalLoading()}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default BookingDetail;