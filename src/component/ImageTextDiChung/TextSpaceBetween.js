import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native';

function TextSpaceBetween({
    text,
    textBold,
    style,
}) {
    return (
        <View style={style ?? styles.container}>
            <Text style={styles.textBigLeftBold}>{textBold}</Text>
            <View style={{ flex: 1 }}></View>
            <Text style={styles.textBigRight}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        alignItems: 'baseline',
        paddingHorizontal: 16
    },
    textBigRight: {
        padding: 1,
        fontSize: 16,
        color: '#333333',
        flex: 1,
        textAlign: 'right'
    },
    textBigLeftBold: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default TextSpaceBetween;