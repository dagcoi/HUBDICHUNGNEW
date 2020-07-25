import React, { Component } from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

function Header({
    onPressLeft,
    onPressCenter,
}) {
    return (
        <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        elevation: 5,
        height: 50, 
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 2,
    }
})
export default Header;