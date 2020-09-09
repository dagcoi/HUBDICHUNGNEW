import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, Linking } from 'react-native';
import HTML from 'react-native-render-html'

function TextSpaceBetween({
    text,
    listText,
    textBold,
    style,
    onPress,
    colorUrly
}) {
    return (
        <View style={style ?? styles.container}>
            <Text style={styles.textBigLeftBold}>{textBold}</Text>
            <View style={{ flex: 1 }}>
                {onPress ?
                    <TouchableOpacity
                        onPress={() => Linking.openURL(`tel: ${text}`)}
                    >
                        <Text style={[styles.textBigRight, { color: '#77a300', textDecorationLine: 'underline' }]}>{text}</Text>
                    </TouchableOpacity>
                    :
                    <Text style={[styles.textBigRight, colorUrly && { color: '#77a300', fontSize: 16}]}>{text}</Text>
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        alignItems: 'flex-start',
    },
    textBigRight: {
        padding: 1,
        fontSize: 14,
        color: '#333333',
        flex: 1,
        textAlign: 'right'
    },
    textBigLeftBold: {
        fontSize: 14,
        fontWeight: 'bold',
    },
})

export default TextSpaceBetween;