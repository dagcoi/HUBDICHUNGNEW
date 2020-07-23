import { View, Image, StyleSheet, Text, Dimensions } from 'react-native'
import StarVote from '../../../component/StarVote'
import { Button } from '../../../component/Button'
import React, { Component } from 'react'

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function ItemCarTaxiNow({ item, onPress }) {
    return (

        <View
            style={styles.container}
        >
            <View style={{ flexDirection: 'row' }}>

                <View style={styles.formLeft}>
                    <Text style={styles.label}>
                        {item.partner_name ?? ''}
                    </Text>
                    <Image
                        style={{ width: 90, height: 45, }}
                        source={item.partner_icon && item.partner_icon ? { uri: item.partner_icon } : null}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>{item.service_name ?? ''}</Text>
                    <Text style={styles.price}>{item.need_pay.format(0, 3, '.') ?? ''} {item.unit}</Text>
                </View>

                <View style={styles.imageRight}>
                    <Image
                        style={{ width: 150, height: 90, }}
                        source={item.service_icon && item.service_icon ? { uri: item.service_icon } : null}
                        resizeMode="contain"
                    />
                </View>
            </View>
            <Button
                onPress={onPress}
                value={'CHỌN'}
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
    formLeft: {
        flex: 1,
        padding: 8,
        marginTop: 3,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    imageRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        marginTop: 8,
        padding: 1,
        fontSize: 20,
        color: '#77a300',
        fontWeight: 'bold',
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 14,
    },
    price: {
        fontSize: 18,
        color: '#00363d',
    },
})

export default ItemCarTaxiNow;
