import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native';
import { SvgCheckNormal } from '../../icons';

function ImageTextDiChung({
    textBold,
    style,
}) {
    return (
        <View style={style ?? styles.container}>
            <SvgCheckNormal color={'#fff'} />
            <Text style={styles.textBigRightBold}>{textBold}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center'
    },
    leftIcon: {
        height: 20,
        width: 20,
        marginRight: 8,
    },
    textBigRightBold: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 8,
    },
})

export default ImageTextDiChung;