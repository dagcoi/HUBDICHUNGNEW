import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from  '../../style'

function TextBold({ text }) {
    return (
        <View style={{paddingVertical: 2}}>
            <Text style={styles.textBold}>{text}</Text>
        </View>
    )
}


function TextNormal({ text }) {
    return (
        <View style={{paddingVertical: 2}}>
            <Text style={styles.textNormal}>{text}</Text>
        </View>
    )
}


export { TextBold, TextNormal }