import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Modal, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import CheckBoxList from '../../../component/CheckBoxList';
import { Button } from '../../../component/Button'

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

const imageMaxToMin = '../../../image/maxtomin.png'
const imageMinToMax = '../../../image/mintomax.png'
const imageTune = '../../../image/tune.png'

class ListVehicle extends Component {

    constructor() {
        super();
        this.state = {
            selectCar: true,
            listVehicle: [],
            isLoading: true,
            carType: 1,
            price_from: 0,
            price_to: 5000000,
            sort: false,
            buyItems: [],
            showFilter: false,

            listVehicleSeat: [],
            listTransmission: [],
            listVehicleName: [],
            listVehicleSeatCheck: [],
            listTransmissionCheck: [],
            listVehicleNameCheck: [],
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

    componentDidMount() {
        this.callListVehicle(this.state.carType);
        this.callListVehicleName(this.state.carType);
        this.callTransmission(this.state.carType);
        this.callVehicleSeat(this.state.carType);
    }

    async callListVehicle(carType) {
        var rentDate = new Date(this.props.rent_date).toISOString();
        var returnDate = new Date(this.props.retun_date).toISOString();
        const url = `https://api.chungxe.vn/vehicle-partner?vhc_type_id=${carType}&rental_date=${rentDate}&return_date=${returnDate}&city_id=${this.props.city}&price_from=${this.state.price_from}&price_to=${this.state.price_to}`
        console.log(url);
        const res = await fetch(url);
        const jsonRes = await res.json();
        this.setState({
            listVehicle: jsonRes.data,
            isLoading: false,
            listVehicleSeatCheck: [],
            listTransmissionCheck: [],
            listVehicleNameCheck: [],
        });
        // console.log(jsonRes.data);   
    }

    async callVehicleSeat(carType) {
        if (carType == 1) {
            const url = `https://api.chungxe.vn/vehicles/seat`
            const res = await fetch(url);
            const jsonRes = await res.json();
            this.setState({
                listVehicleSeat: jsonRes.data,
            })
        }
        else {
            this.setState({
                listVehicleSeat: [],
            })
        }
    }

    async callTransmission(carType) {
        const url = `https://api.chungxe.vn/vehicles/transmission?vhc_type_id=${carType}`
        const res = await fetch(url);
        const jsonRes = await res.json();
        this.setState({
            listTransmission: jsonRes.data,
        })
    }

    async callListVehicleName(carType) {
        const url = `https://api.chungxe.vn/vehicles/brand/get-brand-vehicle-by-type?vhc_type_id=${carType}`
        const res = await fetch(url);
        const jsonRes = await res.json();
        this.setState({
            listVehicleName: jsonRes.data,
        })
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

    renderModalCar(showFilter) {
        const eng = [...this.state.listTransmission];
        const trademark = [...this.state.listVehicleName];
        const maxSeat = [...this.state.listVehicleSeat];
        var { listVehicleNameCheck, listVehicleSeatCheck, listTransmissionCheck } = this.state;
        maxSeat.sort();
        return (
            <Modal
                visible={showFilter}
                animationType='slide'
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    padding: 16,
                }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}

                    >
                        <Text style={{ fontSize: 16, fontWeight: '700', padding: 8 }}>Động cơ</Text>

                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={eng}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <View style={{ marginTop: 8 }}>
                                            <CheckBoxList
                                                onClick={() => {
                                                    (listTransmissionCheck.indexOf(item.vhc_tms_id) > -1) ? (listTransmissionCheck.splice(listTransmissionCheck.indexOf(item.vhc_tms_id), 1)) : listTransmissionCheck.push(item.vhc_tms_id);
                                                    this.setState({ listTransmissionCheck: listTransmissionCheck })
                                                }}
                                                isChecked={listTransmissionCheck.indexOf(item.vhc_tms_id) > -1}
                                                rightText={item.vhc_tms_name}
                                            />
                                        </View>
                                    </View>
                                )
                            }
                            }
                        />
                        <Text style={{ fontSize: 16, fontWeight: '700', padding: 8 }}>Thương hiệu</Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={trademark}
                            renderItem={({ item }) =>
                                <View>
                                    <View style={{ marginTop: 8 }}>
                                        <CheckBoxList
                                            onClick={() => {
                                                (listVehicleNameCheck.indexOf(item.vhc_bran_id) > -1) ? (listVehicleNameCheck.splice(listVehicleNameCheck.indexOf(item.vhc_bran_id), 1)) : listVehicleNameCheck.push(item.vhc_bran_id);
                                                this.setState({ listVehicleNameCheck: listVehicleNameCheck })
                                            }}
                                            isChecked={listVehicleNameCheck.indexOf(item.vhc_bran_id) > -1}
                                            rightText={item.vhc_bran_name}
                                        />
                                    </View>
                                </View>
                            }
                        />
                        {maxSeat.length == 0 ? null : <Text style={{ fontSize: 16, fontWeight: '700', padding: 8 }}>Số ghế</Text>}

                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={maxSeat}
                            renderItem={({ item }) =>
                                <View>
                                    <View style={{ marginTop: 8 }}>
                                        <CheckBoxList
                                            isChecked={listVehicleSeatCheck.indexOf(item.vhc_seat_id) > -1 ? true : false}
                                            onClick={() => {
                                                (listVehicleSeatCheck.indexOf(item.vhc_seat_id) > -1) ? (listVehicleSeatCheck.splice(listVehicleSeatCheck.indexOf(item.vhc_seat_id), 1)) : listVehicleSeatCheck.push(item.vhc_seat_id);
                                                this.setState({ listVehicleSeatCheck: listVehicleSeatCheck })
                                            }}
                                            rightText={item.vhc_seat_num + ' chỗ'}
                                        />
                                    </View>
                                </View>
                            }
                        />

