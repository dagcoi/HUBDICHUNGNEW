import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

function HeaderText({
    onPressLeft,
    textCenter,
}) {
    return (
        <View style={{ height: 50, flexDirection: 'row', shadowOffset: { height: 2, width: 2 }, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0, elevation: 5, }}>
            <TouchableOpacity
                onPress={onPressLeft}

            >
                <View style={{ height: 50, width: 50, marginLeft: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ height: 30, width: 30, borderRadius: 20 }}
                        source={require('../../image/arrowback.png')}
                    />
                </View>
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, height: 50 }}>
                <Text style = {{fontSize : 18, fontWeight : 'bold'}}>{textCenter}</Text>
            </View>

            <View style={{ height: 50, width: 50, marginRight: 8, justifyContent: 'center', alignItems: 'center' }}>
                {/* <Image
                    style={{ height: 22, width: 22 }}
                    source={require('../../image/notification.png')}
                /> */}
            </View>

        </View>
    )

}

export default HeaderText;