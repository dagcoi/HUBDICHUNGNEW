import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import CalendarPicker from 'react-native-calendar-picker';
import TimePicker from '../../../component/TimePicker'
import { connect } from 'react-redux';
import { addDepartTimeTuLai, addPeopleTuLai, swapAddressTuLai, addDurationTuLai } from '../../../core/Redux/action/Action'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung'
import * as key from '../../../component/KeyGG'

import MapViewDirections from 'react-native-maps-directions';
import { TextInput } from 'react-native-gesture-handler';

const origin = { latitude: 21.2187149, longitude: 105.80417090000003 };
const GOOGLE_MAPS_APIKEY = key.KEY_GOOGLE;
const imageLocation = '../../../image/location.png'
const imageDrop = '../../../image/drop.png'
const imageSwap = '../../../image/swap.png'
const imageTime = '../../../image/time.png'
const imageCancel = '../../../image/cancel.png'
const imageHourglass = '../../../image/hourglass.png'
const imageCar = '../../../image/iconcar.png'

class MapDiChungTuLai extends Component {

    constructor() {
        super();
        this.state = {
            selectTaxi: true,
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
            depart_time: '',
            dateTimeSelect: '',
            spesentTime: '',
            spesentDay: '',
            hoursAlive: 0,
            minutesAlive: 0,
            selectedStartDate: null,
            modalSelectTime: false,
            listTime: [
                { 'id': 1, 'time': 2, 'text': '2 giờ' },
                { 'id': 2, 'time': 4, 'text': '4 giờ' },
                { 'id': 3, 'time': 6, 'text': '6 giờ' },
                { 'id': 4, 'time': 8, 'text': '8 giờ' },
                { 'id': 5, 'time': 10, 'text': '10 giờ' },
                { 'id': 6, 'time': 12, 'text': '12 giờ' },
                { 'id': 7, 'time': 24, 'text': '1 ngày' },
                { 'id': 8, 'time': 48, 'text': '2 ngày' },
            ],
            duration: '2 giờ',
            hourly: false,
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
        return date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
    }

    formSwitch() {
        return (
            <View style={{ backgroundColor: '#fff', height: 50, flexDirection: 'row', padding: 4 }}>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.hourly ? '#aaaaaa' : '#fff', borderRadius: 4 }}
                    onPress={() => this.setState({
                        hourly: false
                    })}
                >
                    <Text style={{ color: this.state.hourly ? '#00363d' : '#77a300', fontWeight: 'bold', fontSize: 20 }}>Theo tuyến</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.hourly ? '#fff' : '#aaa', borderRadius: 4 }}
                    onPress={() => this.setState({
                        hourly: true
                    })}
                >
                    <Text style={{ color: this.state.hourly ? '#77a300' : '#00363d', fontWeight: 'bold', fontSize: 20 }}>Theo giờ</Text>
                </TouchableOpacity>
            </View>
        )
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
                        latitude: (this.props.lattitude_pick + this.props.lattitude_drop) / 2,
                        longitude: (this.props.lngtitude_pick + this.props.lngtitude_drop) / 2,
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
                    title={"Điểm nhận"}
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
                    strokeColor="#669df6"
                />
            </MapView>
        );
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    gotoListCar() {
        this.props.navigation.push("ListCarTuLai");
    }

    nextScreen() {
        this.getDateTimeAlive();
        if (this.props.pick_add != '' && this.props.drop_add != '' && this.state.depart_time != '') {
            console.log(this.state.spesentDay)
            console.log(this.state.date.format('DD-MM-YYYY'))
            if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                if (this.state.hoursAlive > this.state.selectedHours) {
                    Alert.alert('Giờ đi phải lớn hơn giờ hiện tại')
                } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                    Alert.alert('Giờ đi phải lớn hơn giờ hiện tại')
                } else {
                    this.gotoListCar()
                }
            } else {
                this.gotoListCar();
            }
        }
        else {
            Alert.alert('Vui lòng điền đầy đủ thông tin để xem giá.')
        }
    }

    addPeopleTuLai() {
        this.props.addPeopleTuLai(1);
    }

    renderPickAddress() {
        return (
            <View style={{ flexDirection: 'row', borderColor: '#e8e8e8', borderWidth: 0.5, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{ height: 30, width: 24, marginLeft: 8 }}
                    source={require(imageLocation)}
                />
                <TouchableOpacity
                    style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', }}
                    onPress={() => {
                        this.props.navigation.push("SerchPlaceTuLai", {
                            search: 'Pick',
                            placeholder: 'Nhập điểm nhận xe',
                        });
                    }}
                >
                    <TextInput
                        editable={false}
                        onTouchStart={() => this.props.navigation.push("SerchPlaceTuLai", {
                            search: 'Pick',
                            placeholder: 'Nhập điểm nhận xe'
                        })
                        }
                        style={{ fontSize: 14, height: 40, color: "#00363d" }}
                        pointerEvents="none"
                        value={this.props.pick_add}
                        placeholder='Nhập điểm nhận xe'
                    />
                </TouchableOpacity>
            </View>
        )
    }

    renderTimePick() {
        return (
            <TouchableOpacity
                style={{ flex: 1, borderRadius: 4, borderWidth: 0.5, justifyContent: "center", alignItems: 'center', flexDirection: 'row', }}
                onPress={() => {
                    this.setState({
                        dialogCalendarVisible: true,
                    })
                }}
            >
                <Image
                    style={{ height: 24, width: 24, marginLeft: 8 }}
                    source={require(imageTime)}
                />

                <TextInput
                    editable={false}
                    value={this.state.date ? `${this.state.date.format('DD-MM-YYYY')}  ${this.state.selectedHours} : ${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes}` : ""}
                    placeholder='Chọn thời gian'
                    onTouchStart={() => { this.setState({ dialogCalendarVisible: true }) }}
                    pointerEvents='none'
                    style={{ fontSize: 14, height: 40, color: "#00363d", flex: 1 }}
                />

            </TouchableOpacity>
        )
    }

    formBookingDoortoDoor() {
        return (
            <View style={{ height: 200, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
                {this.renderPickAddress()}

                <View style={{ flexDirection: 'row', borderColor: '#e8e8e8', borderWidth: 0.5, borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginTop: 8, }}>
                    <View style={{ flex: 1, flexDirection: 'row', borderColor: '#e8e8e8', borderRightWidth: 0.1, justifyContent: 'center', alignItems: 'center', }}>
                        <Image
                            style={{ height: 30, width: 24, marginLeft: 8, alignItems: 'center', justifyContent: 'center' }}
                            source={require(imageDrop)}
                        />
                        <TouchableOpacity
                            style={{ flex: 1, height: 40 }}
                            onPress={() => {
                                this.props.navigation.push("SerchPlaceTuLai", {
                                    search: 'Drop',
                                    placeholder: 'Nhập điểm trả'
                                });
                            }}
                        >
                            <TextInput
                                editable={false}
                                onTouchStart={() => this.props.navigation.push("SerchPlaceTuLai", {
                                    search: 'Drop',
                                    placeholder: 'Nhập điểm trả'
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
                            this.props.swapAddressTuLai(this.props.drop_add, this.props.component_drop, this.props.lattitude_drop, this.props.lngtitude_drop, this.props.pick_add, this.props.component_pick, this.props.lattitude_pick, this.props.lngtitude_pick);
                        }}
                    >
                        <Image
                            style={{ height: 24, width: 24, margin: 8 }}
                            source={require(imageSwap)}
                        />
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', height: 40, marginTop: 8 }}>
                    {this.renderTimePick()}
                </View>
                <View style = {{height : 0.5, backgroundColor : '#000'}}></View>

                <View style={{ height: 40, flexDirection: 'row', marginTop: 8 }}>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#77a300', borderRadius: 4 }}
                        onPress={() => {
                            this.nextScreen();
                        }}
                    >
                        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', margin: 8 }}>XEM GIÁ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    formCarTour() {
        return (
            <View style={{ backgroundColor: '#fff', padding: 8 }}>
                {this.renderPickAddress()}
                <View style={{ flexDirection: 'row', height: 40, marginTop: 8 }}>
                    {this.renderTimePick()}
                </View>
                <View style={{ flexDirection: 'column', height: 40, marginBottom: 4, marginTop: 4 }}>
                    {this.renderHourglass()}
                </View>
                <View style = {{height : 0.5, backgroundColor : '#000'}}></View>

                <View style={{ height: 40, flexDirection: 'row', marginTop: 8 }}>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#77a300', borderRadius: 4 }}
                        onPress={() => {
                            this.gotoListCarTour();
                        }}
                    >
                        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', margin: 8 }}>XEM GIÁ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    gotoListCarTour() {
        if (this.props.pick_add != '' && this.state.depart_time != '') {
            if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                if (this.state.hoursAlive > this.state.selectedHours) {
                    Alert.alert('Giờ đi phải lớn hơn giờ hiện tại')
                } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                    Alert.alert('Giờ đi phải lớn hơn giờ hiện tại')
                } else {
                    //sang màn danh sách xe
                    this.props.navigation.navigate("ListCarHourlyBookingTL");
                }
            } else {
                //sang màn danh sách xe
                this.props.navigation.navigate("ListCarHourlyBookingTL");
            }
        } else {
            Alert.alert('Vui lòng điền đầy đủ thông tin để xem giá.')
        }
    }

    renderHourglass() {
        return (
            <ImageInputTextDiChung
                onPress={() => {
                    this.setState({
                        modalSelectTime: true
                    })
                }}
                source={require(imageHourglass)}
                placeholder={'Chọn thời gian thuê'}
                value={this.state.duration}
            />
        )
    }

    render() {
        const minDate = new Date();

        return (
            <View style={{ flex: 1 }}>
                {this.renderPicktoDrop()}
                <View style={{ flex: 1, padding: 8 }}>
                    {this.formSwitch()}
                    {this.state.hourly ? this.formCarTour() : this.formBookingDoortoDoor()}
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
                                <View style={{ flexDirection: 'row', margin: 16 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({
                                            dialogCalendarVisible: false
                                        })}
                                    >
                                        <Image
                                            style={{ width: 30, height: 30, }}
                                            source={require(imageCancel)}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#77a300', flex: 1, textAlign: 'center' }}>Chọn thời gian đi</Text>
                                </View>
                                <CalendarPicker
                                    textStyle={{
                                        color: '#000000',
                                        fontSize: 14,
                                    }}
                                    weekdays={['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN',]}
                                    months={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']}
                                    previousTitle="Trước"
                                    nextTitle="Sau"
                                    allowRangeSelection={false}
                                    minDate={minDate}
                                    startFromMonday={true}
                                    selectedDayColor="#77a300"
                                    selectedDayTextColor="#FFFFFF"
                                    dayShape='cicle'

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
                                                depart_time: `${this.state.selectedHours < 10 ? '0' + this.state.selectedHours : this.state.selectedHours}:${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes} ${this.state.date.format('DD/MM/YYYY')}`
                                            })
                                            this.props.addDepartTimeTuLai(`${this.state.selectedHours < 10 ? '0' + this.state.selectedHours : this.state.selectedHours}:${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes} ${this.state.date.format('DD/MM/YYYY')}`);

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
                        visible={this.state.modalSelectTime}
                        onOrientationChange={true}
                        onRequestClose={() => {
                            console.log('a');
                        }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                        }}>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ modalSelectTime: false })}
                                    style={{ flex: 1 }}
                                ></TouchableOpacity>
                            </View>
                            <FlatList
                                style={{ flex: 1, backgroundColor: '#ffffff' }}
                                data={this.state.listTime}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', borderBottomColor: '#00363d', borderWidth: 0.5 }}
                                        onPress={() => {
                                            this.setState({
                                                duration: item.text,
                                                modalSelectTime: false,
                                            })
                                            this.props.addDurationTuLai(item.time);
                                        }}
                                    >
                                        <Text style={{ fontSize: 18, flex: 1, padding: 8, color: item.text === this.state.duration ? '#77a300' : '#000000' }}>{item.text}</Text>
                                    </TouchableOpacity>}
                                keyExtractor={item => item.time}
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
        drop_add: state.rdTuLai.drop_add,
        pick_add: state.rdTuLai.pick_add,
        component_drop: state.rdTuLai.component_drop,
        component_pick: state.rdTuLai.component_pick,
        lattitude_pick: state.rdTuLai.lattitude_pick,
        lngtitude_pick: state.rdTuLai.lngtitude_pick,
        lattitude_drop: state.rdTuLai.lattitude_drop,
        lngtitude_drop: state.rdTuLai.lngtitude_drop,
        chair: state.rdTuLai.chair,
    }
}


export default connect(mapStateToProps, { addDepartTimeTuLai: addDepartTimeTuLai, addPeopleTuLai: addPeopleTuLai, swapAddressTuLai: swapAddressTuLai, addDurationTuLai: addDurationTuLai })(MapDiChungTuLai)
