import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import StarVote from '../../../component/StarVote'

import { addTripInfomationHourlyBooking } from '../../../core/Redux/action/Action'
import * as link from '../../../URL'
import { Button } from '../../../component/Button'

const imageMaxToMin = '../../../image/maxtomin.png'
const imageMinToMax = '../../../image/mintomax.png'

class ListCarHourlyBooking extends Component {

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
        const { navigation } = this.props;
        var listCarType = navigation.getParam('listCarType');
        const formdata = new FormData();
        formdata.append('depart_time', this.props.depart_time)
        formdata.append('pick_address', JSON.stringify(this.props.pick_add))
        formdata.append('pick_address_component', JSON.stringify(this.props.component_pick))
        formdata.append('duration', this.props.duration)
        formdata.append('vehicle_id', listCarType)
        const url = link.URL_API + `passenger/get_hourly_price_list?service_type=HOURLY_RENT_TAXI`;
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
    }

    componentWillMount() {
        this.props.navigation.setParams({ 'increaseCount': this._increaseCount });
    }

    _increaseCount = () => {
        this.setState({ sort: !this.state.sort });
        this.props.navigation.setParams({ 'image': !this.state.sort })
    };

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    renderItem(obj) {
        // const { navigation } = this.props;
        // var listCarType = navigation.getParam('listCarType');
        // var str = listCarType.replace(/\s+/g, '');
        // var listType = str.split(",")
        // var obj = obj1.filter(item => (listType.includes(item.vehicle_id)))
        { this.state.sort ? obj.sort((a, b) => b.price - a.price) : obj.sort((a, b) => a.price - b.price) }
        return (
            obj.length < 1 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Image
                        style={{ width: 80, height: 80}}
                        source={require('../../../image/sorry.png')} 
                    />
                    <Text style={{ textAlign: 'center' }}>Khu vực bạn chọn hiện không có xe. </Text>
                    <TouchableOpacity
                        style={{ backgroundColor: '#77a300', margin: 8, padding: 8 }}
                        onPress={() => {
                            this.props.navigation.push("SpecialRequirements", {
                                'screen': 'DiChung'
                            })
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>ĐẶT XE THEO YÊU CẦU</Text>
                    </TouchableOpacity>
                </View> :
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
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
                                            <Text style={styles.giaTien}>{item.vehicle_name}</Text>
                                            <StarVote number={item.star_vote} />
                                            <Text style={styles.giaTien}>giới hạn {item.km_limit_format}</Text>
                                            <Text style={[styles.loaixe, { color: '#00363d' }]}>{item.price_format}</Text>
                                        </View>
                                        <View style={styles.imageRight}>
                                            <Image
                                                style={{ width: 150, height: 90, }}
                                                source={{ uri: item.vehicle_icon, }}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                            <Image
                                                style={{ width: 16, height: 16, marginRight: 8, }}
                                                source={require('../../../image/note.png')} />
                                            <Text style={{ flex: 1, }}>Phụ trội theo km : {item.extra_price_km} đ/km</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                            <Image
                                                style={{ width: 16, height: 16, marginRight: 8, }}
                                                source={require('../../../image/note.png')} />
                                            <Text style={{ flex: 1, }}>Phụ trội theo giờ : {item.extra_price_hour} đ/giờ</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                            <Image
                                                style={{ width: 16, height: 16, marginRight: 8, }}
                                                source={require('../../../image/note.png')} />
                                            <Text style={{ flex: 1, }}>Giá đã bao gồm tiền xăng và lái xe, chưa bao gồm phí cầu đường, bến bãi, đỗ xe.</Text>
                                        </View>
                                    </View>
                                    {/* <TouchableOpacity
                                        style={{ height: 40, padding: 4, justifyContent: 'center', backgroundColor: '#77a300', alignItems: 'center', marginTop: 8 }}
                                        onPress={() => {
                                            this.gotoInfocustommerHourlyBooking(item);
                                        }
                                        }
                                    >
                                        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>CHỌN XE</Text>
                                    </TouchableOpacity> */}
                                    <Button
                                        onPress={() => {
                                            this.gotoInfocustommerHourlyBooking(item);
                                        }}
                                        value={'CHỌN XE'}
                                    />


                                </View>

                            </View>
                        ))
                        }
                    </View>
                </ScrollView>
        )
    }
    nextScreen() {
        this.props.navigation.push("InfoCustommerHourlyBooking")
    }

    gotoInfocustommerHourlyBooking = (item) => {
        this.props.addTripInfomationHourlyBooking(item.partner_name, item.price, this.props.depart_time, item.extra_price_km_format, item.extra_price_hour_format, item.km_limit_format, item.vehicle_icon, item.vehicle_id, item.vehicle_name, item.city_id, item.partner_id)
        this.nextScreen();
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
        return (
            <View style={{ flex: 1, padding: 8, }}>
                {this.renderItem(obj)}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    textView: {
        fontSize: 14,
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
        padding: 1,
        fontSize: 16,
        color: '#00363e',
        fontStyle: 'italic',
        backgroundColor: '#ffffff'
    },
    loaixe: {
        fontSize: 18,
        color: '#77a300',
        fontWeight: 'bold'
    },
    giaTien: {
        fontSize: 18,
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
        pick_add: state.info.pick_add,
        component_pick: state.info.component_pick,
        depart_time: state.info.depart_time,
        duration: state.info.duration,
    }
}
export default connect(mapStateToProps, { addTripInfomationHourlyBooking: addTripInfomationHourlyBooking })(ListCarHourlyBooking);