import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function FormSelectVehicleSlot({
    onPress,
    value,
    placeholder,
    noBorderTop,
    onPress2,
    value2,
    placeholder2,
    children,
    children2,
}) {
    return (
        <View style={[{ flexDirection: 'row', borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', }, noBorderTop ? { borderTopWidth: 0 } : { borderTopWidth: 1 }]}>
            <View style={{ width: 28, height: 28, justifyContent: "center", alignItems: "center", padding: 2 }}>
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
                    placeholderTextColor={'#999999'}
                />
            </TouchableOpacity>
            <View style={{ borderColor: '#e8e8e8', borderWidth: 0.5, width: 0, height: 40 }} />
            <View style={{ width: 28, height: 28, justifyContent: "center", alignItems: "center", padding: 2 }}>
                {children2}
            </View>
            <TouchableOpacity
                style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}
                onPress={onPress2}
            >
                <TextInput
                    editable={false}
                    onTouchStart={onPress2}
                    style={{ fontSize: 14, height: 40, color: "#333333" }}
                    pointerEvents="none"
                    value={value2}
                    placeholder={placeholder2}
                    selection={{ start: 0, end: 0 }}
                    placeholderTextColor={'#999999'}
                />
            </TouchableOpacity>
        </View>
    )
}

export default FormSelectVehicleSlot;