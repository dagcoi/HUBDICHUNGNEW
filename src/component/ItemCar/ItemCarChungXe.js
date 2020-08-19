import { View, Image, StyleSheet, Text, Dimensions } from 'react-native'
import StarVote from '../StarVote'
import { Button } from '../Button'
import React, { Component } from 'react'
import styles from './style'

function ItemCarChungXe({ item, onPress }) {
    return (
        <View style={{ padding: 8, borderColor: '#e8e8e8', borderRadius: 8, borderWidth: 0.5, marginTop: 8, marginHorizontal: 8, }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <Text style={{ fontSize: 18, color: '#77a300', fontWeight: 'bold' }}>XE TỰ LÁI</Text>

                    <Text style={{ fontSize: 14, marginTop: 8, marginBottom: 8 }}>{item.part.vhc_type_id == 1 ? item.vhc_part_name_short : item.vhc_part_name}</Text>

                    <StarVote number={item.vhc_part_star} />

                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#00363d', marginTop: 8 }}>{item.vhc_part_defa_prie.format(0, 3, `.`)} đ/Ngày</Text>
                </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{ width: 150, height: 90, resizeMode: 'stretch' }}
                        source={{ uri: item.vhc.vhc_imgs }}
                    />
                </View>
            </View>

            <Button
                onPress={onPress}
                value={'CHỌN XE'}
            />
        </View>
    )
}

export default ItemCarChungXe;