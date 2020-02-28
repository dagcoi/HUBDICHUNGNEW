import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Calendar from '../../../component/Calendar'
import TimePicker from './TimePicker'
import { connect } from 'react-redux';
import { addDepartTimeTaixe, addPeopleTaixe, swapAddressTaixe, addDurationTaiXe } from '../../../core/Redux/action/Action'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung'

import MapViewDirections from 'react-native-maps-directions';
import { TextInput } from 'react-native-gesture-handler';

const origin = { latitude: 21.2187149, longitude: 105.80417090000003 };
// const destination = { latitude: 21.0019302, longitude: 105.85090579999996 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyDZo1_9CxTewBrzsX7RXFEeyf2J-pIQXYs';

const imageLocation = '../../../image/location.png'
const imageDrop = '../../../image/drop.png'
const imageSwap = '../../../image/swap.png'
const imageTime = '../../../image/time.png'
const imageHourglass = '../../../image/hourglass.png'

class MapXeChung extends Component {

    constructor() {
        super();
        this.state = {
            pic_address: '',
            diemdon: '',
            drop_address: '',
            diemtra: '',
            people: '1',
            blTime: true,
            blDon: true,
            blTra: true,
            showPlacesListpick: false,
            showPlacesListdrop: false,
            selectedHours: 0,
            selectedMinutes: 0,
            dialogCalendarVisible: false,
            dialogTimeVisible: false,
            dialogSelectPeople: false,
            depart_time: '',
            dateTimeSelect: '',
            spesentTime: '',
            spesentDay: '',
            hoursAlive: 0,
            minutesAlive: 0,
            selectedStartDate: null,
            modalCity: false,
            modalListTime: false,
            duration: 6,
            city_name: '',
            listCity: [
                {
                    "city_name": "Hà Nội",
                    "city_id": 1,
                    "hide": "0"
                },
                {
                    "city_name": "Hồ Chí Minh",
                    "city_id": 2,
                    "hide": "0"
                },
                {
                    "city_name": "Đà Nẵng",
                    "city_id": 3,
                    "hide": "1"
                },
                {
                    "city_name": "Hải Phòng",
                    "city_id": 4,
                    "hide": "1"
                }
            ],
            listTime: [
                { 'id': 1, 'time': 2 },
                { 'id': 2, 'time': 4 },
                { 'id': 3, 'time': 6 },
                { 'id': 4, 'time': 8 },
                { 'id': 5, 'time': 10 },
                { 'id': 6, 'time': 12 },
            ],
            hourlyBooking: false,
        }
    }

    setModalVisible(visible) {
        this.setState({ modalListCity: visible });
    }

    componentDidMount() {
        this.getDateTimeAlive()
    }

    getDateTimeAlive() {
        var that = this;
        var date = new Date().getDate(); //Current Date
        if (date < 10) {
            date = '0' + date
        }
        var month = new Date().getMonth() + 1; //Current Month
        if (month < 10) {
            month = '0' + month
        }
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        that.setState({
            //Setting the value of the date time
            spesentTime:
                date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
            spesentDay: date + '-' + month + '-' + year,
            hoursAlive: hours,
            minutesAlive: min,
        });
        console.log(date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec)
    }

