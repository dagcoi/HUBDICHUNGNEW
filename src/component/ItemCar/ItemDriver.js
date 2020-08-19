import { View, Image, StyleSheet, Text, } from 'react-native'
import StarVote from '../StarVote'
import { Button } from '../Button'
import HTML from 'react-native-render-html';
import React, { Component } from 'react'
import styles from './style'

const imageCheck = '../../image/check.png'

function ItemDriver({ item, onPress }) {
    return (
        <View
            style={styles.container}
        >
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.containerr}>
                    <Text style={styles.textLabel}>
                        {item.partner_name.toUpperCase()}
                    </Text>
                    <Text style={styles.tentuyen}>{item.vehicle_name}</Text>
                    <StarVote number={item.star_vote} />
                    <Text style={styles.giaTien}>{item.merged_format}</Text>
                </View>

                <View style={styles.imageRight}>
                    <Image
                        style={{ width: 150, height: 90, }}
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
                    <Text>Tài xế được xác thực bởi Đi Chung</Text>
                </View>
            </View>

            <View style={{ marginLeft: 8, flexDirection: 'row', }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image
                        style={{ width: 14, height: 14, marginRight: 8 }}
                        source={require(imageCheck)} />
                    <Text>Thời gian chờ tối đa 15 phút</Text>
                </View>
            </View>
            <View style={{ marginLeft: 8, flexDirection: 'row', }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image
                        style={{ width: 14, height: 14, marginRight: 8 }}
                        source={require(imageCheck)} />
                    <Text>{item.partner_luggage}</Text>
                </View>
            </View>
            {item.discount_data.partner_note == null ? null :
                <View style={{ flexDirection: 'column', flex: 1, padding: 8 }}>
                    <HTML html={item.discount_data.partner_note.replace("</a>", "").replace("</p>", "").replace("<p>", "")} imagesMaxWidth={Dimensions.get('window').width} />
                </View>}



            <Button
                onPress={onPress}
                value={'CHỌN TÀI XẾ'}
            />

        </View>
    )
}

export default ItemDriver;