import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, Alert, Switch, ActivityIndicator, Dimensions, Modal, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import { addTripInfomation, addIsFromAirport } from '../../../core/Redux/action/Action'
import HTML from 'react-native-render-html';
import * as link from '../../../URL'

class ListDriverXeChung extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            dataSource: [],
            sort: false,
            car: false,
        }
    }

    async componentDidMount() {
        const url = link.URL_API + 'passenger/get_price_list';
        let formdata = new FormData();
        formdata.append("depart_time", this.props.depart_time);
        formdata.append("dimension_id", 1);
        formdata.append("pick_address", JSON.stringify(this.props.pick_add));
        formdata.append("pick_address_component", JSON.stringify(this.props.component_pick));
        formdata.append("drop_address", JSON.stringify(this.props.drop_add));
        formdata.append("drop_address_component", JSON.stringify(this.props.component_drop));
        formdata.append("transport_partner_id", '1679,1680')
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

    alertItemName = (item) => {
        const { navigation } = this.props;
        this.props.addTripInfomation(item.partner_name, item.merged, this.props.depart_time, item.chunk_id, item.vehicle_id, item.village_id, item.pm_id, item.partner_id, item.city_id, item.vehicle_name, item.toll_fee, item.dimension_id, item.vehicle_id, item.ride_method_id, item.chair, item.airport_id, item.street_id, item.vehicle_icon, item.pick_pos, item.drop_pos, item.use_range_time, item.unmerged);
        this.props.navigation.push("InfoCustommerXeChung", {
        })
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    renderItem(obj1) {
        const { navigation } = this.props;
        var obj = obj1;
        { this.state.sort ? obj.sort((a, b) => b.merged - a.merged) : obj.sort((a, b) => a.merged - b.merged) }
        return (
            <View>
                {obj.map((item, index) => (
                    <View>
                        <View
                            key={index}
                            style={styles.container}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.containerr}>
                                    <Text style={styles.loaixe}>
                                        {item.partner_name.toUpperCase()}
                                    </Text>
                                    <Text style={styles.tentuyen}>{item.vehicle_name}</Text>

                                    <Text style={styles.giaTien}>{item.merged_format}</Text>
                                </View>

                                <View style={styles.imageRight}>
                                    <Image
                                        style={{ width: 150, height: 90, }}
                                        source={{ uri: item.vehicle_icon, }}
                                        resizeMode="contain"
                                    />
                                </View>

                            </View>

                            <View style={{ marginLeft: 8, flexDirection: 'row', }}>
                                {item.discount_text == '' ? null :
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Image
                                            style={{ width: 20, height: 20, marginRight: 8 }}
                                            source={require('../../../image/check.png')} />
                                        <HTML html={item.discount_text} imagesMaxWidth={Dimensions.get('window').width} />
                                    </View>}
                            </View>

                            <View style={{ marginLeft: 8, flexDirection: 'row', }}>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Image
                                        style={{ width: 20, height: 20, marginRight: 8 }}
                                        source={require('../../../image/check.png')} />
                                    <Text>Tài xế được xác thực bởi Đi Chung</Text>
                                </View>
                            </View>

                            <View style={{ marginLeft: 8, flexDirection: 'row', }}>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Image
                                        style={{ width: 20, height: 20, marginRight: 8 }}
                                        source={require('../../../image/check.png')} />
                                    <Text>Thời gian chờ tối đa 15 phút</Text>
                                </View>
                            </View>
                            {item.discount_data.partner_note == null ? null :
                                <View style={{ flexDirection: 'column', flex: 1, padding: 8 }}>
                                    <HTML html={item.discount_data.partner_note.replace("</a>", "").replace("</p>", "").replace("<p>", "")} imagesMaxWidth={Dimensions.get('window').width} />
                                </View>}

                            <TouchableOpacity
                                style={{ height: 40, padding: 4, justifyContent: 'center', backgroundColor: '#77a300', alignItems: 'center', marginTop: 8 }}
                                onPress={() => {
                                    console.log(index)
                                    console.log(item.discount_data.partner_note)
                                    this.alertItemName(item)
                                }}
                            >
                                <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>CHỌN TÀI XẾ</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                ))
                }
            </View>
        )
    }

    setModalVisible(visible) {
        this.setState({ showFilter: visible });
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator
                        size='large'
                    />
                </View>
            )
        }
        var obj = [...this.state.dataSource];
        // var lf = { ...this.state.listFliter }
        // console.log(lf);
        return (
            <View style={{ flex: 1, padding: 8, }}>
                {obj.length > 0 ?
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.renderItem(obj)}
                    </ScrollView>
                    : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                        <Text>Không tìm thấy tài xế phù hợp</Text>
                    </View>
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        borderColor: '#77a300',
        borderWidth: 0.5,
        borderRadius: 6,
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
        fontSize: 16,
        color: '#00363e',
        fontStyle: 'italic',
        backgroundColor: '#ffffff'
    },
    loaixe: {
        fontSize: 20,
    },
    giaTien: {
        fontSize: 20,
        color: '#00363e',
    },
})

function mapStateToProps(state) {
    return {
        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
        component_pick: state.info.component_pick,
        component_drop: state.info.component_drop,
        depart_time: state.info.depart_time,
    }
}
export default connect(mapStateToProps, { addTripInfomation: addTripInfomation, })(ListDriverXeChung);