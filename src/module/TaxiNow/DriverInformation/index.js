import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

function DriverInformation({ item }) {
    <View style={styles.container}>
        <Text>Thông tin lái xe</Text>
        <View style={styles.formText}>
            <Text style={styles.textBold}>Họ và tên: </Text>
            <Text style={styles.textNormal}>{item.name}</Text>
        </View>

        <View style={styles.formText}>
            <Text style={styles.textBold}>Số điện thoại: </Text>
            <Text style={styles.textNormal}>{item.phone}</Text>
        </View>

        <View style={styles.formText}>
            <Text style={styles.textBold}>Biển số: </Text>
            <Text style={styles.textNormal}>{item.carCode}</Text>
        </View>

        <View style={styles.formText}>
            <Text style={styles.textBold}>Số chuyến : </Text>
            <Text style={styles.textNormal}>{item.countTrip}</Text>
        </View>

        <View style={styles.formText}>
            <Text style={styles.textBold}>Đánh giá: </Text>
            <Text style={styles.textNormal}>{item.StarVote}</Text>
        </View>

        <View style={styles.formText}>
            <Text style={styles.textBold}>cái gì đó: </Text>
            <Text style={styles.textNormal}>{item.cgd}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    textBold: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
    },
    textNormal: {
        fontSize: 14,
    },
    formText: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        flexDirection: 'row',
    }
})

export default DriverInformation;