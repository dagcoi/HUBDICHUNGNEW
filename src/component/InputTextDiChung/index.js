import React, { Component } from 'react'
import { View, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

function InputTextDiChung({
    placeholder,
    value,
    onChangeText,
    keyboardType,
    onPress,
    ref,
    returnKeyType,
    onSubmitEditing,
    multiline,
}) {
    return (
        <View style={styles.borderView} >
            <TextInput
                ref = {ref}
                returnKeyType = {returnKeyType}
                onSubmitEditing = {onSubmitEditing}
                style={styles.textInput}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                multiline = {multiline}
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
        padding: 8,
        fontSize: 16,
        borderRadius: 4,
        flex: 1,
    },
    borderView: {
        marginTop : 8,
        borderWidth: 0.2,
        borderColor: '#e8e8e8',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    }
})

export default InputTextDiChung;

