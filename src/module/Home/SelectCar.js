import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

function SelectCar({
    onPress,
    backgroundColor,
    source,
    title,
    textDetail
}) {
    return (
        <View style={styles.bntSelectCar}>
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row', }}
                onPress={onPress}
            >
                <View style={{ width: 100, height: 100, justifyContent: 'center', backgroundColor: backgroundColor, borderBottomLeftRadius: 8, borderTopLeftRadius: 8, }}>
                    <Image
                        style={{ flex: 1, borderBottomLeftRadius: 8, borderTopLeftRadius: 8 }}
                        source={source}
                        resizeMode='cover'
                    />
                </View>
                <View style={{ flex: 5, padding: 8, justifyContent: 'center', borderBottomEndRadius: 8, borderTopRightRadius: 8, backgroundColor: '#ffffff' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{title}</Text>
                    <Text style={{ fontSize: 12 }}>{textDetail}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bntSelectCar: {
        borderRadius: 4,
        borderColor: '#ffffff',
        height: 100,
        marginTop: 10,
    },
})

export default SelectCar;