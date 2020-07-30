import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

function HeaderText({
    onPressLeft,
    textCenter,
    onPressRight1,
    onPressRight2,
    source1,
    source2,
}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPressLeft}

            >
                <View style={{ height: 50, width: 50, marginLeft: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ height: 30, width: 30, borderRadius: 20 }}
                        source={require('../../image/arrowback.png')}
                    />
                </View>
            </TouchableOpacity>

            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, height: 50 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{textCenter}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems: 'center', height: 50, minWidth: 50}}>
                {source1 ? <TouchableOpacity
                    style={{ height: 30, width: 30, marginRight: 8, justifyContent: 'center', alignItems: 'center' }}
                    onPress={onPressRight1}
                >
                    <Image
                        style={{ height: 22, width: 22 }}
                        source={source1}
                    />
                </TouchableOpacity> : null}

                {source2 ? <TouchableOpacity
                    style={{ height: 30, width: 30, marginRight: 8, justifyContent: 'center', alignItems: 'center' }}
                    onPress={onPressRight2}
                >
                    <Image
                        style={{ height: 22, width: 22 }}
                        source={source2}
                    />
                </TouchableOpacity> : null}

                {source1 || source2 ? null : <TouchableOpacity
                    style={{ height: 50, width: 50, marginRight: 8, justifyContent: 'center', alignItems: 'center' }}
                >
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        elevation: 5,
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 2,
    }
})

export default HeaderText;