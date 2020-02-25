import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Alert, Image, ActivityIndicator, Modal } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import * as link from '../../../URL'
import { deleteData } from '../../../core/Redux/action/Action'
import ImageTextDiChung from '../../../component/ImageTextDiChung'

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

const imageLocation = '../../../image/location.png'
const imageCalendar = '../../../image/calendar.png'
const imagePerson = '../../../image/person.png'
const imageIconPhone = '../../../image/iconphone.png'
const imageEmail = '../../../image/email.png'
const imageDone = '../../../image/done.png'
const imagePayment = '../../../image/payment.png'
const imageHourglass = '../../../image/hourglass.png'
const imageComment = '../../../image/comment.png'
const imageIconCar = '../../../image/iconcar.png'
const imageCancel = '../../../image/cancel.png'

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
        }
    }

    componentDidMount() {
        this.setState({
            pick_pos: this.props.lattitude_pick + ',' + this.props.lngtitude_pick,
        })
    }

    async createHourlyBooking() {
        const { navigation } = this.props;
        try {
            var url = link.URL_API + `passenger/create_hourly_booking?full_name=${this.props.full_name}&phone=${this.props.use_phone}&email=${this.props.email}&vehicle_id=${this.props.vehicle_id}&city_id=${this.props.city_id}&brand_partner_id=${this.props.partner_id}&duration=${this.props.duration}&pick_address=${this.props.pick_add}&pick_pos=${this.props.lattitude_pick},+${this.props.lngtitude_pick}&depart_time=${this.props.depart_time}&comment=${this.props.comment}&vat=${navigation.getParam('xhd') ? '1' : '0'}&extra_price_hour=${this.props.extra_price_hour}&extra_price_km=${this.props.extra_price_km}&ticket_session=BOOK_MAIN&lang=vi`
            if (navigation.getParam('xhd')) {
                url = url + `&company[name]=${this.props.company_name}&company[address]=${this.props.company_address}&company[mst]=${this.props.company_mst}&company[address_receive]=${this.props.company_address_receive}`
            }
            if (navigation.getParam('not_use')) {
                url = url + `&not_use=${navigation.getParam('not_use') ? 1 : 0}&use[name]=${this.props.full_name2}&use[phone]=${this.props.use_phone2}`
            }
            url = url + `&service_type=HOURLY_FREIGHT_TRUCK&partner_domain=cityads.com`
            console.log(url);
            const res = await fetch(url, {
                method: 'POST',
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
                    text={'Xe theo tour'}
                />
                <ImageTextDiChung
                    source={require(imageIconCar)}
                    text={'Giới hạn : ' + this.props.km_limit_format}
                />
                <ImageTextDiChung
                    source={require(imageIconCar)}
                    text={'Phụ trội theo km : ' + this.props.extra_price_km}
                />
                <ImageTextDiChung
                    source={require(imageIconCar)}
                    text={'Phụ trội theo giờ : ' + this.props.extra_price_hour + ' giờ'}
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
                    text={navigation.getParam('promotion')}
                />
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

                    {this.renderDetailTrip()}
                    {this.renderDetailOrder()}
                    {this.renderDetailCustommer()}
                    {this.renderDetailPeopleMove()}
                    {this.renderCommnet()}

                    <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>

                    <ImageTextDiChung
                        source={require(imagePayment)}
                        text={navigation.getParam('Payment') == '0' ? 'Trả sau' : 'Trả trước'}
                    />

                    {this.renderVAT()}

                    {this.renderMGG()}

                    {this.renderTT()}


                    <Button
                        style={{ marginTop: 8, }}
                        color='#77a300'
                        title='Xác nhận đặt xe'
                        onPress={() => {
                            this.state.callingApi ? null : this.createHourlyBooking();
                            this.setState({
                                addingTicket: true,
                            })
                        }}
                    />

                    <Dialog
                        visible={this.state.addingTicket}
                        title="">
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size='large' />
                        </View>
                    </Dialog>
                </ScrollView>
                <ConfirmDialog
                    visible={this.state.bookingSuccess}
                    positiveButton={{
                        title: 'Chi tiết',
                        onPress: () => {
                            this.setState({
                                modalDetailTrip: true,
                            })
                        }
                    }}
                    negativeButton={{
                        title: 'Trang chủ',
                        onPress: () => {
                            this.setState({
                                bookingSuccess: false
                            })
                            this.props.deleteData();
                            this.props.navigation.push("Home");
                        }
                    }}
                    title="Đặt xe thành công">
                    <View style={{ flexDirection: 'column', }}>
                        <View style={{ height: 150, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                                source={{ uri: this.props.vehicle_icon }}
                            />
                        </View>
                        <Text>Yêu cầu đặt xe của bạn đã được hệ thống ghi nhận. Chúng tôi sé liên lạc trong thời gian sớm nhất.</Text>
                    </View>
                </ConfirmDialog>

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
                        <View style={{ flex: 1, backgroundColor: '#fff', }}>
                            <View style={{ height: 48, flexDirection: 'row', justifyContent: 'center', margin: 8, alignItems: 'center' }}>
                                <TouchableOpacity
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
                                </TouchableOpacity>

                                <Text style={{ flex: 1, fontSize: 25, fontWeight: 'bold' }}>Chi tiết đơn hàng</Text>
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
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
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
        fontSize: 18,
        color: '#77a300',
        flex: 1,
        textAlign: "right"
    },
    textBigLeft: {
        fontSize: 15,
    },
    textBigLeft1: {
        fontSize: 18,
        marginTop: 8,
        fontWeight: 'bold',

    },

})
function mapStateToProps(state) {
    return {
        pick_add: state.rdVanChuyen.pick_add,
        merged: state.rdVanChuyen.merged,
        depart_time: state.rdVanChuyen.depart_time,
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

export default connect(mapStateToProps, { deleteData: deleteData })(ConfirmInformationFreightTruck)