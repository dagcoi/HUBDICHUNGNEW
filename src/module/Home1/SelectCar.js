import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

function SelectCar({
    onPress,
    backgroundColor,
    child,
    title,
    textDetail
}) {
    return (
        <View style={styles.bntSelectCar}>
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                onPress={onPress}
            >
                <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor ?? '#fff', borderBottomLeftRadius: 8, borderTopLeftRadius: 8, }}>
                    {child}
                </View>
                <View style={{ flex: 5, padding: 8, justifyContent: 'center', borderBottomEndRadius: 8, borderTopRightRadius: 8, backgroundColor: '#ffffff' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{title}</Text>
                    <Text style={{ fontSize: 14 }}>{textDetail}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bntSelectCar: {
        marginTop: 10,
        marginHorizontal: 8,
        borderRadius: 8,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
})

export default SelectCar;