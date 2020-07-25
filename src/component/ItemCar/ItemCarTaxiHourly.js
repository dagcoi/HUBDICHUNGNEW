import { View, Image, StyleSheet, Text, } from 'react-native'
import StarVote from '../StarVote'
import { Button } from '../Button'
import React, { Component } from 'react'

const imageNote = '../../image/note.png'

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function ItemCarTaxiBooking({ item, onPress }) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', }}>
                <View style={styles.containerr}>
                    <Text style={styles.loaixe}>
                        {item.info.title ?? ''}
                    </Text>
                    <Text style={styles.gioiHan}>{item.info.description ?? ''}</Text>
                    <StarVote number={item.info.rate} />
                    <Text style={styles.giaTien}>{item.info.price.format(0, 3, '.') ?? ''} đ</Text>
                    <Text style={styles.gioiHan}>giới hạn: {item.info.priceExtra.kmLimit} km</Text>
                    <Text style={styles.gioiHan}>giới hạn: {item.info.priceExtra.hourLimit} giờ</Text>
                    <Text style={styles.giaTien}>{item.price_format}</Text>
                </View>
                <View style={styles.imageRight}>
                    <Image
                        style={{ width: 150, height: 90, }}
                        source={item.info.image&& item.info.image ? { uri: item.info.image }: null}
                        resizeMode="contain"
                    />
                </View>
            </View>

            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: 16, height: 16, marginRight: 8, }}
                        source={require(imageNote)} />
                    <Text style={{ flex: 1, marginVertical: 2 }}>Phụ trội theo km: {item.info.priceExtra.kmExtra.format(0, 3, '.') ?? ''} đ/km</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: 16, height: 16, marginRight: 8, }}
                        source={require(imageNote)} />
                    <Text style={{ flex: 1, marginVertical: 2 }}>Phụ trội theo giờ: {item.info.priceExtra.hourExtra.format(0, 3, '.') ?? ''} đ/giờ</Text>
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        elevation: 5,
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