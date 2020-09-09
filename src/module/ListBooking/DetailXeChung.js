import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import ImageTextDiChung from '../../component/ImageTextDiChung'
import { StatusTicket } from '../../component/Ticket'
import { formatDate } from '../../until'
const imageLocation = '../../image/location2.png'
const imageCalendar = '../../image/calendar.png'
const imagePeople = '../../image/people.png'
const imageIconCar = '../../image/iconcar.png'
const imagePerson = '../../image/person.png'
const imageIconPhone = '../../image/iconphone.png'
const imageEmail = '../../image/email.png'
const imageDone = '../../image/done.png'
const imagePayment = '../../image/payment.png'
const imageComment = '../../image/comment.png'

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function DetailXeChung({ item }) {
    return (
        <ScrollView
            style={{ paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
        >
            <StatusTicket item={item} />

            <Text>Mọi thắc mắc vui lòng liên hệ:
                <Text
                    style={{ color: '#77a300', fontWeight: 'bold', textDecorationLine: 'underline' }}
                    onPress={() => Linking.openURL(`tel: 19006022`)}
                >
                    19006022
                </Text>
            </Text>

            {renderDetailTrip(item)}
            {renderDetailOrder(item)}
            {renderDetailCustommer(item)}
            {renderDetailPeopleMove(item)}
            {renderOther(item)}
            {renderTT(item)}

        </ScrollView>
    )
}

function renderDetailTrip(item) {
    // const time = item.bookingTime
    // const date = new Date(time).toLocaleDateString()
    // const hours = new Date(time).toLocaleTimeString()
    const strtime = formatDate(item.bookingTime)
    return (
        <View>
            <Text style={styles.textBigLeft1}>Chi tiết dịch vụ thuê tài xế</Text>

            <ImageTextDiChung
                source={require(imageLocation)}
                text={item.startPoint.address}
            />

            <ImageTextDiChung
                source={require(imageLocation)}
                text={item.endPoint.address}
            />

            <ImageTextDiChung
                source={require(imageCalendar)}
                text={strtime}
            />
        </View>
    )
}

function renderDetailOrder(item) {
    return (
        <View>
            <ImageTextDiChung
                source={require(imageIconCar)}
                text={'Loại dịch vụ: Thuê tài xế'}
            />
        </View>
    )
}

function renderDetailCustommer(item) {
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

function renderDetailPeopleMove(item) {

    return (
        <View>
            <Text style={styles.textBigLeft1}>Chi tiết người đi</Text>

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



function renderOther(item) {
    return (
        <View style={{ marginBottom: 8 }}>
            <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>
            <ImageTextDiChung
                source={require(imagePayment)}
                text={item.payment.method == 'cash' ? 'Trả sau' : 'Trả trước'}
            />
            {item.extra.xhd == 1 ?
                <ImageTextDiChung
                    source={require(imageDone)}
                    text={'+10 %'}
                /> : null}
            {item.promocode ?
                <ImageTextDiChung
                    source={require(imageDone)}
                    text={'Mã giảm giá: ' + item.promocode}
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
    textBigRight: {
        padding: 1,
        fontSize: 14,
        color: '#333333',
        flex: 1,
    },
    textBigLeft1: {
        fontSize: 16,
        marginTop: 8,
        fontWeight: 'bold',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 4,
    },

    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#e8e8e8',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#77a300',
    },
    textBigRight1: {
        padding: 1,
        fontSize: 16,
        color: '#77a300',
        flex: 1,
        textAlign: "right",
        marginTop: 8,
    },
})

export default DetailXeChung;