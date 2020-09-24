import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SvgArrowDown, SvgSwap } from '../../icons';

function ImageInputTextDiChung({
    onPress,
    source,
    value,
    placeholder,
    imageRight,
    widthHeightImage,
    noBorderTop,
    onPressSwap,
    children,
}) {
    return (
        <View style={[{ height: 40, flexDirection: 'row', borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', }, noBorderTop ? { borderTopWidth: 0 } : { borderTopWidth: 1 }]}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ width: 28, height: 28, justifyContent: "center", alignItems: "center" }}>
                    {children}
                </View>
                <TouchableOpacity
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}
                    onPress={onPress}
                >
                    <TextInput
                        editable={false}
                        onTouchStart={onPress}
                        style={{ fontSize: 14, color: "#333333", flex: 1 }}
                        pointerEvents="none"
                        value={value}
                        placeholder={placeholder}
                        selection={{ start: 0, end: 0 }}
                        placeholderTextColor={'#333333'}
                    />
                </TouchableOpacity>
                {imageRight && <SvgArrowDown />}
            </View>
            {onPressSwap ?
                <TouchableOpacity
                    onPress={onPressSwap}
                    style={{ borderLeftWidth: 1, borderColor: '#e8e8e8', padding: 6 }}
                >
                    <SvgSwap />
                </TouchableOpacity> : null}
        </View>
    )
}

export default ImageInputTextDiChung;