    renderPicktoDrop() {
        if (this.props.drop_add == '' || this.props.pick_add == '') {
            return (
                <MapView style={styles.container}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: 2.0,
                        longitudeDelta: 0.1,
                    }}
                ></MapView>
            );
        }
        return (
            <MapView style={styles.container}
                provider={PROVIDER_GOOGLE}
                initialCamera={{
                    center: {
                        latitude: this.props.lattitude_pick,
                        longitude: this.props.lngtitude_pick,
                    },
                    pitch: 1,
                    heading: 1,
                    zoom: 12,
                    altitude: 1,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: this.props.lattitude_pick,
                        longitude: this.props.lngtitude_pick,
                    }}
                    title={"Điểm đón"}
                    description={this.props.pick_add}
                />

                <MapView.Marker
                    coordinate={{
                        latitude: this.props.lattitude_drop,
                        longitude: this.props.lngtitude_drop,
                    }}
                    title={"Điểm trả"}
                    description={this.props.drop_add}
                />

                <MapViewDirections
                    origin={{ latitude: this.props.lattitude_pick, longitude: this.props.lngtitude_pick }}
                    destination={{ latitude: this.props.lattitude_drop, longitude: this.props.lngtitude_drop }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={5}
                    strokeColor="#00363d"
                />

            </MapView>

        );
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    nextScreen() {
        this.getDateTimeAlive.bind(this);
        if (this.props.pick_add != '' && this.props.drop_add != '' && this.state.depart_time != '' && this.state.city_name != '') {
            if (this.props.pick_add.search(this.state.city_name) < 0 || this.props.drop_add.search(this.state.city_name) < 0) {
                Alert.alert('Vui lòng nhập đúng địa chỉ trong khu vực thành phố!')
            } else {
                console.log(this.state.spesentDay)
                console.log(this.state.date.format('DD-MM-YYYY'))
                if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                    if (this.state.hoursAlive > this.state.selectedHours) {
                        Alert.alert('Giờ đi phải lớn hơn giờ hiện tại')
                    } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                        Alert.alert('Giờ đi phải lớn hơn giờ hiện tại')
                    } else {
                        this.props.navigation.push("ListDriverXeChung", { datdem: false });
                    }

                } else {
                    console.log('datdem : false')
                    this.props.navigation.push("ListDriverXeChung", { datdem: false });
                }
            }
        }
        else {
            Alert.alert('Vui lòng điền đầy đủ thông tin để xem giá.')
        }
    }

    addPeopleTaixe() {
        const { people } = this.state;
        this.props.addPeopleTaixe(people);
    }

    gotoListDriverHourlyBooking() {
        this.getDateTimeAlive.bind(this);
        if (this.props.pick_add != '' && this.state.depart_time != '' && this.state.city_name != '') {
            if (this.props.pick_add.search(this.state.city_name) < 0) {
                Alert.alert('Vui lòng nhập đúng địa chỉ trong khu vực thành phố!')
            } else {
                if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                    if (this.state.hoursAlive > this.state.selectedHours) {
                        Alert.alert('Giờ đi phải lớn hơn giờ hiện tại')
                    } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                        Alert.alert('Giờ đi phải lớn hơn giờ hiện tại')
                    } else {
                        this.props.navigation.push("ListDriverHourlyBooking");
                    }
                } else {
                    this.props.navigation.push("ListDriverHourlyBooking");
                }
            }
        }
        else {
            Alert.alert('Vui lòng điền đầy đủ thông tin để xem giá.')
        }
    }

    renderFormThueTaiTheoGio() {
        return (
            <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderRadius: 8, padding: 8 }}>
                <ImageInputTextDiChung
                    onPress={() => { this.setState({ modalCity: true }) }}
                    placeholder={'Chọn thành phố'}
                    source={require(imageLocation)}
                    value={this.state.city_name}
                />

                <ImageInputTextDiChung
                    onPress={() => {
                        this.props.navigation.push("SearchPlaceXeChung", {
                            search: 'Pick',
                            placeholder: 'Nhập điểm đón'
                        });
                    }}
                    placeholder={'Nhập điểm đón'}
                    source={require(imageLocation)}
                    value={this.props.pick_add}
                />

                <ImageInputTextDiChung
                    onPress={() => {
                        this.setState({
                            dialogCalendarVisible: true,
                        })
                    }}
                    placeholder={'Chọn thời gian'}
                    source={require(imageTime)}
                    value={this.state.date ? `${this.state.date.format('DD-MM-YYYY')}  ${this.state.selectedHours} : ${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes}` : ""}
                />

                <ImageInputTextDiChung
                    onPress={() => {
                        this.setState({
                            modalListTime: true,
                        })
                    }}
                    placeholder={'Chọn giờ thuê'}
                    source={require(imageHourglass)}
                    value={this.state.duration + ' giờ'}
                />

                <View style={{ height: 40, flexDirection: 'row', marginTop: 8 }}>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#77a300', borderRadius: 4 }}
                        onPress={() => {
                            this.gotoListDriverHourlyBooking();
                        }}
                    >
                        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', }}>XEM GIÁ</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    renderFormThueTai() {
        return (
            <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderRadius: 8, padding: 8 }}>

                <ImageInputTextDiChung
                    onPress={() => { this.setState({ modalCity: true }) }}
                    placeholder={'Chọn thành phố'}
                    source={require(imageLocation)}
                    value={this.state.city_name}
                />

                <ImageInputTextDiChung
                    onPress={() => {
                        this.props.navigation.push("SearchPlaceXeChung", {
                            search: 'Pick',
                            placeholder: 'Nhập điểm đón'
                        });
                    }}
                    placeholder={'Nhập điểm đón'}
                    source={require(imageLocation)}
                    value={this.props.pick_add}
                />

                <View style={{ flexDirection: 'row', borderColor: '#00363e', borderWidth: 0.5, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 4, marginBottom: 4 }}>
                    <View style={{ flex: 1, flexDirection: 'row', borderColor: '#00363e', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Image
                            style={{ height: 30, width: 24, marginLeft: 8, alignItems: 'center', justifyContent: 'center' }}
                            source={require(imageDrop)}
                        />
                        <TouchableOpacity
                            style={{ flex: 1, height: 40 }}
                            onPress={() => {
                                this.props.navigation.push("SearchPlaceXeChung", {
                                    search: 'Drop',
                                    placeholder: 'Nhập điểm trả',
                                });
                            }}
                        >
                            <TextInput
                                editable={false}
                                onTouchStart={() => this.props.navigation.push("SearchPlaceXeChung", {
                                    search: 'Drop',
                                    placeholder: 'Nhập điểm trả',
                                })
                                }
                                style={{ fontSize: 14, height: 40, color: "#00363d" }}
                                pointerEvents="none"
                                value={this.props.drop_add}
                                placeholder='Nhập điểm trả'
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.swapAddressTaixe(this.props.drop_add, this.props.component_drop, this.props.lattitude_drop, this.props.lngtitude_drop, this.props.pick_add, this.props.component_pick, this.props.lattitude_pick, this.props.lngtitude_pick);
                        }}
                    >
                        <Image
                            style={{ height: 24, width: 24, margin: 8 }}
                            source={require(imageSwap)}
                        />
                    </TouchableOpacity>

                </View>

                <ImageInputTextDiChung
                    onPress={() => {
                        this.setState({
                            dialogCalendarVisible: true,
                        })
                    }}
                    placeholder={'Chọn thời gian'}
                    source={require(imageTime)}
                    value={this.state.date ? `${this.state.date.format('DD-MM-YYYY')}  ${this.state.selectedHours} : ${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes}` : ""}
                />

                <View style={{ height: 40, flexDirection: 'row', marginTop: 8 }}>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#77a300', borderRadius: 4 }}
                        onPress={() => {
                            this.nextScreen()
                        }}
                    >
                        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', }}>XEM GIÁ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const minDate = new Date();

        return (
            <View style={{ flex: 1, padding: 8 }}>

                {this.renderPicktoDrop()}
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 4 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: this.state.hourlyBooking ? '#aaa' : '#fff', flex: 1, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}
                        onPress={() => {
                            this.setState({
                                hourlyBooking: false,
                            })
                        }}
                    >
                        <Text style={{ color: this.state.hourlyBooking ? '#000' : '#77a300', fontWeight: 'bold', fontSize: 20 }}>Đặt tài xế</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ backgroundColor: this.state.hourlyBooking ? '#fff' : '#aaa', flex: 1, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                            this.setState({
                                hourlyBooking: true,
                            })
                        }}
                    >
                        <Text style={{ color: this.state.hourlyBooking ? '#77a300' : '#000', fontWeight: 'bold', fontSize: 20 }}>Theo giờ</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderRadius: 8, }}>
                    {this.state.hourlyBooking ? this.renderFormThueTaiTheoGio() : this.renderFormThueTai()}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.dialogCalendarVisible}
                        onOrientationChange={true}
                        onRequestClose={() => {
                            console.log('a');
                        }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                        }}>
                            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: "center" }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#77a300', margin: 16 }}>Chọn thời gian đi</Text>
                                <Calendar
                                    minDate={minDate}
                                    onDateChange={(date) => {
                                        this.setState({
                                            date: date,
                                            dialogTimeVisible: true,
                                        })
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.dialogTimeVisible}
                        onOrientationChange={true}
                        onRequestClose={() => {
                            console.log('a');
                        }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: 10,
                        }}>
                            <View style={{ flex: 2, }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ dialogTimeVisible: !this.state.dialogTimeVisible })}
                                    style={{ flex: 1 }}
                                ></TouchableOpacity>
                            </View>

                            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: "center", padding: 10 }}>
                                <Text style={{ color: '#00363d', fontSize: 18, fontWeight: 'bold' }}>Chọn giờ đi</Text>
                                <TimePicker
                                    selectedHours={this.state.selectedHours}
                                    selectedMinutes={this.state.selectedMinutes}
                                    onChange={(hours, minutes) => {
                                        this.setState({ selectedHours: hours, selectedMinutes: minutes, })
                                    }}
                                />
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                dialogCalendarVisible: false,
                                                dialogTimeVisible: false,
                                                depart_time: `${this.state.selectedHours < 10 ? '0'+this.state.selectedHours : this.state.selectedHours}:${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes} ${this.state.date.format('DD/MM/YYYY')}`
                                            })
                                            this.props.addDepartTimeTaixe(`${this.state.selectedHours < 10 ? '0'+this.state.selectedHours : this.state.selectedHours}:${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes} ${this.state.date.format('DD/MM/YYYY')}`);

                                        }}
                                    >
                                        <Text style={{ textAlign: "right", backgroundColor: "#77a300", color: '#fff', padding: 8, borderRadius: 4, fontSize: 16 }}>Tiếp tục</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalCity}
                        onOrientationChange={true}
                        onRequestClose={() => {
                            console.log('a');
                        }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                        }}>
                            <View style={{ flex: 2, }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ modalCity: !this.state.modalCity })}
                                    style={{ flex: 1 }}
                                ></TouchableOpacity>
                            </View>

                            <FlatList
                                style={{ flex: 1, backgroundColor: '#ffffff' }}
                                data={this.state.listCity}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', borderBottomColor: '#00363d', borderWidth: 0.2 }}
                                        onPress={() => {
                                            item.hide == 1 ? console.log(item.city_name) :
                                                this.setState({
                                                    city_name: item.city_name,
                                                    modalCity: false,
                                                })
                                        }}
                                    >
                                        <Text style={item.hide == 1 ? { fontSize: 18, flex: 1, padding: 8, color: '#888' } : { fontSize: 18, flex: 1, padding: 8 }}>{item.city_name}</Text>
                                    </TouchableOpacity>}
                                keyExtractor={item => item.city_id}
                            />
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalListTime}
                        onOrientationChange={true}
                        onRequestClose={() => {
                            console.log('a');
                        }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                        }}>
                            <View style={{ flex: 2, }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ modalListTime: !this.state.modalListTime })}
                                    style={{ flex: 1 }}
                                ></TouchableOpacity>
                            </View>

                            <FlatList
                                style={{ flex: 1, backgroundColor: '#ffffff' }}
                                data={this.state.listTime}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', borderBottomColor: '#00363d', borderWidth: 0.2 }}
                                        onPress={() => {
                                            this.setState({
                                                duration: item.time,
                                                modalListTime: false,
                                            })
                                            this.props.addDurationTaiXe(item.time);
                                        }}
                                    >
                                        <Text style={{ fontSize: 18, flex: 1, padding: 8, color: item.time === this.state.duration ? '#77a300' : '#000000' }}>{item.time} giờ</Text>
                                    </TouchableOpacity>}
                                keyExtractor={item => item.city_id}
                            />
                        </View>
                    </Modal>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 2,
        left: 2,
        right: 2,
        bottom: 2,
        justifyContent: 'center',
        alignItems: "center",
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 400,
    },
});

function mapStateToProps(state) {
    return {
        drop_add: state.rdTaixe.drop_add,
        pick_add: state.rdTaixe.pick_add,
        component_drop: state.rdTaixe.component_drop,
        component_pick: state.rdTaixe.component_pick,
        lattitude_pick: state.rdTaixe.lattitude_pick,
        lngtitude_pick: state.rdTaixe.lngtitude_pick,
        lattitude_drop: state.rdTaixe.lattitude_drop,
        lngtitude_drop: state.rdTaixe.lngtitude_drop,
        chair: state.rdTaixe.chair,
    }
}

export default connect(mapStateToProps, { addDepartTimeTaixe: addDepartTimeTaixe, addPeopleTaixe: addPeopleTaixe, swapAddressTaixe: swapAddressTaixe, addDurationTaiXe : addDurationTaiXe })(MapXeChung)
