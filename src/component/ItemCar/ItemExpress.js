import { View, Image, StyleSheet, Text, Dimensions } from 'react-native'
import StarVote from '../StarVote'
import { Button } from '../Button'
import HTML from 'react-native-render-html';
import React, { Component } from 'react'
import styles from './style'

const imageCheck = '../../image/check.png'

function ItemExpress({ item, onPress, chair }) {
    return (
        <View
            style={styles.container}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.containerLeft}>
                    <Text style={styles.textLabel}>
                        {item.partner_name.toUpperCase()}
                    </Text>
                    <StarVote number={item.star_vote} />
                    <Text style={styles.giaTien}>{(item.merged * chair).format(0, 3, '.')} đ</Text>
                    <Text style={styles.tentuyen}>{item.vehicle_name}</Text>
                </View>

                <View style={styles.imageRight}>
                    <Image
                        style={{ width: 150, height: 100, }}
                        source={{ uri: item.vehicle_icon, }}
                        resizeMode="contain"
                    />
                </View>

            </View>

            <View style={{ marginLeft: 8, flexDirection: 'row', }}>
                {item.discount_text == '' ? null :
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Image
                            style={{ width: 14, height: 14, marginRight: 8 }}
                            source={require(imageCheck)} />
                        <HTML html={item.discount_text} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>}
            </View>

            <View style={{ marginLeft: 8, flexDirection: 'row', }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image
                        style={{ width: 14, height: 14, marginRight: 8 }}
                        source={require(imageCheck)} />
                    <Text>Bảo đảm cho hàng dễ vỡ</Text>
                </View>
            </View>

            <View style={{ marginLeft: 8, flexDirection: 'row', }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image
                        style={{ width: 14, height: 14, marginRight: 8 }}
                        source={require(imageCheck)} />
                    <Text>Thời gian chờ lấy hàng tối đa 15 phút</Text>
                </View>
            </View>
            {item.partner_luggage == '' ? null :
                <View style={{ flexDirection: 'column', flex: 1, paddingLeft: 8 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Image
                            style={{ width: 14, height: 14, marginRight: 8 }}
                            source={require(imageCheck)} />
                        <HTML html={item.partner_luggage} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                </View>}
            {item.discount_data.partner_note ?
                <View style={{ marginLeft: 8, flexDirection: 'row', }}>
                    <HTML html={item.discount_data.partner_note} imagesMaxWidth={Dimensions.get('window').width} />
                </View>
                : null
            }
            <Button
                onPress={onPress}
                value={'CHỌN'}
            />
        </View>
    )
}

export default ItemExpress;