import { View, Image, TouchableOpacity, Dimensions, Text, StyleSheet } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist';
import React, { Component } from 'react'


function SwiperFlatListCustom({ isLoading, data, onPress }) {
    if (isLoading) {
        return null
    }
    return (
        <View style={{ height: Dimensions.get('window').width / 2 + 8, margin: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Nội dung hấp dẫn</Text>
            <SwiperFlatList
                autoplay={true}
                autoplayDelay={7}
                autoplayLoop={true}
                index={0}
                data={data}
                style={{ flexDirection: 'row' }}
                renderItem={({ item }) => {
                    return (
                        <View style={[styles.child, { alignItems: 'center' }]}>
                            <TouchableOpacity
                                style={styles.child}
                                onPress={onPress}
                            >
                                <Image
                                    style={styles.imageChild}
                                    source={{ uri: item._embedded['wp:featuredmedia'][0].source_url }}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    itemImage: {
        fontWeight: '600',
        fontSize: 12,
        color: '#333333',
    },
    imageChild: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 4,
        margin: 8,
    },
    child: {
        height: Dimensions.get('window').width / 2 - 20,
        width: Dimensions.get('window').width - 40,
        // paddingTop: 8,
        justifyContent: 'center',
    },
});


export default SwiperFlatListCustom;