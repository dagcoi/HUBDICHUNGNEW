import React, { Component } from 'react'
import { View, TouchableOpacity,Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

const imageSwap = '../../../image/swap.png'
const imageLocation = '../../../image/location.png'

function  DropAddress({
    onPressInput,
    placeholder,
    value,
    onPressSwap,
}) {
    return (
        <View style={{ flexDirection: 'row', borderColor: '#e8e8e8', borderTopWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, flexDirection: 'row', borderColor: '#e8e8e8', borderRightWidth: 0.0, justifyContent: 'center', alignItems: 'center', }}>
                <Image
                    style={{ height: 28, width: 28, marginLeft: 4, alignItems: 'center', justifyContent: 'center' }}
                    source={require(imageLocation)}
                />
                <TouchableOpacity
                    style={{ flex: 1, height: 40, marginLeft: 4 }}
                    onPress={onPressInput}
                >
                    <TextInput
                        editable={false}
                        onTouchStart={onPressInput}
                        style={{ fontSize: 14, height: 40, color: "#00363d" }}
                        pointerEvents="none"
                        value={value}
                        placeholder={placeholder}
                        selection={{ start: 0, end: 0 }}
                        placeholderTextColor={'#333333'}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={{ borderLeftWidth: 1, borderColor: '#e8e8e8' }}
                onPress={onPressSwap}
            >
                <Image
                    style={{ height: 24, width: 24, margin: 8 }}
                    source={require(imageSwap)}
                />
            </TouchableOpacity>

        </View>
    )
}

export default DropAddress;