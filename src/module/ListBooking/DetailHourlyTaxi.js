import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ImageTextDiChung from '../../component/ImageTextDiChung'

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
const imageHourglass = '../../image/hourglass.png'

function DetailHourlyTaxi({ item }) {
    const time = item.bookingTime
    const date = new Date(time).toLocaleDateString()
    const hours = new Date(time).toLocaleTimeString()
    const strtime = hours + " " + date
    return (
        <View style={{ paddingHorizontal: 8 }}>
            <Text style={styles.textBigLeft1}>Chi tiết chuyến đi</Text>
            <ImageTextDiChung
                source={require(imageLocation)}
                text={item.startPoints[0].address}
            />
            <ImageTextDiChung
                source={require(imageCalendar)}
                text={strtime}
            />
            <ImageTextDiChung
                source={require(imageHourglass)}
                textBold={'Thời lượng: '}
                text={item.duration + ' giờ'}
            />
            <Text style={styles.textBigLeft1}>Chi tiết đơn hàng</Text>
            <ImageTextDiChung
                source={require(imageIconCar)}
                textBold={item.productType == 'HOURLY_RENT_TAXI' ? 'Thuê taxi theo giờ' : item.productType == 'HOURLY_FREIGHT_TRUCK' ? 'Thuê vận chuyển theo giờ' : item.productType == 'HOURLY_RENT_DRIVER' ? 'Thuê tài xế theo giờ' : '...'}
            />
            <ImageTextDiChung
                text={item.extra.km_limit_format}
                textBold={'Giới hạn: '}
            />
            <ImageTextDiChung
                text={item.extra.extra_price_km}
                textBold={'Phụ trội theo km: '}
            />
            <ImageTextDiChung
                text={item.extra.extra_price_hour + ' giờ'}
                textBold={'Phụ trội theo giờ: '}
            />
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

            <Text style={styles.textBigLeft1}>Chi tiết người đi</Text>
            <ImageTextDiChung
                source={require(imagePerson)}
                text={item.beneficiary.fullName}
            />
            <ImageTextDiChung
                source={require(imageIconPhone)}
                text={item.beneficiary.phone}
            />
            <ImageTextDiChung
                source={require(imageComment)}
                text={item.note}
            />
            {item.extra.xhd == 1 ?
                <ImageTextDiChung
                    source={require(imageDone)}
                    text={'+ 10%'}
                /> : null}
            {item.promotion == '' ? null :
                <ImageTextDiChung
                    source={require(imageDone)}
                    text={item.promotion}
                />
            }

            {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'center', marginBottom: 8 }}>
                <Text style={styles.textBigLeft1}>Tổng thanh toán: </Text>
                <Text style={styles.textBigRight1}>
                    {((item.props.merged - (navigation.getParam('blDiscount') ? item.props.discount_price : 0)) * (navigation.getParam('xhd') ? 11 / 10 : 1)).format(0, 3, '.')} đ
                </Text>
            </View> */}
        </View>
    )
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

export default DetailHourlyTaxi;
