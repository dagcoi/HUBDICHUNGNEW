import { View, Image, StyleSheet, Text, Dimensions } from 'react-native'
import StarVote from '../StarVote'
import { Button } from '../Button'
import HTML from 'react-native-render-html';
import React, { Component } from 'react'
import styles from './style'

function ItemCarRental({ item, onPress }) {
    return (
        <View>
            {item.hide == 1 ? null :
                <View
                    style={styles.container}
                >
                    <View style={{ flexDirection: 'row' }}>

                        <View style={styles.containerr}>
                            <Text style={styles.tentuyen}>
                                {item.partner_name}
                            </Text>
                            <Text style={styles.textLabel}>{item.vehicle_name}</Text>
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
                                    source={require('../../image/check.png')} />
                                <HTML html={item.discount_text} imagesMaxWidth={Dimensions.get('window').width} />
                            </View>}
                    </View>
                    {item.discount_data.partner_note == null ? null :
                        <View style={{ flexDirection: 'column', flex: 1, padding: 8 }}>
                            <HTML html={item.discount_data.partner_note.replace("</a>", "").replace("</p>", "").replace("<p>", "")} imagesMaxWidth={Dimensions.get('window').width} />
                        </View>
                    }

                    <Button
                        onPress={onPress}
                        value={'CHỌN XE'}
                    />

                </View>
            }
        </View>
    )
}

export default ItemCarRental;