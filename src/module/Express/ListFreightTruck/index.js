import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import StarVote from '../../../component/StarVote'

import { addTripInfomationHourlyBookingVanChuyen } from '../../../core/Redux/action/Action'
import * as link from '../../../URL'
import { Button } from '../../../component/Button'
import { HeaderText } from '../../../component/Header';

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
                    {/* <TouchableOpacity
                        style={{ backgroundColor: '#77a300', margin: 8, padding: 8 }}
                        onPress={() => {
                            this.props.navigation.push("SpecialRequirements", {
                                'screen': 'VanChuyen'
                            })
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>ĐẶT XE THEO YÊU CẦU</Text>
                    </TouchableOpacity> */}
                </View> :
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ padding: 8 }}
                >
                    <View>
                        {obj.map((item, index) => (
                            <View>
                                <View
                                    key={index}
                                    style={styles.container}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.containerr}>
                                            <Text style={styles.tentuyen}>
                                                {item.partner_name.toUpperCase()}
                                            </Text>
                                            <Text style={styles.carType}>{item.vehicle_name}</Text>
                                            <StarVote number={item.star_vote} />
                                            <Text style={styles.carType}>giới hạn {item.km_limit_format}</Text>
                                            <Text style={styles.totalCost}>{item.price_format}</Text>
                                        </View>
                                        <View style={styles.imageRight}>
                                            <Image
                                                style={{ width: 150, height: 90, }}
                                                source={{ uri: item.vehicle_icon, }}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                            <Image
                                                style={{ width: 16, height: 16, marginRight: 8, }}
                                                source={require('../../../image/note.png')} />
                                            <Text style={{ flex: 1, }}>Phụ trội theo km: {item.extra_price_km} đ/km</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                            <Image
                                                style={{ width: 16, height: 16, marginRight: 8, }}
                                                source={require('../../../image/note.png')} />
                                            <Text style={{ flex: 1, }}>Phụ trội theo giờ: {item.extra_price_hour} đ/giờ</Text>
                                        </View>
                                        {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                            <Image
                                                style={{ width: 16, height: 16, marginRight: 8, }}
                                                source={require('../../../image/note.png')} />
                                            <Text style={{ flex: 1, }}>Giá đã bao gồm tiền xăng và lái xe, chưa bao gồm phí cầu đường, bến bãi, đỗ xe.</Text>
                                        </View> */}
                                    </View>
                                    {/* <TouchableOpacity
                                        style={{ height: 40, padding: 4, justifyContent: 'center', backgroundColor: '#77a300', alignItems: 'center', marginTop: 8 }}
                                        onPress={() => {
                                            this.gotoInfoCustommerHourlyFreightTruck(item);
                                        }
                                        }
                                    >
                                        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>CHỌN XE</Text>
                                    </TouchableOpacity> */}
                                    <Button
                                        onPress={() => {
                                            this.gotoInfoCustommerHourlyFreightTruck(item);
                                        }}
                                        value={'CHỌN XE'}
                                    />
                                </View>

                            </View>
                        ))
                        }
                    </View>
                </ScrollView>
        )
    }
    nextScreen() {
        this.props.navigation.push("InfoCustommerHourlyFreightTruck")
    }

    gotoInfoCustommerHourlyFreightTruck = (item) => {
        this.props.addTripInfomationHourlyBookingVanChuyen(item.partner_name, item.price, this.props.depart_time, item.extra_price_km_format, item.extra_price_hour_format, item.km_limit_format, item.vehicle_icon, item.vehicle_id, item.vehicle_name, item.city_id, item.partner_id)
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

const styles = StyleSheet.create({
    textView: {
        fontSize: 14,
        color: '#123456',
        marginTop: 8,
    },
    viewColumn: {
        backgroundColor: '#ffffaa',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderRightWidth: 1,
        borderLeftWidth: 1,
    },
    container: {
        borderColor: '#e8e8e8',
        borderWidth: 0.5,
        borderRadius: 4,
        padding: 8,
        marginTop: 8,
        backgroundColor: '#ffffff',
    },
    text: {
        color: '#4f603c'
    },
    containerr: {
        flex: 1,
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
        padding: 1,
        fontSize: 18,
        color: '#77a300',
        fontWeight:'bold',
        backgroundColor: '#ffffff'
    },
    totalCost: {
        fontSize: 18,
        color: '#00363d',
        fontWeight: 'bold'
    },
    carType: {
        fontSize: 14,
        color: '#00363e',
    },
    viewChitiet: {
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: 'row'
    },
    chitiet: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
})

function mapStateToProps(state) {
    return {
        pick_add: state.rdVanChuyen.pick_add,
        component_pick: state.rdVanChuyen.component_pick,
        depart_time: state.rdVanChuyen.depart_time,
        duration: state.rdVanChuyen.duration,
    }
}
export default connect(mapStateToProps, { addTripInfomationHourlyBookingVanChuyen: addTripInfomationHourlyBookingVanChuyen })(ListFreightTruck);