import React, { Component } from 'react'
import { View, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

function InputTextDiChung({
    placeholder,
    value,
    onChangeText,
    keyboardType,
    onPress,
}) {
    return (
        <View style={styles.borderView} >
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
            <TouchableOpacity
                onPress={onPress}
            ><Image
                    style={{ width: 20, height: 20, margin: 8 }}
                    source={value.length == 0 ? null : require('../../image/cancel.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        padding: 4,
        fontSize: 16,
        borderRadius: 8,
        flex: 1,
    },
    borderView: {
        marginTop : 8,
        borderWidth: 0.5,
        borderColor: '#00363d',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    }
})

export default InputTextDiChung;

