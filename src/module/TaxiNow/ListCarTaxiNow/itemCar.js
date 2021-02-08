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
                        {'G7 Taxi'}
                    </Text>
                    <Text style={styles.textLabel}>
                        {item.info.title ?? ''}
                    </Text>
                    {/* <Text style={{ marginTop: 8 }}>
                        {item.info.description ?? ''}
                    </Text> */}

                    <Text style={styles.price}>{item.info.price.format(0, 3, '.') ?? ''} đ</Text>
                </View>

                <View style={styles.imageRight}>
                    <Image
                        style={{ width: 150, height: 90, }}
                        source={item.info.image && item.info.image ? { uri: item.info.image } : null}
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        elevation: 5,
    },
    formLeft: {
        flex: 1,
        padding: 4,
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
        fontSize: 20,
        color: '#00363d',
        fontWeight: 'bold',
        marginVertical: 4,
    },
    textLabel: {
        fontSize: 18,
        marginVertical: 8,
        marginVertical: 4,
    },
})

export default ItemCarTaxiNow;
