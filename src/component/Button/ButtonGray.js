import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native';


function ButtonGray({
    onPress,
    value,
}) {
    return (
        <View style={{ height: 56, flexDirection: 'row', backgroundColor: '#00000000', marginTop: 8, }} >
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e8e8e8', borderRadius: 8, margin: 4 }}
                onPress={onPress}
            >
                <Text style={{ color: '#ef465f', fontSize: 20, fontWeight: 'bold', margin: 4, textDecorationLine: 'underline' }}>{value.toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonGray;