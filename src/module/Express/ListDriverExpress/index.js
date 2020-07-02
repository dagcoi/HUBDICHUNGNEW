import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, FlatList, Modal, Linking, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { addTripInfomationVanChuyen } from '../../../core/Redux/action/Action'
import * as link from '../../../URL'
import CheckBoxList from '../../../component/CheckBoxList';
import { HeaderText } from '../../../component/Header';
import { ItemExpress } from '../../../component/ItemCar';

const imageMaxToMin = '../../../image/maxtomin.png'
const imageMinToMax = '../../../image/mintomax.png'
const imageTune = '../../../image/tune.png'


Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

class ListDriverExpress extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            dataSource: [],
            sort: false,
            car: false,
            listcar: [],
            listcarfilter: [],
            showFilter: false,
        }
    }

    _increaseCount = () => {
        this.setState({ sort: !this.state.sort });
    };

    setShowFilter = () => {
        this.setState({ showFilter: true });
    };

    componentDidMount() {
        this.getListExpressNew()
    }

    async getListExpressNew() {
        const url = link.URL_API_PORTAL + 'price/v1/prices?product_chunk_type=EXPRESS&';
        let parame = `${url}chair=${this.props.chair}&depart_time=${this.props.depart_time}&dimension_id=1&drop_address_component=${JSON.stringify(this.props.component_drop)}&drop_address=${this.props.drop_add}&pick_address_component=${JSON.stringify(this.props.component_pick)}&pick_address=${this.props.pick_add}&provider=dichungtaxi`
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
            console.log(responseJson)
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

    filter(list) {
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

    async getListExpress() {
        const url = link.URL_API + 'passenger/get_price_list?product_chunk_type=EXPRESS';
        let formdata = new FormData();
        formdata.append("depart_time", this.props.depart_time);
        formdata.append("dimension_id", 1);
        formdata.append("pick_address", JSON.stringify(this.props.pick_add));
        formdata.append("pick_address_component", JSON.stringify(this.props.component_pick));
        formdata.append("drop_address", JSON.stringify(this.props.drop_add));
        formdata.append("drop_address_component", JSON.stringify(this.props.component_drop));
        formdata.append("chair", this.props.chair);
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
            this.addListfilter(responseJson.data);
            this.setStateAsync({
                isLoading: false,
                dataSource: responseJson.data,
            });
            console.log(url)
            console.log(formdata)
            // console.log(responseJson.data)
            return responseJson.data;
        }
        catch (error) {
            this.setStateAsync({
                isLoading: false
            });
            console.log(error);
        }
    }

    addListfilter(list) {
        var { listcar } = this.state;
        for (let i = 0; i < list.length; i++) {
            if (listcar.vehicle_id != list[i].vehicle_id) {
                listcar.push({ 'vehicle_id': list[i].vehicle_id, 'vehicle_name': list[i].vehicle_name })
            }
        }
    }

    gotoInfoCustomerExpress = (item) => {
        this.props.addTripInfomationVanChuyen(item.partner_name, item.merged, this.props.depart_time, item.chunk_id, item.vehicle_id, item.village_id, item.pm_id, item.partner_id, item.city_id, item.vehicle_name, item.toll_fee, item.dimension_id, item.vehicle_id, item.ride_method_id, item.chair, item.airport_id, item.street_id, item.vehicle_icon, item.pick_pos, item.drop_pos, item.use_range_time, item.unmerged);
        this.props.navigation.push("InfoCustommerExpress", {
            pay_methods: JSON.stringify(item.pay_methods)
        })
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    modalFilter(showFilter) {
        var listcar = [...this.state.listcar]
        var listcarfilter = [...this.state.listcarfilter]
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
                    <Text style={{ fontSize: 16, fontWeight: '700', paddingHorizontal: 16, paddingTop: 16 }}>Kích thước</Text>
                    <FlatList
                        style={{ paddingHorizontal: 16, }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={listcar}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ marginTop: 8 }}>
                                    <CheckBoxList
                                        onClick={() => {
                                            (listcarfilter.indexOf(item.vehicle_id) > -1) ? (listcarfilter.splice(listcarfilter.indexOf(item.vehicle_id), 1)) : listcarfilter.push(item.vehicle_id);
                                            this.setState({ listcarfilter: listcarfilter })
                                        }}
                                        isChecked={listcarfilter.indexOf(item.vehicle_id) > -1}
                                        rightText={item.vehicle_name + ' '}
                                    />
                                </View>
                            )
                        }
                        }
                    />

                    <View style={{ flexDirection: 'row', marginBottom: 8, paddingHorizontal: 16 }}>
                        <TouchableOpacity
                            style={{ padding: 8, backgroundColor: '#999999', borderRadius: 4, alignItems: 'center', marginTop: 10, flex: 1 }}
                            onPress={() => {
                                this.setState({
                                    listcarfilter: [],
                                })
                            }}>
                            <Text style={{ fontSize: 16, color: '#00363d' }}>BỎ LỌC</Text>
                        </TouchableOpacity>
                        <View style={{ margin: 8 }} />
                        <TouchableOpacity
                            style={{ padding: 8, backgroundColor: '#77a300', borderRadius: 4, alignItems: 'center', marginTop: 10, flex: 1 }}
                            onPress={() => {
                                this.setState({ showFilter: false })
                            }}>
                            <Text style={{ fontSize: 16, color: '#fff' }}>ÁP DỤNG</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }

    renderItem(obj1) {
        var obj;

        { this.state.listcarfilter.length == 0 ? obj = obj1 : obj = obj1.filter(ob => (this.state.listcarfilter.includes(ob.vehicle_id))) }

        { this.state.sort ? obj.sort((a, b) => b.merged - a.merged) : obj.sort((a, b) => a.merged - b.merged) }
        console.log(JSON.stringify(obj))
        return (
            <View>
                {obj.map((item, index) => (
                    <ItemExpress
                        item={item}
                        onPress={() => {
                            this.gotoInfoCustomerExpress(item)
                        }}
                        chair={this.props.chair}
                    />
                ))
                }
            </View>
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
                onPressRight1={this.setShowFilter}
                onPressRight2={this._increaseCount}
                source1={require(imageTune)}
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
                {obj.length < 1 ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                        <Image
                            style={{ width: 80, height: 80 }}
                            source={require('../../../image/sorry.png')}
                        />
                        <Text>Không tìm thấy đối tác phù hợp. Vui lòng gọi <Text style={{ color: '#77a300' }}
                            onPress={() => Linking.openURL(`tel: 19006022`)}>19006022</Text></Text>
                    </View> :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ padding: 8 }}
                    >
                        {this.renderItem(obj)}
                        {this.modalFilter(this.state.showFilter)}
                    </ScrollView>
                }
            </SafeAreaView>
        );
    }

}

function mapStateToProps(state) {
    return {
        drop_add: state.rdVanChuyen.drop_add,
        pick_add: state.rdVanChuyen.pick_add,
        component_pick: state.rdVanChuyen.component_pick,
        component_drop: state.rdVanChuyen.component_drop,
        depart_time: state.rdVanChuyen.depart_time,
        chair: state.rdVanChuyen.chair,
    }
}
export default connect(mapStateToProps, { addTripInfomationVanChuyen: addTripInfomationVanChuyen, })(ListDriverExpress);