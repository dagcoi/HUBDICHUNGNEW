import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native'
import HTML from 'react-native-render-html';
import TextSpaceBetween from '../../../component/ImageTextDiChung/TextSpaceBetween';

function Detail({ item }) {
    console.log(item.info.description);
    return (
        <View style={{ flex: 2, backgroundColor: '#fff' }} >
            <ScrollView style={{ paddingHorizontal: 16 }}>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', margin: 8, }}>Chi tiết</Text>
                </View>
                <View style={{ height: 200, borderRadius: 8, borderWidth: 2, borderColor: '#77a300' }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{ textAlign: 'left', color: '#fff', backgroundColor: '#77a300', padding: 4, }}>Đề xuất</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <Image
                            style={{ width: 200, height: 120 }}
                            source={item.info.image && item.info.image ? { uri: item.info.image } : null}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 16}}>
                        <View style={{ flex: 1 }} />
                        <Text style={{ textAlign: 'left', color: '#fff', backgroundColor: '#eb6752', padding: 4, }}>{item.info.label}</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 8, }}>{item.info.title.toUpperCase()}</Text>
                {/* <TextSpaceBetween textBold={'Hình thức: '} text={item.info.label} /> */}
                {/* <TextSpaceBetween textBold={'Ghi chú: '} text={item.info.description.replaceAll('<br>', ', ')} /> */}
                {/* <View style={{ flexDirection: 'row', paddingHorizontal: 16, height: 40 }}>
                    <Text style={styles.textBigLeftBold}>Ghi chú: </Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <HTML html={item.info.description} />
                    </View>
                </View> */}
                {/* <TextSpaceBetween textBold={'Loại xe: '} text={item.info.title} /> */}
                <View>
                    <HTML html={item.info.description} />
                </View>
                {item.info.priceExtra ? <View>
                    <TextSpaceBetween textBold={'Phụ trội theo giờ: '} text={((parseInt(item.info.priceExtra.hourExtra)).format(0, 3, '.') ?? '') + ' đ/giờ'} />
                    <TextSpaceBetween textBold={'phụ trội theo km: '} text={((parseInt(item.info.priceExtra.kmExtra)).format(0, 3, '.') ?? '') + ' đ/km'} />

                </View> : null}
                <TextSpaceBetween textBold={'Giá: '} text={((parseInt(item.info.price)).format(0, 3, '.') ?? '') + ' đ'} colorUrly />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    textBigLeftBold: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default Detail;