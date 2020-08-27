import { View, Image, StyleSheet, Text, Dimensions,TouchableOpacity } from 'react-native'
import StarVote from '../StarVote'
import { Button } from '../Button'
import React, { Component } from 'react'
import styles from './style'
import HTML from 'react-native-render-html';

const imageCheck = '../../image/check.png'

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
const regex = /<br>/gi

function ItemCarTaxiBooking({ item, onPress, slot, chunk_type, isSelect }) {
    return (
        <TouchableOpacity
            style={[styles.container, { borderColor: isSelect ? '#77a300' : '#888', borderWidth: isSelect ? 2 : 0.5 }]}
            onPress={onPress}
        >
            <View style={{ flexDirection: 'row', }}>
                <View style={styles.containerLeft}>
                    {item.info.label === '' ? null : <View style={styles.label}>
                        <Text style={styles.tentuyen}>
                            {item.info.label ?? ''}
                        </Text>
                    </View>
                    }
                    <Text style={[styles.textLabel]}>{item.info.title.toUpperCase() ?? ''}</Text>
                    <StarVote number={item.info.rate} />
                    <Text style={styles.totalCost}>{((chunk_type === 'express' ? slot : 1) * item.info.price).format(0, 3, '.') ?? ''} đ</Text>
                </View>
                <View style={styles.imageRight}>
                    <Image
                        style={{ width: 150, height: 90, }}
                        source={item.info.image && item.info.image ? { uri: item.info.image } : null}
                        resizeMode="contain"
                    />
                </View>
            </View>

            {/* <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: 16, height: 16, marginRight: 8, }}
                        source={require(imageCheck)} />
                    <Text style={{ flex: 1, marginVertical: 4 }}>{item.info.description.replace(regex, ' ')}</Text>
                </View>
                {item.info.priceExtra && item.info.priceExtra.kmExtra != 0 && <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: 16, height: 16, marginRight: 8, }}
                        source={require(imageCheck)} />
                    <Text style={{ flex: 1, marginVertical: 4 }}>{`Phụ trội theo km: ${item.info.priceExtra.kmExtra.format(0, 3, '.') ?? ''} đ/km (tối đa: ${item.info.priceExtra.kmLimit} km)`}</Text>
                </View>
                }
                {item.info.priceExtra && item.info.priceExtra.hourExtra != 0 && <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: 16, height: 16, marginRight: 8, }}
                        source={require(imageCheck)} />
                    <Text style={{ flex: 1, marginVertical: 4 }}>{`Phụ trội theo giờ: ${item.info.priceExtra.hourExtra.format(0, 3, '.') ?? ''} đ/giờ (tối đa: ${item.info.priceExtra.hourLimit} giờ)`}</Text>
                </View>
                }
            </View> */}

            {/* <Button
                onPress={onPress}
                value={'CHỌN XE'}
            /> */}
        </TouchableOpacity>
    )
}

export default ItemCarTaxiBooking;