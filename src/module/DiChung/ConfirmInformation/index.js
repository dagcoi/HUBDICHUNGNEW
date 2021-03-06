import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import CountDown from 'react-native-countdown-component';
import * as link from '../../../URL'
import { deleteData } from '../../../core/Redux/action/Action'
import ImageTextDiChung from '../../../component/ImageTextDiChung'
import { NavigationActions, StackActions } from 'react-navigation';
import { Button, ButtonDialog } from '../../../component/Button'
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';
import PopUp from '../../../component/PopUp'

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

const imageLocation = '../../../image/location2.png'
const imageCalendar = '../../../image/calendar.png'
const imagePeople = '../../../image/people.png'
const imageIconCar = '../../../image/iconcar.png'
const imagePerson = '../../../image/person.png'
const imageIconPhone = '../../../image/iconphone.png'
const imageEmail = '../../../image/email.png'
const imageIconPlan = '../../../image/iconplan.png'
const imageDone = '../../../image/done.png'
const imagePayment = '../../../image/payment.png'
const imageSorry = '../../../image/sorry.png'
const imageComment = '../../../image/comment.png'
const gifNightBooking = '../../../image/nightbooking.gif'

class ConfirmInformation extends Component {

    constructor() {
        super();
        this.state = {
            callingApi: false,
            visibleSearchDriver: false,
            addingTicket: false,
            is_night_booking: true,
            result: null,
            ticket: null,
            visibalAgain: false,
            depart_time2: '',
            id_booking: null,
        }
    }

    componentDidMount() {
        console.log('token' + this.props.token)
        console.log('vehice_id' + this.props.vehice_id)
        console.log('vehicle_name' + this.props.vehicle_name)
        console.log('vehicle_icon' + this.props.vehicle_icon)
        this._interval = setInterval(() => {
            const url = link.URL_API + `agent/check_night_booking_partner_received?ticket_id=${this.state.ticket}`
            if (this.state.visibleSearchDriver) {
                // console.log(url);
                return fetch(url)
                    .then((res) => res.json())
                    .then((jsonRes) => {
                        // console.log(JSON.stringify(jsonRes))
                        // console.log(jsonRes.data.result)
                        this.setState({
                            result: jsonRes.data.result,
                            visibleSearchDriver: !jsonRes.data.result,
                        })
                    }
                    )
            } else {
                return null;
            }
        }, 5000);
        console.log(this.props.depart_time2);
        var time = new Date(this.props.depart_time2 + '+07:00').getTime();
        console.log(time);
        this.setState({ depart_time2: time })
    }

    async reBiddingTicket() {
        const url = link.URL_API + `home/auto_process_ticket?id=${this.state.ticket}&reprocess_night_booking=1`
        console.log(url);
        const res = await fetch(url);
        const jsonRes = await res.json();
        if (jsonRes.code == 'success') {
            this.setState({
                visibalAgain: false,
                visibleSearchDriver: true,
                is_night_booking: true,
            });
        }
    }

