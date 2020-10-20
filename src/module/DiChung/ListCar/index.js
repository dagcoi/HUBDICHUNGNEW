import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Modal, FlatList, Linking, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import CheckBoxList from '../../../component/CheckBoxList'
import { HeaderText } from '../../../component/Header'
import { Button } from '../../../component/Button'
import CalendarPicker from 'react-native-calendar-picker';
import { listHour, listChair, listTime } from '../../../component/TimeSelect/listTime'
import { getDateTimeAlive } from '../../../until'
import { addSend, addCost, addExtra, addDepartTime, addPeople, swapAddress, addDuration, addProductChunkType, addCarType, setModalCarType, setModalVehicleType, addReturnTime } from '../../../core/Redux/action/Action'
import * as link from '../../../URL'
import { ItemCarTaxi, ItemCarTaxiHourly } from '../../../component/ItemCar';
import TextSpaceBetween from '../../../component/ImageTextDiChung/TextSpaceBetween';
import FormTaxi from '../MapDiChung/FormTaxi';
import FormHourlyTaxi from '../MapDiChung/FormHourlyTaxi';
import FormChungxeTuyen from '../../ChungXe/MapChungXe/FormChungxeTuyen';
import FormChungxe from '../../ChungXe/MapChungXe/FormChungxe';
import FormExpress from '../../Express/MapExpress/FormExpress';
import FormHourlyTruck from '../../ScreenAddress/Truck/FormHourlyTruck';
import FormTruckDoor from '../../ScreenAddress/Truck/FormTruckDoor';
import FormHourlyXeChung from '../../XeChung/MapXeChung/FormHourlyXeChung';
import FormXeChung from '../../XeChung/MapXeChung/FormXeChung';
import FormHourlyTravel from '../../ScreenAddress/Travel/FormHourlyTravel';
import FormTravel from '../../ScreenAddress/Travel/FormTravel';
import FormRideShare from '../../ScreenAddress/RideShare/FormRideShare';
import ModalCarType from '../../ScreenAddress/Util/Modal/ModalCarType';
import ModalVehicleType from '../../ScreenAddress/Util/Modal/ModalVehicleType';
import Dialog, { DialogContent, DialogButton } from 'react-native-popup-dialog';

