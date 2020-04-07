import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, Alert, Switch, ActivityIndicator, Dimensions, Modal, RefreshControl, FlatList, Linking } from 'react-native';
import { connect } from 'react-redux';
import CheckBoxList from '../../../component/CheckBoxList'
import CheckBox from 'react-native-check-box'
import StarVote from '../../../component/StarVote'

import { addTripInfomation, addIsFromAirport, addAirport } from '../../../core/Redux/action/Action'
import HTML from 'react-native-render-html';
import * as link from '../../../URL'


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
            selectCar3Seat: false,
            selectCar4Seat: false,
            selectCar7Seat: false,
            selectCar16Seat: false,
            shareCar: false,
            car: false,
            listFilterType: [1, 24, 2, 17, 33, 48, 49],
            listFilterMethod: [1, 2],
            listNightBooking: [1],

            showFilter: false,
            listFliter: {
                rideMethod: [],
                type: [],
            },
            // buyItems : [1,17,2,33,24],
            ride_method_id_list: [1, 2],
            listcar: [],
            listcarfilter: [],
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <Text style={{
                    flex: 1,
                    fontSize: 22,
                    textAlign: 'left',
                    justifyContent: 'center'
                }}>Danh sách xe</Text>

                <View
                    style={{ width: 35, height: 35 }}
                >
                    <TouchableOpacity
                        onPress={navigation.getParam('setShowFilter')}
                    >
                        <Image
                            style={{ width: 32, height: 32 }}
                            source={require(imageTune)}
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{ width: 35, height: 35 }}
                >
                    <TouchableOpacity
                        onPress={navigation.getParam('increaseCount')}
                    >
                        <Image
                            style={{ width: 32, height: 32 }}
                            source={navigation.getParam('image') ? require(imageMaxToMin) : require(imageMinToMax)}
                        />
                    </TouchableOpacity>
                </View>
            </View>,
        };
    };



    async componentDidMount() {
        const url = link.URL_API + 'passenger/get_price_list?product_chunk_type=TRANSFER_SERVICE';
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
                // listFilterType : ,
                listFliter: this.filterCar(responseJson.data),
                dataSource: responseJson.data,
                is_from_airport: responseJson.is_from_airport
            });
            this.props.addIsFromAirport(responseJson.is_from_airport ? 'true' : 'false');
            console.log(responseJson.data)
            console.log(formdata)
            return responseJson.data;
        }
        catch (error) {
            this.setStateAsync({
                isLoading: false
            });
            console.log(error);
        }
        console.log(url)
        console.log(formdata)
    }


    addListfilter(list) {
        // var { listcar } = this.state;
        // for (let i = 0; i < list.length; i++) {
        //     var item = { 'vehicle_id': list[i].vehicle_id, 'vehicle_name': list[i].vehicle_name }
        //     if (listcar.indexOf(item < 0) && list[i].hide == 0) {
        //         listcar.push(item)
        //     }
        // }
        // console.log(listcar)

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
            <View style={{ flex: 1 }}>
                <Modal
                    visible={showFilter}
                    animationType='slide'
                >
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        padding: 16,
                    }}>
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
                </Modal>
            </View>
        )
    }



    filterCar(list) {
        var listFliter = { rideMethod: [], type: [] }
        list.forEach(element => {
            if (listFliter.rideMethod.includes(element.ride_method_id)) {
                listFliter.rideMethod.push(element.rideMethod)
            }
            if (listFliter.type.includes(element.vehicle_id)) {
                listFliter.type.push(element.type)
            }
        });
        return listFliter;
    }

    componentWillMount() {
        this.props.navigation.setParams({ 'increaseCount': this._increaseCount });
        this.props.navigation.setParams({ 'setShowFilter': this.setShowFilter });
    }

    _increaseCount = () => {
        this.setState({ sort: !this.state.sort });
        this.props.navigation.setParams({ 'image': !this.state.sort })
    };

    setShowFilter = () => {
        this.setState({ showFilter: true });
    };

    gotoInfoCustommer = (item) => {
        const { navigation } = this.props;
        this.props.addAirport(item.airport_id == 0 ? 'false' : 'true')
        if (item.toll_fee == 'NA') {
            this.props.addTripInfomation(item.partner_name, item.merged, this.props.depart_time, item.chunk_id, item.vehicle_id, item.village_id, item.pm_id, item.partner_id, item.city_id, item.vehicle_name, item.toll_fee, item.dimension_id, item.vehicle_id, item.ride_method_id, item.chair, item.airport_id, item.street_id, item.vehicle_icon, item.pick_pos, item.drop_pos, item.use_range_time, item.unmerged);
        } else {
            this.props.addTripInfomation(item.partner_name, item.merged, this.props.depart_time, item.chunk_id, item.vehicle_id, item.village_id, item.pm_id, item.partner_id, item.city_id, item.vehicle_name, item.toll_fee, item.dimension_id, item.vehicle_id, item.ride_method_id, item.chair, item.airport_id, item.street_id, item.vehicle_icon, item.pick_pos, item.drop_pos, item.use_range_time, item.unmerged);
        }
        this.props.navigation.push("InfoCustommer", {
            'isNightBooking': navigation.getParam('datdem')
        })
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    renderItem(obj1) {
        const { navigation } = this.props;
        var obj2, obj3, obj4;
        var { listFilterMethod, listNightBooking, listcarfilter } = this.state;
        if ((listcarfilter.includes(1) || listcarfilter.includes(2))) {
            if (listcarfilter.includes(33)) {

            } else {
                listcarfilter.push(33)
            }
        } else {
            if (listcarfilter.includes(33)) {
                listcarfilter.splice(listcarfilter.indexOf(33), 1)
            } else {
            }
        }
        { listcarfilter.length == 0 ? obj2 = obj1 : obj2 = obj1.filter(ob => (listcarfilter.includes(ob.vehicle_id))) }
        obj3 = obj2.filter(obj => (obj.vehicle_seat_left >= this.props.chair && obj.max_share_seats > 0))
        obj4 = obj3.filter(obj => obj.hide == 0)
        var obj = obj4.filter(obj => (listFilterMethod.includes(obj.ride_method_id)));
        if (navigation.getParam('datdem')) {
            obj = obj.filter(obj => (
                listNightBooking.includes(obj.ride_method_id))

            )
        }
        console.log(obj)
        { this.state.sort ? obj.sort((a, b) => b.merged - a.merged) : obj.sort((a, b) => a.merged - b.merged) }

        return (
            obj.length < 1 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
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
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Yêu cầu đặc biệt</Text>
                    </TouchableOpacity>
                </View> :
                <ScrollView
                    showsVerticalScrollIndicator={false}
                // refreshControl={
                //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                // }  
                >
                    <View>
                        {obj.map((item, index) => (
                            <View>
                                {(navigation.getParam('datdem') && item.ride_method_id != '1') ? null : item.hide == 1 ? null :

                                    <View
                                        key={index}
                                        style={styles.container}
                                    >
                                        <View style={{ flexDirection: 'row' }}>

                                            <View style={styles.containerr}>
                                                {item.ride_method_id == '1' ?
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ color: '#ffffff', fontSize: 18, backgroundColor: '#ef465e', padding: 4, fontWeight: 'bold' }}>ĐI RIÊNG</Text>
                                                    </View> : <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ color: '#ffffff', fontSize: 18, backgroundColor: '#77a300', padding: 4, fontWeight: 'bold' }}>ĐI GHÉP</Text>
                                                    </View>}
                                                <Text style={styles.tentuyen}>
                                                    {item.partner_name.toUpperCase()}
                                                </Text>
                                                <Text style={styles.loaixe}>{item.vehicle_name}</Text>
                                                <StarVote number={item.star_vote} />
                                                <Text style={styles.giaTien}>{item.merged.format(0, 3, '.')} đ</Text>

                                            </View>

                                            <View style={styles.imageRight}>
                                                <Image
                                                    style={{ width: 150, height: 90, }}
                                                    source={{ uri: item.vehicle_icon, }}
                                                    resizeMode="contain"
                                                />
                                            </View>

                                        </View>
                                        {item.ride_method_id == '1' ?
                                            item.toll_fee == 0 ?
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image
                                                        style={{ width: 20, height: 20, marginRight: 8, marginLeft: 8 }}
                                                        source={require('../../../image/check.png')} />
                                                    <Text>Giá trọn gói</Text>
                                                </View> : item.toll_fee == 'NA' ?
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Image
                                                            style={{ width: 20, height: 20, marginRight: 8, marginLeft: 8 }}
                                                            source={require('../../../image/check.png')} />
                                                        <Text>Giá chưa bao gồm phí cầu đường</Text>
                                                    </View> : <View style={{ flexDirection: 'row' }}>
                                                        <Image
                                                            style={{ width: 20, height: 20, marginRight: 8, marginLeft: 8 }}
                                                            source={require('../../../image/notetollfee.png')} />
                                                        <Text>Phí cầu đường : {parseInt(item.toll_fee).format(0, 3, '.')} đ</Text>
                                                    </View>
                                            :
                                            <View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image
                                                        style={{ width: 20, height: 20, marginRight: 8, marginLeft: 8 }}
                                                        source={require('../../../image/people.png')} />
                                                    <Text>Tối đa {item.max_share_seats} chỗ</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image
                                                        style={{ width: 20, height: 20, marginRight: 8, marginLeft: 8 }}
                                                        source={require('../../../image/vali.png')} />
                                                    <Text>{item.partner_luggage}</Text>
                                                </View>
                                            </View>
                                        }

                                        {item.full_package_by_km ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    style={{ width: 20, height: 20, marginRight: 8, marginLeft: 8 }}
                                                    source={require('../../../image/check.png')} />
                                                <Text>{item.full_package_by_km}</Text>
                                            </View> : null}

                                        <View style={{ marginLeft: 8, flexDirection: 'row', }}>
                                            {item.discount_text == '' ? null :
                                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                                    <Image
                                                        style={{ width: 20, height: 20, marginRight: 8 }}
                                                        source={require('../../../image/check.png')} />
                                                    <HTML html={item.discount_text} imagesMaxWidth={Dimensions.get('window').width} />
                                                </View>}
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
                                                this.gotoInfoCustommer(item)
                                            }
                                            }
                                        >
                                            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>CHỌN XE</Text>
                                        </TouchableOpacity>

                                    </View>
                                }
                            </View>
                        ))
                        }
                    </View>
                </ScrollView>
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
        var lf = { ...this.state.listFliter }
        console.log(lf);
        return (
            <View style={{ flex: 1, padding: 8, }}>

                {this.renderItem(obj)}
                {this.modalFilter(this.state.showFilter)}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    textView: {
        fontSize: 18,
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
        fontSize: 20,
        color: '#77a300',
        fontWeight: 'bold',
        backgroundColor: '#ffffff'
    },
    loaixe: {
        fontSize: 14,
    },
    giaTien: {
        fontSize: 20,
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
        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
        component_pick: state.info.component_pick,
        component_drop: state.info.component_drop,
        depart_time: state.info.depart_time,
        chair: state.info.chair,
        is_from_airport: state.info.is_from_airport,
    }
}
export default connect(mapStateToProps, { addTripInfomation: addTripInfomation, addIsFromAirport: addIsFromAirport, addAirport: addAirport })(ListCar);