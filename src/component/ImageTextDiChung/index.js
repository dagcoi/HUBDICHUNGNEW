import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native';

function ImageTextDiChung({
    text,
    textBold,
    source,
    style,
    styleIcon,
}) {
    return (
        <View style={style ?? styles.container}>
            {source == null ? null :
                <Image
                    style={styleIcon ?? styles.leftIcon}
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
        height: 18,
        width: 18,
        marginRight: 8,
    },
    textBigRight: {
        padding: 1,
        fontSize: 14,
        color: '#333333',
        flex: 1,
    },
    textBigRightBold: {
        fontSize: 14,
        fontWeight: 'bold',
    },
})

export default ImageTextDiChung;