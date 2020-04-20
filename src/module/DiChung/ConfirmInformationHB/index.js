import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator, Modal } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
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
                    // source={require(imageIconCar)}
                    text={this.props.km_limit_format}
                    textBold={'Giới hạn : '}
                />
                <ImageTextDiChung
                    // source={require(imageIconCar)}
                    text={this.props.extra_price_km}
                    textBold={'Phụ trội theo km : '}
                />
                <ImageTextDiChung
                    // source={require(imageIconCar)}
                    text={this.props.extra_price_hour + ' giờ'}
                    textBold={'Phụ trội theo giờ : '}
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
                        text={'trả sau'}
                    />

                    {this.renderVAT()}

                    {this.renderMGG()}

                    {this.renderTT()}


                    <Button
                        value={'Xác nhận đặt xe'}
                        onPress={() => {
                            this.state.callingApi ? null : this.createHourlyBooking();
                            this.setState({
                                addingTicket: true,
                            })
                        }}
                    />

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
                </ScrollView>
                <Dialog
                    visible={this.state.bookingSuccess}
                    dialogTitle={<DialogTitle title="Đặt xe thành công" />}
                    width={0.8}
                // footer={
                //     <DialogFooter>
                //         <DialogButton
                //             text="Chi tiết"
                //             onPress={() => {
                //                 this.setState({
                //                     modalDetailTrip: true,
                //                 })
                //             }}
                //         />
                //         <DialogButton
                //             text="Trang chủ"
                //             onPress={() => {
                //                 this.setState({
                //                     bookingSuccess: false
                //                 })
                //                 this.props.deleteData();
                //                 // this.props.navigation.push("Home");
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
                >
                    <View>
                        <View style={{ flexDirection: 'column', padding: 8 }}>
                            <View style={{ height: 150, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                                    source={{ uri: this.props.vehicle_icon }}
                                />
                            </View>
                            <Text>Yêu cầu đặt xe của bạn đã được hệ thống ghi nhận. Chúng tôi sé liên lạc trong thời gian sớm nhất.</Text>
                            <ButtonDialog
                                text="Chi tiết"
                                onPress={() => {
                                    this.setState({
                                        bookingSuccess: false,
                                        modalDetailTrip: true,
                                    })
                                }}
                            />
                        </View>
                    </View>
                </Dialog >

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
                        padding: 8,
                        backgroundColor: '#fff',
                    }}>
                        <View style={{ flex: 1, backgroundColor: '#fff', }}>
                            <View style={{ height: 0, flexDirection: 'row',  margin: 8 }}>
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
                                {/* <TouchableOpacity
                                    style={{ backgroundColor: '#77a300', padding: 8, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => {
                                        this.setState({
                                            bookingSuccess: false,
                                            modalDetailTrip: false,
                                        })
                                        this.props.deleteData();
                                        // this.props.navigation.push("Home");
                                        const resetAction = StackActions.reset({
                                            index: 0,
                                            key: null,
                                            actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                        });
                                        this.props.navigation.dispatch(resetAction);
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Trang chủ</Text>
                                </TouchableOpacity> */}
                                <Button
                                    value={'Trang chủ'}
                                    onPress={() => {
                                        this.setState({
                                            bookingSuccess: false,
                                            modalDetailTrip: false,
                                        })
                                        this.props.deleteData();
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
            </View >
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
        km_limit_format: state.info.km_limit_format,
    }
}

export default connect(mapStateToProps, { deleteData: deleteData })(ConfirmInformationHB)