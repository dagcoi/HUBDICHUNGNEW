import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native';

function ImageTextDiChung({
    text,
    textBold,
    source,
    style
}) {
    return (
        <View style={style ?? styles.container}>
            {source == null ? null :
                <Image
                    style={styles.leftIcon}
                    source={source}
                />
            }
            <Text style={styles.textBigRight}><Text style={styles.textBigRightBold}>{textBold}</Text>{text}</Text>
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
        height: 20,
        width: 20,
        marginRight: 8,
    },
    textBigRight: {
        padding: 1,
        fontSize: 14,
        color: '#333333',
        flex: 1,
    },
    textBigRightBold: {
        fontWeight: 'bold',
    },
})

export default ImageTextDiChung;