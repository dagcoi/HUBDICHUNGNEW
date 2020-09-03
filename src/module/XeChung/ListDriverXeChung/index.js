import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, Alert, Switch, ActivityIndicator, Dimensions, Modal, RefreshControl, Linking, FlatList, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import CheckBoxList from '../../../component/CheckBoxList'
import StarVote from '../../../component/StarVote'

import { addTripInformationTaixe } from '../../../core/Redux/action/Action'
import HTML from 'react-native-render-html';
import * as link from '../../../URL'
import { Button } from '../../../component/Button'
import { HeaderText } from '../../../component/Header'
import { ItemDriver } from '../../../component/ItemCar';

const imageMaxToMin = '../../../image/maxtomin.png'
const imageMinToMax = '../../../image/mintomax.png'
const imageTune = '../../../image/tune.png'

class ListDriverXeChung extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            dataSource: [],
            sort: false,
            car: false,
            listDriver: [],
            listDriverFilter: [],
            showFilter: false
        }
    }

    componentDidMount() {
        this.getListDriverNew()
    }

    _increaseCount = () => {
        this.setState({ sort: !this.state.sort });
    };

    setShowFilter = () => {
        this.setState({ showFilter: true });
    };


    async getListDriverNew() {
        const url = link.URL_API_PORTAL + 'price/v1/prices?product_chunk_type=DRIVER_RENTAL&';
        let parame = `${url}chair=${this.props.chair}&depart_time=${this.props.depart_time}&dimension_id=1&drop_address_component=${JSON.stringify(this.props.component_drop)}&drop_address=${this.props.drop_add}&pick_address_component=${JSON.stringify(this.props.component_pick)}&pick_address=${this.props.pick_add}&provider=dichungtaxi&vehicle_id=0`
        try {
            const response = await fetch(parame, {
                method: 'GET',
            });
            const responseJson = await response.json();
            this.addListfilter(responseJson.data.data);
            this.setStateAsync({
                isLoading: false,
                dataSource: responseJson.data.data,
            });
            // this.props.addIsFromAirport(responseJson.data.is_from_airport ? 'true' : 'false');
            console.log(responseJson)
            console.log(parame)
            console.log('a')
            console.log(responseJson.data.data)
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

    addListfilter(list) {
        var { listDriver } = this.state;
        for (let i = 0; i < list.length; i++) {
            var item = { 'vehicle_id': list[i].vehicle_id, 'vehicle_name': list[i].vehicle_name }
            if (listDriver.indexOf(item < 0) && list[i].hide == 0) {
                listDriver.push(item)
            }
        }
    }

    async getListDriver() {
        const url = link.URL_API + 'passenger/get_price_list?product_chunk_type=DRIVER_RENTAL';
        let formdata = new FormData();
        formdata.append("depart_time", this.props.depart_time);
        formdata.append("dimension_id", 1);
        formdata.append("pick_address", JSON.stringify(this.props.pick_add));
        formdata.append("pick_address_component", JSON.stringify(this.props.component_pick));
        formdata.append("drop_address", JSON.stringify(this.props.drop_add));
        formdata.append("drop_address_component", JSON.stringify(this.props.component_drop));
        formdata.append("chair", 1);
        formdata.append("vehicle_id", 0)
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
                // listFilterType : ,
                // listFliter: this.filterCar(responseJson.data),
                dataSource: responseJson.data,
            });
            console.log('a')
            console.log(url)
            console.log(formdata)
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

    gotoCustomerXeChung = (item) => {
        this.props.addTripInformationTaixe(item.partner_name, item.merged, this.props.depart_time, item.chunk_id, item.vehicle_id, item.village_id, item.pm_id, item.partner_id, item.city_id, item.vehicle_name, item.toll_fee, item.dimension_id, item.vehicle_id, item.ride_method_id, item.chair, item.airport_id, item.street_id, item.vehicle_icon, item.pick_pos, item.drop_pos, item.use_range_time, item.unmerged);
        this.props.navigation.push("InfoCustommerXeChung", {
            pay_methods: JSON.stringify(item.pay_methods)
        })
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }


    modalFilter(showFilter) {
        var listDriver = [...this.state.listDriver]
        var listDriverFilter = [...this.state.listDriverFilter]
        var { shareCar, car } = this.state;
        console.log(listDriver);
        console.log(listDriverFilter);
        return (
            <Modal
                visible={showFilter}
                animationType='slide'
            >
                <SafeAreaView style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', }}>Loại xe</Text>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={listDriver}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ marginTop: 8 }}>

                                    <CheckBoxList
                                        onClick={() => {
                                            (listDriverFilter.indexOf(item.vehicle_id) > -1) ? (listDriverFilter.splice(listDriverFilter.indexOf(item.vehicle_id), 1)) : listDriverFilter.push(item.vehicle_id);
                                            this.setState({ listDriverFilter: listDriverFilter })
                                        }}
                                        isChecked={listDriverFilter.indexOf(item.vehicle_id) > -1}
                                        rightText={item.vehicle_name + ' '}
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
                                    listDriverFilter: [],
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
                </SafeAreaView>
            </Modal>
        )
    }

    renderItem(obj1) {
        const { navigation } = this.props;
        var obj = obj1;
        { this.state.sort ? obj.sort((a, b) => b.merged - a.merged) : obj.sort((a, b) => a.merged - b.merged) }
        return (
            <View style={{ paddingHorizontal: 8 }}>
                {obj.map((item, index) => (
                    <View>
                        <ItemDriver
                            item={item}
                            onPress={() => {
                                this.gotoCustomerXeChung(item)
                            }}
                        />
                    </View>

                ))
                }
            </View>
        )
    }

    setModalVisible(visible) {
        this.setState({ showFilter: visible });
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {

        if (this.state.isLoading) {
            return (
                <SafeAreaView style={{ flex: 1, }}>
                    <HeaderText textCenter={'Danh sách tài xế'} onPressLeft={this.goBack} />
                    <ActivityIndicator
                        size='large'
                    />
                </SafeAreaView>
            )
        }
        var obj = [...this.state.dataSource];
        // var lf = { ...this.state.listFliter }
        // console.log(lf);
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <HeaderText textCenter={'Danh sách tài xế'} onPressLeft={this.goBack} />
                <View style={{ flex: 1 }}>
                    {obj.length > 0 ?
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            {this.renderItem(obj)}
                            {this.modalFilter(this.state.showFilter)}
                        </ScrollView>
                        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            <Image
                                style={{ width: 80, height: 80 }}
                                source={require('../../../image/sorry.png')}
                            />
                            <Text>Không tìm thấy tài xế phù hợp. Vui lòng gọi <Text style={{ color: '#77a300' }}
                                onPress={() => Linking.openURL(`tel: 19006022`)}>19006022</Text></Text>
                            {/* <Text style={{ padding: 4, fontSize: 16 }}>HOẶC</Text>
                        <TouchableOpacity
                            style={{ backgroundColor: '#77a300', margin: 8, padding: 8 }}
                            onPress={() => {
                                this.props.navigation.push("SpecialRequirements", {
                                    'screen': 'TaiXe'
                                })
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>ĐẶT XE THEO YÊU CẦU</Text>
                        </TouchableOpacity> */}
                        </View>
                    }
                </View>
            </SafeAreaView>
        );
    }

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
        fontSize: 14,
        color: '#00363e',
        fontStyle: 'italic',
        backgroundColor: '#ffffff'
    },
    loaixe: {
        fontSize: 16,
    },
    giaTien: {
        fontSize: 16,
        color: '#00363e',
    },
})

function mapStateToProps(state) {
    return {
        drop_add: state.rdTaixe.drop_add,
        pick_add: state.rdTaixe.pick_add,
        component_pick: state.rdTaixe.component_pick,
        component_drop: state.rdTaixe.component_drop,
        depart_time: state.rdTaixe.depart_time,
        chair: state.rdTaixe.chair,
    }
}
export default connect(mapStateToProps, { addTripInformationTaixe: addTripInformationTaixe, })(ListDriverXeChung);