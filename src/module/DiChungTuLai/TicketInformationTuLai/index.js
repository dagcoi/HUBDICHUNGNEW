import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Modal, Linking } from 'react-native';
// import { Dialog } from 'react-native-simple-dialogs';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import * as link from '../../../URL'
import ImageTextDiChung from '../../../component/ImageTextDiChung'
import { NavigationActions, StackActions } from 'react-navigation';
import { Button, ButtonGray, ButtonDialog } from '../../../component/Button'
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';
import PopUp from '../../../component/PopUp'

const imageLocation = '../../../image/location.png'
const imageCalendar = '../../../image/calendar.png'
const imagePeople = '../../../image/people.png'
const imageIconCar = '../../../image/iconcar.png'
const imagePerson = '../../../image/person.png'
const imageIconPhone = '../../../image/iconphone.png'
const imageEmail = '../../../image/email.png'
const imageDone = '../../../image/done.png'
const imagePayment = '../../../image/payment.png'
const imageComment = '../../../image/comment.png'

const cancel_booking = link.URL_API + `passenger/cancel_booking`
const cancel_booking_token = link.URL_API + `passenger/generate_cancel_booking_token`

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

class TicketInformationTuLai extends Component {

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
        });
        // console.log(JSON.stringify(jsonRes))
        return (jsonRes);
    }

    renderDetailTrip(item) {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết chuyến đi</Text>

                <ImageTextDiChung
                    source={require(imageLocation)}
                    text={item.pick_address_api}
                />

                <ImageTextDiChung
                    source={require(imageLocation)}
                    text={item.drop_address_api}
                />

                <ImageTextDiChung
                    source={require(imageCalendar)}
                    text={item.in_time + ' ' + item.in_date}
                />

                <ImageTextDiChung
                    source={require(imagePeople)}
                    text={item.chair_count + ' xe'}
                />
            </View>
        )
    }

    renderDetailCustommer(item) {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết khách hàng</Text>

                <ImageTextDiChung
                    source={require(imagePerson)}
                    text={item.fullname}
                />

                <ImageTextDiChung
                    source={require(imageIconPhone)}
                    text={item.other_phone}
                />

                <ImageTextDiChung
                    source={require(imageEmail)}
                    text={item.email}
                />
            </View>
        )
    }

    renderDetailPeopleMove(item) {

        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết người đi</Text>

                <ImageTextDiChung
                    source={require(imagePerson)}
                    text={item.use_name}
                />

                <ImageTextDiChung
                    source={require(imageIconPhone)}
                    text={item.use_phone}
                />

            </View>
        )

    }

    renderComment(item) {
        if (item.note.length > 1) {
            return (
                < ImageTextDiChung
                    source={require(imageComment)}
                    text={item.note}
                />
            )
        } else {
            return null;
        }
    }

    renderOther(item) {
        return (
            <View style={{ marginBottom: 8 }}>
                <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>
                <ImageTextDiChung
                    source={require(imagePayment)}
                    text={item.pay_method_name}
                />
                {item.xhd == 1 ?
                    <ImageTextDiChung
                        source={require(imageDone)}
                        text={'+10 %'}
                    /> : null}
            </View>
        )
    }

    renderTT(item) {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center', marginBottom: 8 }}>
                <Text style={styles.textBigLeft1}>Tổng thanh toán: </Text>
                <Text style={styles.textBigRight1}>
                    {parseInt(item.total_cost).format(0, 3, '.')} đ
                </Text>
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

                        <Text style={styles.textBigRight}>Mã thuê xe của bạn: <Text style={{ fontWeight: 'bold' }}>{item.ticket_code}</Text></Text>
                        {item.transaction_status_id == '1' ?
                            <Text style={styles.textBigRight}>Yêu cầu đặt xe của bạn đã được hệ thồng ghi nhận. Chúng tôi sẽ liên lạc trong thời gian sớm nhất</Text>
                            : <View>
                                <Text>Thông tin mã vé: <Text style={{ fontWeight: 'bold' }}>{item.transaction_status_name}</Text></Text>
                                <Text>Mọi thắc mắc vui lòng liên hệ: <Text
                                    style={{ color: '#77a300', fontWeight: 'bold' }}
                                    onPress={() => Linking.openURL(`tel: 19006022`)}
                                >19006022</Text>
                                </Text>
                            </View>
                        }
                        {this.renderDetailTrip(item)}
                        {this.renderDetailCustommer(item)}
                        {this.renderDetailPeopleMove(item)}
                        {this.renderComment(item)}
                        {this.renderOther(item)}
                        {this.renderTT(item)}
                        <Button
                            value={'ĐẶT CHUYẾN MỚI'}
                            onPress={() => {
                                // this.props.navigation.navigate('Home')
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    key: null,
                                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                });
                                this.props.navigation.dispatch(resetAction);
                            }}
                        />

                        <View style={{ marginBottom: 8, }}></View>
                        {item.transaction_status_id == '4' ? null :
                            <ButtonGray
                                value={'HỦY VÉ'}
                                onPress={() => {
                                    this.setState({
                                        modalVisible: true,
                                    })
                                    this.cancelBookingToken();
                                }}
                            />
                        }

                        {/* <Dialog
                            visible={this.state.dialogOTP}
                            width={0.8}
                            dialogTitle={<DialogTitle title="Xác nhận hủy vé" />}
                            // footer={
                            //     <DialogFooter>
                            //         <DialogButton
                            //             text="Hủy vé"
                            //             onPress={() => {
                            //                 if (this.state.otp.length < 4) {

                            //                 } else {
                            //                     this.setState({ modalVisible: true, })
                            //                     this.cancelBooking();
                            //                 }
                            //             }}
                            //         />
                            //         <DialogButton
                            //             text="Đóng"
                            //             onPress={() => {
                            //                 this.setState({
                            //                     dialogOTP: false,
                            //                     otp: '',
                            //                 })
                            //             }}
                            //         />
                            //     </DialogFooter>
                            // }
                        >
                            <View>
                                <View style={{
                                    padding :8,
                                    alignItems: "center",
                                }}>
                                    <Text style={{ fontSize: 16, fontWeight: '100' }}>Mã xác thực hủy chuyến được gửi tới email và số điện thoại của bạn</Text>

                                    <OTPInputView
                                        style={{ padding: 20, height: 80, justifyContent: 'center', alignItems: 'center' }}
                                        pinCount={4}
                                        autoFocusOnLoad
                                        code={this.state.otp}
                                        onCodeChanged={code => { this.setState({ otp: code }) }}
                                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                        onCodeFilled={(code => {
                                            this.setState({
                                                otp: code,
                                            })
                                        })}
                                    />
                                    <Text>{this.state.message}</Text>
                                    <View style = {{flexDirection : 'column'}}>
                                    <ButtonDialog
                                        text="Hủy vé"
                                        onPress={() => {
                                            if (this.state.otp.length < 4) {

                                            } else {
                                                this.setState({ modalVisible: true, })
                                                this.cancelBooking();
                                            }
                                        }}
                                    />
                                    <ButtonDialog
                                        text="Đóng"
                                        onPress={() => {
                                            this.setState({
                                                dialogOTP: false,
                                                otp: '',
                                            })
                                        }}
                                    />
                                </View>
                                </View>
                            </View>

                        </Dialog> */}

                        <Modal
                            visible={this.state.dialogOTP}
                            transparent={true}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000AA' }}>
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
                                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
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
                            </View>
                        </Modal>

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
                        >
                            <View style={{ flex: 1, }}>
                                <View style={{ padding: 16 }}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 8 }}>Lí do hủy vé</Text>
                                        {this.renderRadio()}

                                        <Button
                                            value='Gửi'
                                            onPress={() => {
                                                if (this.state.value != 0) {
                                                    this.feedbackWhyCancel();
                                                    // this.props.navigation.navigate('Home')
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
    textBigRight: {
        padding: 1,
        fontSize: 14,
        color: '#333333',
        flex: 1,
    },
    textBigLeft1: {
        fontSize: 16,
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
        fontSize: 16,
        color: '#77a300',
        flex: 1,
        textAlign: "right"
    },
})

export default TicketInformationTuLai;