                    </ScrollView>
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity
                            style={{ padding: 8, backgroundColor: '#e8e8e8', borderRadius: 4, alignItems: 'center', marginTop: 10, flex: 1 }}
                            onPress={() => {
                                this.setState({
                                    listVehicleSeatCheck: [],
                                    listTransmissionCheck: [],
                                    listVehicleNameCheck: [],
                                })
                            }}>
                            <Text style={{ fontSize: 16, color: '#00363d' }}>BỎ LỌC</Text>
                        </TouchableOpacity>
                        <View style={{ margin: 8 }} />
                        <TouchableOpacity
                            style={{ padding: 8, backgroundColor: '#77a300', borderRadius: 4, alignItems: 'center', marginTop: 10, flex: 1 }}
                            onPress={() => {
                                this.setModalVisible(!this.state.showFilter)
                                // console.log(this.state.listFilterType)
                            }}>
                            <Text style={{ fontSize: 16, color: '#fff' }}>ÁP DỤNG</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>
        )
    }

    setModalVisible(visible) {
        this.setState({ showFilter: visible });
    }

    renderListVehicle() {
        var obj1 = [...this.state.listVehicle];
        // console.log(this.state.listTransmissionCheck)
        // console.log(this.state.listVehicleNameCheck)
        // console.log(this.state.listVehicleSeatCheck)

        if (this.state.carType == 1) {
            var obj2, obj3, obj;
            { this.state.listTransmissionCheck.length == 0 ? obj3 = obj1 : obj3 = obj1.filter(ob => (this.state.listTransmissionCheck.includes(ob.vhc.vhc_tms_id))) }
            { this.state.listVehicleNameCheck.length == 0 ? obj2 = obj3 : obj2 = obj3.filter(ob => (this.state.listVehicleNameCheck.includes(ob.vhc.vhc_modl_id))) }
            { this.state.listVehicleSeatCheck.length == 0 ? obj = obj2 : obj = obj2.filter(ob => (this.state.listVehicleSeatCheck.includes(ob.vhc.vhc_seat_id))) }

        } else {
            var obj3, obj;
            { this.state.listTransmissionCheck.length == 0 ? obj3 = obj1 : obj3 = obj1.filter(ob => (this.state.listTransmissionCheck.includes(ob.vhc.vhc_tms_id))) }
            { this.state.listVehicleNameCheck.length == 0 ? obj = obj3 : obj = obj3.filter(ob => (this.state.listVehicleNameCheck.includes(ob.vhc.vhc_bran_id))) }
        }

        { this.state.sort ? obj.sort((a, b) => b.vhc_part_defa_prie - a.vhc_part_defa_prie) : obj.sort((a, b) => a.vhc_part_defa_prie - b.vhc_part_defa_prie) }
        // console.log(obj)
        return (
            <View style={{ marginTop: 8, flex: 1 }}>
                {obj.length == 0 ?
                    <View style={{ padding: 24, justifyContent: 'center', alignItems: "center", flex: 1 }}>
                        <Text style={{ color: '#999999' }}>Hiện chưa có xe bạn chọn.</Text>
                        <Text style={{ color: '#999999' }}>Vui lòng chọn loại xe khác!</Text>
                    </View> :
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={obj}
                        renderItem={({ item }) =>
                            <View>
                                {/* {item.part.vhc_type_id != this.state.carType ? null : */}
                                <View style={{ padding: 8, borderColor: '#e8e8e8', borderRadius: 4, borderWidth: 0.5, marginTop: 8 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: 14, color: '#ffffff', backgroundColor: '#77a300', padding: 4 }}>
                                                    {item.part.vhc_type_id == 1 ? item.vhc_part_name_short : item.vhc_part_name}
                                                </Text>
                                            </View>

                                            <Text style={{ fontSize: 14, marginTop: 8, marginBottom: 8 }}>{item.part.part_addr_shor}</Text>
                                            {this.state.carType == '1' ?
                                                <View>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>xe {item.vhc.vhc_seat_num} chỗ {item.vhc.vhc_tms_name}</Text>
                                                    <Text>Hoặc tương đương</Text>
                                                </View>
                                                :
                                                <View>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{item.vhc.vhc_tms_name}</Text>
                                                </View>
                                            }

                                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#00363d', marginTop: 8 }}>{item.vhc_part_defa_prie.format(0, 3, `.`)} đ/Ngày</Text>
                                        </View>

                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                            <Image
                                                style={{ width: 150, height: 90, resizeMode: 'stretch' }}
                                                source={{ uri: item.vhc.vhc_imgs }}
                                            />
                                        </View>
                                    </View>

                                    {/* <TouchableOpacity
                                        style={{ flexDirection: 'row', marginTop: 8, borderBottomColor: '#00363d', backgroundColor: '#77a300', borderWidth: 0.5, justifyContent: 'center', borderRadius: 4, alignItems: 'center' }}
                                        onPress={() => {
                                            // console.log(item.vhc_part_name)
                                            this.props.navigation.navigate('InfoChungXe', { item: item })
                                        }}
                                    >
                                        <Text style={{ fontSize: 18, padding: 8, color: '#ffffff', }}>CHỌN XE</Text>
                                    </TouchableOpacity> */}
                                    <Button
                                        onPress={() => {
                                            this.props.navigation.navigate('InfoChungXe', { item: item })
                                        }}
                                        value={'CHỌN XE'}
                                    />
                                </View>
                                {/* } */}
                            </View>
                        }
                        keyExtractor={item => item.city_id}
                    />
                }
            </View>
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator
                    style={{ marginTop: 8 }}
                    size='large'
                />
            )
        }
        // var obj = [...this.state.listVehicle];
        return (
            <View style={{ flex: 1, margin: 8, }}>
                <View style={{ height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.ViewTop}>
                        <TouchableOpacity
                            style={this.state.selectCar ? styles.TouchableOpacityTopSelected : styles.TouchableOpacityTop}
                            onPress={() => {

                                if (this.state.carType == 1) {

                                } else {
                                    this.setState({
                                        selectCar: true,
                                        carType: 1,
                                        isLoading: true,
                                    });
                                    this.callListVehicle(1); //Đang HardCode
                                    this.callListVehicleName(1);
                                    this.callTransmission(1);
                                    this.callVehicleSeat(1)
                                }
                            }}
                        >
                            <Text style={this.state.selectCar ? styles.TextTopSelected : styles.TextTop}>Ô tô</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ViewTop}>
                        <TouchableOpacity
                            style={this.state.selectCar ? styles.TouchableOpacityTop : styles.TouchableOpacityTopSelected}
                            onPress={() => {

                                if (this.state.carType == 2) {

                                } else {
                                    this.setState({
                                        selectCar: false,
                                        isLoading: true,
                                        carType: 2,
                                    });
                                    this.callListVehicle(2); //Đang HardCode
                                    this.callListVehicleName(2);
                                    this.callTransmission(2);
                                    this.callVehicleSeat(2)
                                }
                            }}
                        >
                            <Text style={this.state.selectCar ? styles.TextTop : styles.TextTopSelected}>Xe máy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.renderListVehicle()}
                {/* {this.state.carType == 1 ? this.renderModalCar(this.state.showFilter) : this.renderModalMoto(this.state.showFilter)} */}
                {this.renderModalCar(this.state.showFilter)}

            </View>
        );
    }

}

const styles = StyleSheet.create({
    ViewTop: {
        flex: 1,
        margin: 8,
        height: 48,
        flexDirection: 'row',
    },
    TouchableOpacityTop: {
        borderColor: '#ffffff',
        backgroundColor: '#ffffff',
        borderWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    TouchableOpacityTopSelected: {
        borderColor: '#ffffff',
        borderWidth: 0.5,
        borderBottomColor: '#77a300',
        backgroundColor: '#ffffff',
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    TextTop: {
        fontSize: 16,
        color: '#000000',
    },
    TextTopSelected: {
        fontSize: 16,
        color: '#77a300',
    },
    containerr: {
        flex: 1,
        padding: 8,
        marginTop: 3,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
})

function mapStateToProps(state) {
    return {
        city: state.info.city,
        rent_date: state.info.rent_date,
        retun_date: state.info.retun_date,
    }
}

export default connect(mapStateToProps)(ListVehicle);