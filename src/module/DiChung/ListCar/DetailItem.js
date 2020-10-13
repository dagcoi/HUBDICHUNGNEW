import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native'
import HTML from 'react-native-render-html';
import TextSpaceBetween from '../../../component/ImageTextDiChung/TextSpaceBetween';
import { SvgBag, SvgCar, SvgCheckCircle, SvgCheckCircleBorder, SvgMoneyUlgy } from '../../../icons';

function Detail({ item }) {
    console.log('abc...' + item.info.description);
    var list = [];
    if (item?.info?.description != '') {
        list = item?.info?.description?.split("<br>")
        console.log(list)
    }
    return (
        <View style={{ backgroundColor: '#fff' }} >
            <ScrollView style={{ paddingHorizontal: 4 }}>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ textAlign: 'left', fontSize: 22, fontWeight: 'bold', margin: 8, }}>Chi tiết</Text>
                </View>
                <View style={{ borderRadius: 8, borderWidth: 2, borderColor: '#77a300', padding: 8, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ width: 200, height: 120 }}
                            source={item.info.image && item.info.image ? { uri: item.info.image } : null}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
                        <View style={{ flex: 1 }} />
                        <Text style={{ textAlign: 'left', color: '#fff', backgroundColor: '#eb6752', padding: 4, }}>{item.info.label}</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 8, }}>{item.info.title.toUpperCase()}</Text>
                {item.send.productType == 'hourly_car_rental' ?
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ fontWeight: '700' }}>Thủ tục:</Text>
                        <Text>- CMND: Bản gốc</Text>
                        <Text>- Sổ hộ khẩu: Bản gốc hoặc KT3</Text>
                        <Text>- Bằng lái: B2 trở lên</Text>
                        <Text>- Đặt cọc: Xe máy + đăng ký xe chính chủ hoặc 20 triệu tiền mặt</Text>
                    </View>
                    : (item.info?.vehicleType && <View style={{ flexDirection: 'row', alignItems: 'center', height: 32 }}>
                        {item?.send?.productType != 'EXPRESS' ? <SvgCar width={20} height={20} /> : <SvgBag width={20} height={20} />}
                        <Text style={{ fontSize: 14, }}>{item.info.vehicleType}</Text>
                    </View>)}
                {/* {item?.info?.description != '' && <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingHorizontal: 2 }} >
                        <SvgCheckCircleBorder color={"#77a300"} />
                    </View>
                    <HTML html={item.info.description} />
                </View>} */}
                {list.map((item, index) => (
                    item != '' &&
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingHorizontal: 2 }} >
                            <SvgCheckCircleBorder color={"#77a300"} />
                        </View>
                        {/* <Text>{item}</Text> */}
                        <HTML html={item} />
                    </View>
                ))

                }
                {item.info.priceExtra ? <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingHorizontal: 2 }} >
                            <SvgCheckCircleBorder color={"#77a300"} />
                        </View>
                        <Text>{'Phụ trội theo giờ: ' + ((parseInt(item.info.priceExtra.hourExtra)).format(0, 3, '.') ?? '') + ' đ/giờ'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingHorizontal: 2 }} >
                            <SvgCheckCircleBorder color={"#77a300"} />
                        </View>
                        <Text>{'Phụ trội theo km: ' + ((parseInt(item.info.priceExtra.kmExtra)).format(0, 3, '.') ?? '') + ' đ/km'}</Text>
                    </View>
                </View> : null}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingHorizontal: 3 }} >
                        <SvgMoneyUlgy color={"#77a300"} width={14} height={14} />
                    </View>
                    <Text>{'Giá: '}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{((parseInt(item.info.price)).format(0, 3, '.') ?? '') + ' đ'}</Text>
                </View>
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