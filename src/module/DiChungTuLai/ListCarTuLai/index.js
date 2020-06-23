import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, Dimensions, Modal, FlatList, Linking, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import StarVote from '../../../component/StarVote'
import CheckBoxList from '../../../component/CheckBoxList'
import { addTripInfomationTuLai } from '../../../core/Redux/action/Action'
import HTML from 'react-native-render-html';
import * as link from '../../../URL'
import { Button } from '../../../component/Button'
import { HeaderText } from '../../../component/Header'

const imageMaxToMin = '../../../image/maxtomin.png'
const imageMinToMax = '../../../image/mintomax.png'
const imageTune = '../../../image/tune.png'

class ListCarTuLai extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            dataSource: [],
            sort: false,
            shareCar: false,
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
        this.getListCarNew()
    }

    async listCarOld() {
        const url = link.URL_API + 'passenger/get_price_list?product_chunk_type=CAR_RENTAL';
        let formdata = new FormData();
        formdata.append("depart_time", this.props.depart_time);
        formdata.append("dimension_id", 1);
        formdata.append("pick_address", JSON.stringify(this.props.pick_add));
        formdata.append("pick_address_component", JSON.stringify(this.props.component_pick));
        formdata.append("drop_address", JSON.stringify(this.props.drop_add));
        formdata.append("drop_address_component", JSON.stringify(this.props.component_drop));
        formdata.append("chair", parseInt(this.props.chair));
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
            this.addListfilter(responseJson.data)
            this.setStateAsync({
                isLoading: false,
                dataSource: responseJson.data,
            });
            console.log(url)
            console.log(formdata)
            return responseJson.data;
        }
        catch (error) {
            this.setStateAsync({
                isLoading: false
            });
            console.log(error);
        }
    }

    async getListCarNew() {
        const url = link.URL_API_PORTAL + 'price/v1/prices?product_chunk_type=CAR_RENTAL&';
        let parame = `${url}chair=${this.props.chair}&depart_time=${this.props.depart_time}&dimension_id=1&drop_address_component=${JSON.stringify(this.props.component_drop)}&drop_address=${this.props.drop_add}&pick_address_component=${JSON.stringify(this.props.component_pick)}&pick_address=${this.props.pick_add}&provider=dichungtaxi`
        try {
            const response = await fetch(parame, {
                method: 'GET',
            });
            const responseJson = await response.json();
            this.addListfilter(responseJson.data.data);
            this.setStateAsync({
                isLoading: false,
                // listFilterType: ,
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

    addListfilter(list) {
        var { listcar } = this.state;
        for (let i = 0; i < list.length; i++) {
            if (listcar.id != list[i].vehicle_id) {
                listcar.push({ 'vehicle_id': list[i].vehicle_id, 'vehicle_name': list[i].vehicle_name })
            }
        }

    }

    gotoInfoCustommer = (item) => {
        const { navigation } = this.props;
        this.props.addTripInfomationTuLai(item.partner_name, item.merged, this.props.depart_time, item.chunk_id, item.vehicle_id, item.village_id, item.pm_id, item.partner_id, item.city_id, item.vehicle_name, item.toll_fee, item.dimension_id, item.vehicle_id, item.ride_method_id, item.chair, item.airport_id, item.street_id, item.vehicle_icon, item.pick_pos, item.drop_pos, item.use_range_time, item.unmerged);
        this.props.navigation.push("Procedure")
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
                    <Text style={{ fontSize: 16, fontWeight: '700', padding: 8 }}>Kích thước</Text>
                    <FlatList
                        style={{ paddingHorizontal: 8 }}
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

                    <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
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
        return (
            obj.length < 1 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', padding: 8 }}>
                    <Image
                        style={{ width: 80, height: 80 }}
                        source={require('../../../image/sorry.png')}
                    />
                    <Text style={{ textAlign: 'center' }}>Không tìm thấy đối tác phù hợp. Vui lòng gọi <Text style={{ color: '#77a300' }}
                        onPress={() => Linking.openURL(`tel: 19006022`)}>19006022</Text></Text>
                </View> :
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        {obj.map((item, index) => (
                            <View>
                                {item.hide == 1 ? null :
                                    <View
                                        key={index}
                                        style={styles.container}
                                    >
                                        <View style={{ flexDirection: 'row' }}>

                                            <View style={styles.containerr}>
                                                <Text style={styles.tentuyen}>
                                                    {item.partner_name}
                                                </Text>
                                                <Text style={styles.loaixe}>{item.vehicle_name}</Text>
                                                <StarVote number={item.star_vote} />
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
                                                        style={{ width: 14, height: 14, marginRight: 8 }}
                                                        source={require('../../../image/check.png')} />
                                                    <HTML html={item.discount_text} imagesMaxWidth={Dimensions.get('window').width} />
                                                </View>}
                                        </View>
                                        {item.discount_data.partner_note == null ? null :
                                            <View style={{ flexDirection: 'column', flex: 1, padding: 8 }}>
                                                <HTML html={item.discount_data.partner_note.replace("</a>", "").replace("</p>", "").replace("<p>", "")} imagesMaxWidth={Dimensions.get('window').width} />
                                            </View>}
                                        {/* 
                                        <TouchableOpacity
                                            style={{ height: 40, padding: 4, justifyContent: 'center', backgroundColor: '#77a300', alignItems: 'center', marginTop: 8 }}
                                            onPress={() => {
                                                // console.log(index)
                                                // console.log(item.discount_data.partner_note)
                                                this.gotoInfoCustommer(item)
                                            }
                                            }
                                        >
                                            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>CHỌN XE</Text>
                                        </TouchableOpacity> */}

                                        <Button
                                            onPress={() => {
                                                this.gotoInfoCustommer(item)
                                            }}
                                            value={'CHỌN XE'}
                                        />

                                    </View>
                                }
                            </View>
                        ))
                        }
                    </View>
                </ScrollView>
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
                <SafeAreaView style={{ flex: 1,}}>
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
                <View style={{ flex: 1, paddingHorizontal: 8 }}>
                    {this.renderItem(obj)}
                    {this.modalFilter(this.state.showFilter)}
                </View>
            </SafeAreaView>
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
        drop_add: state.rdTuLai.drop_add,
        pick_add: state.rdTuLai.pick_add,
        component_pick: state.rdTuLai.component_pick,
        component_drop: state.rdTuLai.component_drop,
        depart_time: state.rdTuLai.depart_time,
        chair: state.rdTuLai.chair,
    }
}
export default connect(mapStateToProps, { addTripInfomationTuLai: addTripInfomationTuLai })(ListCarTuLai);