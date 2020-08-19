import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native';


function ButtonWrap({
    onPress,
    value,
}) {
    return (
        <View style={{ height: 40, backgroundColor: '#77a300', marginTop: 8, }}>
            <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#77a300', margin: 0, padding: 8, borderRadius: 8 }}
                onPress={onPress}
            >
                <Text style={{ textAlign: "center", color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{value}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonWrap;