import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as link from '../../../URL'
import { deleteData } from '../../../core/Redux/action/Action'
import ImageTextDiChung from '../../../component/ImageTextDiChung'
import { Button, ButtonDialog } from '../../../component/Button'
import Dialog, { DialogTitle } from 'react-native-popup-dialog';
import { HeaderText } from '../../../component/Header'
import { SvgCalendar, SvgCar, SvgDuration, SvgMail, SvgPerson, SvgPhone, SvgPick, SvgTicket, SvgNote, SvgMoney, SvgNote2, SvgCheckCircleBorder, SvgDeliveryFrom, SvgNote3, SvgCalenderSelect1, SvgCheckSuccess, SvgDurationOver, SvgInfo } from '../../../icons';
import SimpleToast from 'react-native-simple-toast';
import HTML from 'react-native-render-html';
import styles from './style'
import PriceInfo from './PriceInfo'

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
const imageComment = '../../../image/comment.png'

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
            dataSend: null,
            listHourly: ['hourly_rent_taxi', 'hourly_rent_driver', 'hourly_freight_truck', 'hourly_tourist_car', 'hourly_car_rental'],
            infoCarCX: null,
            countSaturday: 0,
            countSunday: 0,
            countDay: 0,
            detailPrice: null,
            loadingPrice: true,
        }
        this.getDetail = this.getDetail.bind(this);
    }

    componentDidMount() {
        console.log('911' + this.props.bookDeliveryFrom)
        const send = JSON.parse(this.props.send)
        this.getURL(send)
        this.setDataSend()
        this.countWeekend(this.props.depart_time2, this.props.returnTime2)
        this.getDetail()
    }

    async getDetail() {
        const send = JSON.parse(this.props.send)
        var url = this.props.product_chunk_type === 'hourly_car_rental' ? url = link.URL_API_PORTAL + `price/v1/products/chungxe/${send.vehicle.id}` : ``
        if (url != '') {
            return fetch(url)
                .then((res) => res.json())
                .then((jsonRes) => {
                    this.setState({ infoCarCX: jsonRes.data })
                })
        }
        return null;
    }

    async getURL(send) {
        const { navigation } = this.props;
        var time = new Date(this.props.depart_time2 + '+07:00')
        var url = link.URL_API_PORTAL + `price/v1/products/price?provider=${send.provider.name}${this.product_chunk_type === 'ride_share' ? '' : `&price=` + this.props.cost}&productType=${this.props.product_chunk_type}&bookingTime=${time}&promotionDiscount=${this.props.discount_price}`
        const providerName = send.provider.name
        const productType = this.props.product_chunk_type
        console.log(providerName)
        switch (providerName) {
            case 'dichungtaxi':
                url = url + `&invoice=${(navigation.getParam('xhd') ? 1 : 0)}&catch_in_house=${(navigation.getParam('broad_price') ? 1 : 0)}&tollFee=${send.payment.tollFee ?? 0}`
                this.getPrice(url)
                break;

            case 'chungxe':
                var returnTime = new Date(this.props.returnTime2 + '+07:00')
                url = url + `&returnTime=${returnTime}&productId=${send.vehicle.id}`
                this.getPrice(url)
                break;

            case 'dichung':
                if (productType == 'hourly_car_rental') {
                    var returnTime = new Date(this.props.returnTime2 + '+07:00')
                    url = url + `&returnTime=${returnTime}&productId=${send.productId}`
                    this.getPrice(url)
                } else {
                    url = url + `&invoice=${navigation.getParam('xhd') ? 1 : 0}&catch_in_house=${navigation.getParam('broad_price') ? 1 : 0}&productId=${send.productId}&slot=${this.props.chair}`
                    this.getPrice(url)
                }
                break;
            case 'rideshare':
                url = url + `&slot=${this.props.chair}&extra=${JSON.stringify(send.extra)}`
                this.getPrice(url)
                break;
        }

        console.log('url: .....' + url)



    }

    async getPrice(url) {
        console.log(url)
        return fetch(url)
            .then((res) => res.json())
            .then((jsonRes) => {
                this.setState({ detailPrice: jsonRes.data, loadingPrice: false })
                console.log(jsonRes.data)
            })
    }

    componentWillUnmount() {

    }

    async setDataSend() {
        var time = new Date(this.props.depart_time2 + '+07:00').getTime();
        var timeReturn;
        if (this.props.returnTime2) {
            timeReturn = new Date(this.props.returnTime2 + '+07:00').getTime();
        }
        const { navigation } = this.props;
        const dataSend = JSON.parse(this.props.send)
        dataSend.startPoint =
        {
            "address": this.props.pick_add,
            "lat": this.props.latitude_pick,
            "long": this.props.longitude_pick
        }
        if (this.state.listHourly.indexOf(this.props.product_chunk_type) >= 0) {
            dataSend.duration = this.props.product_chunk_type === 'hourly_tourist_car' ? this.props.durationTravel / 24 : this.props.duration
            dataSend.endPoint =
            {
                "address": '',
                "lat": '',
                "long": ''
            }
        } else {
            dataSend.endPoint =
            {
                "address": this.props.drop_add,
                "lat": this.props.latitude_drop,
                "long": this.props.longitude_drop
            }

            dataSend.dimension = 'one_way'
        }
        dataSend.slot = (this.props.product_chunk_type == 'transfer_service' || this.props.product_chunk_type == 'ride_share') ? this.props.chair : 1
        dataSend.bookingUser = {
            "email": this.props.email,
            "phone": this.props.use_phone,
            "fullName": this.props.full_name,
            "gender": ""
        }
        dataSend.bookingTime = time
        dataSend.note = this.props.comment
        dataSend.beneficiary = {
            "email": navigation.getParam('not_use') ? this.props.email2 : this.props.email,
            "phone": navigation.getParam('not_use') ? this.props.use_phone2 : this.props.use_phone,
            "fullName": navigation.getParam('not_use') ? this.props.full_name2 : this.props.full_name,
            "gender": ""
        }
        if (dataSend.payment) {
            dataSend.payment.method = navigation.getParam('Payment') == '0' ? "cash" : "online"
            dataSend.payment.provider = "vnpay"
            dataSend.payment.return = ""
        } else {
            dataSend.payment = {
                "method": navigation.getParam('Payment') == '0' ? "cash" : "online",
                "provider": "vnpay",
                "return": ""
            }
        }
        dataSend.partner_domain = "hub.dichung.vn"
        if (this.props.product_chunk_type === 'hourly_car_rental') {
            dataSend.extra = {
                "bookDeliveryFrom": this.props.bookDeliveryFrom = 0 ? 'agent' : 'home',
                "returnTime": timeReturn,
            }
            dataSend.vehicleType = this.props.itemVehicle?.value
        }
        // dataSend.extra.partner_domain = Platform.OS + 'AppHub'
        if (navigation.getParam('plane_type') > -1) {
            dataSend.extra.plane_type = navigation.getParam('plane_type')
            dataSend.extra.plane_number = this.props.plane_number
            dataSend.extra.catch_in_house = navigation.getParam('broad_price') ? 1 : 0
        }
        dataSend.promocode = navigation.getParam('blDiscount') ? navigation.getParam('promotion') : null
        dataSend.invoice = navigation.getParam('xhd') ? {
            "name": this.props.company_name,
            "address": this.props.company_address,
            "taxCode": this.props.company_mst,
            "addressReceive": this.props.company_address_receive
        } : ''
        if (this.props.product_chunk_type == 'ride_share') {
            dataSend.extra.bookedSlots = this.props.chair
            dataSend.extra.note = this.props.comment
            dataSend.extra.phoneNumber = this.props.use_phone
            dataSend.extra.userId = this.props.idCustomer
            dataSend.extra.partner_domain = 'hub.dichung.vn'
        }
        console.log('123' + JSON.stringify(dataSend))
        this.setState({ dataSend: dataSend })
    }

    renderDetailTrip() {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết chuyến đi</Text>

                <ImageTextDiChung
                    children={<SvgPick />}
                    source={require(imageLocation)}
                    text={this.props.pick_add}
                />
                {this.state.listHourly.indexOf(this.props.product_chunk_type) < 0 ?
                    <View>
                        <ImageTextDiChung
                            children={<SvgPick color={'#eb6752'} />}
                            source={require(imageLocation)}
                            text={this.props.drop_add}
                        />
                        {this.props.product_chunk_type != 'express' &&
                            <ImageTextDiChung
                                children={<SvgPerson />}
                                source={require(imagePeople)}
                                text={this.props.chair + (this.props.product_chunk_type === 'express' ? ' gói hàng' : this.props.product_chunk_type === 'truck' ? ' xe' : ' người')}
                            />}
                    </View> : <View>
                        {this.props.product_chunk_type === 'hourly_car_rental' ?
                            null
                            :
                            <ImageTextDiChung
                                children={<SvgDuration />}
                                source={require(imageCalendar)}
                                text={'Thời lượng: ' + this.props.duration + ' giờ'}
                            />}
                    </View>}

                <ImageTextDiChung
                    children={<SvgCalendar />}
                    source={require(imageCalendar)}
                    text={this.props.depart_time + (this.props.product_chunk_type === 'hourly_car_rental' ? ' - ' + this.props.returnTime : '')}
                />

            </View>
        )
    }

    renderDetailOrder() {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết đơn hàng</Text>
                {this.props.product_chunk_type === 'hourly_car_rental' &&
                    <ImageTextDiChung
                        children={<SvgDeliveryFrom />}
                        text={this.props.bookDeliveryFrom == 0 ? "Nhận xe tại đại lí" : 'Nhận xe tại nhà riêng'}
                    />}

                {this.state.listHourly.indexOf(this.props.product_chunk_type) < 0 ?
                    <ImageTextDiChung
                        children={<SvgCar />}
                        source={require(imageIconCar)}
                        text={this.props.label}
                    />
                    : <View>
                        <ImageTextDiChung
                            children={<SvgCar />}
                            source={require(imageIconCar)}
                            // text={'Thuê xe theo tour'}
                            text={this.props.label}
                        />
                        {this.props.extra && this.props.extra.kmLimit && <ImageTextDiChung textBold={'Giới hạn: '} text={this.props.extra.kmLimit + ' km'} />}
                        {this.props.extra && this.props.extra.kmExtra && <ImageTextDiChung textBold={'Phụ trội theo km: '} text={this.props.extra.kmExtra.format(0, 3, '.') + ' đ/km'} />}
                        {this.props.extra && this.props.extra.hourExtra && <ImageTextDiChung textBold={'Phụ trội theo giờ: '} text={this.props.extra.hourExtra.format(0, 3, '.') + ' đ/giờ'} />}
                    </View>}

            </View>
        )
    }

    renderCX(item) {
        var list = [];
        if (item?.info?.description != '') {
            list = item?.info?.description?.split("<br>")
            console.log(list)
        }
        return (
            <View>
                {list.map((item, index) => (
                    item != '' &&
                    <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                        <View style={{ paddingHorizontal: 2 }} >
                            <SvgNote3 />
                        </View>
                        <HTML html={item} />
                    </View>
                ))}
            </View>
        )
    }

    renderDetailCX(item) {
        return (
            <View>
                {item.info.priceExtra && <View>
                    {item.info.priceExtra?.weekendExtra && this.state.detailPrice?.saturdayPrice &&
                        <View>
                            <ImageTextDiChung
                                children={<SvgCalenderSelect1 />}
                                text={`Phụ phí thuê xe cuối tuần: `}
                            />
                            <View style={{ paddingLeft: 20 }}>
                                {item.info.priceExtra.weekendExtra.saturday && <ImageTextDiChung text={`- Thứ 7: ${parseInt(item.info.priceExtra.weekendExtra.saturday).format(0, 3, '.')}`} />}
                                {item.info.priceExtra.weekendExtra.sunday && < ImageTextDiChung text={`- Chủ nhật: ${parseInt(item.info.priceExtra.weekendExtra.sunday).format(0, 3, '.')}`} />}
                            </View>
                        </View>
                    }
                    <ImageTextDiChung
                        children={<SvgDurationOver />}
                        text={'Phụ trội theo giờ: ' + ((parseInt(item.info.priceExtra.hourExtra)).format(0, 3, '.') ?? '') + ' đ/giờ'}
                    />
                    <ImageTextDiChung
                        children={<SvgCheckSuccess />}
                        text={'Phụ trội theo km: ' + ((parseInt(item.info.priceExtra.kmExtra)).format(0, 3, '.') ?? '') + ` đ/km (tối đa ${item.info.priceExtra.kmLimit} km)`}
                    />
                    <ImageTextDiChung
                        children={<SvgInfo />}
                        text={'Phí giao xe 50,000 ₫ nếu dưới 5km, trên 5km tính phí 10,000 ₫/km'}
                    />
                </View>}
            </View>
        )
    }

    renderDetailCustomer() {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết khách hàng</Text>

                <ImageTextDiChung
                    children={<SvgPerson />}
                    source={require(imagePerson)}
                    text={this.props.full_name}
                />

                <ImageTextDiChung
                    children={<SvgPhone />}
                    source={require(imageIconPhone)}
                    text={this.props.use_phone}
                />

                <ImageTextDiChung
                    children={<SvgMail />}
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
                    children={<SvgTicket />}
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
                        children={<SvgPerson />}
                        source={require(imagePerson)}
                        text={this.props.full_name2}
                    />

                    <ImageTextDiChung
                        children={<SvgPhone />}
                        source={require(imageIconPhone)}
                        text={this.props.use_phone2}
                    />

                    <ImageTextDiChung
                        children={<SvgMail />}
                        source={require(imageIconPhone)}
                        text={this.props.email2}
                    />

                </View>
            )
        } else {
            return null;
        }
    }

    renderTT() {
        const { navigation } = this.props;
        const xhd = navigation.getParam('xhd')
        const send = JSON.parse(this.props.send);
        console.log('abc:...' + this.state.countDay)
        if (this.state.loadingPrice) {
            return null;
        } else {
            if (this.state.detailPrice != null) {
                return (
                    <PriceInfo
                        product_chunk_type={this.props.product_chunk_type}
                        detailPrice={this.state.detailPrice}
                        cost={this.props.cost}
                        send={send}
                        xhd={xhd}
                    />
                )
            }
        }
    }

    formComment() {
        return (
            <ImageTextDiChung
                children={<SvgNote />}
                source={require(imageComment)}
                text={this.props.comment}
            />
        )
    }

    async countWeekend(date1, date2) {
        var d1 = new Date(date1),
            d2 = new Date(date2),
            result = {
                saturday: 0,
                sunday: 0,
            },
            countDay = 0;
        while (d1 <= d2) {
            var day = d1.getDay();
            countDay++
            if (day === 6) {
                result.saturday++
            }
            if (day === 0) {
                result.sunday++
            }
            d1.setDate(d1.getDate() + 1);
        }
        console.log(result.saturday)
        console.log(result.sunday)
        this.setState({ countSaturday: result.saturday, countSunday: result.sunday, countDay: countDay })
        // return result.saturday+ result.sunday;
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { navigation } = this.props;
        console.log(this.state.infoCarCX)
        console.log('broad_price' + navigation.getParam('broad_price'))
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderText textCenter={'Xác nhận thông tin'} onPressLeft={this.goBack} />
                <View style={{ flex: 1, padding: 8 }}>
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ height: 150, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                                source={{ uri: this.props.vehicle_icon }}
                            />
                        </View>

                        {this.renderDetailTrip()}
                        {this.renderDetailOrder()}
                        {this.props.product_chunk_type === 'hourly_car_rental' && this.state.infoCarCX != null && this.renderCX(this.state.infoCarCX)}
                        {this.renderDetailCustomer()}
                        {this.renderDetailPeopleMove()}
                        {this.formComment()}
                        {this.renderAirport()}

                        <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>

                        <ImageTextDiChung
                            children={<SvgMoney />}
                            source={require(imagePayment)}
                            text={navigation.getParam('Payment') == '0' ? 'Trả sau' : 'Trả trước'}
                        />

                        {this.props.product_chunk_type === 'hourly_car_rental' && this.state.infoCarCX != null && this.renderDetailCX(this.state.infoCarCX)}
                        {this.renderTT()}

                        <Button
                            value={'Xác nhận đặt xe'}
                            onPress={() => {
                                this.state.loadingPrice ? null :
                                    this.state.callingApi ? null : this.addTicket()
                                this.setState({
                                    addingTicket: true,
                                })
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
                            visible={!this.state.is_night_booking || this.state.result}
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
                                <Text>Yêu cầu đặt xe của bạn đã được hệ thống ghi nhận. Chúng tôi sẽ liên lạc trong thời gian sớm nhất.</Text>
                                <ButtonDialog
                                    text="Chi tiết mã vé"
                                    onPress={() => {
                                        this.setState({
                                            dialogCalendarVisible: false,
                                            is_night_booking: true,
                                            result: false,
                                        })
                                        this.props.deleteData();
                                        this.TicketInformation()
                                    }}
                                />
                            </View>
                        </Dialog>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    addTicket() {
        const url = link.URL_API_PORTAL + `booking/v1/bookings`
        console.log(url)
        const jsonStr = JSON.stringify(
            this.state.dataSend
        )
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
                console.log('1111' + JSON.stringify(resJson))
                if (resJson.data) {
                    this.setState({
                        callingApi: false,
                        addingTicket: false,
                        is_night_booking: resJson.is_night_booking,
                        visibleSearchDriver: resJson.is_night_booking,
                        id_booking: resJson.data._id,
                    })
                } else {
                    this.setState({
                        callingApi: false,
                        addingTicket: false
                    })
                    SimpleToast.show(resJson.error.message, SimpleToast.SHORT);
                }
            })
            .catch(error => {
                this.setState({
                    callingApi: false,
                    addingTicket: false,
                })
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

function mapStateToProps(state) {
    return {
        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
        depart_time: state.info.depart_time,
        depart_time2: state.info.depart_time2,
        vehicle_name: state.info.vehicle_name,
        full_name: state.info.full_name,
        use_phone: state.info.use_phone,
        comment: state.info.comment,
        chair: state.info.chair,
        full_name2: state.info.full_name2,
        use_phone2: state.info.use_phone2,
        email2: state.info.email2,
        email: state.info.email,
        plane_number: state.info.plane_number,
        company_name: state.info.company_name,
        company_address: state.info.company_address,
        company_mst: state.info.company_mst,
        company_address_receive: state.info.company_address_receive,
        plane_type: state.info.plane_type,
        source: state.info.source,
        vehicle_icon: state.info.vehicle_icon,
        discount_price: state.info.discount_price,
        people: state.info.people,
        latitude_pick: state.info.latitude_pick,
        longitude_pick: state.info.longitude_pick,
        latitude_drop: state.info.latitude_drop,
        longitude_drop: state.info.longitude_drop,
        token: state.thongtin.token,
        cost: state.info.cost,
        send: state.info.send,
        label: state.info.label,
        product_chunk_type: state.info.product_chunk_type,
        duration: state.info.duration,
        durationTravel: state.info.durationTravel,
        extra: state.info.extra,
        returnTime2: state.info.returnTime2,
        rent_date: state.info.rent_date,
        time_drop: state.info.time_drop,
        returnTime: state.info.returnTime,
        discount_price: state.info.discount_price,
        idCustomer: state.info.idCustomer,
        bookDeliveryFrom: state.info.bookDeliveryFrom,
        itemVehicle: state.info.itemVehicle,
    }
}

export default connect(mapStateToProps, { deleteData: deleteData })(ConfirmInformation)