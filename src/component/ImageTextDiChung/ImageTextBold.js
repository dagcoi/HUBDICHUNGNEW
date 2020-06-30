import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native';

function ImageTextDiChung({
    textBold,
    source,
    style,
}) {
    return (
        <View style={style ?? styles.container}>
            {source == null ? null :
                <Image
                    style={styles.leftIcon}
                    source={source}
                />
            }
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