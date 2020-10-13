import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ImageTextDiChung from '../../../component/ImageTextDiChung'
import StarVote from '../../../component/StarVote'
import { SvgClock, SvgPick, SvgCheckSuccess } from '../../../icons'
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

function ItemChungXe({ item, onPress }) {
    listDaySelect = item.schedule.applyWeekdays;
    console.log(listDaySelect)
    const arr = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={{ textAlign: 'right' }}>{formatDate(item.createdAt)}</Text>
            <Text style={styles.textTitle}>CHUYẾN TỰ LÁI</Text>
            <ImageTextDiChung
                children={<SvgPick />}
                text={item.startPlace?.formatted_address ?? ''}
            />
            <ImageTextDiChung
                children={<SvgCheckSuccess />}
                text={item.autoAccept == 1 ? 'Tự động chấp nhận đặt xe' : 'Không tự động chấp nhận đặt xe'}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{ paddingHorizontal: 4 }}>Lịch trình : </Text>
                <View style={{ flexDirection: 'row' }}>
                    {listDaySelect.map((item, index) => (
                        <View style={{ width: 32, height: 32, borderRadius: 20, backgroundColor: '#77a300', justifyContent: 'center', alignItems: 'center', marginHorizontal: 4 }}>
                            <Text style={{ color: '#fff' }}>{arr[item]}</Text>
                        </View>
                    ))
                    }
                </View>
            </View>
            <ImageTextDiChung
                children={<SvgClock />}
                text={item.schedule.startTimeString + ' - ' + item.schedule.endTimeString}
            />
            <View style={{ flexDirection: 'row', paddingLeft: 4 }}>
                <StarVote margin={4} />
                <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>Giá: {formatMoney(item.price)} đ</Text>
            </View>
        </TouchableOpacity>

    )
}

export default ItemChungXe;