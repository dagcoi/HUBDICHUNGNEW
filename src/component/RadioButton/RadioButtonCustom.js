import { Image, TouchableOpacity, Text } from 'react-native'
import React, { Component } from 'react'


const imageCheck = '../../image/checked.png'
const imageATM = '../../image/atm.png'
const imageVisa = '../../image/visa.png'
const imageVNPay = '../../image/vnpay.png'
const imagePayPal = '../../image/paypal.png'

function RadioButtonCustomer({ obj, onPress, value_paymentDetail }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ marginVertical: 2, height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: "center", borderRadius: 4, borderWidth: 1, borderColor: obj.label === value_paymentDetail ? '#77a300' : '#999', padding: 8 }}
        >
            <Image
                style={{ width: 20, height: 20 }}
                source={
                    obj.label === 'ATM' ? require(imageATM) :
                        obj.label === 'VNPAY' ? require(imageVNPay) :
                            obj.label === 'VISA' ? require(imageVisa) : require(imagePayPal)
                }
            />
            <Text style={{ flex: 1, fontSize: 14, marginLeft: 8 }}>{obj.label}</Text>
            {obj.label === value_paymentDetail ? <Image style={{ width: 20, height: 20 }} source={require(imageCheck)} /> : null}
        </TouchableOpacity>
    )
}

export default RadioButtonCustomer;