import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, ScrollView, Linking } from 'react-native'
import ImageTextDiChung from '../../component/ImageTextDiChung'
import { StatusTicket } from '../../component/Ticket'
import { SvgCalendar, SvgCar, SvgCheckNormal, SvgMail, SvgMoney, SvgNote, SvgPeople, SvgPerson, SvgPhone, SvgPick } from '../../icons'
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

function DetailChungXe({ item }) {
    console.log(JSON.stringify(item))
    return (
        <ScrollView
            bounces={false}
            style={{ paddingHorizontal: 16 }} showsHorizontalScrollIndicator={false}>

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
            {renderComment(item)}
            {renderOther(item)}
            {renderTT(item)}
        </ScrollView>
    )
}

function renderDetailTrip(item) {
    const strtime = formatDate(item.bookingTime)
    const strtime1 = formatDate(item.extra.returnTime)
    return (
        <View>
            <Text style={styles.textBigLeft1}>Chi tiết dịch vụ thuê xe tự lái</Text>

            <ImageTextDiChung
                children={<SvgPick />}
                source={require(imageLocation)}
                text={item.startPoint.address}
            />

            <ImageTextDiChung
                children={<SvgCalendar />}
                source={require(imageCalendar)}
                text={strtime + '->' + strtime1}

            />

            <ImageTextDiChung
                children={<SvgPeople />}
                source={require(imagePeople)}
                text={item.slot + ' xe'}
            />
        </View>
    )
}

function renderDetailOrder(item) {
    return (
        <View>
            <Text style={styles.textBigLeft1}>Chi tiết đơn hàng</Text>

            <ImageTextDiChung
                children={<SvgCar />}
                source={require(imageIconCar)}
                text={item.label}
            // text={item.ride_method_id == '1' ? 'Đi riêng' : 'Đi chung'}
            />
        </View>
    )
}

function renderDetailCustommer(item) {
    return (
        <View>
            <Text style={styles.textBigLeft1}>Chi tiết khách hàng</Text>

            <ImageTextDiChung
                children={<SvgPerson />}
                source={require(imagePerson)}
                text={item.bookingUser.fullName}
            />

            <ImageTextDiChung
                children={<SvgPhone />}
                source={require(imageIconPhone)}
                text={item.bookingUser.phone}
            />

            <ImageTextDiChung
                children={<SvgMail />}
                source={require(imageEmail)}
                text={item.bookingUser.email}
            />
        </View>
    )
}

function renderDetailPeopleMove(item) {

    return (
        <View>
            <Text style={styles.textBigLeft1}>Chi tiết người đi</Text>

            <ImageTextDiChung
                children={<SvgPerson />}
                source={require(imagePerson)}
                text={item.beneficiary.fullName}
            />

            <ImageTextDiChung
                children={<SvgPhone />}
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
                children={<SvgMoney />}
                source={require(imagePayment)}
                text={item.payment.method == 'cash' ? 'Trả sau' : 'Trả trước'}
            />
            {item.extra.catch_in_house == '1' ?
                <ImageTextDiChung
                    children={<SvgCheckNormal />}
                    source={require(imageDone)}
                    text={'Đón bằng biển tên (+ 30.000 ₫)'}
                /> : null}
            {item.extra.xhd == 1 ?
                <ImageTextDiChung
                    children={<SvgCheckNormal />}
                    source={require(imageDone)}
                    text={'+10 %'}
                /> : null}
            {item.promocode ?
                <ImageTextDiChung
                    children={<SvgCheckNormal />}
                    source={require(imageDone)}
                    text={'Mã giảm giá: ' + item.promocode}
                /> : null}
        </View>
    )
}

function renderTT(item) {
    return (
        <View>
            {(item.forward.status == 'forwarded') ?
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center', }}>
                    <Text style={styles.textBigLeft1}>Tổng thanh toán: </Text>
                    <Text style={styles.textBigRight1}>{parseInt(item.payment.totalCost).format(0, 3, '.')} đ</Text>
                </View>
                : null}
            {/* <Text style={{ marginBottom: 8, textAlign: 'right' }}>{item.toll_fee == 'NA' ? "Giá chưa bao giờ phí cầu đường" : "Giá trọn gói không phí ẩn"}</Text> */}
        </View>
    )
}

function renderComment(item) {
    return (
        <ImageTextDiChung
            children={<SvgNote />}
            source={require(imageComment)}
            text={item.note}
        />
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
        fontSize: 15,
        flex: 1,
    },
    textBigLeft1: {
        fontSize: 18,
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
        fontSize: 18,
        color: '#77a300',
        flex: 1,
        textAlign: "right",
        marginTop: 8,
    },
})

export default DetailChungXe;