import React, { Component } from 'react'
import { View, StyleSheet, Image, Text,TouchableOpacity, Linking } from 'react-native';

function TextSpaceBetween({
    text,
    textBold,
    style,
    onPress,
}) {
    return (
        <View style={style ?? styles.container}>
            <Text style={styles.textBigLeftBold}>{textBold}</Text>
            <View style={{ flex: 1 }}></View>
            {onPress ? 
            <TouchableOpacity
                onPress={() => Linking.openURL(`tel: ${text}`)}
            >
                <Text style={[styles.textBigRight, {color: '#77a300', textDecorationLine: 'underline'}]}>{text}</Text>
            </TouchableOpacity> : <Text style={styles.textBigRight}>{text}</Text>}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        alignItems: 'flex-start',
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