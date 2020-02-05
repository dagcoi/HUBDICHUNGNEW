import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native';

function ImageTextDiChung({
    text,
    source
}) {
    return (
        <View style = {styles.container}>
            <Image
                style={styles.leftIcon}
                source={source}
            />
            <Text style={styles.textBigRight}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
        alignItems: 'center'
    },
    leftIcon: {
        height: 24,
        width: 24,
        marginRight: 8,
    },
    textBigRight: {
        padding: 1,
        fontSize: 15,
        color: '#00363d',
        flex: 1,
    },
})

export default ImageTextDiChung;