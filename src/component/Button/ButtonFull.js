import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native';


function ButtonFull({
    onPress,
    value,
}) {
    return (
        <View>
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#77a300', borderRadius: 4 }}
                onPress={onPress}
            >
                <Text style={{ color: '#fff', fontSize: 20, fontWeight : 'bold' }}>{value}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonFull;