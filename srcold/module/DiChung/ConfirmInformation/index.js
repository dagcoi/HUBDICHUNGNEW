import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Alert, Image, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import CountDown from 'react-native-countdown-component';
import * as link from '../../../URL'


Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

const imageLocation = '../../../image/location.png'
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
        }
    }

    componentDidMount() {
        this._interval = setInterval(() => {
            const url = link.URL_DEBUG + `agent/check_night_booking_partner_received?ticket_id=${this.state.ticket}`
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
    }

    async reBiddingTicket(){
        const url = `https://dev.taxiairport.vn/api.php/home/auto_process_ticket?id=${this.state.ticket}&reprocess_night_booking=1`
        console.log(url);
        const res = await fetch(url);
        const jsonRes = await res.json();
        if (jsonRes.code == 'success') {
            this.setState({
                visibalAgain : false,
                visibleSearchDriver: true,
                is_night_booking : true,
            });
        }
    }

    renderDetailTrip() {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết chuyến đi</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center', marginTop: 8 }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageLocation)}
                    />
                    <Text style={styles.textBigRight}>{this.props.pick_add}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageLocation)}
                    />
                    <Text style={styles.textBigRight}>{this.props.drop_add}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageCalendar)}
                    />
                    <Text style={styles.textBigRight}>{this.props.depart_time}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imagePeople)}
                    />
                    <Text style={styles.textBigRight}>{this.props.chair} người</Text>
                </View>
            </View>
        )
    }

    renderDetailOrder() {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết đơn hàng</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageIconCar)}
                    />
                    <Text style={styles.textBigRight}>{this.props.ride_method_id == '1' ? 'Đi riêng' : 'Đi chung'}</Text>
                </View>
            </View>
        )
    }

    renderDetailCustommer() {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết khách hàng</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imagePerson)}
                    />
                    <Text style={styles.textBigRight}>{this.props.full_name}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageIconPhone)}
                    />
                    <Text style={styles.textBigRight}>{this.props.use_phone}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageEmail)}
                    />
                    <Text style={styles.textBigRight}>{this.props.email}</Text>
                </View>
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
        const { navigation } = this.props;
        if (navigation.getParam('not_use')) {
            return (
                <View>
                    <Text style={styles.textBigLeft1}>Chi tiết người đi</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                        <Image
                            style={styles.leftIcon}
                            source={require(imagePerson)}
                        />
                        <Text style={styles.textBigRight}>{this.props.full_name2}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                        <Image
                            style={styles.leftIcon}
                            source={require(imageIconPhone)}
                        />
                        <Text style={styles.textBigRight}>{this.props.use_phone2}</Text>
                    </View>

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
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageDone)}
                    />
                    <Text style={styles.textBigRight}> + 10%</Text>
                </View>
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
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                    <Image
                        style={styles.leftIcon}
                        source={require(imageDone)}
                    />
                    <Text style={styles.textBigRight}>{navigation.getParam('promotion')}</Text>
                </View>
            )
        }
    }

    render() {
        const { navigation } = this.props;
        // console.log(this.props.vehicle_icon)
        return (
            <View style={{ padding: 8 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ height: 150, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                            source={{ uri: this.props.vehicle_icon }}
                        />
                    </View>
                    {/* <Text>{this.props.vehicle_icon}</Text> */}

                    {this.renderDetailTrip()}
                    {this.renderDetailOrder()}
                    {this.renderDetailCustommer()}
                    {this.renderDetailPeopleMove()}

                    <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                        <Image
                            style={styles.leftIcon}
                            source={require(imagePayment)}
                        />
                        <Text style={styles.textBigRight}>{this.props.pay_method_id == '3' ? 'Trả sau' : 'Trả trước'}</Text>
                    </View>

                    {this.renderVAT()}

                    {!navigation.getParam('broad_price') ? null :

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                            <Image
                                style={styles.leftIcon}
                                source={require(imageDone)}
                            />
                            <Text style={styles.textBigRight}>Đón biển tên : +30.000 đ</Text>
                        </View>}

                    {this.renderMGG()}

                    {this.renderTT()}


                    <Button
                        style={{ marginTop: 8, }}
                        color='#77a300'
                        title='Xác nhận đặt xe'
                        onPress={() => {
                            this.state.callingApi ? null : this.addTicket()
                            this.setState({
                                addingTicket: true,
                            })
                        }}
                    />

                    <Dialog
                        visible={this.state.visibleSearchDriver}
                        title="Đang tìm tài xế">
                        <View style={{ flexDirection: 'row' }}>
                            <ActivityIndicator size='large' />
                            <Text style={{ fontSize: 25 }}>Quý khách vui lòng đợi trong giây lát...</Text>
                        </View>
                        <CountDown
                            until={180}
                            onFinish={() => {
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
                    </Dialog>

                    <ConfirmDialog
                        visible={this.state.visibalAgain}
                        title="Tìm kiếm thất bại"
                        positiveButton={{
                            title: 'Thử Lại',
                            onPress: () => {
                                // this.setState({ visibalAgain: false })
                                this.reBiddingTicket();
                            }
                        }}
                        negativeButton={{
                            title: 'Chọn hãng khác',
                            onPress: () => {
                                this.setState({ visibalAgain: false })
                                this.props.navigation.push("MapDiChung")

                            }
                        }}
                    >
                        <View>
                            <Image
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                                source={require(imageSorry)}
                            />

                            <Text style={{ fontSize: 18 }}>Hiện tại không có tài xế nào nhận yêu cầu của bạn. Xin vui lòng thử lại hoặc chọn giờ đi khác.</Text>

                        </View>
                    </ConfirmDialog>

                    <Dialog
                        visible={this.state.addingTicket}
                        title="">
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size='large' />
                        </View>
                    </Dialog>

                    <ConfirmDialog
                        visible={this.state.result}
                        title="Đặt xe thành công"
                        positiveButton={{
                            title: 'Xem',
                            onPress: () => {
                                this.setState({
                                    result: false,
                                })
                                this.TicketInformation()
                            }
                        }}
                    >
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

                    <ConfirmDialog
                        visible={!this.state.is_night_booking}
                        positiveButton={{
                            title: 'Xem',
                            onPress: () => {
                                this.setState({
                                    dialogCalendarVisible: false,
                                    is_night_booking: true
                                })
                                this.TicketInformation()
                            }
                        }}
                        negativeButton={{
                            title: 'Trang chủ',
                            onPress: () => {
                                this.setState({
                                    is_night_booking: true
                                })
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



                </ScrollView>
            </View>
        )
    }

    addTicket() {
        const url = link.URL_DEBUG + 'passenger/create_ticket'
        const formData = new FormData();
        const { navigation } = this.props;

        formData.append('plane_number', this.props.plane_number);
        formData.append('plane_type', navigation.getParam('plane_type'));
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
        formData.append('source', this.props.source);
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
            .catch((error) => {
                alert('dat xe that bai')
                this.setState({ addingTicket: false })
                // console.log(error);
            });
    }

    TicketInformation() {
        this.props.navigation.navigate("TicketInformation", {
            'ticket_id': this.state.ticket,
            'phone_number': this.props.use_phone,
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
        textAlign: "right"
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
    }
}

export default connect(mapStateToProps)(ConfirmInformation)