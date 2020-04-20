import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux'
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

const imageLocation = '../../../image/location.png'
const imageCalendar = '../../../image/calendar.png'
const imagePerson = '../../../image/person.png'
const imageIconPhone = '../../../image/iconphone.png'
const imageEmail = '../../../image/email.png'
const imageIconPlan = '../../../image/iconplan.png'
const imageDone = '../../../image/done.png'
const imagePayment = '../../../image/payment.png'
const imageSorry = '../../../image/sorry.png'
const imageSetting = '../../../image/setting.png'
const imageComment = '../../../image/comment.png'

class ConfirmInformationXeChung extends Component {

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
                    source={require(imageSetting)}
                    text={this.props.partner_name}
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

                <ImageTextDiChung
                    source={require(imageComment)}
                    text={this.props.comment}
                />
            </View>
        )
    }

    renderAirport() {
        if (!this.props.is_from_airport) {
            return null;
        } else {
            return (
                <ImageTextDiChung
                    source={require(imageIconPlan)}
                    text={this.props.macb}
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

                    <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>

                    <ImageTextDiChung
                        source={require(imagePayment)}
                        text={navigation.getParam('Payment') == '0' ? 'Trả sau' : 'Trả trước'}
                    />

                    {this.renderVAT()}

                    {this.renderTT()}


                    <Button
                        value='Hoàn thành thuê tài xế'
                        onPress={() => {
                            this.state.callingApi ? null : this.addTicket()
                            this.setState({
                                addingTicket: true,
                            })
                        }}
                    />

                    <Dialog
                        visible={this.state.visibleSearchDriver}
                        dialogTitle={<DialogTitle title="Đang tìm tài xế" />}
                        width={0.8}
                    >
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <ActivityIndicator size='large' />
                                <Text style={{ fontSize: 16 }}>Quý khách vui lòng đợi trong giây lát...</Text>
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
                    </Dialog>

                    <Dialog
                        visible={this.state.visibalAgain}
                        width={0.8}
                        dialogTitle={<DialogTitle title="Tìm kiếm thất bại" />}
                    // footer={
                    //     <DialogFooter>
                    //         <DialogButton
                    //             text={'Thử lại'}
                    //             onPress={() => {
                    //                 this.reBiddingTicket();
                    //             }}
                    //         />
                    //         <DialogButton
                    //             text={'Chọn hãng khác'}
                    //             onPress={() => {
                    //                 this.setState({ visibalAgain: false })
                    //                 this.props.navigation.push("MapXeChung")
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

                                <Text style={{ fontSize: 16 }}>Hiện tại không có tài xế nào nhận yêu cầu của bạn. Xin vui lòng thử lại hoặc chọn giờ đi khác.</Text>

                                <ButtonDialog
                                    text={'Thử lại'}
                                    onPress={() => {
                                        this.reBiddingTicket();
                                    }}
                                />
                                <ButtonDialog
                                    text={'Chọn hãng khác'}
                                    onPress={() => {
                                        this.setState({ visibalAgain: false })
                                        this.props.navigation.push("MapXeChung")
                                    }}
                                />
                            </View>
                        </View>
                    </Dialog>

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
                        dialogTitle={<DialogTitle title="Đặt xe thành công" />}
                    // footer={
                    //     <DialogFooter>
                    //         <DialogButton
                    //             text={'Xem'}
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
                                <Text>Mã vé của bạn là :<Text style={{ fontWeight: 'bold' }}> {this.state.ticket}</Text> </Text>
                                <Text>Yêu cầu đặt xe của bạn đã được hệ thống ghi nhận. Chúng tôi sẽ liên lạc trong thời gian sớm nhất.</Text>

                                <ButtonDialog
                                    text={'Chi tiết mã vé'}
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
                        width={0.8}
                        visible={!this.state.is_night_booking}
                        // footer={
                        //     <DialogFooter>
                        //         <DialogButton
                        //             text='Xem'
                        //             onPress={() => {
                        //                 this.setState({
                        //                     dialogCalendarVisible: false,
                        //                     is_night_booking: true
                        //                 })
                        //                 this.TicketInformation()
                        //             }}
                        //         />
                        //         <DialogButton
                        //             text='Trang chủ'
                        //             onPress={() => {
                        //                 this.setState({
                        //                     is_night_booking: true
                        //                 })
                        //                 const resetAction = StackActions.reset({
                        //                     index: 0,
                        //                     key: null,
                        //                     actions: [NavigationActions.navigate({ routeName: 'Home' })],
                        //                 });
                        //                 this.props.navigation.dispatch(resetAction);
                        //             }}
                        //         />
                        //     </DialogFooter>
                        // }
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
                                <Text>Mã vé của bạn là :<Text style={{ fontWeight: 'bold' }}> {this.state.ticket}</Text> </Text>
                                <Text>Yêu cầu đặt xe của bạn đã được hệ thống ghi nhận. Chúng tôi sẽ liên lạc trong thời gian sớm nhất.</Text>

                                <ButtonDialog
                                    text='Chi tiết mã vé'
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
        formData.append('unmerged_select', this.props.unmerged);
        if (navigation.getParam('blDiscount')) {
            formData.append('promotion_code', navigation.getParam('promotion'))
        }
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
        if (navigation.getParam('not_use')) {
            formData.append('not_use', 1);
            formData.append('use[name]', this.props.full_name2);
            formData.append('use[phone]', this.props.use_phone2);
        }
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
            });
    }

    TicketInformation() {
        this.props.navigation.navigate("TicketInformationXeChung", {
            'ticket_id': this.state.ticket,
            'phone_number': this.props.use_phone,
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
    textBigRight1: {
        padding: 1,
        fontSize: 16,
        color: '#77a300',
        flex: 1,
        textAlign: "right"
    },
    textBigLeft1: {
        fontSize: 16,
        marginTop: 8,
        fontWeight: 'bold',
    },
})
function mapStateToProps(state) {
    return {
        drop_add: state.rdTaixe.drop_add,
        pick_add: state.rdTaixe.pick_add,
        merged: state.rdTaixe.merged,
        depart_time: state.rdTaixe.depart_time,
        vehicle_name: state.rdTaixe.vehicle_name,
        vat: state.rdTaixe.vat,
        full_name: state.rdTaixe.full_name,
        use_phone: state.rdTaixe.use_phone,
        thanhtoan: state.rdTaixe.thanhtoan,
        toll_fee: state.rdTaixe.toll_fee,
        chunk_id: state.rdTaixe.chunk_id,
        vehice_id: state.rdTaixe.vehice_id,
        village_id: state.rdTaixe.village_id,
        pm_id: state.rdTaixe.pm_id,
        partner_id: state.rdTaixe.partner_id,
        partner_name: state.rdTaixe.partner_name,
        city_id: state.rdTaixe.city_id,
        comment: state.rdTaixe.comment,
        promotion_code: state.rdTaixe.promotion_code,
        dimension_id: state.rdTaixe.dimension_id,
        ride_method_id: state.rdTaixe.ride_method_id,
        chair: state.rdTaixe.chair,
        airport_id: state.rdTaixe.airport_id,
        street_id: state.rdTaixe.street_id,
        brand_partner_id: state.rdTaixe.brand_partner_id,
        is_from_airport: state.rdTaixe.is_from_airport,
        full_name2: state.rdTaixe.full_name2,
        use_phone2: state.rdTaixe.use_phone2,
        session_id: state.rdTaixe.session_id,
        transport_partner_id: state.rdTaixe.transport_partner_id,
        pick_pos: state.rdTaixe.pick_pos,
        drop_pos: state.rdTaixe.drop_pos,
        use_range_time: state.rdTaixe.use_range_time,
        unmerged: state.rdTaixe.unmerged,
        email: state.rdTaixe.email,
        plane_number: state.rdTaixe.plane_number,
        company_name: state.rdTaixe.company_name,
        company_address: state.rdTaixe.company_address,
        company_mst: state.rdTaixe.company_mst,
        company_address_receive: state.rdTaixe.company_address_receive,
        plane_type: state.rdTaixe.plane_type,
        catch_in_house: state.rdTaixe.catch_in_house,
        vehicle_id: state.rdTaixe.vehicle_id,
        source: state.rdTaixe.source,
        ticket_session: state.rdTaixe.ticket_session,
        not_use: state.rdTaixe.not_use,
        ignore_duplicate_warning: state.rdTaixe.ignore_duplicate_warning,
        pay_method_id: state.rdTaixe.pay_method_id,
        xhd: state.rdTaixe.xhd,
        vehicle_icon: state.rdTaixe.vehicle_icon,
        discount_price: state.rdTaixe.discount_price,
    }
}

export default connect(mapStateToProps)(ConfirmInformationXeChung)