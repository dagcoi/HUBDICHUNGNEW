import React, { Component } from 'react'
import { View, Image, TouchableOpacity, TextInput } from 'react-native';

const source = require('../../../image/time.png')
function FormSelectCar({
    onPress,
    value,
    placeholder,
    widthHeightImage,
    noBorderTop,
    onChangText,
    value2,
    placeholder2,
    children,
    children2,
}) {
    return (
        <View style={[{ flexDirection: 'row', borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', }, noBorderTop ? { borderTopWidth: 0 } : { borderTopWidth: 1 }]}>
            <View style={{ width: 28, height: 28, justifyContent: "center", alignItems: "center" }}>
                {children}
            </View>
            <TouchableOpacity
                style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}
                onPress={onPress}
            >
                <TextInput
                    editable={false}
                    onTouchStart={onPress}
                    style={{ fontSize: 14, height: 40, color: "#333333" }}
                    pointerEvents="none"
                    value={value}
                    placeholder={placeholder}
                    selection={{ start: 0, end: 0 }}
                    placeholderTextColor={'#333333'}
                />
            </TouchableOpacity>
            <View style={{ borderColor: '#e8e8e8', borderWidth: 0.5, width: 0, height: 40 }} />
            <View style={{ width: 28, height: 28, justifyContent: "center", alignItems: "center" }}>
                {children2}
            </View>
            <View
                style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}
            >
                <TextInput
                    style={{ flex: 1, fontSize: 14, height: 40, color: "#333333" }}
                    value={value2}
                    placeholder={placeholder2}
                    placeholderTextColor={'#333333'}
                    onChangeText={onChangText}
                    keyboardType={'decimal-pad'}
                />
            </View>
        </View>
    )
}

export default FormSelectCar;