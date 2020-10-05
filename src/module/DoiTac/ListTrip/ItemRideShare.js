import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ImageTextDiChung from '../../../component/ImageTextDiChung'
import StarVote from '../../../component/StarVote'
import { SvgCheckSuccess, SvgClock, SvgPick } from '../../../icons'
import styles from '../style'
function formatDate(string) {
    var date = new Date(string);

    var strDate = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return strDate;
}


function formatMoney(num) {
    let money = Number(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return money;
};

function ItemRideShare({ item }) {
    return (
        <View style={styles.card}>
            <Text style={{ textAlign: 'right' }}>{formatDate(item.createdAt)}</Text>
            <Text style={styles.textTitle}>CHIA SẺ CHỖ TRỐNG</Text>
            <ImageTextDiChung
                children={<SvgPick />}
                text={item.startPlace?.formatted_address ?? ''}
            />
            <ImageTextDiChung
                children={<SvgPick color={'#eb6752'} />}
                text={item.endPlace?.formatted_address ?? ''}
            />
            <ImageTextDiChung
                children={<SvgCheckSuccess />}
                text={item.autoAccept == 1 ? 'Tự động chấp nhận đặt xe' : 'Không tự động chấp nhận đặt xe'}
            />
            <ImageTextDiChung
                children={<SvgClock />}
                text={formatDate(item.startPlace.dateTime * 1000)}
            />
            <View style={{ flexDirection: 'row', paddingLeft: 4 }}>
                <StarVote margin={4} />
                <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>Giá: {formatMoney(item.price)} đ/Ghế</Text>
            </View>
        </View>

    )
}

export default ItemRideShare;