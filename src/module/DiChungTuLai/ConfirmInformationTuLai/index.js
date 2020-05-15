import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import CountDown from 'react-native-countdown-component';
import * as link from '../../../URL'
import { deleteDataTuLai } from '../../../core/Redux/action/Action'
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

class ConfirmInformationTuLai extends Component {

    constructor() {
        super();
        this.state = {
            callingApi: false,
            addingTicket: false,
            is_night_booking: true,
            result: null,
            ticket: null,
            visibalAgain: false,
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
                    source={require(imageLocation)}
                    text={this.props.drop_add}
                />

                <ImageTextDiChung
                    source={require(imageCalendar)}
                    text={this.props.depart_time}
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

    formComment() {
        return (
            <ImageTextDiChung
                source={require(imageComment)}
                text={this.props.comment}
            />
        )
    }

    renderDetailPeopleMove() {
        const { navigation } = this.props;
        if (navigation.getParam('not_use')) {
            return (
                <View>
                    <Text style={styles.textBigLeft1}>Chi tiết người thuê</Text>

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
                <Text style={styles.textBigLeft1}>Tổng thanh toán: </Text>
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
                    {this.formComment()}

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
                            this.state.callingApi ? null : this.addTicket()
                            this.setState({
                                addingTicket: true,
                            })
                        }}
                    />

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
                    //                 this.props.navigation.push("MapChungXe")
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
                                    text="Thử Lại"
                                    onPress={() => {
                                        this.reBiddingTicket();
                                    }}
                                />
                                <ButtonDialog
                                    text="Chọn hãng khác"
                                    onPress={() => {
                                        this.setState({ visibalAgain: false })
                                        this.props.navigation.push("MapChungXe")
                                    }}
                                />
                            </View>
                        </View>
                    </Dialog>

                    <Dialog
                        width={0.8}
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
                    //             text="Xem"
                    //             onPress={() => {
                    //                 this.setState({
                    //                     result: false,
                    //                 })
                    //                 this.props.deleteDataTuLai();
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
                                        this.props.deleteDataTuLai();
                                        this.TicketInformation()
                                    }}
                                />
                            </View>
                        </View>
                    </Dialog>

                    <Dialog
                        visible={!this.state.is_night_booking}
                        width={0.8}
                        // footer={
                        //     <DialogFooter>
                        //         <DialogButton
                        //             text="Xem"
                        //             onPress={() => {
                        //                 this.setState({
                        //                     dialogCalendarVisible: false,
                        //                     is_night_booking: true
                        //                 })
                        //                 this.props.deleteDataTuLai();
                        //                 this.TicketInformation()
                        //             }}
                        //         />
                        //         <DialogButton
                        //             text="Trang chủ"
                        //             onPress={() => {
                        //                 this.setState({
                        //                     is_night_booking: true
                        //                 })
                        //                 this.props.deleteDataTuLai();
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
                        <View style={{ flexDirection: 'column', padding: 8 }}>
                            <View style={{ height: 150, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                                    source={{ uri: this.props.vehicle_icon }}
                                />
                            </View>
                            <Text>Mã vé của bạn là:<Text style={{ fontWeight: 'bold' }}> {this.state.ticket}</Text> </Text>
                            <Text>Yêu cầu đặt xe của bạn đã được hệ thống ghi nhận. Chúng tôi sẽ liên lạc trong thời gian sớm nhất.</Text>

                            {/* <View style={{ flexDirection: 'row' }}> */}
                            <ButtonDialog
                                text="Chi tiết mã vé"
                                onPress={() => {
                                    this.setState({
                                        is_night_booking: true
                                    })
                                    this.props.deleteDataTuLai();
                                    this.TicketInformation()
                                }}
                            />
                            {/* </View> */}
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
                        is_night_booking: responseJson.is_night_booking,
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
                alert('Đặt xe thất bại!')
                this.setState({ addingTicket: false })
                // console.log(error);
            });
    }

    TicketInformation() {
        this.props.navigation.navigate("TicketInformationTuLai", {
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
        fontSize: 16,
        color: '#77a300',
        flex: 1,
        textAlign: "right"
    },

    textBigRight: {
        padding: 1,
        fontSize: 14,
        color: '#333333',
        flex: 1,
    },
    textBigLeft: {
        fontSize: 14,
        color: '#333333'
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
        drop_add: state.rdTuLai.drop_add,
        pick_add: state.rdTuLai.pick_add,
        merged: state.rdTuLai.merged,
        depart_time: state.rdTuLai.depart_time,
        vehicle_name: state.rdTuLai.vehicle_name,
        vat: state.rdTuLai.vat,
        full_name: state.rdTuLai.full_name,
        use_phone: state.rdTuLai.use_phone,
        thanhtoan: state.rdTuLai.thanhtoan,
        toll_fee: state.rdTuLai.toll_fee,
        chunk_id: state.rdTuLai.chunk_id,
        vehice_id: state.rdTuLai.vehice_id,
        village_id: state.rdTuLai.village_id,
        pm_id: state.rdTuLai.pm_id,
        partner_id: state.rdTuLai.partner_id,
        city_id: state.rdTuLai.city_id,
        comment: state.rdTuLai.comment,
        promotion_code: state.rdTuLai.promotion_code,
        dimension_id: state.rdTuLai.dimension_id,
        ride_method_id: state.rdTuLai.ride_method_id,
        chair: state.rdTuLai.chair,
        airport_id: state.rdTuLai.airport_id,
        street_id: state.rdTuLai.street_id,
        brand_partner_id: state.rdTuLai.brand_partner_id,
        is_from_airport: state.rdTuLai.is_from_airport,
        full_name2: state.rdTuLai.full_name2,
        use_phone2: state.rdTuLai.use_phone2,
        session_id: state.rdTuLai.session_id,
        transport_partner_id: state.rdTuLai.transport_partner_id,
        pick_pos: state.rdTuLai.pick_pos,
        drop_pos: state.rdTuLai.drop_pos,
        use_range_time: state.rdTuLai.use_range_time,
        unmerged: state.rdTuLai.unmerged,
        email: state.rdTuLai.email,
        plane_number: state.rdTuLai.plane_number,
        company_name: state.rdTuLai.company_name,
        company_address: state.rdTuLai.company_address,
        company_mst: state.rdTuLai.company_mst,
        company_address_receive: state.rdTuLai.company_address_receive,
        plane_type: state.rdTuLai.plane_type,
        catch_in_house: state.rdTuLai.catch_in_house,
        vehicle_id: state.rdTuLai.vehicle_id,
        source: state.rdTuLai.source,
        ticket_session: state.rdTuLai.ticket_session,
        not_use: state.rdTuLai.not_use,
        ignore_duplicate_warning: state.rdTuLai.ignore_duplicate_warning,
        pay_method_id: state.rdTuLai.pay_method_id,
        xhd: state.rdTuLai.xhd,
        vehicle_icon: state.rdTuLai.vehicle_icon,
        discount_price: state.rdTuLai.discount_price,
    }
}

export default connect(mapStateToProps, { deleteDataTuLai: deleteDataTuLai })(ConfirmInformationTuLai)