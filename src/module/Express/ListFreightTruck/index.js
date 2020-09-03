import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import { addTripInformationHourlyBookingVanChuyen } from '../../../core/Redux/action/Action'
import * as link from '../../../URL'
import { HeaderText } from '../../../component/Header';
import { ItemExpressHourly } from '../../../component/ItemCar';

const imageMaxToMin = '../../../image/maxtomin.png'
const imageMinToMax = '../../../image/mintomax.png'

class ListFreightTruck extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            dataSource: [],
            sort: false,
            shareCar: false,
            car: false,
        }
    }

    componentDidMount() {
        this.getListCarNew()
    }

    async getListCar() {
        const formdata = new FormData();
        formdata.append('depart_time', this.props.depart_time)
        formdata.append('pick_address', JSON.stringify(this.props.pick_add))
        formdata.append('pick_address_component', JSON.stringify(this.props.component_pick))
        formdata.append('duration', this.props.duration)
        const url = link.URL_API + `passenger/get_hourly_price_list?service_type=HOURLY_FREIGHT_TRUCK`;
        console.log(url)
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "multipart/form-data",
                },
                body: formdata
            });
            const responseJson = await response.json();
            this.setStateAsync({
                isLoading: false,
                dataSource: responseJson.data,
            });
            console.log(responseJson.data)
            return responseJson.data;
        }
        catch (error) {
            this.setStateAsync({
                isLoading: false
            });
            console.log(error);
        }
    }

    async getListCarNew() {
        const { navigation } = this.props;
        var listCarType = navigation.getParam('listCarType');
        console.log(listCarType)
        const url = link.URL_API_PORTAL + 'price/v1/prices?service_type=HOURLY_FREIGHT_TRUCK&';
        let parame = `${url}vehicle_id=0&depart_time=${this.props.depart_time}&duration=${this.props.duration}&pick_address_component=${JSON.stringify(this.props.component_pick)}&pick_address=${this.props.pick_add}&provider=dichungtaxi`
        try {
            const response = await fetch(parame, {
                method: 'GET',
            });
            const responseJson = await response.json();
            this.setStateAsync({
                isLoading: false,
                dataSource: responseJson.data.data,
            });
            // console.log(responseJson)
            console.log(parame)
            return responseJson.data.data;
        }
        catch (error) {
            this.setStateAsync({
                isLoading: false
            });
            console.log(error);
        }
        console.log(parame)
    }

    _increaseCount = () => {
        this.setState({ sort: !this.state.sort });
    };

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    renderItem(obj) {
        { this.state.sort ? obj.sort((a, b) => b.price - a.price) : obj.sort((a, b) => a.price - b.price) }
        return (
            obj.length < 1 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Image
                        style={{ width: 80, height: 80 }}
                        source={require('../../../image/sorry.png')}
                    />
                    <Text style={{ textAlign: 'center' }}>Khu vực bạn chọn hiện không có xe phù hợp. Vui lòng chọn khu vực khác!</Text>
                </View> :
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ padding: 8 }}
                >
                    <View>
                        {obj.map((item, index) => (
                            <ItemExpressHourly
                                item={item}
                                onPress={() => {
                                    this.gotoInfoCustomerHourlyFreightTruck(item);
                                }}
                            />
                        ))
                        }
                    </View>
                </ScrollView>
        )
    }
    nextScreen() {
        this.props.navigation.push("InfoCustommerHourlyFreightTruck")
    }

    gotoInfoCustomerHourlyFreightTruck = (item) => {
        this.props.addTripInformationHourlyBookingVanChuyen(item.partner_name, item.price, this.props.depart_time, item.extra_price_km_format, item.extra_price_hour_format, item.km_limit_format, item.vehicle_icon, item.vehicle_id, item.vehicle_name, item.city_id, item.partner_id)
        this.nextScreen();
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
                <SafeAreaView style={{ flex: 1, }}>
                    {this.renderHeader()}
                    <ActivityIndicator
                        size='large'
                    />
                </SafeAreaView>
            )
        }
        var obj = [...this.state.dataSource];
        return (
            <SafeAreaView style={{ flex: 1, }}>
                {this.renderHeader()}
                <View style={{ flex: 1 }}>
                    {this.renderItem(obj)}
                </View>
            </SafeAreaView>
        );
    }

}

function mapStateToProps(state) {
    return {
        pick_add: state.rdVanChuyen.pick_add,
        component_pick: state.rdVanChuyen.component_pick,
        depart_time: state.rdVanChuyen.depart_time,
        duration: state.rdVanChuyen.duration,
    }
}
export default connect(mapStateToProps, { addTripInformationHourlyBookingVanChuyen: addTripInformationHourlyBookingVanChuyen })(ListFreightTruck);