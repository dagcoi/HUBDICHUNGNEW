import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

function InputImage({
    source,
    value,
    placeholder,
    imageRight,
    widthHeightImage,
    noBorderTop,
    onChangeText,
    onPressClear,
    maxLength,
    keyboardType,
    children,
}) {
    return (
        <View style={[{ flexDirection: 'row', borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', }, noBorderTop ? { borderTopWidth: 0 } : { borderTopWidth: 1 }]}>
            <View style={{ width: 28, height: 28, justifyContent: "center", alignItems: "center" }}>
                {children}
            </View>
            <View
                style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}
            >
                <TextInput
                    style={{ flex: 1, fontSize: 14, height: 40, color: "#333333" }}
                    value={value}
                    placeholder={placeholder}
                    // placeholderTextColor={'#333'}
                    onChangeText={onChangeText}
                    maxLength={maxLength}
                    keyboardType={keyboardType}
                />
            </View>
            {imageRight ? <Image
                style={{ height: 28, width: 28, marginLeft: 8, resizeMode: 'contain' }}
                source={require('../../../image/arrowdown.png')}
            /> : null}
            {value?.length > 0 ?
                <TouchableOpacity
                    onPress={onPressClear}
                    style={{ borderColor: '#e8e8e8', padding: 6 }}
                >
                    <Image
                        style={{ height: 28, width: 28, marginLeft: 8, resizeMode: 'contain' }}
                        source={require('../../../image/cancel.png')}
                    />
                </TouchableOpacity> : null}
        </View>
    )
}

export default InputImage;