import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import StarVote from '../../../component/StarVote'

import { addTripInfomationTuLai } from '../../../core/Redux/action/Action'
import HTML from 'react-native-render-html';
import * as link from '../../../URL'

class ListCarTuLai extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            dataSource: [],
            sort: false,
            shareCar: false,
            car: false,
        }
    }

    static navigationOptions = () => {
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
            </View>,
        };
    };



    async componentDidMount() {
        const url = link.URL_API + 'passenger/get_price_list';
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
                dataSource: responseJson.data,
            });
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

    gotoInfoCustommer = (item) => {
        const { navigation } = this.props;
        this.props.addTripInfomationTuLai(item.partner_name, item.merged, this.props.depart_time, item.chunk_id, item.vehicle_id, item.village_id, item.pm_id, item.partner_id, item.city_id, item.vehicle_name, item.toll_fee, item.dimension_id, item.vehicle_id, item.ride_method_id, item.chair, item.airport_id, item.street_id, item.vehicle_icon, item.pick_pos, item.drop_pos, item.use_range_time, item.unmerged);
        this.props.navigation.push("InfoCustommerTuLai")
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    renderItem(obj) {
        const { navigation } = this.props;
        { this.state.sort ? obj.sort((a, b) => b.merged - a.merged) : obj.sort((a, b) => a.merged - b.merged) }
        return (
            obj.length < 1 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Text style={{ textAlign: 'center' }}>Tuyến đường bạn chọn hiện không có xe. Vui lòng chọn tuyến đường khác.</Text>
                    {/* <TouchableOpacity
                        style={{ backgroundColor: '#77a300', margin: 8, padding: 8 }}
                        onPress={() => {
                            this.props.navigation.push("SpecialRequirements", {
                                'screen': 'DiChung'
                            })
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Yêu cầu đặc biệt</Text>
                    </TouchableOpacity> */}
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
                                        {item.ride_method_id == '1' ?

                                            <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    style={{ width: 20, height: 20, marginRight: 8, marginLeft: 8 }}
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
        drop_add: state.rdTuLai.drop_add,
        pick_add: state.rdTuLai.pick_add,
        component_pick: state.rdTuLai.component_pick,
        component_drop: state.rdTuLai.component_drop,
        depart_time: state.rdTuLai.depart_time,
        chair: state.rdTuLai.chair,
    }
}
export default connect(mapStateToProps, { addTripInfomationTuLai: addTripInfomationTuLai })(ListCarTuLai);