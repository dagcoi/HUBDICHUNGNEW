import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

function FormSwitch({ onPressLeft, onPressRight, textLeft, textRight, select }) {
    return (
        <View style={{ flexDirection: 'row', height: 48, backgroundColor: '#fff', marginHorizontal: 8, marginTop: 8, borderTopStartRadius: 8, borderTopEndRadius: 8 }}>
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: select ? '#fff' : '#aaa', borderTopStartRadius: 8 }}
                onPress={onPressLeft}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: select ? '#77a300' : '#fff' }}>{textLeft}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: select ? '#aaa' : '#fff', borderTopEndRadius: 8 }}
                onPress={onPressRight}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: select ? '#fff' : '#77a300' }}>{textRight}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FormSwitch;