    async quitNightBooKing() {
        const url = link.URL_API + 'home/quit_night_booking'
        const formData = new FormData();
        formData.append('ticket_id', this.state.ticket)
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
            body: formData
        })
            .then((res) => res.json())
            .then((jsonRes) => {
                if (jsonRes.code = 'success') {
                    console.log('Đã Hủy Bidding thành công!')
                } else {
                    console.log('Hủy Bidding lỗi!')
                }
            })
    }

    renderDetailTrip() {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết chuyến đi</Text>

                <ImageTextDiChung
                    source={require(imageLocation)}
                    text={this.props.pick_add}
                />

                <ImageTextDiChung
                    source={require(imageLocation)}
                    text={this.props.drop_add}
                />

                <ImageTextDiChung
                    source={require(imageCalendar)}
                    text={this.props.depart_time}
                />

                <ImageTextDiChung
                    source={require(imagePeople)}
                    text={this.props.chair + ' người'}
                />
            </View>
        )
    }

    renderDetailOrder() {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết đơn hàng</Text>

                <ImageTextDiChung
                    source={require(imageIconCar)}
                    text={this.props.ride_method_id == '1' ? 'Đi riêng' : 'Đi chung'}
                />
            </View>
        )
    }

    renderDetailCustommer() {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết khách hàng</Text>

                <ImageTextDiChung
                    source={require(imagePerson)}
                    text={this.props.full_name}
                />

                <ImageTextDiChung
                    source={require(imageIconPhone)}
                    text={this.props.use_phone}
                />

                <ImageTextDiChung
                    source={require(imageEmail)}
                    text={this.props.email}
                />
            </View>
        )
    }

    renderAirport() {
        if (this.props.plane_number.trim().length == 0) {
            return null;
        } else {
            return (
                <ImageTextDiChung
                    source={require(imageIconPlan)}
                    text={this.props.plane_number}
                />
            )
        }
    }

    renderDetailPeopleMove() {
        const { navigation } = this.props;
        if (navigation.getParam('not_use')) {
            return (
                <View>
                    <Text style={styles.textBigLeft1}>Chi tiết người đi</Text>

                    <ImageTextDiChung
                        source={require(imagePerson)}
                        text={this.props.full_name2}
                    />

                    <ImageTextDiChung
                        source={require(imageIconPhone)}
                        text={this.props.use_phone2}
                    />

                </View>
            )
        } else {
            return null;
        }
    }

    renderVAT() {
        const { navigation } = this.props;
        if (!navigation.getParam('xhd')) {
            return null;
        } else {
            return (
                <ImageTextDiChung
                    source={require(imageDone)}
                    text={'+ 10%'}
                />
            )
        }
    }

    renderTT() {
        const { navigation } = this.props;
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.textBigLeft1}>Tổng thanh toán: </Text>
                    <Text style={styles.textBigRight1}>{((this.props.merged + (navigation.getParam('broad_price') ? 30000 : 0) - (navigation.getParam('blDiscount') ? this.props.discount_price : 0)) * (navigation.getParam('xhd') ? 11 / 10 : 1) + (this.props.toll_fee == 'NA' ? 0 : + parseInt(this.props.toll_fee))).format(0, 3, '.')} đ</Text>
                </View>
                <Text style={{ marginBottom: 8, textAlign: 'right' }}>{this.props.toll_fee == "NA" ? "Giá chưa bao gồm phí cầu đường" : "Giá trọn gói không phí ẩn"}</Text>
            </View>
        )
    }

    renderMGG() {
        const { navigation } = this.props;
        if (!navigation.getParam('blDiscount')) {
            return null;
        } else {
            return (
                <ImageTextDiChung
                    source={require(imageDone)}
                    text={navigation.getParam('detailPromotion')}
                />
            )
        }
    }

    formComment() {
        return (
            <ImageTextDiChung
                source={require(imageComment)}
                text={this.props.comment}
            />
        )
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ padding: 8 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ height: 150, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                            source={{ uri: this.props.vehicle_icon }}
                        />
                    </View>

                    {this.renderDetailTrip()}
                    {this.renderDetailOrder()}
                    {this.renderDetailCustommer()}
                    {this.renderDetailPeopleMove()}
                    {this.formComment()}
                    {this.renderAirport()}

                    <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>

                    <ImageTextDiChung
                        source={require(imagePayment)}
                        text={navigation.getParam('Payment') == '0' ? 'Trả sau' : 'Trả trước'}
                    />

                    {this.renderVAT()}

                    {!navigation.getParam('broad_price') ? null :
                        <ImageTextDiChung
                            source={require(imageDone)}
                            text={'Đón biển tên: +30.000 đ'}
                        />
                    }

                    {this.renderMGG()}

                    {this.renderTT()}


                    <Button
                        value={'Xác nhận đặt xe'}
                        onPress={() => {
                            this.state.callingApi ? null : navigation.getParam('Payment') == '0' ? this.addTicket2() : this.addTicketPaymentOnline()
                            this.setState({
                                addingTicket: true,
                            })
                        }}
                    />

                    <Dialog
                        visible={this.state.visibleSearchDriver}
                        width={0.8}
                        dialogTitle={<DialogTitle title="Đang tìm tài xế" />}
                    >
                        <View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8 }}>
                                <Image
                                    source={require(gifNightBooking)}
                                    style={{ width: 185, height: 110 }}
                                />
                                <Text style={{ fontSize: 16 }}>Quý khách vui lòng đợi trong giây lát...</Text>
                                <CountDown
                                    until={180}
                                    onFinish={() => {
                                        this.quitNightBooKing();
                                        this.setState({
                                            visibleSearchDriver: false,
                                            result: false,
                                            visibalAgain: true,
                                        })
                                    }}
                                    digitStyle={{ backgroundColor: '#FFF' }}
                                    digitTxtStyle={{ color: '#00363d' }}
                                    timeToShow={['M', 'S']}
                                    timeLabels={{ m: null, s: null }}
                                    size={20}
                                />
                            </View>
                        </View>

                    </Dialog>

                    <PopUp
                        showModal={this.state.visibalAgain}
                        textTitle={'Tìm kiếm thất bại'}
                        source={require(imageSorry)}
                        textMessage={'Hiện tại không có tài xế nào nhận yêu cầu của bạn. Xin vui lòng thử lại hoặc chọn giờ đi khác.'}
                        textButtonLeft={'Thử lại'}
                        textButtonRight={'Chọn hãng khác'}
                        onPressLeft={() => {
                            this.reBiddingTicket();
                        }}
                        onPressRight={() => {
                            this.setState({ visibalAgain: false })
                            this.props.navigation.push("MapDiChung")
                        }}
                    />

                    <Dialog
                        // width={0.8}
                        visible={this.state.addingTicket}
                    >
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='large' />
                            </View>
                        </View>
                    </Dialog>

                    <Dialog
                        width={0.8}
                        visible={this.state.result}
                        dialogTitle={<DialogTitle title='Đặt xe thành công' />}
                    // footer={
                    //     <DialogFooter>
                    //         <DialogButton
                    //             text="Chi tiết mã vé"
                    //             onPress={() => {
                    //                 this.setState({
                    //                     result: false,
                    //                 })
                    //                 this.props.deleteData();
                    //                 this.TicketInformation()
                    //             }}
                    //         />
                    //     </DialogFooter>
                    // }
                    >
                        <View>
                            <View style={{ flexDirection: 'column', padding: 8, margin: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ height: 150, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                                        source={{ uri: this.props.vehicle_icon }}
                                    />
                                </View>
                                <Text>Mã vé của bạn là:<Text style={{ fontWeight: 'bold' }}> {this.state.ticket}</Text> </Text>
                                <Text>Yêu cầu đặt xe của bạn đã được hệ thống ghi nhận. Chúng tôi sẽ liên lạc trong thời gian sớm nhất.</Text>
                                <ButtonDialog
                                    text="Chi tiết mã vé"
                                    onPress={() => {
                                        this.setState({
                                            result: false,
                                        })
                                        this.props.deleteData();
                                        this.TicketInformation()
                                    }}
                                />
                            </View>
                        </View>
                    </Dialog>

                    <Dialog
                        visible={!this.state.is_night_booking}
                        width={0.8}
                        dialogTitle={<DialogTitle title="Đặt xe thành công" />}
                    >
                        <View style={{ flexDirection: 'column', padding: 8 }}>
                            <View style={{ height: 150, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                                    source={{ uri: this.props.vehicle_icon }}
                                />
                            </View>
                            {/* <Text>Mã vé của bạn là:<Text style={{ fontWeight: 'bold' }}> {this.state.ticket}</Text> </Text> */}
                            <Text>Yêu cầu đặt xe của bạn đã được hệ thống ghi nhận. Chúng tôi sẽ liên lạc trong thời gian sớm nhất.</Text>
                            <ButtonDialog
                                text="Chi tiết mã vé"
                                onPress={() => {
                                    this.setState({
                                        dialogCalendarVisible: false,
                                        is_night_booking: true
                                    })
                                    this.props.deleteData();
                                    this.TicketInformation()
                                }}
                            />
                        </View>
                    </Dialog>



                </ScrollView>
            </View>
        )
    }

    addTicket() {
        const url = link.URL_API + 'passenger/create_ticket'
        const formData = new FormData();
        const { navigation } = this.props;
        console.log('API Thanh toán trả sau')
        console.log(this.props.pay_method_id)
        console.log(url)

        if (this.props.plane_number.trim().length > 0) {
            formData.append('plane_number', this.props.plane_number.trim());
        } else {
            formData.append('plane_number', '');
        }
        if (this.props.is_airport == 'false' || navigation.getParam('plane_type') == -1) {
            formData.append('plane_type', '');
        } else {
            formData.append('plane_type', navigation.getParam('plane_type'));
        }

        formData.append('catch_in_house', navigation.getParam('broad_price') ? '1' : '0');
        formData.append('fullname', this.props.full_name);
        formData.append('phone', this.props.use_phone);
        formData.append('email', this.props.email);
        formData.append('address', this.props.drop_add);
        formData.append('comment', this.props.comment);
        formData.append('chunk_id', this.props.chunk_id);
        formData.append('dimension_id', this.props.dimension_id);
        formData.append('vehicle_id', this.props.vehicle_id);
        formData.append('ride_method_id', this.props.ride_method_id);
        formData.append('chair', this.props.people);
        formData.append('airport_id', this.props.airport_id);
        formData.append('street_id', this.props.street_id);
        formData.append('village_id', this.props.village_id);
        formData.append('pick_pos', this.props.pick_pos);
        formData.append('drop_pos', this.props.drop_pos);
        formData.append('depart_time', this.props.depart_time);
        formData.append('pm_id', this.props.pm_id);
        formData.append('pick_address', this.props.pick_add);
        formData.append('drop_address', this.props.drop_add);
        formData.append('ignore_duplicate_warning', this.props.ignore_duplicate_warning);
        formData.append('pay_method_id', this.props.pay_method_id);
        formData.append('brand_partner_id', this.props.brand_partner_id);
        formData.append('unmerged_select', this.props.unmerged);
        // if (navigation.getParam('xhd')) {
        formData.append('xhd', navigation.getParam('xhd') ? 1 : 0);
        formData.append('company[name]', this.props.company_name);
        formData.append('company[address]', this.props.company_address);
        formData.append('company[mst]', this.props.company_mst);
        formData.append('company[address_receive]', this.props.company_address_receive);
        // } else {
        //     formData.append('xhd', 0);
        // }
        formData.append('city_id', this.props.city_id);
        formData.append('use_range_time', this.props.use_range_time);
        formData.append('ticket_session', 'BOOK_MAIN');
        formData.append('source', link.SOURCE);
        formData.append('partner_domain', 'hub.dichung.vn');
        if (navigation.getParam('not_use')) {
            formData.append('not_use', 1);
            formData.append('use[name]', this.props.full_name2);
            formData.append('use[phone]', this.props.use_phone2);
        }
        if (navigation.getParam('blDiscount')) {
            formData.append('promotion_code', navigation.getParam('promotion'))
        }
        formData.append('session_id', 'tum3fdn24qf3778e7d585ff0e1');

        console.log(formData)
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
            body: formData
        })
            .then((res) => res.json())
            .then((responseJson) => {
                if (responseJson.code == 0) {
                    this.setState({
                        ticket: responseJson.ticket_code,
                        callingApi: false,
                        addingTicket: false,
                        is_night_booking: responseJson.is_night_booking,
                        visibleSearchDriver: responseJson.is_night_booking,
                    })
                } else {
                    this.setState({ addingTicket: false })
                    Alert.alert(
                        'Đặt xe thất bại!',
                        responseJson.msg,
                        [
                            {
                                text: 'Về trang chủ', onPress: () => {
                                    // this.props.navigation.push("Home"); 
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        key: null,
                                        actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                    });
                                    this.props.navigation.dispatch(resetAction);
                                }
                            },
                        ],
                        { cancelable: false }
                    )
                }
                return responseJson;
            })
            .catch((error) => {
                alert('dat xe that bai')
                this.setState({ addingTicket: false })
                // console.log(error);
            });
    }

    addTicket2() {
        const url = link.URL_API_PORTAL + `booking/v1/bookings`
        console.log(url)
        const { navigation } = this.props;
        const jsonStr = JSON.stringify({
            "provider": {
                "name": "dichungtaxi"
            },
            "startPoints": [
                {
                    "address": this.props.pick_add,
                    "lat": this.props.lattitude_pick,
                    "long": this.props.lngtitude_pick
                }
            ],
            "endPoints": [
                {
                    "address": this.props.drop_add,
                    "lat": this.props.lattitude_drop,
                    "long": this.props.lngtitude_drop
                }
            ],
            "bookingUser": {
                "email": this.props.email,
                "phone": this.props.use_phone,
                "fullName": this.props.full_name,
                "gender": ""
            },
            "bookingTime": this.state.depart_time2,
            "slot": 1,
            "dimension": "one_way",
            "rideMethod": "private",
            "productType": "TRANSFER_SERVICE",
            "vehicle": {
                "id": this.props.vehice_id,
                "name": this.props.vehicle_name,
                "image": this.props.vehicle_icon
            }
            ,
            "note": this.props.comment,
            "beneficiary": {
                "email": navigation.getParam('not_use') ? '' : this.props.email,
                "phone": navigation.getParam('not_use') ? this.props.use_phone2 : this.props.use_phone,
                "fullName": navigation.getParam('not_use') ? this.props.full_name2 : this.props.full_name,
                "gender": ""
            },
            "bookingType": "",
            "payment": {
                "method": "cash"
            },
            "promotion": navigation.getParam('blDiscount') ? navigation.getParam('promotion') : "",
            "invoice": navigation.getParam('xhd') ? {
                "name": this.props.company_name,
                "address": this.props.company_address,
                "taxCode": this.props.company_mst,
                "addressReceive": this.props.company_address_receive
            } : '',
            "extra": {
                "ref_id": "",
                "ref_user_id": "",
                "ref_url": "",
                "plane_number": this.props.plane_number,
                "plane_type": this.props.is_airport == 'false' ? '' : navigation.getParam('plane_type') > 0 ? navigation.getParam('plane_type') : '',
                "pm_id": this.props.pm_id,
                "catch_in_house": navigation.getParam('broad_price') ? '1' : '0',
                "chunk_id": this.props.chunk_id,
                "dimension_id": this.props.dimension_id,
                "vehicle_id": this.props.vehice_id,
                "ride_method_id": this.props.ride_method_id,
                "airport_id": this.props.airport_id,
                "street_id": this.props.street_id,
                "village_id": this.props.village_id,
                "ignore_duplicate_warning": this.props.ignore_duplicate_warning,
                "brand_partner_id": this.props.brand_partner_id,
                "unmerged_select": this.props.unmerged,
                "xhd": navigation.getParam('xhd') ? 1 : 0,
                "city_id": this.props.city_id,
                "use_range_time": this.props.use_range_time,
                "referral_code": "",
            }
        })
        console.log('abc :.........' + jsonStr)
        console.log('abc :.........' + this.props.token)
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'token': this.props.token
            },
            body: jsonStr
        })
            .then(res => res.json())
            .then(resJson => {
                console.log(JSON.stringify(resJson))
                console.log('a')
                this.setState({
                    callingApi: false,
                    addingTicket: false,
                    is_night_booking: resJson.is_night_booking,
                    visibleSearchDriver: resJson.is_night_booking,
                    id_booking: resJson.data._id,
                })
            })
    }

    addTicketPaymentOnline() {
        const url = link.URL_API + `passenger/create_ticket_payment_online`
        const formData = new FormData();
        const { navigation } = this.props;
        console.log('API Thanh toán Online')
        console.log(this.props.pay_method_id)
        console.log(url)

        // formData.append('plane_number', this.props.plane_number);
        // formData.append('plane_type', navigation.getParam('plane_type'));
        // formData.append('catch_in_house', navigation.getParam('broad_price') ? '1' : '0');
        // formData.append('fullname', this.props.full_name);
        // formData.append('phone', this.props.use_phone);
        // formData.append('email', this.props.email);
        // formData.append('address', this.props.drop_add);
        // formData.append('comment', this.props.comment);
        // formData.append('chunk_id', this.props.chunk_id);
        // formData.append('dimension_id', this.props.dimension_id);
        // formData.append('vehicle_id', this.props.vehicle_id);
        // formData.append('ride_method_id', this.props.ride_method_id);
        // formData.append('chair', this.props.people);
        // formData.append('airport_id', this.props.airport_id);
        // formData.append('street_id', this.props.street_id);
        // formData.append('village_id', this.props.village_id);
        // formData.append('pick_pos', this.props.pick_pos);
        // formData.append('drop_pos', this.props.drop_pos);
        // formData.append('depart_time', this.props.depart_time);
        // formData.append('pm_id', this.props.pm_id);
        // formData.append('pick_address', this.props.pick_add);
        // formData.append('drop_address', this.props.drop_add);
        // formData.append('ignore_duplicate_warning', this.props.ignore_duplicate_warning);
        // formData.append('pay_method_id', this.props.pay_method_id);
        // // dang sai ở dòng trên pay_method_id
        // formData.append('brand_partner_id', this.props.brand_partner_id);
        // formData.append('unmerged_select', this.props.unmerged);
        // if (navigation.getParam('xhd')) {
        //     formData.append('xhd', 1);
        //     formData.append('company[name]', this.props.company_name);
        //     formData.append('company[address]', this.props.company_address);
        //     formData.append('company[mst]', this.props.company_mst);
        //     formData.append('company[address_receive]', this.props.company_address_receive);
        // } else {
        //     formData.append('xhd', 0);
        // }
        // formData.append('city_id', this.props.city_id);
        // formData.append('use_range_time', this.props.use_range_time);
        // formData.append('ticket_session', 'BOOK_MAIN');
        // formData.append('source', link.SOURCE);
        // formData.append('partner_domain', 'hub.dichung.vn');
        // if (navigation.getParam('not_use')) {
        //     formData.append('not_use', 1);
        //     formData.append('use[name]', this.props.full_name2);
        //     formData.append('use[phone]', this.props.use_phone2);
        // }
        // if (navigation.getParam('blDiscount')) {
        //     formData.append('promotion_code', navigation.getParam('promotion'))
        // }
        // formData.append('session_id', 'u50t38e1b5kgb4bo7starcuq05');
        if (this.props.plane_number.trim().length > 0) {
            formData.append('plane_number', this.props.plane_number.trim());
        } else {
            formData.append('plane_number', '');
        }
        if (this.props.is_airport == 'false' || navigation.getParam('plane_type') == -1) {
            formData.append('plane_type', '');
        } else {
            formData.append('plane_type', navigation.getParam('plane_type'));
        }

        formData.append('catch_in_house', navigation.getParam('broad_price') ? '1' : '0');
        formData.append('fullname', this.props.full_name);
        formData.append('phone', this.props.use_phone);
        formData.append('email', this.props.email);
        formData.append('address', this.props.drop_add);
        formData.append('comment', this.props.comment);
        formData.append('chunk_id', this.props.chunk_id);
        formData.append('dimension_id', this.props.dimension_id);
        formData.append('vehicle_id', this.props.vehicle_id);
        formData.append('ride_method_id', this.props.ride_method_id);
        formData.append('chair', this.props.people);
        formData.append('airport_id', this.props.airport_id);
        formData.append('street_id', this.props.street_id);
        formData.append('village_id', this.props.village_id);
        formData.append('pick_pos', this.props.pick_pos);
        formData.append('drop_pos', this.props.drop_pos);
        formData.append('depart_time', this.props.depart_time);
        formData.append('pm_id', this.props.pm_id);
        formData.append('pick_address', this.props.pick_add);
        formData.append('drop_address', this.props.drop_add);
        formData.append('ignore_duplicate_warning', this.props.ignore_duplicate_warning);
        formData.append('pay_method_id', this.props.pay_method_id);
        formData.append('brand_partner_id', this.props.brand_partner_id);
        formData.append('unmerged_select', this.props.unmerged);
        // if (navigation.getParam('xhd')) {
        formData.append('xhd', navigation.getParam('xhd') ? 1 : 0);
        formData.append('company[name]', this.props.company_name);
        formData.append('company[address]', this.props.company_address);
        formData.append('company[mst]', this.props.company_mst);
        formData.append('company[address_receive]', this.props.company_address_receive);
        // } else {
        //     formData.append('xhd', 0);
        // }
        formData.append('city_id', this.props.city_id);
        formData.append('use_range_time', this.props.use_range_time);
        formData.append('ticket_session', 'BOOK_MAIN');
        formData.append('source', link.SOURCE);
        formData.append('partner_domain', 'hub.dichung.vn');
        if (navigation.getParam('not_use')) {
            formData.append('not_use', 1);
            formData.append('use[name]', this.props.full_name2);
            formData.append('use[phone]', this.props.use_phone2);
        }
        if (navigation.getParam('blDiscount')) {
            formData.append('promotion_code', navigation.getParam('promotion'))
        }
        formData.append('session_id', 'tum3fdn24qf3778e7d585ff0e1');

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
            body: formData
        })
            .then((res) => res.json())
            .then((responseJson) => {
                if (responseJson.code == 0) {
                    this.setState({
                        ticket: responseJson.ticket_code,
                        callingApi: false,
                        addingTicket: false,
                        // is_night_booking: responseJson.is_night_booking,
                        // visibleSearchDriver: responseJson.is_night_booking,
                    })
                    this.gotoPaymentOnline()
                } else {
                    this.setState({ addingTicket: false })
                    Alert.alert(
                        'Đặt xe thất bại!',
                        responseJson.msg,
                        [
                            {
                                text: 'Về trang chủ', onPress: () => {
                                    // this.props.navigation.push("Home"); 
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        key: null,
                                        actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                    });
                                    this.props.navigation.dispatch(resetAction);
                                }
                            },
                        ],
                        { cancelable: false }
                    )
                }
                return responseJson;
            })
            .catch((error) => {
                alert('dat xe that bai')
                this.setState({ addingTicket: false })
                // console.log(error);
            });
    }

    gotoPaymentOnline() {
        const { navigation } = this.props;
        this.props.navigation.navigate("PaymentOnline", {
            'ticket_id': this.state.ticket,
            'phone_number': this.props.use_phone,
            'amount': (this.props.merged + (navigation.getParam('broad_price') ? 30000 : 0) - (navigation.getParam('blDiscount') ? this.props.discount_price : 0)) * (navigation.getParam('xhd') ? 11 / 10 : 1) + (this.props.toll_fee == 'NA' ? 0 : + parseInt(this.props.toll_fee))
        })
    }

    TicketInformation() {
        this.props.navigation.navigate("TicketInformation", {
            'ticket_id': this.state.ticket,
            'phone_number': this.props.use_phone,
            'id_booking': this.state.id_booking,
        })
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    viewCon: {
        padding: 8,
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    },
    leftIcon: {
        height: 24,
        width: 24,
        marginRight: 8,
    },
    textBigRight1: {
        padding: 1,
        fontSize: 18,
        color: '#77a300',
        flex: 1,
        textAlign: "right",
        marginTop : 8,
    },

    textBigRight: {
        padding: 1,
        fontSize: 16,
        color: '#00363d',
        flex: 1,
    },
    textBigLeft: {
        fontSize: 14,
    },
    textBigLeft1: {
        fontSize: 16,
        marginTop: 8,
        fontWeight: 'bold',
    },
    kengang: {
        height: 1,
        backgroundColor: '#00363d',
        flex: 1,
    }
})
function mapStateToProps(state) {
    return {
        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
        merged: state.info.merged,
        depart_time: state.info.depart_time,
        depart_time2: state.info.depart_time2,
        vehicle_name: state.info.vehicle_name,
        vat: state.info.vat,
        full_name: state.info.full_name,
        use_phone: state.info.use_phone,
        thanhtoan: state.info.thanhtoan,
        toll_fee: state.info.toll_fee,
        chunk_id: state.info.chunk_id,
        vehice_id: state.info.vehice_id,
        village_id: state.info.village_id,
        pm_id: state.info.pm_id,
        partner_id: state.info.partner_id,
        city_id: state.info.city_id,
        comment: state.info.comment,
        promotion_code: state.info.promotion_code,
        dimension_id: state.info.dimension_id,
        ride_method_id: state.info.ride_method_id,
        chair: state.info.chair,
        airport_id: state.info.airport_id,
        street_id: state.info.street_id,
        brand_partner_id: state.info.brand_partner_id,
        is_from_airport: state.info.is_from_airport,
        full_name2: state.info.full_name2,
        use_phone2: state.info.use_phone2,
        session_id: state.info.session_id,
        transport_partner_id: state.info.transport_partner_id,
        pick_pos: state.info.pick_pos,
        drop_pos: state.info.drop_pos,
        use_range_time: state.info.use_range_time,
        unmerged: state.info.unmerged,
        email: state.info.email,
        plane_number: state.info.plane_number,
        company_name: state.info.company_name,
        company_address: state.info.company_address,
        company_mst: state.info.company_mst,
        company_address_receive: state.info.company_address_receive,
        plane_type: state.info.plane_type,
        catch_in_house: state.info.catch_in_house,
        vehicle_id: state.info.vehicle_id,
        source: state.info.source,
        ticket_session: state.info.ticket_session,
        not_use: state.info.not_use,
        ignore_duplicate_warning: state.info.ignore_duplicate_warning,
        pay_method_id: state.info.pay_method_id,
        xhd: state.info.xhd,
        vehicle_icon: state.info.vehicle_icon,
        discount_price: state.info.discount_price,
        people: state.info.people,
        is_airport: state.info.is_airport,
        lattitude_pick: state.info.lattitude_pick,
        lngtitude_pick: state.info.lngtitude_pick,
        lattitude_drop: state.info.lattitude_drop,
        lngtitude_drop: state.info.lngtitude_drop,
        token: state.thongtin.token
    }
}

export default connect(mapStateToProps, { deleteData: deleteData })(ConfirmInformation)