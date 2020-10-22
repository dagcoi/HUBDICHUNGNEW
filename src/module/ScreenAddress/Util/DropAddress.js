import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { SvgPick, SvgSwap } from '../../../icons';

const imageSwap = '../../../image/swap.png'
const imageLocation = '../../../image/location.png'

function DropAddress({
    onPressInput,
    placeholder,
    value,
    onPressSwap,
}) {
    return (
        <View style={{ flexDirection: 'row', borderColor: '#e8e8e8', borderTopWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, flexDirection: 'row', borderColor: '#e8e8e8', borderRightWidth: 0.0, justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ paddingLeft: 8 }}>
                    <SvgPick />
                </View>
                <TouchableOpacity
                    style={{ flex: 1, height: 40, marginLeft: 8 }}
                    onPress={onPressInput}
                >
                    <TextInput
                        editable={false}
                        onTouchStart={onPressInput}
                        style={{ fontSize: 14, height: 40, color: "#333333" }}
                        pointerEvents="none"
                        value={value}
                        placeholder={placeholder}
                        selection={{ start: 0, end: 0 }}
                        placeholderTextColor={'#999999'}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={{ borderLeftWidth: 1, borderColor: '#e8e8e8', padding: 8 }}
                onPress={onPressSwap}
            >
                <SvgSwap />
            </TouchableOpacity>

        </View>
    )
}

export default DropAddress;