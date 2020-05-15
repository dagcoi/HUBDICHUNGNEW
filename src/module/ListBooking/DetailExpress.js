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
            {renderDetailTrip(item)}
            {renderDetailCustommer(item)}
            {renderDetailPeopleMove(item)}
            {renderOther(item)}
            {renderTT(item)}
        </ScrollView>
    )
}
function renderDetailTrip(item) {
    return (
        <View>
            <Text style={styles.textBigLeft1}>Chi tiết dịch vụ</Text>

            <ImageTextDiChung
                source={require(imageCalendar)}
                text={item.in_time + ' ' + item.in_date}
            />

            <ImageTextDiChung
                source={require(imageParcel)}
                text={item.chair_count + ' Bưu kiện'}
            />

            <ImageTextDiChung
                source={require(imageIconCar)}
                text={'Loại dịch vụ: ' + item.transport_partner_name}
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
                text={item.fullname}
            />

            <ImageTextDiChung
                source={require(imageIconPhone)}
                text={item.other_phone}
            />

            <ImageTextDiChung
                source={require(imageEmail)}
                text={item.email}
            />

            <ImageTextDiChung
                source={require(imageLocation)}
                text={item.pick_address_api}
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
                text={item.use_name}
            />

            <ImageTextDiChung
                source={require(imageIconPhone)}
                text={item.use_phone}
            />

            <ImageTextDiChung
                source={require(imageLocation)}
                text={item.drop_address_api}
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
                text={item.pay_method_name}
            />
            {item.xhd == 1 ?
                <ImageTextDiChung
                    source={require(imageDone)}
                    text={'+10 %'}
                />
                : null}
        </View>
    )
}

function renderTT(item) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center', marginBottom: 8 }}>
            <Text style={styles.textBigLeft1}>Tổng thanh toán: </Text>
            <Text style={styles.textBigRight1}>
                {parseInt(item.total_cost).format(0, 3, '.')} đ
                </Text>
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