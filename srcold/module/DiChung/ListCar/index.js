import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, Alert, Switch, ActivityIndicator, Dimensions, Modal, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import CheckboxList from '../../../component/CheckBoxList'
import CheckBox from 'react-native-check-box'

import { addTripInfomation, addIsFromAirport } from '../../../core/Redux/action/Action'
import HTML from 'react-native-render-html';
import * as link from '../../../URL'


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
            listFilterType: [1, 24, 2, 17, 33],
            listFilterMethod: [1, 2],

            showFilter: false,
            filters: {
                vhc: [3, 4, 7, 16],
                rm: [],
            },
            listFliter: {
                rideMethod: [],
                type: [],
            },

            tmpFilters: {
                vhc: [3, 4, 7, 16],
                rm: [],
            },
            // buyItems : [1,17,2,33,24],
            ride_method_id_list: [1, 2]
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
                    textAlign: 'left'
                }}>
                    Danh sách xe
                </Text>

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
        const url = link.URL_DEBUG + 'passenger/get_price_list';
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
            this.setStateAsync({
                isLoading: false,
                // listFilterType : ,
                listFliter: this.filterCar(responseJson.data),
                dataSource: responseJson.data,
                is_from_airport: responseJson.is_from_airport
            });
            this.props.addIsFromAirport(responseJson.is_from_airport ? 'true' : 'false');
            console.log(responseJson.data)
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

    alertItemName = (item) => {
        this.props.addTripInfomation(item.merged, this.props.depart_time, item.chunk_id, item.vehicle_id, item.village_id, item.pm_id, item.partner_id, item.city_id, item.vehicle_name, item.toll_fee, item.dimension_id, item.vehicle_id, item.ride_method_id, item.chair, item.airport_id, item.street_id, item.vehicle_icon, item.pick_pos, item.drop_pos, item.use_range_time, item.unmerged);
        this.props.navigation.push("InfoCustommer", {
        })
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    renderItem(obj1) {
        const { navigation } = this.props;
        var { buyItems, listFilterMethod, listFilterType } = this.state;
        // var obj2 = obj1;
        var obj = obj1.filter(obj => (listFilterMethod.includes(obj.ride_method_id)) && (listFilterType.includes(obj.vehicle_id)));
        { this.state.sort ? obj.sort((a, b) => b.merged - a.merged) : obj.sort((a, b) => a.merged - b.merged) }
        return (
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
                                            {item.partner_name}
                                        </Text>
                                        <Text style={styles.loaixe}>{item.vehicle_name}</Text>

                                        <Text style={styles.giaTien}>{item.merged_format}</Text>
                                    </View>

                                    <View style={styles.imageRight}>
                                        <Image
                                            style={{ width: 150, height: 90, }}
                                            source={{ uri: item.vehicle_icon, }}
                                        />
                                    </View>

                                </View>
                                {item.ride_method_id == '1' ?

                                    <View style={{ flexDirection: 'row' }}>
                                        <Image
                                            style={{ width: 20, height: 20, marginRight: 8 }}
                                            source={require('../../../image/check.png')} />
                                        <Text>Giá trọn gói</Text>
                                    </View>
                                    :
                                    <View>
                                        <View style={{ marginLeft: 8, flexDirection: 'row' }}>
                                            <Image
                                                style={{ width: 20, height: 20, }}
                                                source={require('../../../image/people.png')} />
                                            <Text style={{ fontSize: 16, marginLeft: 8 }}>{item.vehicle_seat_left} người</Text>
                                        </View>

                                        <View style={{ marginLeft: 8, flexDirection: 'row' }}>
                                            <Image
                                                style={{ width: 20, height: 20, }}
                                                source={require('../../../image/vali.png')} />
                                            <Text style={{ fontSize: 16, marginLeft: 8 }}>{item.max_share_seats} vali {item.partner_luggage == null ? '' : `(${item.partner_luggage})`} </Text>
                                        </View>
                                    </View>
                                }

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
                                        <HTML html={item.discount_data.partner_note} imagesMaxWidth={Dimensions.get('window').width} />
                                    </View>}

                                <TouchableOpacity
                                    style={{ height: 40, padding: 4, justifyContent: 'center', backgroundColor: '#77a300', alignItems: 'center', marginTop: 8 }}
                                    onPress={() => {
                                        console.log(index)
                                        this.alertItemName(item)
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
        var { selectCar16Seat, selectCar3Seat, selectCar4Seat, selectCar7Seat, shareCar, car } = this.state;
        return (
            <View style={{ flex: 1, padding: 8, }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                // refreshControl={
                //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                // }  
                >
                    {this.renderItem(obj)}

                    <Modal
                        visible={this.state.showFilter}
                        animationType="slide"
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            padding: 16,
                        }}>

                            <Text style={{ fontSize: 24, fontWeight: '700' }}>Loại xe</Text>

                            <CheckboxList
                                onClick={() => {
                                    this.setState({
                                        selectCar3Seat: !selectCar3Seat
                                    })
                                }}
                                isChecked={selectCar3Seat}
                                rightText={"Xe 4 chỗ cốp nhỏ"}
                            />

                            <CheckboxList
                                onClick={() => {
                                    this.setState({
                                        selectCar4Seat: !selectCar4Seat
                                    })
                                }}
                                isChecked={selectCar4Seat}
                                rightText={"Xe 4 chỗ"}
                            />

                            <CheckboxList
                                onClick={() => {
                                    // this.state.filters.vhc.push(item.val)
                                    this.setState({
                                        selectCar7Seat: !selectCar7Seat
                                    })
                                }}
                                // isChecked={this.state.filters.vhc.indexOf(item.val) > -1}
                                isChecked={selectCar7Seat}
                                rightText={"Xe 7 chỗ"}
                            />

                            <CheckboxList
                                onClick={() => {
                                    this.setState({
                                        selectCar16Seat: !selectCar16Seat
                                    })
                                }}
                                isChecked={selectCar16Seat}
                                rightText={"Xe 16 chỗ"}
                            />

                            <Text style={{ fontSize: 24, fontWeight: '700' }}>Hình thức đi</Text>

                            <CheckboxList
                                onClick={() => {
                                    this.setState({
                                        shareCar: !shareCar
                                    })
                                }}
                                isChecked={shareCar}
                                rightText={"Đi chung"}

                            />

                            <CheckboxList
                                onClick={() => {
                                    this.setState({
                                        car: !car
                                    })
                                }}
                                isChecked={car}
                                rightText={"Đi riêng"}
                            />

                            <TouchableOpacity
                                style={{ padding: 8, backgroundColor: '#77a300', borderRadius: 8, alignItems: 'center', marginTop: 10 }}
                                onPress={() => {
                                    var listFT = []
                                    var listFM = []
                                    if (this.state.selectCar3Seat) {
                                        listFT.push(17)
                                    }
                                    if (this.state.selectCar4Seat) {
                                        listFT.push(1)

                                    }
                                    if (this.state.selectCar7Seat) {
                                        listFT.push(2)
                                    }
                                    if (this.state.selectCar3Seat || this.state.selectCar4Seat || this.state.selectCar7Seat) {
                                        listFT.push(33)
                                    }
                                    if (this.state.selectCar16Seat) {
                                        listFT.push(24)
                                    }
                                    if (!this.state.selectCar3Seat && !this.state.selectCar4Seat && !this.state.selectCar7Seat && !this.state.selectCar16Seat) {
                                        listFT = [1, 2, 17, 24, 33]
                                    }
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
                                        listFilterType: listFT,
                                        listFilterMethod: listFM,

                                    })
                                    this.setModalVisible(!this.state.showFilter);
                                    console.log(this.state.listFilterType)
                                }}
                            >
                                <Text style={{ fontSize: 18, color: '#fff' }}>ÁP DỤNG</Text>
                            </TouchableOpacity>
                        </View>

                    </Modal>
                </ScrollView>
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
        borderColor: '#77a300',
        borderWidth: 0.5,
        borderRadius: 6,
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
        fontSize: 16,
        color: '#00363e',
        fontStyle: 'italic',
        backgroundColor: '#ffffff'
    },
    loaixe: {
        fontSize: 18,
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
export default connect(mapStateToProps, { addTripInfomation: addTripInfomation, addIsFromAirport: addIsFromAirport })(ListCar);