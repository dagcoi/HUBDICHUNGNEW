import { View, Image, StyleSheet, Text, Dimensions } from 'react-native'
import StarVote from '../StarVote'
import { Button } from '../Button'
import HTML from 'react-native-render-html';
import React, { Component } from 'react'


Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

const imageCheck = '../../image/check.png'
const imageTollFee = '../../image/notetollfee.png'
const imagePeople = '../../image/people.png'
const imageVali = '../../image/vali.png'
function ItemCarTaxi({ item, onPress }) {
    return (

        <View
            style={styles.container}
        >
            <View style={{ flexDirection: 'row' }}>

                <View style={styles.containerr}>
                    {item.ride_method_id == '1' ?
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#ffffff', fontSize: 14, backgroundColor: '#ef465f', padding: 4, fontWeight: 'bold' }}>ĐI RIÊNG</Text>
                        </View> : <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#ffffff', fontSize: 14, backgroundColor: '#77a300', padding: 4, fontWeight: 'bold' }}>ĐI GHÉP</Text>
                        </View>}
                    <Text style={styles.tentuyen}>
                        {item.partner_name.toUpperCase()}
                    </Text>
                    <Text style={styles.loaixe}>{item.vehicle_name}</Text>
                    <StarVote number={item.star_vote} />
                    <Text style={styles.giaTien}>{item.merged.format(0, 3, '.')} đ</Text>

                </View>

                <View style={styles.imageRight}>
                    <Image
                        style={{ width: 150, height: 90, }}
                        source={{ uri: item.vehicle_icon, }}
                        resizeMode="contain"
                    />
                </View>

            </View>
            {item.ride_method_id == '1' ?
                item.toll_fee == 0 ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Image
                            style={{ width: 14, height: 14, marginRight: 8, marginLeft: 8 }}
                            source={require(imageCheck)} />
                        <Text style={{ fontSize: 14 }}>Giá trọn gói</Text>
                    </View> : item.toll_fee == 'NA' ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image
                                style={{ width: 14, height: 14, marginRight: 8, marginLeft: 8 }}
                                source={require(imageCheck)} />
                            <Text style={{ fontSize: 14 }}>Giá chưa bao gồm phí cầu đường</Text>
                        </View> : <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image
                                style={{ width: 16, height: 16, marginRight: 8, marginLeft: 8 }}
                                source={require(imageTollFee)} />
                            <Text style={{ fontSize: 14 }}>Phí cầu đường: {parseInt(item.toll_fee).format(0, 3, '.')} đ</Text>
                        </View>
                :
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Image
                            style={{ width: 16, height: 16, marginRight: 8, marginLeft: 8 }}
                            source={require(imagePeople)} />
                        <Text style={{ fontSize: 14 }}>Tối đa {item.max_share_seats} chỗ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Image
                            style={{ width: 16, height: 16, marginRight: 8, marginLeft: 8 }}
                            source={require(imageVali)} />
                        <Text style={{ fontSize: 14 }}>{item.partner_luggage}</Text>
                    </View>
                </View>
            }

            {item.full_package_by_km ?
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image
                        style={{ width: 14, height: 14, marginRight: 8, marginLeft: 8 }}
                        source={require(imageCheck)} />
                    <Text style={{ fontSize: 14 }}>{item.full_package_by_km}</Text>
                </View> : null}

            <View style={{ marginLeft: 8, flexDirection: 'row', }}>
                {item.discount_text == '' ? null :
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', }}>
                        <Image
                            style={{ width: 14, height: 14, marginRight: 8 }}
                            source={require(imageCheck)} />
                        <HTML html={item.discount_text} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>}
            </View>
            {item.discount_data.partner_note == null ? null :
                <View style={{ flexDirection: 'column', flex: 1, padding: 8 }}>
                    <HTML html={item.discount_data.partner_note.replace("</a>", "").replace("</p>", "").replace("<p>", "")} imagesMaxWidth={Dimensions.get('window').width} />
                </View>}

            <Button
                onPress={onPress}
                value={'CHỌN XE'}
            />

        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        borderColor: '#e8e8e8',
        borderWidth: 0.5,
        borderRadius: 4,
        padding: 8,
        marginTop: 8,
        backgroundColor: '#ffffff',
    },
    containerr: {
        flex: 1,
        padding: 8,
        marginTop: 3,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    imageRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tentuyen: {
        marginTop: 8,
        padding: 1,
        fontSize: 20,
        color: '#77a300',
        fontWeight: 'bold',
        backgroundColor: '#ffffff'
    },
    loaixe: {
        fontSize: 14,
    },
    giaTien: {
        fontSize: 18,
        color: '#00363d',
    },
})


export default ItemCarTaxi;