import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function ImageInputTextDiChung({
    onPress,
    source,
    value,
    placeholder,
}) {
    return (
        <View style={{ flexDirection: 'row', borderColor: '#e8e8e8', borderTopWidth: 0.2, justifyContent: 'center', alignItems: 'center',}}>
            <Image
                style={{ height: 28, width: 28, marginLeft: 8, resizeMode: 'contain' }}
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