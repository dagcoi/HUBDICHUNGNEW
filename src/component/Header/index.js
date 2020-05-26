import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native';

function Header({
    onPressLeft,
    onPressCenter,
}) {
    return (
        <View style={{ height: 50, flexDirection: 'row', shadowOffset: { height: 1, width: 1 }, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0, elevation: 5, }}>
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
                    onPress={onPressCenter}
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