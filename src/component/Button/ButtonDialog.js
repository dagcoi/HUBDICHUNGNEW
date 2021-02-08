import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native';


function ButtonDialog({
    onPress,
    text,
}) {
    return (
        <View style={{ height: 56, flexDirection: 'row', backgroundColor: '#00000000', marginTop: 8, }} >
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#77a300', borderRadius: 8, margin: 4 }}
                onPress={onPress}
            >
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', margin: 4 }}>{text.toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonDialog;