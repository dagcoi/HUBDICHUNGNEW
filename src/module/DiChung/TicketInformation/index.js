import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Modal, Linking, Dimensions, SafeAreaView, } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import * as link from '../../../URL'
import WebView from 'react-native-webview';
import { NavigationActions, StackActions } from 'react-navigation';
import { Button, ButtonGray } from '../../../component/Button'
import { HeaderText } from '../../../component/Header'
import DetailChungXe from '../../ListBooking//DetailChungXe'
import DetailExpress from '../../ListBooking/DetailExpress'
import DetailHourlyTaxi from '../../ListBooking/DetailHourlyTaxi'
import DetailTaxi from '../../ListBooking/DetailTaxi'
import DetailTuLai from '../../ListBooking/DetailTuLai'
import DetailXeChung from '../../ListBooking/DetailXeChung'
// import DetailDiChungXe from '../../ListBooking/DetailDiChungXe'

const imageCancel = '../../../image/cancel.png'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const cancel_booking = link.URL_API + `passenger/cancel_booking`
const cancel_booking_token = link.URL_API + `passenger/generate_cancel_booking_token`

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

class TicketInformation extends Component {

    constructor() {
        super();
        this.state = {
            info: {},
            is_loading: true,
            otp: '',
            message: '',
            dialogOTP: false,
            modalVisible: false,
            modalWhyCancel: false,
            listWhyCan: [],
            value: 0,
            dialogCancelSuccess: false,
            showMessage: false,
            loadData: true,
            timeReload: 5000,
            modalTell: false,
            modalPayment: false,
            urlPayment: null,
            listHourly: ['hourly_rent_taxi', 'hourly_rent_driver', 'hourly_freight_truck', 'hourly_tourist_car', 'hourly_car_rental']
        }
    }

    componentDidMount() {
        this.getTicketByBookingId()
        // handleAndroidBackButton(exitAlert)
    }

    componentWillUnmount() {
        // removeAndroidBackButtonHandler()
    }

    _refreshData = () => {
        getTicketByBookingId()
    }

    getTicketByBookingId() {
        this._interval = setInterval(() => {
            const { navigation } = this.props;
            const url = link.URL_API_PORTAL + `booking/v1/bookings/${navigation.getParam('id_booking')}`
            if (this.state.loadData) {
                return fetch(url)
                    .then((res) => res.json())
                    .then((jsonRes) => {
                        this.setState({
                            info: jsonRes.data,
                            is_loading: false,
                            bookingDetail: jsonRes.data,
                        })
                    }
                    )
            } else {
                return null;
            }
        }, this.state.timeReload);
    }

