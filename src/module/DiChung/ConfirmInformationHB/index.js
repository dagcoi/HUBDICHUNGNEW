import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Alert, Image, ActivityIndicator } from 'react-native';
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

class ConfirmInformationHB extends Component {

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
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        console.log('a')
        console.log(JSON.stringify(this.props.pick_add))
        console.log(this.props.merged)
        console.log(this.props.depart_time)
        console.log(this.props.vehicle_name)
        console.log(this.props.vat)
        console.log(this.props.full_name)
        console.log(this.props.use_phone)
        console.log(this.props.comment)
        console.log(this.props.promotion_code)
        console.log(this.props.full_name2)
        console.log(this.props.use_phone2)
        console.log(this.props.email)
        console.log(this.props.company_name)
        console.log(this.props.company_address)
        console.log(this.props.company_mst)
        console.log(this.props.company_address_receive)
        console.log(navigation.getParam('not_use') ? '1' : '0')
        console.log(navigation.getParam('xhd') ? '1' : '0')
        console.log(this.props.vehicle_icon)
        console.log(this.props.discount_price)
        console.log(this.props.duration)
        console.log(this.props.lattitude_pick)
        console.log(this.props.lngtitude_pick)
        console.log(this.props.vehicle_id)
        console.log(this.props.city_id)
        console.log(this.props.partner_id)
        console.log(this.props.extra_price_hour)
        console.log(this.props.extra_price_km)
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
            url = url + `&partner_domain=cityads.com`
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
                    text={this.props.duration + ' giờ'}
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
                    {((this.props.merged + (navigation.getParam('broad_price') ? 30000 : 0) - (navigation.getParam('blDiscount') ? this.props.discount_price : 0)) * (navigation.getParam('xhd') ? 11 / 10 : 1)).format(0, 3, '.')} đ
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
                    {this.renderDetailCustommer()}
                    {this.renderDetailPeopleMove()}
                    {this.renderCommnet()}

                    <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>

                    <ImageTextDiChung
                        source={require(imagePayment)}
                        text={navigation.getParam('Payment') == '0' ? 'Trả sau' : 'Trả trước'}
                    />

                    {this.renderVAT()}

                    {!navigation.getParam('broad_price') ? null :
                        <ImageTextDiChung
                            source={require(imageDone)}
                            text={'Đón biển tên : +30.000 đ'}
                        />
                    }

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
                    // positiveButton={{
                    //     title: 'Xem',
                    //     onPress: () => {
                    //         this.setState({
                    //             dialogCalendarVisible: false,
                    //             bookingSuccess: false
                    //         })
                    //         this.props.deleteData();
                    //     }
                    // }}
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
                        <Text>Mã vé của bạn là :<Text style={{ fontWeight: 'bold' }}> {this.state.ticket}</Text> </Text>
                        <Text>Yêu cầu đặt xe của bạn đã được hệ thống ghi nhận. Chúng tôi sé liên lạc trong thời gian sớm nhất.</Text>
                    </View>
                </ConfirmDialog>
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
        pick_add: state.info.pick_add,
        merged: state.info.merged,
        depart_time: state.info.depart_time,
        vehicle_name: state.info.vehicle_name,
        vat: state.info.vat,
        full_name: state.info.full_name,
        use_phone: state.info.use_phone,
        comment: state.info.comment,
        promotion_code: state.info.promotion_code,
        full_name2: state.info.full_name2,
        use_phone2: state.info.use_phone2,
        email: state.info.email,
        company_name: state.info.company_name,
        company_address: state.info.company_address,
        company_mst: state.info.company_mst,
        company_address_receive: state.info.company_address_receive,
        not_use: state.info.not_use,
        xhd: state.info.xhd,
        vehicle_icon: state.info.vehicle_icon,
        discount_price: state.info.discount_price,
        duration: state.info.duration,
        lattitude_pick: state.info.lattitude_pick,
        lngtitude_pick: state.info.lngtitude_pick,
        vehicle_id: state.info.vehicle_id,
        city_id: state.info.city_id,
        partner_id: state.info.brand_partner_id,
        extra_price_hour: state.info.extra_price_hour_format,
        extra_price_km: state.info.extra_price_km_format,
    }
}

export default connect(mapStateToProps, { deleteData: deleteData })(ConfirmInformationHB)