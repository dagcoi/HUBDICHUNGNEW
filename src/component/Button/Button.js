import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native';


function Button({
    onPress,
    value,
}) {
    return (
        <View style={{ height: 40, flexDirection: 'row', backgroundColor: '#00000000', marginTop: 8, }} >
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#77a300', borderRadius: 8 }}
                onPress={onPress}
            >
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', margin: 8 }}>{value}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button;