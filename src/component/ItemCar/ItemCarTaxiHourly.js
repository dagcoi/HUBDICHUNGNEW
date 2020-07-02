import { View, Image, StyleSheet, Text, } from 'react-native'
import StarVote from '../StarVote'
import { Button } from '../Button'
import React, { Component } from 'react'

const imageNote = '../../image/note.png'

function ItemCarTaxiBooking({ item, onPress }) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', }}>
                <View style={styles.containerr}>
                    <Text style={styles.loaixe}>
                        {item.partner_name.toUpperCase()}
                    </Text>
                    <Text style={styles.gioiHan}>{item.vehicle_name}</Text>
                    <StarVote number={item.star_vote} />
                    <Text style={styles.gioiHan}>giới hạn {item.km_limit_format}</Text>
                    <Text style={styles.giaTien}>{item.price_format}</Text>
                </View>
                <View style={styles.imageRight}>
                    <Image
                        style={{ width: 150, height: 90, }}
                        source={{ uri: item.vehicle_icon, }}
                        resizeMode="contain"
                    />
                </View>
            </View>

            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: 16, height: 16, marginRight: 8, }}
                        source={require(imageNote)} />
                    <Text style={{ flex: 1, marginVertical: 2 }}>Phụ trội theo km: {item.extra_price_km} đ/km</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: 16, height: 16, marginRight: 8, }}
                        source={require(imageNote)} />
                    <Text style={{ flex: 1, marginVertical: 2 }}>Phụ trội theo giờ: {item.extra_price_hour} đ/giờ</Text>
                </View>
            </View>

            <Button
                onPress={onPress}
                value={'CHỌN XE'}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        borderColor: '#e8e8e8',
        borderWidth: 0.5,
        borderRadius: 4,
        padding: 8,
        marginVertical: 4,
        backgroundColor: '#ffffff',
        marginHorizontal: 8,
    },
    containerr: {
        flex: 1,
        marginTop: 3,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    imageRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loaixe: {
        fontSize: 18,
        color: '#77a300',
        fontWeight: 'bold'
    },
    giaTien: {
        fontSize: 18,
        color: '#00363e',
        fontWeight: 'bold'
    },
    gioiHan: {
        fontSize: 14,
        color: '#00363e',
        marginTop: 4
    },
})


export default ItemCarTaxiBooking;