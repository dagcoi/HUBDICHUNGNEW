import { View, Image, StyleSheet, Text, } from 'react-native'
import StarVote from '../StarVote'
import { Button } from '../Button'
import React, { Component } from 'react'

const imageNote = '../../image/note.png'
function ItemExpressHourly({ item, onPress }) {
    return (
        <View
            style={styles.container}
        >
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.containerLeft}>
                    <Text style={styles.tentuyen}>
                        {item.partner_name.toUpperCase()}
                    </Text>
                    <Text style={styles.carType}>{item.vehicle_name}</Text>
                    <StarVote number={item.star_vote} />
                    <Text style={styles.carType}>giới hạn {item.km_limit_format}</Text>
                    <Text style={styles.totalCost}>{item.price_format}</Text>
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
                    <Text style={{ flex: 1, }}>Phụ trội theo km: {item.extra_price_km} đ/km</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: 16, height: 16, marginRight: 8, }}
                        source={require(imageNote)} />
                    <Text style={{ flex: 1, }}>Phụ trội theo giờ: {item.extra_price_hour} đ/giờ</Text>
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
        marginTop: 8,
        backgroundColor: '#ffffff',
    },
    containerLeft: {
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
    tentuyen: {
        padding: 1,
        fontSize: 18,
        color: '#77a300',
        fontWeight:'bold',
        backgroundColor: '#ffffff'
    },
    totalCost: {
        fontSize: 18,
        color: '#00363d',
        fontWeight: 'bold'
    },
    carType: {
        fontSize: 14,
        color: '#00363e',
    },
})

export default ItemExpressHourly;