import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Modal, FlatList, Linking, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import CheckBoxList from '../../../component/CheckBoxList'
import { HeaderText } from '../../../component/Header'

import { addTripInfomation, addIsFromAirport, addAirport } from '../../../core/Redux/action/Action'
import * as link from '../../../URL'
import { ItemCarTaxi } from '../../../component/ItemCar';

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
const imageMaxToMin = '../../../image/maxtomin.png'
const imageMinToMax = '../../../image/mintomax.png'
const imageTune = '../../../image/tune.png'

class ListCar extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            dataSource: [],
            sort: false,
            shareCar: false,
            car: false,
            listFilterType: [1, 24, 2, 17, 33, 48, 49],
            listFilterMethod: [1, 2],
            listNightBooking: [1],
            countLoading: 99,
            showFilter: false,
            listFilter: {
                rideMethod: [],
                type: [],
            },
            // buyItems: [1,17,2,33,24],
            ride_method_id_list: [1, 2],
            listcar: [],
            listcarfilter: [],
        }
    }

    componentDidMount() {
        this.getProvider()
    }

    async getProvider() {
        const url = `${link.URL_API_PORTAL}price/v1/providers?productType=${this.props.product_chunk_type}`
        console.log(url)
        try {
            const response = await fetch(url, {
                method: 'GET',
            });
            const responseJson = await response.json();
            const listProvider = responseJson.data;
            console.log(listProvider);
            for (let index = 0; index < listProvider.length; index++) {
                const element = listProvider[index];
                this.getListCarNewV2(listProvider[index].name, index)
            };
            const countLoading = listProvider.length
            this.setState({ countLoading: countLoading })
            return true
        }
        catch (error) {
            this.setStateAsync({
                isLoading: false
            });
            console.log('abc' + error);
        }
    }

    async getListCarNewV2(provider, index) {
        const url = `${link.URL_API_PORTAL}price/v1/products?productType=${this.props.product_chunk_type}`;
        let param = `${url}&bookingTime=${this.props.depart_time}&dimension=1&endPlace=${JSON.stringify(this.props.component_drop)}&startPlace=${JSON.stringify(this.props.component_pick)}&slot=${this.props.chair}&provider=${provider}`
        console.log(param)
        try {
            const response = await fetch(param, {
                method: 'GET',
            });
            const responseJson = await response.json();
            console.log('ba chu a:  ' + index)
            const listCar = responseJson.data
            const data = [...this.state.dataSource]
            if (listCar.length > 0) {
                data.concat(responseJson.data)
            }
            console.log('qqqq' + data)
            this.setStateAsync({
                isLoading: false,
                dataSource: listCar ? this.state.dataSource.concat(responseJson.data) : this.state.dataSource,
                countLoading: this.state.countLoading - 1,
            });
            console.log(responseJson.data)
            return responseJson.data;
        }
        catch (error) {
            this.setStateAsync({
                isLoading: false,
                countLoading: this.state.countLoading - 1,
            });
            console.log('abc' + error);
        }
        console.log(param)
    }

    // async getListCarNew() {
    //     const url = link.URL_API_PORTAL + `price/v1/prices?product_chunk_type=${this.props.product_chunk_type}&`;
    //     let param = `${url}chair=${this.props.chair}&depart_time=${this.props.depart_time}&dimension_id=1&drop_address_component=${JSON.stringify(this.props.component_drop)}&drop_address=${this.props.drop_add}&pick_address_component=${JSON.stringify(this.props.component_pick)}&pick_address=${this.props.pick_add}&provider=dichungtaxi`
    //     try {
    //         const response = await fetch(param, {
    //             method: 'GET',
    //         });
    //         const responseJson = await response.json();
    //         this.addListfilter(responseJson.data.data);
    //         this.setStateAsync({
    //             isLoading: false,
    //             // listFilterType: ,
    //             listFilter: this.filterCar(responseJson.data.data),
    //             dataSource: responseJson.data.data,
    //             is_from_airport: responseJson.data.is_from_airport
    //         });
    //         this.props.addIsFromAirport(responseJson.data.is_from_airport ? 'true' : 'false');
    //         console.log(responseJson)
    //         console.log(param)
    //         return responseJson.data.data;
    //     }
    //     catch (error) {
    //         this.setStateAsync({
    //             isLoading: false
    //         });
    //         console.log(error);
    //     }
    //     console.log(param)
    // }

    addListfilter(list) {
        this.setState({
            listcar: [{ "vehicle_id": 17, "vehicle_name": "4 chỗ xe nhỏ", 'max_share_seats': 3 },
            { "vehicle_id": 1, "vehicle_name": "4 chỗ cốp rộng", 'max_share_seats': 4 },
            { "vehicle_id": 2, "vehicle_name": "7 chỗ", 'max_share_seats': 7 },
            { "vehicle_id": 24, "vehicle_name": "Xe 16 chỗ", 'max_share_seats': 16 }]
        })
    }


    modalFilter(showFilter) {
        var listcar = [...this.state.listcar]
        var listcarfilter = [...this.state.listcarfilter]
        var { shareCar, car } = this.state;
        console.log(listcar);
        console.log(listcarfilter);
        return (
            <Modal
                visible={showFilter}
                animationType='slide'
            >
                <SafeAreaView style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                    <View style={{ flex: 1, padding: 16, }}>
                        <Text style={{ fontSize: 24, fontWeight: '700' }}>Hình thức đi</Text>

                        <CheckBoxList
                            onClick={() => {
                                this.setState({
                                    shareCar: !shareCar
                                })
                            }}
                            isChecked={shareCar}
                            rightText={"Đi chung"}

                        />

                        <CheckBoxList
                            onClick={() => {
                                this.setState({
                                    car: !car
                                })
                            }}
                            isChecked={car}
                            rightText={"Đi riêng"}
                        />
                        <Text style={{ fontSize: 24, fontWeight: '700', }}>Loại xe</Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={listcar}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ marginTop: 8 }}>

                                        <CheckBoxList
                                            onClick={() => {
                                                if (item.max_share_seats >= this.props.chair) {
                                                    (listcarfilter.indexOf(item.vehicle_id) > -1) ? (listcarfilter.splice(listcarfilter.indexOf(item.vehicle_id), 1)) : listcarfilter.push(item.vehicle_id);
                                                    this.setState({ listcarfilter: listcarfilter })
                                                }
                                            }}
                                            isChecked={listcarfilter.indexOf(item.vehicle_id) > -1}
                                            rightText={item.vehicle_name + ' '}
                                            style={item.max_share_seats >= this.props.chair ? null : { color: '#999' }}
                                        />
                                    </View>
                                )
                            }
                            }
                        />

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{ padding: 8, backgroundColor: '#999999', borderRadius: 4, alignItems: 'center', marginTop: 10, flex: 1 }}
                                onPress={() => {
                                    this.setState({
                                        listcarfilter: [],
                                    })
                                }}>
                                <Text style={{ fontSize: 18, color: '#00363d' }}>BỎ LỌC</Text>
                            </TouchableOpacity>
                            <View style={{ margin: 8 }} />
                            <TouchableOpacity
                                style={{ padding: 8, backgroundColor: '#77a300', borderRadius: 4, alignItems: 'center', marginTop: 10, flex: 1 }}
                                onPress={() => {
                                    var listFM = []
                                    if (this.state.shareCar) {
                                        listFM.push(2)
                                    }
                                    if (this.state.car) {
                                        listFM.push(1)
                                    }
                                    if (!this.state.car && !this.state.shareCar) {
                                        listFM = [1, 2]
                                    }

                                    this.setState({
                                        listFilterMethod: listFM,
                                        showFilter: false
                                    })
                                }}>
                                <Text style={{ fontSize: 18, color: '#fff' }}>ÁP DỤNG</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }



    filterCar(list) {
        var listFilter = { rideMethod: [], type: [] }
        list.forEach(element => {
            if (listFilter.rideMethod.includes(element.ride_method_id)) {
                listFilter.rideMethod.push(element.rideMethod)
            }
            if (listFilter.type.includes(element.vehicle_id)) {
                listFilter.type.push(element.type)
            }
        });
        return listFilter;
    }

    _increaseCount = () => {
        this.setState({ sort: !this.state.sort });
    };

    setShowFilter = () => {
        this.setState({ showFilter: true });
    };

    gotoInfoCustomer = (item) => {
        const { navigation } = this.props;
        // this.props.addAirport(item.airport_id == 0 ? 'false' : 'true')
        // if (item.toll_fee == 'NA') {
        //     this.props.addTripInfomation(item.partner_name, item.merged, this.props.depart_time, item.chunk_id, item.vehicle_id, item.village_id, item.pm_id, item.partner_id, item.city_id, item.vehicle_name, item.toll_fee, item.dimension_id, item.vehicle_id, item.ride_method_id, item.chair, item.airport_id, item.street_id, item.vehicle_icon, item.pick_pos, item.drop_pos, item.use_range_time, item.unmerged);
        // } else {
        //     this.props.addTripInfomation(item.partner_name, item.merged, this.props.depart_time, item.chunk_id, item.vehicle_id, item.village_id, item.pm_id, item.partner_id, item.city_id, item.vehicle_name, item.toll_fee, item.dimension_id, item.vehicle_id, item.ride_method_id, item.chair, item.airport_id, item.street_id, item.vehicle_icon, item.pick_pos, item.drop_pos, item.use_range_time, item.unmerged);
        // }

        this.props.navigation.push("InfoCustommer"
            // pay_methods: JSON.stringify(item.pay_methods)
        )
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    renderItem(obj1, countLoading) {
        // const { navigation } = this.props;
        // var obj2, obj3, obj4;
        // var { listFilterMethod, listNightBooking, listcarfilter } = this.state;
        // if ((listcarfilter.includes(1) || listcarfilter.includes(2))) {
        //     if (listcarfilter.includes(33)) {

        //     } else {
        //         listcarfilter.push(33)
        //     }
        // } else {
        //     if (listcarfilter.includes(33)) {
        //         listcarfilter.splice(listcarfilter.indexOf(33), 1)
        //     } else {
        //     }
        // }
        // { listcarfilter.length == 0 ? obj2 = obj1 : obj2 = obj1.filter(ob => (listcarfilter.includes(ob.vehicle_id))) }
        // obj3 = obj2.filter(obj => (obj.vehicle_seat_left >= this.props.chair && obj.max_share_seats > 0))
        // obj4 = obj3.filter(obj => obj.hide == 0)
        // var obj = obj4.filter(obj => (listFilterMethod.includes(obj.ride_method_id)));
        // if (navigation.getParam('datdem')) {
        //     obj = obj.filter(obj => (
        //         listNightBooking.includes(obj.ride_method_id))

        //     )
        // }
        console.log('dhs: '+obj1)
        { this.state.sort ? obj1.sort((a, b) => b.info.price - a.info.price) : obj1.sort((a, b) => a.info.price - b.info.price) }

        return (
            obj1.length < 1 && countLoading == 0 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Image
                        style={{ width: 80, height: 80 }}
                        source={require('../../../image/sorry.png')}
                    />
                    <Text style={{ textAlign: 'center' }}>Không tìm thấy tài xế phù hợp. Vui lòng gọi <Text style={{ color: '#77a300' }}
                        onPress={() => Linking.openURL(`tel: 19006022`)}>19006022</Text></Text>
                    <Text style={{ padding: 4, fontSize: 18 }}>HOẶC</Text>
                    <TouchableOpacity
                        style={{ backgroundColor: '#77a300', margin: 8, padding: 8 }}
                        onPress={() => {
                            this.props.navigation.push("SpecialRequirements", {
                                'screen': 'DiChung'
                            })
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>ĐẶT XE THEO YÊU CẦU</Text>
                    </TouchableOpacity>
                </View> :
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        {obj1.map((item, index) => (
                            <View>
                                <ItemCarTaxi
                                    item={item}
                                    onPress={() => {
                                        this.gotoInfoCustomer(item)
                                    }}
                                />

                            </View>
                        ))}
                    </View>
                    {countLoading != 0 ? <ActivityIndicator
                        size='large'
                    /> : null
                    }
                </ScrollView>
        )
    }

    setModalVisible(visible) {
        this.setState({ showFilter: visible });
    }

    goBack = () => {
        this.props.navigation.goBack()
    }


    renderHeader() {
        return (
            <HeaderText
                textCenter={'Danh sách xe'}
                onPressLeft={this.goBack}
                // onPressRight1={this.setShowFilter}
                onPressRight2={this._increaseCount}
                // source1={require(imageTune)}
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
                {/* <Text>{this.state.countLoading}</Text> */}
                {this.renderHeader()}
                <View style={{ flex: 1, paddingHorizontal: 8, }}>
                    {this.renderItem(obj, this.state.countLoading)}
                    {this.modalFilter(this.state.showFilter)}
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
        depart_time: state.info.depart_time,
        chair: state.info.chair,
        is_from_airport: state.info.is_from_airport,
        product_chunk_type: state.info.product_chunk_type,
    }
}
export default connect(mapStateToProps, { addTripInfomation: addTripInfomation, addIsFromAirport: addIsFromAirport, addAirport: addAirport })(ListCar);