import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, ScrollView, Linking, ActivityIndicator, TouchableOpacity } from 'react-native'
import ImageTextDiChung from '../../component/ImageTextDiChung'
import { StatusTicket } from '../../component/Ticket'
import Toast from 'react-native-simple-toast';
import { formatDate } from '../../until'
import { SvgCalendar, SvgMail, SvgNote, SvgPerson, SvgPhone, SvgPick } from '../../icons';

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

function DetailCaro({ item }) {
    console.log(JSON.stringify(item))
    return (
        <ScrollView style={{ paddingHorizontal: 16 }} showsHorizontalScrollIndicator={false}>
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
            {renderDetailCustomer(item)}
            {renderComment(item)}
            {item.forward.result ? renderDriverInformation(item) : null}
        </ScrollView>
    )
}

function renderDriverInformation(item) {
    console.log(JSON.stringify(item))

    return (
        <View>
            {item.provider.status == 'WAITING' ? null :
                <View>
                    <Text style={styles.textBigLeft1}>Thông tin tài xế</Text>
                    <ImageTextDiChung
                        textBold={'Họ tên: '}
                        text={item.driver.username}
                    />
                    <ImageTextDiChung
                        textBold={'Số điện thoại: '}
                        text={item.driver.phone}
                    />
                </View>
            }
            <View style={{ height: 70, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={styles.textBigLeft1}>{item.provider.statusLabel}</Text>
                {item.provider.status == 'WAITING' ? <ActivityIndicator
                    style={{ paddingHorizontal: 18 }}
                    size='small'
                /> : null}
            </View>
        </View>
    )
}

function renderDetailTrip(item) {
    // const time = item.bookingTime
    // const date = new Date(time).toLocaleDateString()
    // const hours = new Date(time).toLocaleTimeString()
    // const strtime = hours + " " + date
    const strtime = formatDate(item.bookingTime)
    return (
        <View>
            <Text style={styles.textBigLeft1}>Chi tiết dịch vụ taxi</Text>
            <ImageTextDiChung
                children={<SvgPick/>}
                source={require(imageLocation)}
                text={item.startPoint.address}
            />
            <ImageTextDiChung
                children={<SvgPick/>}
                source={require(imageLocation)}
                text={item.endPoint.address}
            />
            <ImageTextDiChung
                children={<SvgCalendar/>}
                source={require(imageCalendar)}
                text={strtime}
            />
        </View>
    )
}

function renderDetailCustomer(item) {
    return (
        <View>
            <Text style={styles.textBigLeft1}>Chi tiết khách hàng</Text>
            <ImageTextDiChung
                children={<SvgPerson/>}
                source={require(imagePerson)}
                text={item.bookingUser.fullName}
            />
            <ImageTextDiChung
                children={<SvgPhone/>}
                source={require(imageIconPhone)}
                text={item.bookingUser.phone}
            />
            <ImageTextDiChung
                children={<SvgMail/>}
                source={require(imageEmail)}
                text={item.bookingUser.email}
            />
        </View>
    )
}

function renderComment(item) {
    return (
        <ImageTextDiChung
            children={<SvgNote/>}
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
    textBigRight1: {
        padding: 1,
        fontSize: 18,
        color: '#77a300',
        flex: 1,
        textAlign: "right",
        marginTop: 8,
    },
})

export default DetailCaro;