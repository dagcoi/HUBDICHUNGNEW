import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Linking, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { HeaderText } from '../../../component/Header'
import Toast from 'react-native-simple-toast';
import { addSendCaro } from '../../../core/Redux/action/Action'

import * as link from '../../../URL'
import ItemCarTaxiNow from './itemCar'

const imageMaxToMin = '../../../image/maxtomin.png'
const imageMinToMax = '../../../image/mintomax.png'

class ListCar extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            listCar: [],
            sort: false,
            car: false,
        }
    }

    componentDidMount() {
        this.getProvider()
    }

    async getProvider() {
        const url = `${link.URL_API_PORTAL}price/v1/products?bookingTime=&startPlace=${JSON.stringify(this.props.addressLocationComponent)}&endPlace=${JSON.stringify(this.props.component_drop)}&productType=transfer_service&provider=caro&estimateDistance=${this.props.distanceCaro}&estimateTime=${this.props.durationCaro}`
        // const url = `${link.URL_API_PORTAL}price/v1/products?bookingTime=&startPlace=${JSON.stringify(this.props.addressLocationComponent)}&endPlace=${JSON.stringify(this.props.component_drop)}&productType=transfer_service&provider=caro`
        console.log(url)
        try {
            const response = await fetch(url, {
                method: 'GET',
            });
            const responseJson = await response.json();
            const listCar = responseJson.data;
            console.log(listCar);
            this.setState({ listCar: listCar, isLoading: false })
            return true
        }
        catch (error) {
            this.setStateAsync({
                isLoading: false
            });
            console.log('abc' + error);
        }
    }

    _increaseCount = () => {
        this.setState({ sort: !this.state.sort });
    };

    gotoInfoCustomer = (item, i) => {
        console.log('qqq')
        // Toast.show('OnPress item: ' + i);
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
                    {/* <Text style={{ padding: 4, fontSize: 18 }}>HOẶC</Text> */}
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
                                    this.props.addSendCaro(item.send)
                                    console.log(JSON.stringify(item.send))
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
        var obj = [...this.state.listCar];
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
        addressLocationComponent: state.info.addressLocationComponent,
        depart_time2: state.info.depart_time2,
        chair: state.info.chair,
        is_from_airport: state.info.is_from_airport,
        product_chunk_type: state.info.product_chunk_type,
        durationCaro: state.info.durationCaro,
        distanceCaro: state.info.distanceCaro,
    }
}
export default connect(mapStateToProps, { addSendCaro: addSendCaro })(ListCar);