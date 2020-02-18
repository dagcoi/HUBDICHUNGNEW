import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function ImageInputTextDiChung({
    onPress,
    source,
    value,
    placeholder
}) {
    return (
        <View style={{ flexDirection: 'row', borderColor: '#00363e', borderWidth: 0.5, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                style={{ height: 30, width: 24, marginLeft: 8 }}
                source={source}
            />
            <TouchableOpacity
                style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', }}
                onPress={onPress}
            >
                <TextInput
                    editable={false}
                    onTouchStart={onPress}
                    style={{ fontSize: 14, height: 40, color: "#00363d" }}
                    pointerEvents="none"
                    value={value}
                    placeholder={placeholder}
                />
            </TouchableOpacity>
        </View>
    )
}

export default ImageInputTextDiChung;