    async getTicketbySDT() {
        const { navigation } = this.props;
        const url = link.URL_API + `passenger/get_ticket_info`
        const formData = new FormData();
        formData.append('ticket_code', navigation.getParam('ticket_id'));
        formData.append('phone_number', navigation.getParam('phone_number'))
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
            body: formData
        });
        const jsonRes = await res.json();
        this.setState({
            info: jsonRes.data,
            is_loading: false,
            bookingDetail: jsonRes.data,
        });
        // console.log(JSON.stringify(jsonRes))
        return (jsonRes);
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
        return (
            <Modal
                visible={this.state.modalPayment}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', height: 60, borderBottomWidth: 1, borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
                        <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 'bold', }}>Thanh Toán</Text>
                        <TouchableOpacity
                            onPress={() => { this.setState({ modalPayment: false }) }}
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

    async cancelBooking() {
        const { navigation } = this.props;
        const formData = new FormData();
        formData.append('ticket_id', navigation.getParam('ticket_id'))
        formData.append('token', this.state.otp)
        const res = await fetch(cancel_booking, {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
            body: formData
        });
        const jsonRes = await res.json();
        this.setState({
            message: jsonRes.msg,
            modalVisible: false,
            showMessage: true
        });
        if (jsonRes.code == 'error') {
            this.setState({
                otp: '',
            });
        }
        else {
            { this.whyCancel(); }
            this.setState({
                dialogOTP: false,
                dialogCancelSuccess: true,
            });
        }
        return jsonRes;
    }

    async cancelBookingToken() {
        const { navigation } = this.props;
        const formData = new FormData();
        formData.append('ticket_id', navigation.getParam('ticket_id'))
        const res = await fetch(cancel_booking_token, {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
            body: formData
        });
        const jsonRes = await res.json();
        if (jsonRes.code == '0') {
            this.setState({
                dialogOTP: true,
                modalVisible: false,
            });
        }
    }

    async whyCancel() {
        const why_cancel = link.URL_API + `passenger/get_why_cancel_list`

        const res = await fetch(why_cancel);
        const jsonRes = await res.json();
        this.setState({
            listWhyCan: jsonRes.data,
            modalWhyCancel: true,
        });
    }

    feedbackWhyCancel() {
        const { navigation } = this.props;
        const custom_feedback_why_cancel = link.URL_API + `passenger/customer_feedback_why_cancel?ticket_id=${navigation.getParam('ticket_id')}&why_cancel=${this.state.value}`
        return fetch(custom_feedback_why_cancel, {
            method: 'POST'
        })
    }

    renderRadio() {
        const { value } = this.state;

        return (
            <View>
                {this.state.listWhyCan.map(item => {
                    return (
                        <View key={item.id} style={styles.buttonContainer}>

                            <TouchableOpacity
                                style={styles.circle}
                                onPress={() => {
                                    this.setState({
                                        value: item.id,
                                        name: item.name,
                                    });
                                }}
                            >
                                {value === item.id && <View style={styles.checkedCircle} />}
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 8 }}>{item.name}</Text>
                        </View>
                    );
                })}
            </View>
        );
    }

    goBack = () => {
        this.props.navigation.popToTop()
    }


    renderDetail(bookingDetail) {
        switch (bookingDetail.productType) {
            case 'CAR_RENTAL':
                return (
                    <DetailTuLai item={bookingDetail} />
                )
            case 'DRIVER_RENTAL':
                return (
                    <DetailXeChung item={bookingDetail} />
                )
            case 'hourly_car_rental':
                return (
                    <DetailChungXe item={bookingDetail} />
                )
            case 'EXPRESS':
                return (
                    <DetailExpress item={bookingDetail} />
                )
            case 'express':
                return (
                    <DetailExpress item={bookingDetail} />
                )
            case 'TRANSFER_SERVICE':
                return (
                    <DetailTaxi item={bookingDetail} />
                )
            case 'transfer_service':
                return (
                    <DetailTaxi item={bookingDetail} />
                )
            case 'TRUCK':
                return (
                    <DetailTaxi item={bookingDetail} />
                )
            case 'TOURIST_CAR':
                return (
                    <DetailTaxi item={bookingDetail} />
                )
            case 'RIDE_SHARE':
                return (
                    <DetailTaxi item={bookingDetail} />
                )
            case 'ride_share':
                return (
                    <DetailTaxi item={bookingDetail} />
                )
            default:
                return (
                    <DetailHourlyTaxi item={bookingDetail} />
                )
        }
    }

    render() {
        if (this.state.is_loading) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <HeaderText textCenter={'Chi tiết vé'} onPressLeft={this.goBack} />
                    <ActivityIndicator
                        style={{ padding: 32, }}
                        size='large'
                    />
                </SafeAreaView>
            )
        } else {
            const item = this.state.info;
            console.log(JSON.stringify(item));
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <HeaderText textCenter={'Chi tiết vé'} onPressLeft={this.goBack} />
                    <View style={styles.container}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                        >

                            {item.forward?.status == 'forwarded' ?
                                <Text style={styles.textBigRight}>Mã thuê xe của bạn: <Text style={{ fontWeight: 'bold', backgroundColor: '#77a300', color: '#fff', padding: 4 }}>{item.code}</Text></Text>
                                : <Text style={styles.textBigRight}>Yêu cầu đặt xe của bạn đã được hệ thống ghi nhận. Chúng tôi sẽ liên lạc trong thời gian sớm nhất</Text>
                            }
                            {this.renderDetail(this.state.bookingDetail)}
                            <View style={{ paddingHorizontal: 8 }}>
                                {this.renderPaymentOnline(item)}

                                <Button
                                    value='ĐẶT CHUYẾN MỚI'
                                    onPress={() => {
                                        const resetAction = StackActions.reset({
                                            index: 0,
                                            key: null,
                                            actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                        });
                                        this.props.navigation.dispatch(resetAction);
                                    }}
                                />
                                <View style={{ marginBottom: 8, }}></View>
                                {(item.status == 'cancelled' || item.status == 'completed' || item.status == 'picked_up') ? null :
                                    <ButtonGray
                                        value='HỦY VÉ'
                                        onPress={() => {
                                            this.setState({
                                                modalTell: true,
                                            })
                                            // this.cancelBookingToken();
                                        }}
                                    />
                                }
                            </View>
                            {this.formWebView()}

                            <Modal
                                visible={this.state.dialogOTP}
                                transparent={true}
                            >
                                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000AA' }}>
                                    <View style={{ width: '80%', justifyContent: 'center', borderRadius: 8, minHeight: 100, backgroundColor: '#eee', padding: 8 }}>
                                        <View style={{ borderBottomWidth: 1, borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 20, }}>Xác nhận hủy vé</Text>
                                        </View>
                                        <View style={{ padding: 8 }}>
                                            <Text><Text>Mã xác thực hủy chuyến được gửi tới email và số điện thoại của bạn</Text></Text>

                                            <OTPInputView
                                                style={{ padding: 20, height: 80, justifyContent: 'center', alignItems: 'center' }}
                                                pinCount={4}
                                                autoFocusOnLoad
                                                code={this.state.otp}
                                                onCodeChanged={code => { this.setState({ otp: code, showMessage: false }) }}
                                                // codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                                onCodeFilled={code => {
                                                    this.setState({
                                                        otp: code,
                                                    })
                                                }}
                                            />
                                            {this.state.showMessage ?
                                                <Text>{this.state.message}</Text> : null}
                                        </View>

                                        <View style={{ flexDirection: 'row', height: 48, alignItems: 'center', justifyContent: 'center' }}>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (this.state.otp.length < 4) {

                                                    } else {
                                                        this.setState({ modalVisible: true, })
                                                        this.cancelBooking();
                                                    }
                                                }}
                                                style={{ backgroundColor: '#77a300', margin: 4, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', margin: 8 }}>Hủy vé</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({
                                                        dialogOTP: false,
                                                        otp: '',
                                                    })
                                                }}
                                                style={{ backgroundColor: '#77a300', margin: 4, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', margin: 8 }}>Đóng</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </SafeAreaView>
                            </Modal>

                            <Modal
                                visible={this.state.modalTell}
                                animationType="slide"
                                transparent={true}
                            >
                                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000AA' }}>
                                    <View style={{ width: '80%', justifyContent: 'center', borderRadius: 8, minHeight: 100, backgroundColor: '#eee', padding: 8 }}>
                                        <View style={{ borderBottomWidth: 1, borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 20, }}>Hủy vé</Text>
                                        </View>
                                        <View style={{ padding: 8 }}>
                                            <Text>Vui lòng liên hệ: <Text
                                                style={{ color: '#77a300' }}
                                                onPress={() => Linking.openURL(`tel: 19006022`)}
                                            >
                                                19006022
                                        </Text> để được hỗ trợ</Text>


                                        </View>

                                        {/* <View style={{ flexDirection: 'row', height: 48, alignItems: 'center', justifyContent: 'center' }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({
                                                        modalTell: false,
                                                    })
                                                }}
                                                style={{ backgroundColor: '#77a300', margin: 4, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', margin: 8 }}>Đóng</Text>
                                            </TouchableOpacity>
                                        </View> */}
                                        <Button onPress={() => { this.setState({ modalTell: false }) }} value={'Đóng'} />
                                    </View>
                                </SafeAreaView>
                            </Modal>

                            <Modal
                                visible={this.state.modalVisible}
                                animationType="slide"
                                // onOrientationChange={true}
                                transparent={true}>
                                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator
                                        size='large'
                                    />
                                </SafeAreaView>
                            </Modal>

                            <Modal
                                visible={this.state.dialogCancelSuccess}
                                animationType="slide"
                            >
                                <SafeAreaView style={{ flex: 1, }}>
                                    <View style={{ flex: 1, padding: 16 }}>
                                        <ScrollView showsVerticalScrollIndicator={false}>
                                            <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 8 }}>Lí do hủy vé</Text>
                                            {this.renderRadio()}

                                            <Button
                                                value='Gửi'
                                                onPress={() => {
                                                    if (this.state.value != 0) {
                                                        this.feedbackWhyCancel();
                                                        const resetAction = StackActions.reset({
                                                            index: 0,
                                                            key: null,
                                                            actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                                        });
                                                        this.props.navigation.dispatch(resetAction);
                                                    }
                                                }}
                                            />
                                        </ScrollView>
                                    </View>
                                </SafeAreaView>
                            </Modal>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    textBigRight: {
        padding: 1,
        fontSize: 15,
        // color: '#00363d',
        flex: 1,
        paddingHorizontal: 16
    },
    textBigLeft1: {
        fontSize: 18,
        marginTop: 8,
        fontWeight: 'bold',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 4,
    },

    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#e8e8e8',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#77a300',
    },
    textBigRight1: {
        padding: 1,
        fontSize: 18,
        color: '#77a300',
        flex: 1,
        textAlign: "right",
        marginTop: 8,
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#77a300",
    },
})

export default TicketInformation;