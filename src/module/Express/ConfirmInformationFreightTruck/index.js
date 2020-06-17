import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Modal, SafeAreaView } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as link from '../../../URL'
import { deleteDataVanChuyen } from '../../../core/Redux/action/Action'
import ImageTextDiChung from '../../../component/ImageTextDiChung'
import { NavigationActions, StackActions } from 'react-navigation';
import { Button, ButtonDialog } from '../../../component/Button'
import Dialog, { DialogTitle } from 'react-native-popup-dialog';
import { HeaderText } from '../../../component/Header';

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

const imageLocation = '../../../image/location2.png'
const imageCalendar = '../../../image/calendar.png'
const imagePerson = '../../../image/person.png'
const imageIconPhone = '../../../image/iconphone.png'
const imageEmail = '../../../image/email.png'
const imageDone = '../../../image/done.png'
const imagePayment = '../../../image/payment.png'
const imageHourglass = '../../../image/hourglass.png'
const imageComment = '../../../image/comment.png'
const imageIconCar = '../../../image/iconcar.png'

class ConfirmInformationFreightTruck extends Component {

    constructor() {
        super();
        this.state = {
            callingApi: false,
            addingTicket: false,
            bookingSuccess: false,
            result: null,
            ticket: null,
            visibalAgain: false,
            pick_pos: null,
            modalDetailTrip: false,
            depart_time2: '',
            id_booking: null,
        }
    }

    componentDidMount() {
        console.log(this.props.depart_time2);
        var time = new Date(this.props.depart_time2 + '+07:00').getTime();
        console.log(time);
        this.setState({
            pick_pos: this.props.lattitude_pick + ',' + this.props.lngtitude_pick,
            depart_time2: time
        })
    }

