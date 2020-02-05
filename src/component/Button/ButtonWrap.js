import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native';


function ButtonWrap({
    onPress,
    value,
}) {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
            >
                <Text style={{ textAlign: "right", backgroundColor: "#77a300", color: '#fff', padding: 8, borderRadius: 4, fontSize: 16 }}>{value}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonWrap;