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
                <View style={{ width : 100, height : 100, justifyContent: 'center', backgroundColor: backgroundColor, borderBottomLeftRadius: 8, borderTopLeftRadius: 8,}}>
                    <Image
                        style={{ flex: 1, borderTopLeftRadius : 8, borderBottomLeftRadius : 8, }}
                        source={source}
                    />
                </View>
                <View style={{ flex: 5, padding: 8, justifyContent: 'center', borderBottomEndRadius: 8, borderTopRightRadius: 8, backgroundColor: '#eeeeee' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
                    <Text>{textDetail}</Text>
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
        marginTop: 8,
    },
})

export default SelectCar;