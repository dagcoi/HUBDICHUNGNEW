import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import ImageTextDiChung from '../../component/ImageTextDiChung'
import { SvgCalendar, SvgCheckNormal, SvgMail, SvgMoney, SvgNote, SvgPeople, SvgPerson, SvgPhone, SvgPick } from '../../icons';
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

function DetailTuLai({ item }) {
    return (
        <ScrollView
            bounces={false}
            style={{ paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
        >
            {renderDetailTrip(item)}
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
    return (
        <View>
            <Text style={styles.textBigLeft1}>Chi tiết chuyến đi</Text>
            <ImageTextDiChung
                children={<SvgPick />}
                source={require(imageLocation)}
                text={item.startPoint?.address ?? item.startPoints[0].address}
            />
            <ImageTextDiChung
                children={<SvgPick color={'#eb6752'} />}
                source={require(imageLocation)}
                text={item.endPoint?.address ?? item.endPoints[0].address}
            />
            <ImageTextDiChung
                children={<SvgCalendar />}
                source={require(imageCalendar)}
                text={strtime}
            />
            <ImageTextDiChung
                children={<SvgPeople />}
                source={require(imagePeople)}
                text={item.slot + ' xe'}
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
            {item.beneficiary.phone != item.bookingUser.phone &&
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
                    <ImageTextDiChung
                        children={<SvgMail />}
                        source={require(imageEmail)}
                        text={item.beneficiary.email}
                    />
                </View>
            }
        </View>
    )
}

function renderComment(item) {
    if (item.note.length > 1) {
        return (
            <ImageTextDiChung
                children={<SvgNote />}
                source={require(imageComment)}
                text={item.note}
            />
        )
    } else {
        return null;
    }
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
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center', }}>
                <Text style={styles.textBigLeft1}>Tổng thanh toán: </Text>
                {item.forward.status == 'forwarded' ?
                    <Text style={styles.textBigRight1}>
                        {/* {parseInt(item.total_cost).format(0, 3, '.')} đ */}
                        {parseInt(item.forward.result.total_cost).format(0, 3, '.')} đ
            </Text>
                    : null}
            </View>
            {/* <Text style={{ marginBottom: 8, textAlign: 'right' }}>{item.toll_fee == 'NA' ? "Giá chưa bao giờ phí cầu đường" : "Giá trọn gói không phí ẩn"}</Text> */}
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

export default DetailTuLai;