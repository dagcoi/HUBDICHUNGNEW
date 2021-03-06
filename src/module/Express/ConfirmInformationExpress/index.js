import { View, Text, StyleSheet, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import CountDown from 'react-native-countdown-component';
import * as link from '../../../URL'
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
const imagePerson = '../../../image/person.png'
const imageIconPhone = '../../../image/iconphone.png'
const imageEmail = '../../../image/email.png'
const imageIconPlan = '../../../image/iconplan.png'
const imageDone = '../../../image/done.png'
const imagePayment = '../../../image/payment.png'
const imageSorry = '../../../image/sorry.png'
const imageParcel = '../../../image/parcel.png'
const imageSetting = '../../../image/setting.png'
const imageComment = '../../../image/comment.png'
const gifNightBooking = '../../../image/nightbooking.gif'

class ConfirmInformationExpress extends Component {

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
        this._interval = setInterval(() => {
            const url = link.URL_API + `agent/check_night_booking_partner_received?ticket_id=${this.state.ticket}`
            if (this.state.visibleSearchDriver) {
                return fetch(url)
                    .then((res) => res.json())
                    .then((jsonRes) => {
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
                <Text style={styles.textBigLeft1}>Chi tiết dịch vụ</Text>
                <ImageTextDiChung
                    source={require(imageSetting)}
                    text={this.props.partner_name}
                />
                <ImageTextDiChung
                    source={require(imageCalendar)}
                    text={this.props.depart_time}
                />
                <ImageTextDiChung
                    source={require(imageParcel)}
                    text={this.props.chair + ' Bưu phẩm'}
                />
            </View>
        )
    }

    renderDetailCustommer() {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết người gửi</Text>

                <ImageTextDiChung
                    source={require(imagePerson)}
                    text={this.props.full_name}
                />

                <ImageTextDiChung
                    source={require(imageIconPhone)}
                    text={this.props.use_phone}
                />

                <ImageTextDiChung
                    source={require(imageLocation)}
                    text={this.props.pick_add}
                />

                <ImageTextDiChung
                    source={require(imageEmail)}
                    text={this.props.email}
                />

            </View>
        )
    }

    renderAirport() {
        if (!this.props.is_from_airport) {
            return null;
        } else {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageIconPlan)}
                    />
                    <Text style={styles.textBigRight}>{this.props.macb}</Text>
                </View>
            )
        }
    }

    renderDetailPeopleMove() {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết người nhận</Text>

                <ImageTextDiChung
                    source={require(imagePerson)}
                    text={this.props.full_name2}
                />

                <ImageTextDiChung
                    source={require(imageIconPhone)}
                    text={this.props.use_phone2}
                />

                <ImageTextDiChung
                    source={require(imageLocation)}
                    text={this.props.drop_add}
                />

                <ImageTextDiChung
                    source={require(imageComment)}
                    text={this.props.comment}
                />
            </View>
        )
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
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center', marginBottom: 8 }}>
                <Text style={styles.textBigLeft1}>Tổng thanh toán: </Text>
                <Text style={styles.textBigRight1}>
                    {((this.props.merged * this.props.chair - (navigation.getParam('blDiscount') ? this.props.discount_price : 0)) * (navigation.getParam('xhd') ? 11 / 10 : 1)).format(0, 3, '.')} đ
                </Text>
            </View>
        )
    }

    renderMGG() {
        const { navigation } = this.props;
        if (!navigation.getParam('blDiscount')) {
            return null;
        } else {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageDone)}
                    />
                    <Text style={styles.textBigRight}>{navigation.getParam('detailPromotion')}</Text>
                </View>
            )
        }
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
                    <Text style={{ color: '#77a300', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>{this.props.vehicle_name}</Text>

                    {this.renderDetailTrip()}
                    {this.renderDetailCustommer()}
                    {this.renderDetailPeopleMove()}

                    <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                        <Image
                            style={styles.leftIcon}
                            source={require(imagePayment)}
                        />
                        <Text style={styles.textBigRight}>{navigation.getParam('Payment') == '0' ? 'Người gửi trả tiền mặt' : 'Trả trước'}</Text>
                    </View> */}

                    <ImageTextDiChung
                        source={require(imagePayment)}
                        text={navigation.getParam('Payment') == '0' ? 'Người gửi trả tiền mặt' : 'Trả trước'}
                    />

                    {this.renderVAT()}

                    {this.renderTT()}


                    <Button
                        value={'Hoàn thành thuê vận chuyển'}
                        onPress={() => {
                            this.state.callingApi ? null : this.addTicket2()
                            this.setState({
                                addingTicket: true,
                            })
                        }}
                    />

                    <Dialog
                        visible={this.state.visibleSearchDriver}
                        dialogTitle={<DialogTitle title="Đang tìm vận chuyển" />}
                        width={0.8}
                    >
                        <View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8 }}>

                                <Image
                                    source={require(gifNightBooking)}
                                    style={{ width: 185, height: 110 }}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <ActivityIndicator size='large' />
                                    <Text style={{ fontSize: 18 }}>Quý khách vui lòng đợi trong giây lát...</Text>
                                </View>
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

                    <Dialog
                        visible={this.state.visibalAgain}
                        width={0.8}
                        dialogTitle={<DialogTitle title="Tìm kiếm thất bại" />}
                    // footer={
                    //     <DialogFooter>
                    //         <DialogButton
                    //             text="Thử Lại"
                    //             onPress={() => {
                    //                 this.reBiddingTicket();
                    //             }}
                    //         />
                    //         <DialogButton
                    //             text="Chọn hãng khác"
                    //             onPress={() => {
                    //                 this.setState({ visibalAgain: false })
                    //                 this.props.navigation.push("MapExpress")
                    //             }}
                    //         />
                    //     </DialogFooter>
                    // }
                    >
                        <View>
                            <View style={{ padding: 8 }}>
                                <Image
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                                    source={require(imageSorry)}
                                />
                                <Text style={{ fontSize: 16 }}>Hiện tại không có đối tác vận chuyển nào nhận yêu cầu của bạn. Xin vui lòng thử lại hoặc chọn giờ đi khác.</Text>
                                <ButtonDialog
                                    text="Thử Lại"
                                    onPress={() => {
                                        this.reBiddingTicket();
                                    }}
                                />
                                <ButtonDialog
                                    text="Chọn hãng khác"
                                    onPress={() => {
                                        this.setState({ visibalAgain: false })
                                        this.props.navigation.push("MapExpress")
                                    }}
                                />
                            </View>
                        </View>
                    </Dialog>

                    <Dialog
                        visible={this.state.addingTicket}
                    // width={0.8}
                    >
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='large' />
                            </View>
                        </View>
                    </Dialog>

                    <Dialog
                        visible={this.state.result}
                        width={0.8}
                        dialogTitle={<DialogTitle title="Đặt xe thành công" />}
                    // footer={
                    //     <DialogFooter>
                    //         <DialogButton
                    //             text="Xem"
                    //             onPress={() => {
                    //                 this.setState({
                    //                     result: false,
                    //                 })
                    //                 this.TicketInformation()
                    //             }}
                    //         />
                    //     </DialogFooter>
                    // }
                    >
                        <View>
                            <View style={{ flexDirection: 'column', padding: 8 }}>
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
                                        this.TicketInformation()
                                    }}
                                />
                            </View>
                        </View>
                    </Dialog>

                    <Dialog
                        visible={!this.state.is_night_booking}
                        // footer={
                        //     <DialogFooter>
                        //         <DialogButton
                        //             text="Xem"
                        //             onPress={() => {
                        //                 this.setState({
                        //                     dialogCalendarVisible: false,
                        //                     is_night_booking: true
                        //                 })
                        //                 this.TicketInformation()
                        //             }}
                        //         />
                        //         <DialogButton
                        //             text="Trang chủ"
                        //             onPress={() => {
                        //                 this.setState({
                        //                     is_night_booking: true
                        //                 })
                        //                 this.props.navigation.push("Home");
                        //             }}
                        //         />
                        //     </DialogFooter>
                        // }
                        width={0.8}
                        dialogTitle={<DialogTitle title="Đặt xe thành công" />}
                    >
                        <View>
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
                                        this.TicketInformation()
                                    }}
                                />
                            </View>
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

        formData.append('plane_number', '');
        formData.append('plane_type', '');
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
        formData.append('chair', this.props.chair);
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
        if (navigation.getParam('blDiscount')) {
            formData.append('promotion_code', navigation.getParam('promotion'))
        }
        formData.append('unmerged_select', this.props.unmerged);
        if (navigation.getParam('xhd')) {
            formData.append('xhd', 1);
            formData.append('company[name]', this.props.company_name);
            formData.append('company[address]', this.props.company_address);
            formData.append('company[mst]', this.props.company_mst);
            formData.append('company[address_receive]', this.props.company_address_receive);
        } else {
            formData.append('xhd', 0);
        }
        formData.append('city_id', this.props.city_id);
        formData.append('use_range_time', this.props.use_range_time);
        formData.append('ticket_session', 'BOOK_MAIN');
        formData.append('source', link.SOURCE);
        formData.append('partner_domain', 'hub.dichung.vn');
        formData.append('not_use', 1);
        formData.append('use[name]', this.props.full_name2);
        formData.append('use[phone]', this.props.use_phone2);

        formData.append('session_id', '5pl5q1b1prhd5hjpdr5rtf9qv3');
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
                            { text: 'Về trang chủ', onPress: () => { this.props.navigation.push("Home"); } },
                        ],
                        { cancelable: false }
                    )
                }
                return responseJson;
            })
            .catch(() => {
                alert('dat xe that bai')
                this.setState({ addingTicket: false })
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
            "productType": "EXPRESS",
            "vehicle": {
                "id": this.props.vehice_id,
                "name": this.props.vehicle_name,
                "image": this.props.vehicle_icon
            }
            ,
            "note": this.props.comment,
            "beneficiary": {
                "email": this.props.email,
                "phone": this.props.use_phone2,
                "fullName": this.props.full_name2,
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

    TicketInformation() {
        this.props.navigation.navigate("TicketInformationExpress", {
            'ticket_id': this.state.ticket,
            'phone_number': this.props.use_phone,
            'id_booking': this.state.id_booking,
        })
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
        fontSize: 16,
        color: '#77a300',
        flex: 1,
        textAlign: "right",
        marginTop : 8,
    },

    textBigRight: {
        padding: 1,
        fontSize: 14,
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
        drop_add: state.rdVanChuyen.drop_add,
        pick_add: state.rdVanChuyen.pick_add,
        merged: state.rdVanChuyen.merged,
        depart_time: state.rdVanChuyen.depart_time,
        depart_time2: state.rdVanChuyen.depart_time2,
        vehicle_name: state.rdVanChuyen.vehicle_name,
        vat: state.rdVanChuyen.vat,
        full_name: state.rdVanChuyen.full_name,
        use_phone: state.rdVanChuyen.use_phone,
        thanhtoan: state.rdVanChuyen.thanhtoan,
        toll_fee: state.rdVanChuyen.toll_fee,
        chunk_id: state.rdVanChuyen.chunk_id,
        vehice_id: state.rdVanChuyen.vehice_id,
        village_id: state.rdVanChuyen.village_id,
        pm_id: state.rdVanChuyen.pm_id,
        partner_id: state.rdVanChuyen.partner_id,
        city_id: state.rdVanChuyen.city_id,
        comment: state.rdVanChuyen.comment,
        promotion_code: state.rdVanChuyen.promotion_code,
        dimension_id: state.rdVanChuyen.dimension_id,
        ride_method_id: state.rdVanChuyen.ride_method_id,
        chair: state.rdVanChuyen.chair,
        airport_id: state.rdVanChuyen.airport_id,
        street_id: state.rdVanChuyen.street_id,
        brand_partner_id: state.rdVanChuyen.brand_partner_id,
        is_from_airport: state.rdVanChuyen.is_from_airport,
        full_name2: state.rdVanChuyen.full_name2,
        use_phone2: state.rdVanChuyen.use_phone2,
        session_id: state.rdVanChuyen.session_id,
        transport_partner_id: state.rdVanChuyen.transport_partner_id,
        pick_pos: state.rdVanChuyen.pick_pos,
        drop_pos: state.rdVanChuyen.drop_pos,
        use_range_time: state.rdVanChuyen.use_range_time,
        unmerged: state.rdVanChuyen.unmerged,
        email: state.rdVanChuyen.email,
        plane_number: state.rdVanChuyen.plane_number,
        company_name: state.rdVanChuyen.company_name,
        company_address: state.rdVanChuyen.company_address,
        company_mst: state.rdVanChuyen.company_mst,
        company_address_receive: state.rdVanChuyen.company_address_receive,
        plane_type: state.rdVanChuyen.plane_type,
        catch_in_house: state.rdVanChuyen.catch_in_house,
        vehicle_id: state.rdVanChuyen.vehicle_id,
        source: state.rdVanChuyen.source,
        ticket_session: state.rdVanChuyen.ticket_session,
        not_use: state.rdVanChuyen.not_use,
        ignore_duplicate_warning: state.rdVanChuyen.ignore_duplicate_warning,
        pay_method_id: state.rdVanChuyen.pay_method_id,
        xhd: state.rdVanChuyen.xhd,
        vehicle_icon: state.rdVanChuyen.vehicle_icon,
        discount_price: state.rdVanChuyen.discount_price,
        partner_name: state.rdVanChuyen.partner_name,
        lattitude_pick: state.rdVanChuyen.lattitude_pick,
        lngtitude_pick: state.rdVanChuyen.lngtitude_pick,
        lattitude_drop: state.rdVanChuyen.lattitude_drop,
        lngtitude_drop: state.rdVanChuyen.lngtitude_drop,
        token: state.thongtin.token
    }
}

export default connect(mapStateToProps)(ConfirmInformationExpress)