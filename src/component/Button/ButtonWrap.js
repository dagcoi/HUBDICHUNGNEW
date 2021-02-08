import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native';


function ButtonWrap({
    onPress,
    value,
}) {
    return (
        <View style={{ height: 56, backgroundColor: '#77a300', marginTop: 8, }}>
            <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#77a300', margin: 4, padding: 8, borderRadius: 8 }}
                onPress={onPress}
            >
                <Text style={{ textAlign: "center", color: '#fff', fontSize: 20, fontWeight: 'bold', margin: 4 }}>{value.toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonWrap;