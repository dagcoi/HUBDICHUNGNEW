import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator, Modal, FlatList, TouchableHighlight, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { ConfirmDialog } from 'react-native-simple-dialogs';
import CalendarPicker from 'react-native-calendar-picker';
import TimePicker from './TimePicker'
import { addCityTime, } from '../../../core/Redux/action/Action'
import { connect } from 'react-redux';
import * as key from '../../../component/KeyGG'
import { TextInput } from 'react-native-gesture-handler';

const origin = { latitude: 21.2187149, longitude: 105.80417090000003 };
// const destination = { latitude: 21.0019302, longitude: 105.85090579999996 };
const GOOGLE_MAPS_APIKEY = key.KEY_GOOGLE;

class MapChungXe extends Component {

    constructor() {
        super();
        this.state = {
            nhanxe: true,
            city: '',
            selectedHours: 6,
            selectedHours1: 21,
            selectedMinutes: 0,
            selectedMinutes1: 45,
            listCity: [],
            isLoading: true,
            modalListCity: false,
            dialogTimeVisible: false,
            dialogCalendarVisible: false,
            rent_date: '',
            return_date: '',
            city_id: '',
            city_name: '',
            time_pick: '',
            time_drop: '',
            date: '',
            date1: '',
            spesentTime: '',
            spesentDay: '',
            hoursAlive: 0,
            minutesAlive: 0,
        }
    }

    setModalVisible(visible) {
        this.setState({ modalListCity: visible });
    }

    componentDidMount() {
        this.getListCity()
        this.getDateTimeAlive();
    }

    async getListCity() {
        try {
            const res = await fetch(`https://api.chungxe.vn/partners/cities`);
            const jsonRes = await res.json();
            this.setStateAsync({
                listCity: jsonRes.data,
                isLoading: false
            });
            console.log(jsonRes.data)
            return jsonRes.data;
        }
        catch (error) {
            this.setStateAsync({
                isLoading: false
            });
        }
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
        var spesentDay = date + '-' + month + '-' + year;

        that.setState({
            //Setting the value of the date time
            spesentTime:
                date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
            spesentDay: date + '-' + month + '-' + year,
            hoursAlive: hours,
            minutesAlive: min,
        });
        console.log(date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec)
        return spesentDay;
    }

    renderPicktoDrop() {

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

    async setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }



    render() {
        const minDate = new Date();
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator
                        style={{ marginTop: 8 }}
                        size='large'
                    />
                </View>
            )
        }
        var obj = [...this.state.listCity];
        return (
            <View style={{ flex: 1, padding: 8 }}>

                {this.renderPicktoDrop()}

                <View style={{ height: 150, backgroundColor: '#ffffff', }}>

                    <View style={{ flexDirection: 'row', borderColor: '#00363e', borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ height: 30, width: 24, marginLeft: 8 }}
                            source={require('../../../image/location.png')}
                        />
                        <TouchableOpacity
                            style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', }}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalListCity);
                            }}
                        >
                            <TextInput
                                style={{ fontSize: 16, height: 40 }}
                                pointerEvents="none"
                                onTouchStart={() => { this.setModalVisible(!this.state.modalListCity); }}
                                value={this.state.city}
                                placeholder='Chọn khu vực'
                            />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', height: 45, marginTop: 8 }}>
                        <TouchableOpacity
                            style={{ flex: 1, borderRadius: 8, borderWidth: 1, justifyContent: "center", alignItems: 'center', flexDirection: 'row', }}
                            onPress={() => {
                                this.setState({
                                    dialogCalendarVisible: true, nhanxe: true
                                })
                            }}
                        >
                            <Image
                                style={{ height: 24, width: 24, margin: 8 }}
                                source={require('../../../image/time.png')}
                            />

                            <TextInput
                                value={this.state.date ? this.state.time_pick : ''}
                                placeholder='Thời gian nhận xe'
                                onTouchStart={() => { this.setState({ dialogCalendarVisible: true, nhanxe: true }) }}
                                pointerEvents='none'
                                style={{ fontSize: 16, height: 40, flex: 1, color: '#000' }}
                                editable={false}
                            />

                        </TouchableOpacity>
                        <View style={{ width: 8 }}></View>
                        <TouchableOpacity
                            style={{ flex: 1, borderRadius: 8, borderWidth: 1, justifyContent: "center", flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => {
                                this.setState({
                                    dialogCalendarVisible: true, nhanxe: false
                                })
                            }}
                        >
                            <Image
                                style={{ height: 24, width: 24, margin: 8 }}
                                source={require('../../../image/time.png')}
                            />
                            <TextInput
                                editable={false}
                                value={this.state.date1 ? this.state.time_drop : ''}
                                placeholder='Thời gian trả xe'
                                onTouchStart={() => { this.setState({ dialogCalendarVisible: true, nhanxe: false }) }}
                                pointerEvents='none'
                                style={{ fontSize: 16, height: 40, flex: 1, color: '#000' }}
                            />
                        </TouchableOpacity>
                    </View>

                    <Modal
                        visible={this.state.dialogCalendarVisible}
                        animationType="slide"
                        transparent={true}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            backgroundColor: '#fff',
                        }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 8 }}>{this.state.nhanxe ? 'Chọn ngày nhận xe' : 'Chọn ngày trả xe'}</Text>
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
                                // todayBackgroundColor="#00363d"
                                selectedDayColor="#77a300"
                                selectedDayTextColor="#FFFFFF"
                                dayShape='cicle'
                                onDateChange={(date) => {
                                    if (this.state.nhanxe) {
                                        this.setState({
                                            date: date,
                                            dialogTimeVisible: true,
                                        })
                                    } else {
                                        this.setState({
                                            date1: date,
                                            dialogTimeVisible: true,
                                        })
                                    }

                                }}

                            />
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalListCity}
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
                                    onPress={() => this.setModalVisible(!this.state.modalListCity)}
                                    style={{ flex: 1 }}
                                ></TouchableOpacity>
                            </View>
                            <FlatList
                                style={{ flex: 1, backgroundColor: '#ffffff' }}
                                data={this.state.listCity}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', borderBottomColor: '#00363d', borderWidth: 0.2 }}
                                        onPress={() => this.setState({
                                            city: item.city_name,
                                            city_id: item.city_id,
                                            city_name: item.city_name,
                                            modalListCity: false,
                                        })}
                                    >
                                        <Text style={{ fontSize: 18, flex: 1, padding: 8 }}>{item.city_name}</Text>
                                    </TouchableOpacity>}
                                keyExtractor={item => item.city_id}
                            />

                        </View>
                    </Modal>



                    {/* Dialog chọn giờ nhận hoặc trả xe */}
                    <Modal
                        visible={this.state.dialogTimeVisible}
                        animationType="slide"
                        transparent={true}
                        onOrientationChange={true}
                    >
                        <View style={{ flex: 1, margin: 10 }}>
                            <View style={{ flex: 2 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ dialogTimeVisible: false })
                                    }}
                                >
                                    <View style={{ flex: 1 }}></View>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    backgroundColor: '#fff',
                                    padding: 10,
                                }}>
                                <TimePicker
                                    selectedHours={this.state.nhanxe ? this.state.selectedHours : this.state.selectedHours1}
                                    selectedMinutes={this.state.nhanxe ? this.state.selectedMinutes : this.state.selectedMinutes1}
                                    onChange={(hours, minutes) => {
                                        if (this.state.nhanxe) {
                                            this.setState({ selectedHours: hours, selectedMinutes: minutes, })

                                        } else {
                                            this.setState({ selectedHours1: hours, selectedMinutes1: minutes, })
                                        }
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        if (this.state.nhanxe) {
                                            this.setStateAsync({
                                                dialogCalendarVisible: false,
                                                dialogTimeVisible: false,
                                                rent_date: `${this.state.date.format('YYYY-MM-DD')}`,
                                                // rent_date: `${this.state.selectedHours}:${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes}:00 ${this.state.date.format('YYYY-MM-DD')}`,
                                                // time_pick: ` ${this.state.date.format('YYYY-MM-DD')} ${this.state.selectedHours}:${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes}`
                                                time_pick: `${this.state.selectedHours}:${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes} ${this.state.date.format('DD/MM/YYYY')}`
                                            })
                                            if (this.state.date1 == '' || this.state.date > this.state.date1) {
                                                // console.log(this.state.date)
                                                this.setStateAsync({
                                                    date1: this.state.date,
                                                    selectedHours1: 21,
                                                    selectedMinutes1: 45,
                                                    return_date: `${this.state.date.format('YYYY-MM-DD')}`,
                                                    time_drop: `21:45 ${this.state.date.format('DD/MM/YYYY')}`
                                                })
                                            }
                                        } else {
                                            this.setStateAsync({
                                                dialogCalendarVisible: false,
                                                dialogTimeVisible: false,
                                                return_date: `${this.state.date1.format('YYYY-MM-DD')}`,
                                                time_drop: `${this.state.selectedHours1}:${this.state.selectedMinutes1 == 0 ? '00' : this.state.selectedMinutes1} ${this.state.date1.format('DD/MM/YYYY')}`
                                            })
                                            if (this.state.date == '' || this.state.date > this.state.date1) {
                                                this.setStateAsync({
                                                    date: this.state.date1,
                                                    selectedHours: 6,
                                                    selectedMinutes: 0,
                                                    rent_date: `${this.state.date1.format('YYYY-MM-DD')}`,
                                                    time_pick: `6:00 ${this.state.date1.format('DD/MM/YYYY')}`
                                                })
                                            }
                                        }
                                    }}
                                >
                                    <Text style={{ textAlign: "center", backgroundColor: "#77a300", color: '#fff', padding: 8, borderRadius: 4, fontSize: 16 }}>Tiếp tục</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <View style={{ height: 40, flexDirection: 'row', marginTop: 8 }}>
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#77a300', borderRadius: 4 }}
                            onPress={() => {
                                this.nextScreen();
                            }}
                        >
                            <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', }}>XEM GIÁ</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
    selectedDate() {
        var { rent_date, return_date } = this.state;
        console.log(rent_date);
        console.log(return_date);
        var datePick = new Date(this.state.rent_date).getTime();
        var dateReturn = new Date(this.state.return_date).getTime();
        var Difference_In_Time = dateReturn - datePick
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) + 1;
        // console.log(Difference_In_Days);
        if (Difference_In_Days < 1) {
            return true;
        } else {
            return false;
        }
    }

    nextScreen() {
        const spesentDay = this.getDateTimeAlive();
        console.log('a')
        console.log(spesentDay)
        console.log('a')
        if (this.state.city == '') {
            Alert.alert('Bạn chưa chọn Thành phố');
        } else if (this.state.rent_date == '' || this.state.return_date == '') {
            Alert.alert('Vui lòng chọn thời gian nhận trả xe');
        } else if (this.selectedDate()) {
            Alert.alert('Thời gian trả xe phải lớn hơn nhận xe')
        } else if (spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
            // console.log(spesentDay)
            if (this.state.hoursAlive > this.state.selectedHours) {
                Alert.alert('Giờ nhận xe phải lớn hơn giờ hiện tại')
            } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                Alert.alert('Giờ nhận xe phải lớn hơn giờ hiện tại')
            } else {
                this.addData()
            }
        } else {
            this.addData()
        }
    }

    addData() {
        const rent_date1 = new Date(`${this.state.rent_date}`);
        const return_date1 = new Date(this.state.return_date);
        const rent_date = new Date(rent_date1.getFullYear(), rent_date1.getMonth(), rent_date1.getDate(), this.state.selectedHours, this.state.selectedMinutes);
        const return_date = new Date(return_date1.getFullYear(), return_date1.getMonth(), return_date1.getDate(), this.state.selectedHours1, this.state.selectedMinutes1);
        const rd = rent_date.toString();
        const rd1 = return_date.toString();
        console.log(rd);
        console.log(rd1);
        console.log(this.state.rent_date);
        console.log(this.state.return_date);
        this.props.addCityTime(this.state.city_id, rent_date.toString(), return_date.toString(), this.state.city_name, this.state.time_pick, this.state.time_drop);
        this.props.navigation.push("ListVehicle", {
            city_id: this.state.city_id,
            rent_date: this.state.rent_date,
            return_date: this.state.return_date,
        });
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
        city: state.info.city,
        rent_date: state.info.rent_date,
        return_date: state.info.return_date,
    }
}


export default connect(mapStateToProps, { addCityTime: addCityTime })(MapChungXe);
