import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Modal, FlatList, Linking, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import CheckBoxList from '../../../component/CheckBoxList'
import { HeaderText } from '../../../component/Header'
import { Button } from '../../../component/Button'

import { addTripInfomation, addIsFromAirport, addAirport, addSend, addCost, addExtra } from '../../../core/Redux/action/Action'
import * as link from '../../../URL'
import { ItemCarTaxi, ItemCarTaxiHourly } from '../../../component/ItemCar';
import TextSpaceBetween from '../../../component/ImageTextDiChung/TextSpaceBetween';
import FormTaxi from '../MapDiChung/FormTaxi';

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
            item: null,
            selectItem: -1,
            showDetail: false,
            // buyItems: [1,17,2,33,24],
            ride_method_id_list: [1, 2],
            listcar: [],
            listcarfilter: [],
            listProductType: [],
            listHourly: ['hourly_rent_taxi', 'hourly_rent_driver', 'hourly_freight_truck', 'hourly_tourist_car', 'hourly_car_rental']
        }
    }

    componentDidMount() {
        this.getProvider()
    }

    componentWillUnmount() {
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
                if (this.state.listHourly.indexOf(this.props.product_chunk_type) >= 0) {
                    this.getListCarHourly(listProvider[index].name, index)
                    console.log('ass')
                } else {
                    this.getListCarNewV2(listProvider[index].name, index)
                }
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
        let param = `${url}&bookingTime=${this.props.depart_time2}&endPlace=${JSON.stringify(this.props.component_drop)}&startPlace=${JSON.stringify(this.props.component_pick)}&sort=price&slot=${this.props.chair}&provider=${provider}`
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
                console.log('qqqq' + data)
            }
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

    async getListCarHourly(provider, index) {
        const { navigation } = this.props;
        console.log('this.props.returnTime2: ' + this.props.returnTime2)
        console.log(navigation.getParam('vehicleType'))
        const url = `${link.URL_API_PORTAL}price/v1/products?productType=${this.props.product_chunk_type}`;
        let param = `${url}&bookingTime=${this.props.depart_time2}&startPlace=${JSON.stringify(this.props.component_pick)}&provider=${provider}&duration=${this.props.duration}&slot=${navigation.getParam('listCarType') ?? 0}&sort=price`
        this.props.product_chunk_type === 'hourly_car_rental' ? param = param + '&vehicleType=' + this.props.vehicleType + '&returnTime=' + this.props.returnTime2 : ''
        console.log(param)
        try {
            const response = await fetch(param, {
                method: 'GET',
            });
            const responseJson = await response.json();
            console.log('ba chu aa:  ' + index)
            const listCar = responseJson.data
            const data = [...this.state.dataSource]
            if (listCar.length > 0) {
                data.concat(responseJson.data)
                console.log('qqqq' + data)
            }
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
        this.props.addSend(JSON.stringify(item.send), item.info.label)
        if (this.state.listHourly.indexOf(this.props.product_chunk_type) >= 0) {
            this.props.addExtra(item.info.priceExtra)
        }
        this.props.addCost(item.info.price, item.info.image)
        this.props.navigation.push("InfoCustommer")
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    modalDetail(isShow) {
        return (
            <Modal visible={isShow} animationType='slide' transparent={true} >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    backgroundColor: '#000000AA',
                    zIndex: 9,
                }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ showDetail: false })} ></TouchableOpacity>
                    {this.state.item ?
                        <View style={{ flex: 1, backgroundColor: '#fff' }} >
                            <TextSpaceBetween textBold={'Hình thức: '} text={this.state.item.label} />
                            <TextSpaceBetween textBold={'Hình thức: '} text={this.state.item.label} />
                            <TextSpaceBetween textBold={'Hình thức: '} text={this.state.item.label} />
                            <TextSpaceBetween textBold={'Hình thức: '} text={this.state.item.label} />
                        </View>
                        : <View style={{ flex: 1 }}></View>}
                    <View style={{ backgroundColor: '#fff', padding: 16 }}>
                        <Button
                            style={{ marginBottom: 10 }}
                            onPress={() => {
                                this.gotoInfoCustomer(this.state.item)
                                this.setState({ showDetail: false })
                            }}
                            value={'CHỌN'}
                        />
                    </View>
                </View>
            </Modal>
        )
    }

    renderItem(obj1, countLoading) {
        console.log('dhs: ' + obj1)
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
                <View style={{ flex: 1 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {obj1.map((item, index) => (
                            <View>
                                {this.state.listHourly.indexOf(this.props.product_chunk_type) >= 0 ?
                                    <ItemCarTaxiHourly
                                        item={item}
                                        onPress={() => this.pressItem(index, item)}
                                        isSelect={index == this.state.selectItem}
                                    /> :
                                    <ItemCarTaxi
                                        item={item}
                                        onPress={() => this.pressItem(index, item)}
                                        isSelect={index == this.state.selectItem}
                                    />
                                }
                            </View>
                        ))}
                        {countLoading != 0 ? <ActivityIndicator
                            size='large'
                            style={{ marginTop: 20 }}
                        /> : null
                        }
                    </ScrollView>
                    {this.modalDetail(this.state.showDetail)}

                    {this.state.selectItem >= 0 ?
                        <Button
                            style={{ marginBottom: 10 }}
                            onPress={() => { this.gotoInfoCustomer(this.state.item) }}
                            value={'CHỌN'}
                        /> : null}

                </View>
        )
    }

    pressItem = (index, item) => {
        if (index != this.state.selectItem) {
            this.setState({ item: item, selectItem: index })
        } else {
            console.log(item)
            this.setState({ showDetail: true })
        }
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
                onPressRight2={this._increaseCount}
                source2={this.state.sort ? require(imageMaxToMin) : require(imageMinToMax)}
            />
        )
    }

    pressPickAddress = () => {
        this.props.navigation.push("SearchPlace", {
            search: 'Pick',
            placeholder: 'Nhập điểm xuất phát',
        });
    }
    pressDropAddress = () => {
        this.props.navigation.push("SearchPlace", {
            search: 'Drop',
            placeholder: 'Nhập điểm đến',
        });
    }
    pressSwap = () => {

    }
    pressSelectTime = () => {
        this.setState({
            dialogCalendarVisible: true,
        })
    }
    pressSelectSlot = () => {

    }
    pressSelectCarType = () => {

    }

    formAddress() {
        return (
            <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                <FormTaxi
                    onPressPickAddress={this.pressPickAddress}
                    onPressDropAddress={this.pressDropAddress}
                    onPressSwapAddress={this.pressSwap}
                    onPressSelectTime={this.pressSelectTime}
                    onPressSelectSlot={this.pressSelectSlot}
                />
            </View>
        )
    }

    render() {
        var obj = [...this.state.dataSource];
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <Text>{this.state.countLoading}</Text> */}
                {this.renderHeader()}
                {this.formAddress()}
                {this.state.isLoading ? <ActivityIndicator
                    size='large'
                /> :
                    <View style={{ flex: 1, paddingHorizontal: 8, }}>
                        {this.renderItem(obj, this.state.countLoading)}
                        {this.modalFilter(this.state.showFilter)}
                        {/* {this.modalDetail(this.state.showDetail)} */}
                    </View>
                }
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
        retun_date: state.info.retun_date,
        returnTime2: state.info.returnTime2,
        returnTime: state.info.returnTime,
        vehicleType: state.info.vehicleType
    }
}
export default connect(mapStateToProps, { addTripInfomation: addTripInfomation, addIsFromAirport: addIsFromAirport, addAirport: addAirport, addSend: addSend, addCost: addCost, addExtra: addExtra })(ListCar);