import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Linking, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { HeaderText } from '../../../component/Header'
import Toast from 'react-native-simple-toast';

import * as link from '../../../URL'
import ItemCarTaxiNow from './itemCar'

const imageMaxToMin = '../../../image/maxtomin.png'
const imageMinToMax = '../../../image/mintomax.png'

class ListCar extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: false,
            dataSource: [
                {
                    "partner_uid": "G7",
                    "partner_name": "G7",
                    "partner_icon": "https://carotech.s3-ap-southeast-1.amazonaws.com/customer-source-icon/g7.png",
                    "service_code": "CAR4N_TAXI",
                    "service_name": "4 chỗ giá rẻ",
                    "service_icon": "https://carotech.s3-ap-southeast-1.amazonaws.com/partner_config/general/taxi4n.png",
                    "no_color_service_icon": "https://carotech.s3-ap-southeast-1.amazonaws.com/partner_config/general/taxi4n.png",
                    "zone_uid": "ZONE_G7_2",
                    "need_pay": 117600,
                    "unit": "đ"
                },
                {
                    "partner_uid": "G8",
                    "partner_name": "G8",
                    "partner_icon": "https://carotech.s3-ap-southeast-1.amazonaws.com/customer-source-icon/g7.png",
                    "service_code": "CAR4N_TAXI",
                    "service_name": "4 chỗ giá rẻ",
                    "service_icon": "https://carotech.s3-ap-southeast-1.amazonaws.com/partner_config/general/taxi4n.png",
                    "no_color_service_icon": "https://carotech.s3-ap-southeast-1.amazonaws.com/partner_config/general/taxi4n.png",
                    "zone_uid": "ZONE_G7_2",
                    "need_pay": 117600,
                    "unit": "đ"
                },
                {
                    "partner_uid": "G7",
                    "partner_name": "G7",
                    "partner_icon": "https://carotech.s3-ap-southeast-1.amazonaws.com/customer-source-icon/g7.png",
                    "service_code": "CAR4N_TAXI",
                    "service_name": "4 chỗ giá rẻ",
                    "service_icon": "https://carotech.s3-ap-southeast-1.amazonaws.com/partner_config/general/taxi4n.png",
                    "no_color_service_icon": "https://carotech.s3-ap-southeast-1.amazonaws.com/partner_config/general/taxi4n.png",
                    "zone_uid": "ZONE_G7_2",
                    "need_pay": 117600,
                    "unit": "đ"
                },
                {
                    "partner_uid": "G8",
                    "partner_name": "G8",
                    "partner_icon": "https://carotech.s3-ap-southeast-1.amazonaws.com/customer-source-icon/g7.png",
                    "service_code": "CAR4N_TAXI",
                    "service_name": "4 chỗ giá rẻ",
                    "service_icon": "https://carotech.s3-ap-southeast-1.amazonaws.com/partner_config/general/taxi4n.png",
                    "no_color_service_icon": "https://carotech.s3-ap-southeast-1.amazonaws.com/partner_config/general/taxi4n.png",
                    "zone_uid": "ZONE_G7_2",
                    "need_pay": 117600,
                    "unit": "đ"
                }
            ],
            sort: false,
            shareCar: false,
            car: false,
            listFilterType: [1, 24, 2, 17, 33, 48, 49],
            listFilterMethod: [1, 2],
            listNightBooking: [1],
            listFilter: {
                rideMethod: [],
                type: [],
            },
            // buyItems: [1,17,2,33,24],
            ride_method_id_list: [1, 2],
            listcar: [],
        }
    }

    componentDidMount() {
        this.getProvider()
    }


    async getProvider() {
        // TODO goi api lay danh sach xe
    }

    _increaseCount = () => {
        this.setState({ sort: !this.state.sort });
    };

    gotoInfoCustomer = (item, i) => {
        console.log('qqq')
        Toast.show('OnPress item: ' + i);
        this.props.navigation.navigate('CustomerInfoTaxiNow')
        // TODO
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    renderItem(obj1) {
        console.log('dhs: ' + obj1)
        { this.state.sort ? obj1.sort((a, b) => b.price - a.price) : obj1.sort((a, b) => a.price - b.price) }

        return (
            obj1.length < 1 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Image
                        style={{ width: 80, height: 80 }}
                        source={require('../../../image/sorry.png')}
                    />
                    <Text style={{ textAlign: 'center' }}>Không tìm thấy tài xế phù hợp. Vui lòng gọi <Text style={{ color: '#77a300' }}
                        onPress={() => Linking.openURL(`tel: 19006022`)}>19006022</Text></Text>
                    <Text style={{ padding: 4, fontSize: 18 }}>HOẶC</Text>
                </View> :
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        {obj1.map((item, index) => (
                            <ItemCarTaxiNow
                                item={item}
                                onPress={() => {
                                    this.gotoInfoCustomer(item, index)
                                }}
                            />
                        ))}
                    </View>
                </ScrollView>
        )
    }

    goBack = () => {
        this.props.navigation.goBack()
    }


    renderHeader() {
        return (
            <HeaderText
                textCenter={'Danh sách xe'}
                onPressLeft={this.goBack}
                onPressRight2={this._increaseCount}
                source2={this.state.sort ? require(imageMaxToMin) : require(imageMinToMax)}
            />
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    {this.renderHeader()}
                    <ActivityIndicator
                        size='large'
                    />
                </SafeAreaView>
            )
        }
        var obj = [...this.state.dataSource];
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.renderHeader()}
                <View style={{ flex: 1, paddingHorizontal: 8, }}>
                    {this.renderItem(obj)}
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
        component_pick: state.info.component_pick,
        component_drop: state.info.component_drop,
        depart_time2: state.info.depart_time2,
        chair: state.info.chair,
        is_from_airport: state.info.is_from_airport,
        product_chunk_type: state.info.product_chunk_type,
        duration: state.info.duration,
    }
}
export default connect(mapStateToProps)(ListCar);