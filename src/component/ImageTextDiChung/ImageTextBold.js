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
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center'
    },
    leftIcon: {
        height: 20,
        width: 20,
        marginRight: 8,
    },
    textBigRightBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
})

export default ImageTextDiChung;