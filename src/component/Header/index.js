import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StackActions } from 'react-navigation';

function Header({
    onPressLeft,
    onPressCenter,
}) {
    return (
        <View style={{ height: 50, flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={onPressLeft}
            >
                <View style={{ height: 50, width: 50, marginLeft: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ height: 22, width: 22 }}
                        source={require('../../image/menu.png')}
                    />
                </View>
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, height: 50 }}>
                <TouchableOpacity
                    onPress = {onPressCenter}
                >
                <Image
                    style={{ height: 24, width: 84 }}
                    source={require('../../image/dichung.png')}
                />
                </TouchableOpacity>
            </View>

            <View style={{ height: 50, width: 50, marginRight: 8, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{ height: 22, width: 22 }}
                    source={require('../../image/notification.png')}
                />
            </View>

        </View>
    )

}

export default Header;