// import FormHourlyTaxi from '../MapDiChung/FormHourlyTaxi';
import HTML from 'react-native-render-html';
import DetailItem from './DetailItem'
const imageMaxToMin = '../../../image/maxtomin.png'
const imageMinToMax = '../../../image/mintomax.png'
const imageTune = '../../../image/tune.png'
const imageCheck = '../../../image/done.png'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
class ListCar extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            dataSource: [],
            listDC: [],
            listDCT: [],
            sort: false,
            shareCar: false,
            car: false,
            countLoading: 99,
            listFilter: {
                rideMethod: [],
                type: [],
            },
            item: null,
            selectItem: -1,
            showDetail: false,
            timeAlive: getDateTimeAlive(),
            date: null,
            dialogCalendarVisible: false,
            dialogTimeVisible: false,
            // buyItems: [1,17,2,33,24],
            ride_method_id_list: [1, 2],
            listcar: [],
            listcarfilter: [],
            listProductType: [],
            listHourly: ['hourly_rent_taxi', 'hourly_rent_driver', 'hourly_freight_truck', 'hourly_tourist_car', 'hourly_car_rental'],
            dialogSelectPeople: false,
            modalSelectTime: false,
            selectDCT: true,
            itemChungXe: null,
        }
    }

    componentDidMount() {
        this.getProvider()
    }

    async getProvider() {
        this.setState({ dataSource: [], listDC: [], listDCT: [], isLoading: true })
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

    componentWillUpdate(nextProps, nextState) {
        if (this.props.pick_add != nextProps.pick_add || this.props.drop_add != nextProps.drop_add || this.props.product_chunk_type != nextProps.product_chunk_type || this.props.duration != nextProps.duration || this.props.chair != nextProps.chair || this.props.depart_time2 != nextProps.depart_time2 || this.props.vehicleType != nextProps.vehicleType || this.props.returnTime2 != nextProps.returnTime2 || this.props.carType != nextProps.carType || this.props.itemVehicle != nextProps.itemVehicle) {
            this.getProvider()
            this.setState({ item: null, selectItem: -1 })
        }
    }

    async getListCarNewV2(provider, index) {
        var time = new Date(this.props.depart_time2 + '+07:00').toISOString();
        // var time = new Date(this.props.depart_time2 + '+07:00').getTime();

        const url = `${link.URL_API_PORTAL}price/v1/products?productType=${this.props.product_chunk_type}`;
        let param = `${url}&bookingTime=${time}&endPlace=${JSON.stringify(this.props.component_drop)}&startPlace=${JSON.stringify(this.props.component_pick)}&sort=price&slot=${this.props.product_chunk_type === 'express' ? '1' : this.props.chair}&provider=${provider}${this.props.product_chunk_type === 'ride_share' ? `&vehicleType=${this.props.itemVehicle?.value ?? 'car'}` : ''}`
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
            if (provider === 'dichungtaxi') {
                this.setStateAsync({
                    listDCT: responseJson.data
                })
            } else {
                this.setStateAsync({
                    listDC: responseJson.data
                })
            }
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
        console.log(this.props.product_chunk_type)
        var time = new Date(this.props.depart_time2 + '+07:00').toISOString();
        var timeReturn
        if (this.props.returnTime2) {
            timeReturn = new Date(this.props.returnTime2 + '+07:00').toISOString();
        }
        // console.log('this.props.returnTime2: ' + this.props.returnTime2)
        // console.log(navigation.getParam('vehicleType'))
        const url = `${link.URL_API_PORTAL}price/v1/products?productType=${this.props.product_chunk_type}`;
        let param = `${url}&bookingTime=${time}&startPlace=${JSON.stringify(this.props.component_pick)}&provider=${provider}&duration=${this.props.product_chunk_type === 'hourly_tourist_car' ? this.props.durationTravel / 24 : this.props.duration}&slot=${this.props.product_chunk_type === 'hourly_rent_taxi' ? this.props.carType : 0}&sort=price`
        this.props.product_chunk_type === 'hourly_car_rental' ? param = param + '&vehicleType=' + this.props.vehicleType + '&returnTime=' + timeReturn + '&limit=100' : ''
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
                        <DetailItem item={this.state.item} />
                        : <View style={{ flex: 2 }}></View>}
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
        // { this.state.sort ? obj1.sort((a, b) => b.info.price - a.info.price) : obj1.sort((a, b) => a.info.price - b.info.price) }

        return (
            obj1.length < 1 && countLoading == 0 ?
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center' }}>
                    <Image
                        style={{ width: SCREEN_WIDTH / 2, height: SCREEN_WIDTH / 2 }}
                        source={require('../../../image/sorry.png')}
                    />
                    <Text style={{ textAlign: 'center' }}>Không tìm thấy tài xế phù hợp. Vui lòng gọi <Text style={{ color: '#77a300' }}
                        onPress={() => Linking.openURL(`tel: 19006022`)}>19006022</Text></Text>
                    {/* <Text style={{ padding: 4, fontSize: 18 }}>HOẶC</Text> */}
                    {/* <TouchableOpacity
                        style={{ backgroundColor: '#77a300', margin: 8, padding: 8 }}
                        onPress={() => {
                            this.props.navigation.push("SpecialRequirements", {
                                'screen': 'DiChung'
                            })
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>ĐẶT XE THEO YÊU CẦU</Text>
                    </TouchableOpacity> */}
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
                                        isSelect={index == this.state.selectItem && item == this.state.item}
                                    /> :
                                    <ItemCarTaxi
                                        item={item}
                                        onPress={() => this.pressItem(index, item)}
                                        isSelect={index == this.state.selectItem && item == this.state.item}
                                    />
                                }
                            </View>
                        ))}
                        {this.state.countLoading > 0 ? <ActivityIndicator
                            size='large'
                            style={{ marginTop: 20 }}
                        /> : null
                        }
                    </ScrollView>
                    {/* {this.modalDetail(this.state.showDetail)} */}
                    {this.renderDetail(this.state.showDetail)}

                    {this.state.selectItem >= 0 ?
                        <Button
                            style={{ marginBottom: 10 }}
                            onPress={() => { this.gotoInfoCustomer(this.state.item) }}
                            value={'CHỌN'}
                        /> : null}

                </View>
        )
    }

    renderSwitch() {
        return (
            <View style={{ flexDirection: 'row', height: 40, backgroundColor: '#fff', paddingHorizontal: 16 }}>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: '#77a300', borderBottomWidth: this.state.selectDCT ? 2 : 0 }}
                    onPress={() => {
                        if (!this.state.selectDCT) {
                            this.setState({
                                selectDCT: true,
                                selectItem: -1,
                            })
                        }
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: this.state.selectDCT ? '#77a300' : '#333' }}>Đối tác đảm bảo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: '#77a300', borderBottomWidth: this.state.selectDCT ? 0 : 2 }}
                    onPress={() => {
                        if (this.state.selectDCT) {
                            this.setState({
                                selectDCT: false,
                                selectItem: -1,
                            })
                        }
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: this.state.selectDCT ? '#333' : '#77a300' }}>Đối tác thường</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderItemTaxi(obj1, countLoading) {
        // { this.state.sort ? obj1.sort((a, b) => b.info.price - a.info.price) : obj1.sort((a, b) => a.info.price - b.info.price) }
        var objDC = [...this.state.listDC];
        var objDCT = [...this.state.listDCT];
        return (
            obj1.length < 1 && countLoading == 0 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Image
                        style={{ width: 80, height: 80 }}
                        source={require('../../../image/sorry.png')}
                    />
                    <Text style={{ textAlign: 'center' }}>Không tìm thấy tài xế phù hợp. Vui lòng gọi <Text style={{ color: '#77a300' }}
                        onPress={() => Linking.openURL(`tel: 19006022`)}>19006022</Text></Text>
                    {/* <Text style={{ padding: 4, fontSize: 18 }}>HOẶC</Text> */}
                </View> :
                <View style={{ flex: 1 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.state.selectDCT ? (objDCT.length == 0 && this.state.countLoading == 0) ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                <Image
                                    style={{ width: 80, height: 80 }}
                                    source={require('../../../image/sorry.png')}
                                />
                                <Text style={{ textAlign: 'center' }}>Không tìm thấy tài xế phù hợp. Vui lòng gọi <Text style={{ color: '#77a300' }}
                                    onPress={() => Linking.openURL(`tel: 19006022`)}>19006022</Text></Text>
                            </View>
                            : objDCT.map((item, index) => (
                                <ItemCarTaxi
                                    item={item}
                                    onPress={() => this.pressItem(index, item)}
                                    isSelect={index == this.state.selectItem && item == this.state.item}
                                />
                            )) : (objDC.length == 0 && this.state.countLoading == 0) ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                    <Image
                                        style={{ width: 80, height: 80 }}
                                        source={require('../../../image/sorry.png')}
                                    />
                                    <Text style={{ textAlign: 'center' }}>Không tìm thấy tài xế phù hợp. Vui lòng gọi <Text style={{ color: '#77a300' }}
                                        onPress={() => Linking.openURL(`tel: 19006022`)}>19006022</Text></Text>
                                    {/* <Text style={{ padding: 4, fontSize: 18 }}>HOẶC</Text> */}
                                </View>
                                : objDC.map((item, index) => (
                                    <ItemCarTaxi
                                        item={item}
                                        onPress={() => this.pressItem(index, item)}
                                        isSelect={index == this.state.selectItem && item == this.state.item}
                                    />
                                ))}
                        {this.state.countLoading > 0 ? <ActivityIndicator
                            size='large'
                            style={{ marginTop: 20 }}
                        /> : null
                        }
                    </ScrollView>
                    {/* {this.modalDetail(this.state.showDetail)} */}
                    {this.renderDetail(this.state.showDetail)}

                    {this.state.selectItem >= 0 ?
                        <Button
                            style={{ marginBottom: 10 }}
                            onPress={() => { this.gotoInfoCustomer(this.state.item) }}
                            value={'CHỌN'}
                        /> : null}

                </View>
        )
    }

    renderDetail(showDetail) {
        return (
            <Dialog
                visible={showDetail}
                width={0.9}
                onTouchOutside={() => this.setState({ showDetail: false })}
            >
                <DialogContent>
                    <View>
                        {this.state.item && <DetailItem item={this.state.itemChungXe ?? this.state.item} />}
                        <View style={{ backgroundColor: '#fff', }}>
                            <Button
                                onPress={() => {
                                    this.gotoInfoCustomer(this.state.item)
                                    this.setState({ showDetail: false })
                                }}
                                value={'CHỌN'}
                            />
                        </View>
                    </View>
                </DialogContent>
            </Dialog>
        )
    }

    pressItem = (index, item) => {
        if (index != this.state.selectItem || item != this.state.item) {
            this.setState({ item: item, selectItem: index })
            if (item.info.provider == 'chungxe') {
                this.getDetailChungXe(item)
            }
        } else {
            console.log(item)
            this.setState({ showDetail: true })
        }
    }

    async getDetailChungXe(item) {
        const response = await fetch(`${link.URL_API_PORTAL}price/v1/products/chungxe/${item.send.vehicle.id}`, { method: 'GET' })
        const responseJson = await response.json();
        const itemChungXe = responseJson.data;
        console.log(itemChungXe)
        this.setState({ itemChungXe })
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
        this.props.swapAddress(this.props.drop_add, this.props.component_drop, this.props.latitude_drop, this.props.longitude_drop, this.props.typesDrop, this.props.pick_add, this.props.component_pick, this.props.latitude_pick, this.props.longitude_pick, this.props.typesPick);

    }
    pressSelectTime = () => {
        this.setState({
            dialogCalendarVisible: true, nhanxe: true
        })
    }

    onPressSelectTimeReturn = () => {
        this.setState({
            dialogCalendarVisible: true, nhanxe: false
        })
    }

    pressVehicleType = () => {
        this.props.setModalVehicleType(true)
    }

    pressCarType = () => {
        this.props.setModalCarType(true)
    }

    pressHourglass = () => {
        this.setState({
            modalSelectTime: true
        })
    }

    pressSelectSlot = () => {
        this.setState({
            dialogSelectPeople: true,
        })
    }

    formAddress() {
        switch (this.props.product_chunk_type) {
            case 'transfer_service':
                return (
                    <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                        <FormTaxi
                            onPressPickAddress={this.pressPickAddress}
                            onPressDropAddress={this.pressDropAddress}
                            onPressSwap={this.pressSwap}
                            onPressSelectTime={this.pressSelectTime}
                            onPressSelectSlot={this.pressSelectSlot}
                        />
                    </View>
                )
            case 'hourly_rent_taxi':
                return (
                    <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                        <FormHourlyTaxi
                            onPressPickAddress={this.pressPickAddress}
                            onPressSelectTime={this.pressSelectTime}
                            onPressCarType={this.pressCarType}
                            onPressHourglass={this.pressHourglass}
                        />
                    </View>
                )
            case 'car_rental':
                return (
                    <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                        <FormChungxeTuyen
                            onPressPickAddress={this.pressPickAddress}
                            onPressDropAddress={this.pressDropAddress}
                            onPressSwap={this.pressSwap}
                            onPressSelectTime={this.pressSelectTime}
                            onPressSelectSlot={this.pressSelectSlot}
                        />
                    </View>
                )
            case 'hourly_car_rental':
                return (
                    <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                        <FormChungxe
                            onPressPickAddress={this.pressPickAddress}
                            onPressSelectTimeRent={this.pressSelectTime}
                            onPressVehicle={this.pressVehicleType}
                            onPressSelectTimeReturn={this.onPressSelectTimeReturn}
                        />
                    </View>
                )
            case 'express':
                return (
                    <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                        <FormExpress
                            onPressPickAddress={this.pressPickAddress}
                            onPressDropAddress={this.pressDropAddress}
                            onPressSwap={this.pressSwap}
                            onPressSelectTime={this.pressSelectTime}
                            onPressSelectSlot={this.pressSelectSlot}
                        />
                    </View>
                )
            case 'driver_rental':
                return (
                    <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                        <FormXeChung
                            onPressPickAddress={this.pressPickAddress}
                            onPressDropAddress={this.pressDropAddress}
                            onPressSwap={this.pressSwap}
                            onPressSelectTime={this.pressSelectTime}
                        />
                    </View>
                )
            case 'hourly_rent_driver':
                return (
                    <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                        <FormHourlyXeChung
                            onPressPickAddress={this.pressPickAddress}
                            onPressSelectTime={this.pressSelectTime}
                            onPressSelectSlot={this.pressSelectSlot}
                        />
                    </View>
                )
            case 'hourly_freight_truck':
                return (
                    <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                        <FormHourlyTruck
                            onPressPickAddress={this.pressPickAddress}
                            onPressDropAddress={this.pressDropAddress}
                            onPressSwap={this.pressSwap}
                            onPressSelectTime={this.pressSelectTime}
                            onPressSelectSlot={this.pressSelectSlot}
                        />
                    </View>
                )
            case 'truck':
                return (
                    <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                        <FormTruckDoor
                            onPressPickAddress={this.pressPickAddress}
                            onPressDropAddress={this.pressDropAddress}
                            onPressSwap={this.pressSwap}
                            onPressSelectTime={this.pressSelectTime}
                            onPressSelectSlot={this.pressSelectSlot}
                        />
                    </View>
                )
            case 'hourly_tourist_car':
                return (
                    <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                        <FormHourlyTravel
                            onPressPickAddress={this.pressPickAddress}
                            onPressDropAddress={this.pressDropAddress}
                            onPressSwap={this.pressSwap}
                            onPressSelectTime={this.pressSelectTime}
                            onPressSelectSlot={this.pressSelectSlot}
                        />
                    </View>
                )
            case 'tourist_car':
                return (
                    <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                        <FormTravel
                            onPressPickAddress={this.pressPickAddress}
                            onPressDropAddress={this.pressDropAddress}
                            onPressSwap={this.pressSwap}
                            onPressSelectTime={this.pressSelectTime}
                            onPressSelectSlot={this.pressSelectSlot}
                        />
                    </View>
                )
            case 'ride_share':
                return (
                    <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                        <FormRideShare
                            onPressPickAddress={this.pressPickAddress}
                            onPressDropAddress={this.pressDropAddress}
                            onPressSwap={this.pressSwap}
                            onPressSelectTime={this.pressSelectTime}
                            onPressSelectSlot={this.pressSelectSlot}
                        />
                    </View>
                )
            default: null
        }
    }

    modalSlot() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.dialogSelectPeople}
                // onOrientationChange={true}
                onRequestClose={() => {
                    console.log('a');
                }}>
                <SafeAreaView style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    backgroundColor: '#000000AA'
                }}>
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ dialogSelectPeople: !this.state.dialogSelectPeople })}
                            style={{ flex: 1 }}
                        ></TouchableOpacity>
                    </View>

                    <FlatList
                        style={{ flex: 1, backgroundColor: '#ffffff' }}
                        data={listChair}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    this.setState({
                                        people: item.chair,
                                        dialogSelectPeople: false,
                                    })
                                    this.props.addPeople(item.chair)
                                }}
                            >
                                <Text style={{ fontSize: 16, flex: 1, padding: 8, color: item.chair == this.props.chair ? '#77a300' : '#000000' }}>{item.chair} {(this.props.product_chunk_type == 'transfer_service' || this.props.product_chunk_type == 'ride_share') ? ' người' : this.props.product_chunk_type == 'express' ? ' gói' : 'slot'}</Text>
                                {item.chair == this.props.chair ? <Image
                                    style={{ height: 24, width: 24, marginLeft: 8 }}
                                    source={require(imageCheck)}
                                /> : null}
                            </TouchableOpacity>}
                        keyExtractor={item => item.chair}
                    />
                </SafeAreaView>
            </Modal>
        )
    }

    modalTime() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.dialogTimeVisible}
                onRequestClose={() => {
                }}
            >
                <SafeAreaView style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    backgroundColor: '#000000AA',
                    zIndex: 9,
                }}>
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ dialogTimeVisible: false, })}
                            style={{ flex: 1 }}
                        ></TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                        <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Chọn giờ đi</Text>
                        </View>
                        <FlatList
                            style={{ flex: 1, backgroundColor: '#ffffff' }}
                            data={listHour}
                            initialScrollIndex={this.state.scroll - 1}
                            getItemLayout={this.getItemLayout}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', height: 40 }}
                                    onPress={() => {
                                        var isDayAlight = this.state.timeAlive.spesentDay == this.state.date.format('DD-MM-YYYY');
                                        var timeClicker = ((item.hour == this.state.timeAlive.hoursAlive && item.minute > this.state.timeAlive.minutesAlive) || item.hour > this.state.timeAlive.hoursAlive);
                                        if (this.state.nhanxe) {
                                            if (isDayAlight) {
                                                if (timeClicker) {
                                                    this.setState({
                                                        dialogTimeVisible: false,
                                                        dialogCalendarVisible: false,
                                                        depart_time: `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`
                                                    })
                                                    this.props.addDepartTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`, `${this.state.date.format('YYYY-MM-DD')}T${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute}:00.000`);
                                                }
                                            } else {
                                                this.setState({
                                                    dialogTimeVisible: false,
                                                    dialogCalendarVisible: false,
                                                    depart_time: `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`
                                                })
                                                this.props.addDepartTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`, `${this.state.date.format('YYYY-MM-DD')}T${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute}:00.000`);
                                            }
                                        } else {
                                            if (isDayAlight) {
                                                if (timeClicker) {
                                                    this.setState({
                                                        dialogTimeVisible: false,
                                                        dialogCalendarVisible: false,
                                                        depart_time: `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`
                                                    })
                                                    this.props.addReturnTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`, `${this.state.date.format('YYYY-MM-DD')}T${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute}:00.000`);
                                                }
                                            } else {
                                                this.setState({
                                                    dialogTimeVisible: false,
                                                    dialogCalendarVisible: false,
                                                    depart_time: `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`
                                                })
                                                this.props.addReturnTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`, `${this.state.date.format('YYYY-MM-DD')}T${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute}:00.000`);
                                            }
                                        }
                                    }}
                                >
                                    <Text style={{ textAlign: 'center', fontSize: 16, flex: 1, padding: 8, backgroundColor: (item.hour == this.state.selectedHours && item.minute == this.state.selectedMinutes) ? '#77a300' : '#fff', color: (this.state.spesentDay == this.state.date.format('DD-MM-YYYY') && ((item.hour == this.state.hoursAlive && item.minute < this.state.minutesAlive) || item.hour < this.state.hoursAlive)) ? '#aaa' : item.hour == this.state.selectedHours && item.minute == this.state.selectedMinutes ? '#fff' : '#000000' }}>{item.hour < 10 ? '0' + item.hour : item.hour}: {item.minute == 0 ? '00' : item.minute}</Text>
                                </TouchableOpacity>}
                            scrollToIndex={this.state.scroll}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }

    modalHourlyTime() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalSelectTime}
                // onOrientationChange={true}
                onRequestClose={() => {
                    console.log('a');
                }}>
                <SafeAreaView style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ modalSelectTime: false })}
                            style={{ flex: 1 }}
                        ></TouchableOpacity>
                    </View>
                    <FlatList
                        style={{ flex: 1, backgroundColor: '#ffffff' }}
                        data={listTime}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    this.setState({
                                        modalSelectTime: false,
                                    })
                                    this.props.addDuration(item.time);
                                }}
                            >
                                <Text style={{ fontSize: 16, flex: 1, padding: 8, color: item.time === this.state.duration ? '#77a300' : '#000000' }}>{item.time} giờ</Text>
                                {item.time === this.state.duration ? <Image
                                    style={{ height: 24, width: 24, marginLeft: 8 }}
                                    source={require(imageCheck)}
                                /> : null}
                            </TouchableOpacity>}
                        keyExtractor={item => item.time}
                    />

                </SafeAreaView>
            </Modal>
        )
    }

    reloadData = () => {
        this.setState({ dataSource: [], isLoading: true })
        this.getProvider()
    }

    render() {
        const minDate = new Date();

        var obj = [...this.state.dataSource];
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <Text>{this.state.countLoading}</Text> */}
                {this.renderHeader()}
                {this.formAddress()}
                {this.props.product_chunk_type === 'transfer_service' ? this.renderSwitch() : null}
                {this.state.isLoading ? <ActivityIndicator
                    size='large'
                /> :
                    <View style={{ flex: 1, paddingHorizontal: 8, }}>
                        {this.props.product_chunk_type === 'transfer_service' ?
                            this.renderItemTaxi(obj, this.state.countLoading) :
                            this.renderItem(obj, this.state.countLoading)}
                        {/* {this.modalDetail(this.state.showDetail)} */}
                    </View>
                }
                {this.modalSlot()}
                {this.modalHourlyTime()}
                <ModalCarType />
                <ModalVehicleType />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.dialogCalendarVisible}
                    // onOrientationChange={true}
                    onRequestClose={() => {
                        console.log('a');
                    }}>
                    <SafeAreaView style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                    }}>
                        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: "center" }}>
                            <View style={{ flexDirection: 'row', margin: 16 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Chọn thời gian đi</Text>
                            </View>
                            <CalendarPicker
                                textStyle={{
                                    color: '#000000',
                                    fontSize: 14,
                                }}
                                weekdays={['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN',]}
                                months={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']}
                                previousTitle="Trước"
                                nextTitle="Sau"
                                allowRangeSelection={false}
                                minDate={minDate}
                                startFromMonday={true}
                                // todayBackgroundColor="#00363d"
                                selectedDayColor="#77a300"
                                selectedDayTextColor="#FFFFFF"
                                dayShape='cicle'
                                onDateChange={(date) => {
                                    console.log('date: ....' + date)
                                    this.setState({
                                        date: date,
                                        dialogTimeVisible: true,
                                        // dialogCalendarVisible: false,
                                    })
                                }}
                            />
                        </View>
                        {this.modalTime()}
                    </SafeAreaView>
                </Modal>
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
        product_chunk_type: state.info.product_chunk_type,
        duration: state.info.duration,
        typesPick: state.info.typesPick,
        typesDrop: state.info.typesDrop,
        durationTravel: state.info.durationTravel,
        returnTime2: state.info.returnTime2,
        returnTime: state.info.returnTime,
        vehicleType: state.info.vehicleType,
        carType: state.info.carType,
        itemVehicle: state.rdOperator.itemVehicle,
    }
}

export default connect(mapStateToProps, {
    addSend: addSend,
    addCost: addCost,
    addExtra: addExtra,
    addDepartTime: addDepartTime,
    swapAddress: swapAddress,
    addPeople: addPeople,
    addDuration: addDuration,
    setModalCarType: setModalCarType,
    setModalVehicleType: setModalVehicleType,
    addReturnTime: addReturnTime,
})(ListCar);