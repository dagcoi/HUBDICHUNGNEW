import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function ImageInputTextDiChung({
    onPress,
    source,
    value,
    placeholder,
    imageRight,
    widthHeightImage
}) {
    return (
        <View style={{ flexDirection: 'row', borderColor: '#e8e8e8', borderTopWidth: 1, justifyContent: 'center', alignItems: 'center', }}>
            <View style={{ width: 28, height: 28, justifyContent: "center", alignItems: "center" }}>
                <Image
                    style={{ height: widthHeightImage ?? 28, width: widthHeightImage ?? 28, marginLeft: 8, resizeMode: 'contain' }}
                    source={source}
                />
            </View>
            <TouchableOpacity
                style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center',marginLeft: 8 }}
                onPress={onPress}
            >
                <TextInput
                    editable={false}
                    onTouchStart={onPress}
                    style={{ fontSize: 14, height: 40, color: "#00363d" }}
                    pointerEvents="none"
                    value={value}
                    placeholder={placeholder}
                    selection={{ start: 0, end: 0 }}
                    placeholderTextColor={'#333333'}
                />
            </TouchableOpacity>
            {imageRight ? <Image
                style={{ height: 28, width: 28, marginLeft: 8, resizeMode: 'contain' }}
                source={require('../../image/arrowdown.png')}
            /> : null}
        </View>
    )
}

export default ImageInputTextDiChung;