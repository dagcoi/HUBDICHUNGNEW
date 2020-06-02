import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import * as link from '../../../URL'
import ImageTextDiChung from '../../../component/ImageTextDiChung'
import { NavigationActions, StackActions } from 'react-navigation';
import { Button } from '../../../component/Button'

const imageLocation = '../../../image/location2.png'
const imageCalendar = '../../../image/calendar.png'
const imageIconCar = '../../../image/iconcar.png'
const imagePerson = '../../../image/person.png'
const imageIconPhone = '../../../image/iconphone.png'
const imageEmail = '../../../image/email.png'
const imageDone = '../../../image/done.png'
const imagePayment = '../../../image/payment.png'
const imageComment = '../../../image/comment.png'


Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

class TicketInformationXeChung extends Component {

    constructor() {
        super();
        this.state = {
            info: {},
            is_loading: true,
            message: '',
            value: 0,
            loadData: true,
            timeReload: 2000,
        }
    }

    componentDidMount() {
        // const { navigation } = this.props;
        // const url = link.URL_API + `passenger/get_ticket_info`
        // const formData = new FormData();
        // formData.append('ticket_code', navigation.getParam('ticket_id'));
        // formData.append('phone_number', navigation.getParam('phone_number'))
        // const res = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': "application/json",
        //         'Content-Type': "multipart/form-data",
        //     },
        //     body: formData
        // });
        // const jsonRes = await res.json();
        // this.setState({
        //     info: jsonRes.data,
        //     is_loading: false,
        // });
        // return (jsonRes);
        this.getTicketbyBookingId()
    }

    async getTicketbyBookingId() {
        this._interval = setInterval(() => {
            const { navigation } = this.props;
            const url = link.URL_API_PORTAL + `booking/v1/bookings/${navigation.getParam('id_booking')}`
            if (this.state.loadData) {
                console.log(url);
                return fetch(url)
                    .then((res) => res.json())
                    .then((jsonRes) => {
                        // console.log(JSON.stringify(jsonRes))
                        // console.log(jsonRes.data.result)
                        this.setState({
                            info: jsonRes.data,
                            // loadData: jsonRes.data.forward.status == 'forwarded' ? false: true,
                            is_loading: false,
                            timeReload: jsonRes.data.forward.status == 'forwarded' ? 20000 : 2000
                        })
                    }
                    )
            } else {
                return null;
            }
        }, this.state.timeReload);
    }