    async createHourlyBooking() {
        const { navigation } = this.props;
        const formData = new FormData();
        formData.append('full_name', this.props.full_name)
        formData.append('phone', this.props.use_phone)
        formData.append('email', this.props.email)
        formData.append('vehicle_id', this.props.vehicle_id)
        formData.append('city_id', this.props.city_id)
        formData.append('brand_partner_id', this.props.partner_id)
        formData.append('duration', this.props.duration)
        formData.append('pick_address', this.props.pick_add)
        formData.append('pick_pos', `${this.props.lattitude_pick},+${this.props.lngtitude_pick}`)
        formData.append('depart_time', this.props.depart_time)
        formData.append('comment', this.props.comment)
        if (navigation.getParam('blDiscount')) {
            formData.append('promotion_code', navigation.getParam('promotion'))
        }
        formData.append('vat', navigation.getParam('xhd') ? '1' : '0')
        formData.append('extra_price_hour', this.props.extra_price_hour)
        formData.append('extra_price_km', this.props.extra_price_km)
        formData.append('ticket_session', 'BOOK_MAIN')
        formData.append('lang', 'vi')
        if (navigation.getParam('xhd')) {
            formData.append('company[name]', this.props.company_name)
            formData.append('company[address]', this.props.company_address)
            formData.append('company[mst]', this.props.company_mst)
            formData.append('company[address_receive]', this.props.company_address_receive)
        }
        if (navigation.getParam('not_use')) {
            formData.append('not_use', navigation.getParam('not_use') ? 1 : 0)
            formData.append('use[name]', this.props.full_name2)
            formData.append('use[phone]', this.props.use_phone2)
        }
        formData.append('partner_domain', 'hub.dichung.vn')
        try {
            var url = link.URL_API + `passenger/create_hourly_booking?service_type=HOURLY_FREIGHT_TRUCK`
            console.log(url);
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "multipart/form-data",
                },
                body: formData
            });
            const jsonRes = await res.json();
            if (jsonRes.code == 'success') {
                this.setState({
                    ticket: jsonRes.data.trip_price_inquiry_code,
                    visibalAgain: false,
                    addingTicket: false,
                    bookingSuccess: true,
                });
                console.log(jsonRes.data.trip_price_inquiry_code)
            }
        }
        catch (error) {
            this.setStateAsync({
                addingTicket: false
            })
            console.log(error);
        }
    }

    async createHourlyBookingNew() {
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
                    "address": '',
                    "lat": '',
                    "long": ''
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
            "productType": "HOURLY_FREIGHT_TRUCK",
            "vehicle": {
                "id": this.props.vehicle_id,
                "name": this.props.vehicle_name,
                "image": this.props.vehicle_icon
            },
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
            "duration": this.props.duration,
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
                "pm_id": this.props.pm_id,
                "catch_in_house": navigation.getParam('broad_price') ? '1' : '0',
                "vehicle_id": this.props.vehicle_id,
                "brand_partner_id": this.props.partner_id,
                "xhd": navigation.getParam('xhd') ? 1 : 0,
                "city_id": this.props.city_id,
                "referral_code": "",
                "extra_price_hour": this.props.extra_price_hour,
                "extra_price_km": this.props.extra_price_km

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
                    // ticket: jsonRes.data.trip_price_inquiry_code,
                    visibalAgain: false,
                    addingTicket: false,
                    bookingSuccess: true,
                    id_booking: resJson.data._id,
                })
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
                    source={require(imageCalendar)}
                    text={this.props.depart_time}
                />
                <ImageTextDiChung
                    source={require(imageHourglass)}
                    text={'Thời lượng : ' + this.props.duration + ' giờ'}
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
                    text={'Thuê vận chuyển'}
                />
                <ImageTextDiChung
                    // source={require(imageIconCar)}
                    text={this.props.km_limit_format}
                    textBold={'Giới hạn: '}
                />
                <ImageTextDiChung
                    // source={require(imageIconCar)}
                    text={this.props.extra_price_km}
                    textBold={'Phụ trội theo km: '}
                />
                <ImageTextDiChung
                    // source={require(imageIconCar)}
                    text={this.props.extra_price_hour + ' giờ'}
                    textBold={'Phụ trội theo giờ: '}
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

    renderCommnet() {
        return (
            <View>
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
                <Text style={styles.textBigLeft1}>Tổng thanh toán : </Text>
                <Text style={styles.textBigRight1}>
                    {((this.props.merged - (navigation.getParam('blDiscount') ? this.props.discount_price : 0)) * (navigation.getParam('xhd') ? 11 / 10 : 1)).format(0, 3, '.')} đ
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
                <ImageTextDiChung
                    source={require(imageDone)}
                    text={navigation.getParam('detailPromotion')}
                />
            )
        }
    }

    goBack = () =>{
        this.props.navigation.goBack()
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderText textCenter={'Xác nhận thông tin'} onPressLeft={this.goBack} />
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
                    {this.renderCommnet()}

                    <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>

                    <ImageTextDiChung
                        source={require(imagePayment)}
                        text={navigation.getParam('Payment') == '0' ? 'Người gửi trả tiền mặt' : 'Trả trước'}
                    />

                    {this.renderVAT()}

                    {this.renderMGG()}

                    {this.renderTT()}


                    <Button
                        value={'Xác nhận đặt xe'}
                        onPress={() => {
                            this.state.callingApi ? null : this.createHourlyBookingNew();
                            this.setState({
                                addingTicket: true,
                            })
                        }}
                    />

                    <Dialog
                        visible={this.state.addingTicket}
                    >
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='large' />
                            </View>
                        </View>
                    </Dialog>
                </ScrollView>
                <Dialog
                    visible={this.state.bookingSuccess}
                    dialogTitle={<DialogTitle title="Đặt xe thành công" />}
                    width={0.8}
                >
                    <View>
                        <View style={{ flexDirection: 'column', padding: 8 }}>
                            <View style={{ height: 150, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                                    source={{ uri: this.props.vehicle_icon }}
                                />
                            </View>
                            <Text>Yêu cầu đặt xe của bạn đã được hệ thống ghi nhận. Chúng tôi sẽ liên lạc trong thời gian sớm nhất.</Text>
                            <ButtonDialog
                                text='Chi tiết'
                                onPress={() => {
                                    this.setState({
                                        modalDetailTrip: true,
                                        bookingSuccess : false,
                                    })
                                }}
                            />
                        </View>
                    </View>
                </Dialog>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalDetailTrip}
                    onOrientationChange={true}
                    onRequestClose={() => {
                        console.log('a');
                    }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                    }}>
                        <View style={{ flex: 1, backgroundColor: '#fff', padding: 8 }}>
                            <View style={{ height: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                {/* <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            modalDetailTrip: false,
                                        })
                                    }}
                                >
                                    <Image
                                        style={{ width: 40, height: 40, }}
                                        source={require(imageCancel)}
                                    />
                                </TouchableOpacity> */}

                                {/* <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold' }}>Chi tiết đơn hàng</Text> */}
                            </View>
                            <ScrollView>
                                {this.renderDetailTrip()}
                                {this.renderDetailOrder()}
                                {this.renderDetailCustommer()}
                                {this.renderDetailPeopleMove()}
                                {this.renderCommnet()}
                                {this.renderVAT()}
                                {this.renderMGG()}
                                {this.renderTT()}
                                <Button
                                    value={'Trang chủ'}
                                    onPress={() => {
                                        this.setState({
                                            bookingSuccess: false,
                                            modalDetailTrip: false,
                                        })
                                        this.props.deleteDataVanChuyen();
                                        // this.props.navigation.push("Home");
                                        const resetAction = StackActions.reset({
                                            index: 0,
                                            key: null,
                                            actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                        });
                                        this.props.navigation.dispatch(resetAction);
                                    }}
                                />
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        )
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
    textBigRight1: {
        padding: 1,
        fontSize: 16,
        color: '#77a300',
        flex: 1,
        textAlign: "right",
        marginTop : 8,
    },
    textBigLeft: {
        fontSize: 14,
    },
    textBigLeft1: {
        fontSize: 16,
        marginTop: 8,
        fontWeight: 'bold',

    },

})
function mapStateToProps(state) {
    return {
        pick_add: state.rdVanChuyen.pick_add,
        merged: state.rdVanChuyen.merged,
        depart_time: state.rdVanChuyen.depart_time,
        depart_time2: state.rdVanChuyen.depart_time2,
        vehicle_name: state.rdVanChuyen.vehicle_name,
        vat: state.rdVanChuyen.vat,
        full_name: state.rdVanChuyen.full_name,
        use_phone: state.rdVanChuyen.use_phone,
        comment: state.rdVanChuyen.comment,
        promotion_code: state.rdVanChuyen.promotion_code,
        full_name2: state.rdVanChuyen.full_name2,
        use_phone2: state.rdVanChuyen.use_phone2,
        email: state.rdVanChuyen.email,
        company_name: state.rdVanChuyen.company_name,
        company_address: state.rdVanChuyen.company_address,
        company_mst: state.rdVanChuyen.company_mst,
        company_address_receive: state.rdVanChuyen.company_address_receive,
        not_use: state.rdVanChuyen.not_use,
        xhd: state.rdVanChuyen.xhd,
        vehicle_icon: state.rdVanChuyen.vehicle_icon,
        discount_price: state.rdVanChuyen.discount_price,
        duration: state.rdVanChuyen.duration,
        lattitude_pick: state.rdVanChuyen.lattitude_pick,
        lngtitude_pick: state.rdVanChuyen.lngtitude_pick,
        vehicle_id: state.rdVanChuyen.vehicle_id,
        city_id: state.rdVanChuyen.city_id,
        partner_id: state.rdVanChuyen.brand_partner_id,
        extra_price_hour: state.rdVanChuyen.extra_price_hour_format,
        extra_price_km: state.rdVanChuyen.extra_price_km_format,
        km_limit_format: state.rdVanChuyen.km_limit_format,
    }
}

export default connect(mapStateToProps, { deleteDataVanChuyen: deleteDataVanChuyen })(ConfirmInformationFreightTruck)