import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native';


function ButtonGray({
    onPress,
    value,
}) {
    return (
        <View style={{ height: 40, flexDirection: 'row', backgroundColor: '#00000000', marginTop: 8 }} >
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e8e8e8' }}
                onPress={onPress}
            >
                <Text style={{ color: '#ef465f', fontSize: 20, fontWeight: 'bold', margin: 8, textDecorationLine: 'underline' }}>{value}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonGray;