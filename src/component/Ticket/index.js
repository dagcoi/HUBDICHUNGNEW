import React, { Component } from 'react'
import ImageTextDiChung from '../ImageTextDiChung'
import { View, Text } from 'react-native'

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

export function TicketPickAddress({ pickAddress }) {
  <ImageTextDiChung
    source={require(imageLocation)}
    text={pickAddress}
  />
}

export function TicketDropAddress({ dropAddress }) {
  <ImageTextDiChung
    source={require(imageLocation)}
    text={dropAddress}
  />
}

export function TicketTimePick({ timePick }) {
  <ImageTextDiChung
    source={require(imageCalendar)}
    text={timePick}
  />
}

export function TicketPeople({ numberCar }) {
  <ImageTextDiChung
    source={require(imagePeople)}
    text={numberCar}
  />
}

export function TicketRideMethod({ rideMethod }) {
  <ImageTextDiChung
    source={require(imageIconCar)}
    text={rideMethod}
  />
}

export function TicketFullName({ fullname }) {
  <ImageTextDiChung
    source={require(imagePerson)}
    text={fullname}
  />
}

export function TicketPhone({ phone }) {
  <ImageTextDiChung
    source={require(imageIconPhone)}
    text={phone}
  />
}

export function TicketEmail({ email }) {
  <ImageTextDiChung
    source={require(imageEmail)}
    text={email}
  />
}

export function TicketPayment({ payment }) {
  <ImageTextDiChung
    source={require(imagePayment)}
    text={payment}
  />
}

export function TicketDone({ text }) {
  <ImageTextDiChung
    source={require(imageDone)}
    text={text}
  />
}

export function TicketComment({ comment }) {
  <ImageTextDiChung
    source={require(imageComment)}
    text={comment}
  />
}

export function StatusTicket({ item }) {
  return (
    <View style={{ marginVertical: 8 }}>
      <Text>Trạng thái: <Text style={{ fontWeight: 'bold', color: item.status == 'cancelled' ? '#ef465f' : '#333333' }}>
        {item.forward.status == 'wait_to_confirm' ? 'Chờ xác nhận' :
          item.forward.status == 'cs_confirmed' ? 'CS xác nhận' :
            item.forward.status == 'forwarded' ?
              item.payment.method == 'cash' ?
                (item.provider.status == 'wait_for_driver' ? 'Tìm tài xế' :
                  item.provider.status == 'driver_accepted' ? 'Tài xế chấp nhận' :
                    item.provider.status == 'picked_up' ? 'Đã đón khách' :
                      item.provider.status == 'completed' ? 'Hoàn thành chuyến đi' :
                        item.provider.status == 'cancelled' ? 'Đã hủy vé' :
                          'Đặt xe thành công') :
                (item.payment.status === 'draft' ? 'Chưa thanh toán' :
                  item.payment.status === 'processing' ? 'Đang thanh toán' :
                    item.payment.status === 'wait_for_refund' ? 'Chờ hoàn tiền' :
                      item.payment.status === 'refunded' ? 'Đã hoàn tiền' :
                        item.payment.status === 'failed' ? 'Thất bại' :
                          item.payment.status === 'paid' ? 'Đã thanh toán' :
                            item.payment.status === 'completed' ? 'Đã hoàn thành' : 'Khác') :
              'Khác'

        }
      </Text></Text>
    </View>
  )
}
