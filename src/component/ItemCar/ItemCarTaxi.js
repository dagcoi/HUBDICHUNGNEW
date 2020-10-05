import { View, Image, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native'
import StarVote from '../StarVote'
import { Button } from '../Button'
import HTML from 'react-native-render-html';
import React, { Component } from 'react'
import styles from './style'
import { SvgCar, SvgCheckCircleBorder } from '../../icons';

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

const imageCheck = '../../image/check.png'
const imageTollFee = '../../image/notetollfee.png'
const imagePeople = '../../image/people.png'
const imageVali = '../../image/vali.png'
function ItemCarTaxi({ item, onPress, isSelect }) {
    return (

        <TouchableOpacity
            style={[styles.container, { borderColor: isSelect ? '#77a300' : '#888', borderWidth: isSelect ? 2 : 0.5 }]}
            onPress={onPress}
        >
            <View style={{ flexDirection: 'row' }}>

                <View style={styles.containerLeft}>
                    <View style={styles.label}>
                        <Text style={[styles.tentuyen, { backgroundColor: item.info.label == 'ĐI RIÊNG' ? '#eb6752' : '#00363d' }]}>
                            {item.info.label ?? ''}
                        </Text>
                    </View>
                    <Text style={[styles.textLabel]}>{item.info.title ?? ''}</Text>
                    {/* <StarVote number={item.info.rate ?? 0} /> */}
                    <Text style={styles.totalCost}>{(parseInt(item.info.price)).format(0, 3, '.') ?? ''} đ</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SvgCar />
                        <Text style={{ fontSize: 16, }}>{item.info.vehicleType}</Text>
                    </View>
                    {/* <HTML html={item.info.description} imagesMaxWidth={Dimensions.get('window').width / 2 - 32} /> */}
                </View>

                {/* chunk_type === 'express' ? parseInt(slot) : 1) * */}
                <View style={styles.imageRight}>
                    <Image
                        style={{ width: 150, height: 90, }}
                        source={item.info.image && item.info.image ? { uri: item.info.image } : null}
                        resizeMode="contain"
                    />
                </View>
            </View>
            {/* <Button
                onPress={onPress}
                value={'CHỌN'}
            /> */}

        </TouchableOpacity>

    )
}

export default ItemCarTaxi;