import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, Dimensions, FlatList, Modal } from 'react-native';
import { connect } from 'react-redux';
import StarVote from '../../../component/StarVote'

import { addTripInfomationVanChuyen } from '../../../core/Redux/action/Action'
import HTML from 'react-native-render-html';
import * as link from '../../../URL'
import CheckBoxList from '../../../component/CheckBoxList';

const imageMaxToMin = '../../../image/maxtomin.png'
const imageMinToMax = '../../../image/mintomax.png'
const imageTune = '../../../image/tune.png'

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
                    Danh sách dịch vụ
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

    async componentDidMount() {
        const url = link.URL_API + 'passenger/get_price_list?product_chunk_type=EXPRESS';
        // const url = `https://taxiairport.vn/api.php/` + 'passenger/get_price_list';
        let formdata = new FormData();
        formdata.append("depart_time", this.props.depart_time);
        formdata.append("dimension_id", 1);
        formdata.append("pick_address", JSON.stringify(this.props.pick_add));
        formdata.append("pick_address_component", JSON.stringify(this.props.component_pick));
        formdata.append("drop_address", JSON.stringify(this.props.drop_add));
        formdata.append("drop_address_component", JSON.stringify(this.props.component_drop));
        // formdata.append("transport_partner_id", '1681,1682') //con thật 2076,2078
        // formdata.append("product_chunk_type", 'CAR_RENTAL');
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
            if (listcar.id != list[i].vehicle_id) {
                listcar.push({ 'vehicle_id': list[i].vehicle_id, 'vehicle_name': list[i].vehicle_name })
            }
        }
    }

    gotoInfoCustommerExpress = (item) => {
        this.props.addTripInfomationVanChuyen(item.partner_name, item.merged, this.props.depart_time, item.chunk_id, item.vehicle_id, item.village_id, item.pm_id, item.partner_id, item.city_id, item.vehicle_name, item.toll_fee, item.dimension_id, item.vehicle_id, item.ride_method_id, item.chair, item.airport_id, item.street_id, item.vehicle_icon, item.pick_pos, item.drop_pos, item.use_range_time, item.unmerged);
        this.props.navigation.push("InfoCustommerExpress", {
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
                        <Text style={{ fontSize: 24, fontWeight: '700', padding: 8 }}>Kích thước</Text>
                        <FlatList
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

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{ padding: 8, backgroundColor: '#999999', borderRadius: 8, alignItems: 'center', marginTop: 10, flex: 1 }}
                                onPress={() => {
                                    this.setState({
                                        listcarfilter: [],
                                    })
                                }}>
                                <Text style={{ fontSize: 18, color: '#00363d' }}>BỎ LỌC</Text>
                            </TouchableOpacity>
                            <View style={{ margin: 8 }} />
                            <TouchableOpacity
                                style={{ padding: 8, backgroundColor: '#77a300', borderRadius: 8, alignItems: 'center', marginTop: 10, flex: 1 }}
                                onPress={() => {
                                    this.setState({ showFilter: false })
                                }}>
                                <Text style={{ fontSize: 18, color: '#fff' }}>ÁP DỤNG</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    renderItem(obj1) {
        var obj;

        { this.state.listcarfilter.length == 0 ? obj = obj1 : obj = obj1.filter(ob => (this.state.listcarfilter.includes(ob.vehicle_id))) }

        { this.state.sort ? obj.sort((a, b) => b.merged - a.merged) : obj.sort((a, b) => a.merged - b.merged) }
        return (
            <View>
                {obj.map((item, index) => (
                    <View
                        key={index}
                        style={styles.container}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.containerr}>
                                <Text style={styles.loaixe}>
                                    {item.partner_name.toUpperCase()}
                                </Text>
                                <StarVote number={item.star_vote} />
                                <Text style={styles.giaTien}>{item.merged_format}</Text>
                                <Text style={styles.tentuyen}>{item.vehicle_name}</Text>
                            </View>

                            <View style={styles.imageRight}>
                                <Image
                                    style={{ width: 150, height: 150, }}
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
                                <Text>Bảo đảm cho hàng dễ vỡ</Text>
                            </View>
                        </View>

                        <View style={{ marginLeft: 8, flexDirection: 'row', }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Image
                                    style={{ width: 20, height: 20, marginRight: 8 }}
                                    source={require('../../../image/check.png')} />
                                <Text>Thời gian chờ lấy hàng tối đa 15 phút</Text>
                            </View>
                        </View>

                        <Text style={{ color: '#77a300', marginLeft: 8 }}>thời gian nhận và giao hàng trong 4-6 tiếng</Text>
                        {item.partner_luggage == '' ? null :
                            <View style={{ flexDirection: 'column', flex: 1, paddingLeft: 8 }}>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Image
                                        style={{ width: 20, height: 20, marginRight: 8 }}
                                        source={require('../../../image/check.png')} />
                                    <HTML html={item.partner_luggage.replace("</a>", "").replace("</p>", "").replace("<p>", "")} imagesMaxWidth={Dimensions.get('window').width} />
                                </View>
                            </View>}

                        <TouchableOpacity
                            style={{ height: 40, padding: 4, justifyContent: 'center', backgroundColor: '#77a300', alignItems: 'center', marginTop: 8 }}
                            onPress={() => {
                                this.gotoInfoCustommerExpress(item)
                            }}
                        >
                            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>CHỌN</Text>
                        </TouchableOpacity>
                    </View>
                ))
                }
            </View>
        )
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
        // var obj = obj1.filter(obj => ([0].includes(obj.hide)));

        // var lf = { ...this.state.listFliter }
        // console.log(lf);
        return (
            <View style={{ flex: 1, padding: 8, }}>
                {obj.length < 1 ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Không tìm thấy xe phù hợp</Text>
                        <TouchableOpacity
                            style={{ backgroundColor: '#77a300', margin: 8, padding: 8 }}
                            onPress={() => {
                                this.props.navigation.push("SpecialRequirements", {
                                    'screen': 'VanChuyen'
                                })
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Yêu cầu đặc biệt</Text>
                        </TouchableOpacity>
                    </View> :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.renderItem(obj)}
                        {this.modalFilter(this.state.showFilter)}
                    </ScrollView>
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
        fontSize: 14,
        color: '#00363e',
        fontStyle: 'italic',
        backgroundColor: '#ffffff'
    },
    loaixe: {
        fontSize: 18,
    },
    giaTien: {
        fontSize: 18,
        color: '#00363e',
    },
})

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