import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import ImageTextDiChung from '../../component/ImageTextDiChung'

const imageLocation = '../../image/location.png'
const imageCalendar = '../../image/calendar.png'
const imagePeople = '../../image/people.png'
const imageIconCar = '../../image/iconcar.png'
const imagePerson = '../../image/person.png'
const imageIconPhone = '../../image/iconphone.png'
const imageEmail = '../../image/email.png'
const imageDone = '../../image/done.png'
const imagePayment = '../../image/payment.png'
const imageComment = '../../image/comment.png'
const imageParcel = '../../image/parcel.png'


Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function DetailExpress({ item }) {
    return (
        <ScrollView
            style={{ paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.textBigRight}>Trạng thái: <Text style={{ fontWeight: 'bold', color : item.status == 'cancelled' ? '#ef465f' : '#333333' }}>
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

            <Text>Mọi thắc mắc vui lòng liên hệ:
                <Text
                    style={{ color: '#77a300', fontWeight: 'bold', textDecorationLine: 'underline' }}
                    onPress={() => Linking.openURL(`tel: 19006022`)}
                >
                    19006022
                </Text>
            </Text>
            {renderDetailTrip(item)}
            {renderDetailCustommer(item)}
            {renderDetailPeopleMove(item)}
            {renderOther(item)}
            {renderTT(item)}
        </ScrollView>
    )
}
function renderDetailTrip(item) {
    const time = item.bookingTime
    const date = new Date(time).toLocaleDateString()
    const hours = new Date(time).toLocaleTimeString()
    const strtime = hours + " " + date
    return (
        <View>
            <Text style={styles.textBigLeft1}>Chi tiết dịch vụ vận chuyển</Text>

            <ImageTextDiChung
                source={require(imageCalendar)}
                text={strtime}
            />

            <ImageTextDiChung
                source={require(imageParcel)}
                text={item.slot + ' Bưu kiện'}
            />

            <ImageTextDiChung
                source={require(imageIconCar)}
                text={'Loại dịch vụ: Vận chuyển hàng' }
            />
        </View>
    )
}

function renderDetailCustommer(item) {
    return (
        <View>
            <Text style={styles.textBigLeft1}>Chi tiết người gửi</Text>

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
                source={require(imageLocation)}
                text={item.startPoints[0].address}
            />

            <ImageTextDiChung
                source={require(imageComment)}
                text={item.note}
            />
        </View>
    )
}

function renderDetailPeopleMove(item) {

    return (
        <View>
            <Text style={styles.textBigLeft1}>Chi tiết người nhận</Text>

            <ImageTextDiChung
                source={require(imagePerson)}
                text={item.beneficiary.fullName}
            />

            <ImageTextDiChung
                source={require(imageIconPhone)}
                text={item.beneficiary.phone}
            />

            <ImageTextDiChung
                source={require(imageLocation)}
                text={item.endPoints[0].address}
            />
        </View>
    )
}



function renderOther(item) {
    return (
        <View style={{ marginBottom: 8 }}>
            <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>

            <ImageTextDiChung
                source={require(imagePayment)}
                text={'Người gửi thanh toán'}
                // text={item.payment.method == 'cash' ? 'Trả sau' : 'Trả trước'}
            />
            {item.extra.xhd == 1 ?
                <ImageTextDiChung
                    source={require(imageDone)}
                    text={'+10 %'}
                />
                : null}
            {item.promotion !== '' ?
                <ImageTextDiChung
                    source={require(imageDone)}
                    text={'Mã giảm giá: ' + item.promotion}
                /> : null}
        </View>
    )
}

function renderTT(item) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center', marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center', }}>
                <Text style={styles.textBigLeft1}>Tổng thanh toán: </Text>
                {item.forward.status == 'forwarded' ?
                    <Text style={styles.textBigRight1}>
                        {/* {parseInt(item.total_cost).format(0, 3, '.')} đ */}
                        {parseInt(item.forward.result.total_cost).format(0, 3, '.')} đ
            </Text>
                    : null}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 8,
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

export default DetailExpress;