    renderDetailTrip(item) {
        const time = item.bookingTime
        const date = new Date(time).toLocaleDateString()
        const hours = new Date(time).toLocaleTimeString()
        const strtime = hours + " " + date
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết dịch vụ</Text>

                <ImageTextDiChung
                    source={require(imageLocation)}
                    text={item.startPoints[0].address}
                />

                <ImageTextDiChung
                    source={require(imageLocation)}
                    text={item.endPoints[0].address}
                />

                <ImageTextDiChung
                    source={require(imageCalendar)}
                    text={strtime}
                />
            </View>
        )
    }

    renderDetailOrder(item) {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết đơn hàng</Text>

                <ImageTextDiChung
                    source={require(imageIconCar)}
                    text={'Loại dịch vụ: Thuê tài xế'}
                />
            </View>
        )
    }

    renderDetailCustommer(item) {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết khách hàng</Text>

                <ImageTextDiChung
                    source={require(imagePerson)}
                    text={item.bookingUser.fullName}
                />

                <ImageTextDiChung
                    source={require(imageIconPhone)}
                    text={item.bookingUser.phone}
                />

                <ImageTextDiChung
                    source={require(imageEmail)}
                    text={item.bookingUser.email}
                />

                <ImageTextDiChung
                    source={require(imageComment)}
                    text={item.note}
                />
            </View>
        )
    }

    renderDetailPeopleMove(item) {

        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết người dùng</Text>

                <ImageTextDiChung
                    source={require(imagePerson)}
                    text={item.beneficiary.fullName}
                />

                <ImageTextDiChung
                    source={require(imageIconPhone)}
                    text={item.beneficiary.phone}
                />
            </View>
        )

    }



    renderOther(item) {
        return (
            <View style={{ marginBottom: 8 }}>
                <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>
                <ImageTextDiChung
                    source={require(imagePayment)}
                    text={'Người dùng thanh toán'}
                />
                {item.xhd == 1 ?
                    <ImageTextDiChung
                        source={require(imageDone)}
                        text={'+10 %'}
                    /> : null}
                {item.promotion !== '' ?
                    <ImageTextDiChung
                        source={require(imageDone)}
                        text={'Mã giảm giá: ' + item.promotion}
                    /> : null}
            </View>
        )
    }

    renderTT(item) {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center', }}>
                    <Text style={styles.textBigLeft1}>Tổng thanh toán: </Text>
                    {item.forward.status == 'forwarded' ?
                        <Text style={styles.textBigRight1}>
                            {/* {parseInt(item.total_cost).format(0, 3, '.')} đ */}
                            {parseInt(item.forward.result.total_cost).format(0, 3, '.')} đ
                    </Text>
                        : null}
                </View>
                {/* <Text style={{ marginBottom: 8, textAlign: 'right' }}>{item.toll_fee == 'NA' ? "Giá chưa bao giờ phí cầu đường": "Giá trọn gói không phí ẩn"}</Text> */}
            </View>
        )
    }

    render() {
        if (this.state.is_loading) {
            return (
                <ActivityIndicator
                    style={{ padding: 32, }}
                    size='large'
                />
            )
        } else {
            const item = this.state.info;
            return (
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {item.forward.status == 'forwarded' ?
                            <Text style={styles.textBigRight}>Mã vé của bạn: <Text style={{ fontWeight: 'bold', backgroundColor: '#77a300', color: '#fff', padding: 4 }}>{item.code}</Text></Text>
                            : <Text style={styles.textBigRight}>Yêu cầu của bạn đã được hệ thồng ghi nhận. Chúng tôi sẽ liên lạc trong thời gian sớm nhất</Text>
                        }

                        <Text style={styles.textBigRight}>Trạng thái: <Text style={{ fontWeight: 'bold' }}>
                            {item.forward.status == 'wait_to_confirm' ? 'Chờ xác nhận' :
                                item.forward.status == 'cs_confirmed' ? 'CS xác nhận' :
                                    item.forward.status == 'forwarded' ? 'Đặt xe thành công' :
                                        item.forward.status == 'wait_for_driver' ? 'Tìm tài xế' :
                                            item.forward.status == 'driver_accepted' ? 'Tài xế chấp nhận' :
                                                item.forward.status == 'picked_up' ? 'Đã đón khách' :
                                                    item.forward.status == 'completed' ? 'Hoàn thành chuyến đi' :
                                                        item.forward.status == 'cancelled' ? 'Đã hủy vé' :
                                                            'Tất cả'
                            }
                        </Text></Text>

                        <Text>Mọi thắc mắc vui lòng liên hệ: <Text
                            style={{ color: '#77a300', fontWeight: 'bold', textDecorationLine: 'underline' }}
                            onPress={() => Linking.openURL(`tel: 19006022`)}
                        >
                            19006022
                            </Text>
                        </Text>

                        {this.renderDetailTrip(item)}
                        {this.renderDetailOrder(item)}
                        {this.renderDetailCustommer(item)}
                        {this.renderDetailPeopleMove(item)}
                        {this.renderOther(item)}
                        {this.renderTT(item)}

                        <Button
                            value={'Trang chủ'}
                            onPress={() => {
                                // this.props.navigation.navigate('Home')
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    key: null,
                                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                });
                                this.props.navigation.dispatch(resetAction);
                            }}
                        />
                        <View style={{ marginBottom: 8, }}></View>
                    </ScrollView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 8,
    },

    textBigRight: {
        padding: 1,
        fontSize: 14,
        color: '#00363d',
        flex: 1,
    },
    textBigLeft1: {
        fontSize: 16,
        marginTop: 8,
        fontWeight: 'bold',
    },
    textBigRight1: {
        padding: 1,
        fontSize: 16,
        color: '#77a300',
        flex: 1,
        textAlign: "right",
        marginTop : 8,
    },
})

export default TicketInformationXeChung;