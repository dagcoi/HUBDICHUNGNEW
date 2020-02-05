import React, { Component } from 'react'
import { View, Text, Image, Button, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import * as link from '../../../URL'


const imageLocation = '../../../image/location.png'
const imageCalendar = '../../../image/calendar.png'
const imagePeople = '../../../image/people.png'
const imageIconCar = '../../../image/iconcar.png'
const imagePerson = '../../../image/person.png'
const imageIconPhone = '../../../image/iconphone.png'
const imageEmail = '../../../image/email.png'
const imageDone = '../../../image/done.png'
const imagePayment = '../../../image/payment.png'

const cancel_booking = link.URL_DEBUG + `passenger/cancel_booking`
const cancel_booking_token = link.URL_DEBUG + `passenger/generate_cancel_booking_token`

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
        }
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const url = link.URL_DEBUG + `passenger/get_ticket_info`
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
        });
        // console.log(JSON.stringify(jsonRes))
        return (jsonRes);
    }

    renderDetailTrip(item) {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết chuyến đi</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center', marginTop: 8 }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageLocation)}
                    />
                    <Text style={styles.textBigRight}>{item.pick_address_api}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageLocation)}
                    />
                    <Text style={styles.textBigRight}>{item.drop_address_api}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageCalendar)}
                    />
                    <Text style={styles.textBigRight}>{item.in_time} {item.in_date}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imagePeople)}
                    />
                    <Text style={styles.textBigRight}>{item.chair_count} người</Text>
                </View>
            </View>
        )
    }

    renderDetailOrder(item) {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết đơn hàng</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageIconCar)}
                    />
                    <Text style={styles.textBigRight}>{item.ride_method_id == '1' ? 'Đi riêng' : 'Đi chung'}</Text>
                </View>
            </View>
        )
    }

    renderDetailCustommer(item) {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết khách hàng</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imagePerson)}
                    />
                    <Text style={styles.textBigRight}>{item.fullname}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageIconPhone)}
                    />
                    <Text style={styles.textBigRight}>{item.other_phone}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageEmail)}
                    />
                    <Text style={styles.textBigRight}>{item.email}</Text>
                </View>
            </View>
        )
    }

    // renderAirport() {
    //     if (!item.is_from_airport) {
    //         return null;
    //     } else {
    //         return (
    //             <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
    //                 <Image
    //                     style={styles.leftIcon}
    //                     source={require(imageIconPlan)}
    //                 />
    //                 <Text style={styles.textBigRight}>{item.macb}</Text>
    //             </View>
    //         )
    //     }
    // }

    renderDetailPeopleMove(item) {

        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết người đi</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imagePerson)}
                    />
                    <Text style={styles.textBigRight}>{item.use_name}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageIconPhone)}
                    />
                    <Text style={styles.textBigRight}>{item.use_phone}</Text>
                </View>

            </View>
        )

    }



    renderOther(item) {
        return (
            <View style={{ marginBottom: 8 }}>
                <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imagePayment)}
                    />
                    <Text style={styles.textBigRight}>{item.pay_method_name}</Text>
                </View>
                {item.xhd == 1 ?
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                        <Image
                            style={styles.leftIcon}
                            source={require(imageDone)}
                        />
                        <Text style={styles.textBigRight}>+10 %</Text>
                    </View> : null}
            </View>
        )
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
        // formData.append('ticket_id', 497108)
        const res = await fetch(cancel_booking_token, {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
            body: formData
        });
        const jsonRes = await res.json();
        // console.log(JSON.stringify(jsonRes));
        // console.log(jsonRes.msg)
        if (jsonRes.code == '0') {
            this.setState({
                dialogOTP: true,
                modalVisible: false,
            });
        }
    }

    async whyCancel() {
        const why_cancel = link.URL_DEBUG + `passenger/get_why_cancel_list`

        const res = await fetch(why_cancel);
        const jsonRes = await res.json();
        this.setState({
            listWhyCan: jsonRes.data,
            modalWhyCancel: true,
        });
    }

    feedbackWhyCancel() {
        const { navigation } = this.props;
        const custom_feedback_why_cancel = link.URL_DEBUG + `passenger/customer_feedback_why_cancel?ticket_id=${navigation.getParam('ticket_id')}&why_cancel=${this.state.value}`
        // console.log(custom_feedback_why_cancel);
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
                                    // console.log(item.name)
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

    render() {
        if (this.state.is_loading) {
            return (
                <ActivityIndicator
                    style={{ padding: 32, }}
                    size='large'
                />
            )
        } else {
            const item = this.state.info;
            return (
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ height: 150, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                                source={{ uri: item.vehicle_icon }}
                            />
                        </View>

                        <Text style={styles.textBigRight}>Mã đặt xe của bạn là : <Text style={{ fontWeight: 'bold' }}>{item.ticket_code}</Text></Text>

                        <Text style={styles.textBigRight}>Yêu cầu đặt xe của bạn đã được hệ thồng ghi nhận. Chúng tôi sẽ liên lạc trong thời gian sớm nhất</Text>

                        {this.renderDetailTrip(item)}
                        {this.renderDetailOrder(item)}
                        {this.renderDetailCustommer(item)}
                        {this.renderDetailPeopleMove(item)}
                        {this.renderOther(item)}

                        <Button
                            style={{ marginTop: 8, fontSize: 22 }}
                            color='#77a300'
                            title='ĐẶT CHUYẾN MỚI'
                            onPress={() => {
                                this.props.navigation.navigate('Home')
                            }}
                        />
                        <View style={{ marginBottom: 8, }}></View>

                        <Button
                            style={{ marginTop: 8 }}
                            color='#00363d'
                            title='HỦY VÉ'
                            onPress={() => {
                                this.setState({
                                    modalVisible: true,
                                })
                                this.cancelBookingToken();
                            }}
                        />

                        <Dialog
                            visible={this.state.dialogOTP}
                        >
                            <View style={{
                                height: 180,
                                alignItems: "center",
                            }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mã xác thực hủy chuyến được gửi tới email và số điện thoại của bạn</Text>
                                {/* <Text >Nhập mã OTP</Text> */}

                                <OTPInputView
                                    style={{ padding: 20, height: 80, justifyContent: 'center', alignItems: 'center' }}
                                    pinCount={4}
                                    autoFocusOnLoad
                                    // codeInputFieldStyle={styles.underlineStyleBase}
                                    code={this.state.otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                    onCodeChanged={code => { this.setState({ otp: code }) }}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                    onCodeFilled={(code => {
                                        // console.log(`Code is ${code}, you are good to go!`)
                                        this.setState({
                                            otp: code,
                                        })
                                    })}
                                />

                                <Text>{this.state.message}</Text>

                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <TouchableOpacity
                                        style={{ backgroundColor: this.state.otp.length < 4 ? '#aaaaaa' : '#77a300', padding: 8, }}
                                        onPress={() => {
                                            if (this.state.otp.length < 4) {

                                            } else {
                                                this.setState({ modalVisible: true, })
                                                this.cancelBooking();
                                            }
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, color: '#ffffff', }}>Hủy vé</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ backgroundColor: '#77a300', padding: 8, marginLeft: 16 }}
                                        onPress={() => {
                                            this.setState({
                                                dialogOTP: false,
                                                otp: '',
                                            })
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, color: '#ffffff', }}>Đóng</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </Dialog>

                        {/* <Dialog
                            visible={this.state.dialogCancelSuccess}
                        >
                            <View style={{ flexDirection: 'column', }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 16 }}>Hủy vé thành công</Text>

                                <Button
                                    style={{ marginTop: 8 }}
                                    color='#77a300'
                                    title='TRANG CHỦ'
                                    onPress={() => {
                                        this.setState({ dialogCancelSuccess: false })
                                        this.props.navigation.navigate('Home')
                                    }}
                                />
                            </View>
                        </Dialog> */}

                        <Modal
                            visible={this.state.modalVisible}
                            animationType="slide"
                            onOrientationChange={true}
                            transparent={true}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator
                                    size='large'
                                />
                            </View>
                        </Modal>

                        <Modal
                            visible={this.state.dialogCancelSuccess}
                            animationType="slide"
                        // onOrientationChange={true}
                        // transparent={true}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ padding: 16 }}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 8 }}>Lí do hủy vé</Text>
                                        {this.renderRadio()}

                                        <Button
                                            title='Gửi'
                                            onPress={() => {
                                                if (this.state.value != 0) {
                                                    // console.log(this.state.name)
                                                    this.feedbackWhyCancel();
                                                    this.props.navigation.navigate('Home')
                                                }
                                            }}
                                        />
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </ScrollView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 8,
    },

    viewCon: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftIcon: {
        height: 24,
        width: 24,
        marginRight: 8,
    },

    textBigRight: {
        padding: 1,
        fontSize: 15,
        color: '#00363d',
        flex: 1,
    },
    textBigLeft: {
        fontSize: 15,
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
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#77a300',
    },
})

export default TicketInformation;