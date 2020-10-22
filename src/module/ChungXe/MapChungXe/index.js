import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Modal, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { addCityTime, addDepartTime, swapAddress, addProductChunkType, addReturnTime, addVehicleType, addCarType } from '../../../core/Redux/action/Action'
import { connect } from 'react-redux';
import * as key from '../../../component/KeyGG'
import { TextInput } from 'react-native-gesture-handler';
import { listHour } from '../../../component/TimeSelect/listTime'
import { ButtonFull } from '../../../component/Button'
import PopUp from '../../../component/PopUp'
import { HeaderText } from '../../../component/Header';
import ImageTextBold from '../../../component/ImageTextDiChung/ImageTextBold'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung'
import { getDateTimeAlive } from '../../../until'
import FormChungxeTuyen from './FormChungxeTuyen';
import FormChungxe from './FormChungxe';
import Toast from 'react-native-simple-toast'

const imageLocation = '../../../image/location.png'
const imageDrop = '../../../image/location.png'
const imageSwap = '../../../image/swap.png'
const imageTime = '../../../image/time.png'
const imageCheck = '../../../image/done.png'
const imageCheckWhite = '../../../image/checkw.png'
const imageBackground = { uri: 'https://dichung.vn/static/images/e216031ab3feeb651026e80873156f50.png' }

// const destination = { latitude: 21.0019302, longitude: 105.85090579999996 };

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
            isLoading: false,
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
            date2: '',
            spesentTime: '',
            spesentDay: '',
            hoursAlive: 0,
            minutesAlive: 0,
            city_name_dc: "",
            isShowModalCity: false,
            scrollNhan: 24,
            scrollTra: 72,
            hourly: true,
            dialogCarType: false,
            carType: '',
            carName: '',
            listCarType: [
                {
                    "id": 1,
                    "name": "Xe máy",
                    "type": "motorbike"
                },
                {
                    "id": 2,
                    "name": "Ô tô",
                    "type": "car"
                }
            ]
        },
            this.mapRef = null;
    }

    setModalVisible(visible) {
        this.setState({ modalListCity: visible });
    }

    componentDidMount() {
        this.getTimeAlive();

    }

    getItemLayout = (data, index) => (
        { length: 40, offset: 40 * index, index }
    )


    getTimeAlive() {
        var that = this;
        var time = getDateTimeAlive()
        that.setState({
            spesentTime: time.spesentTime,
            spesentDay: time.spesentDay,
            hoursAlive: time.hoursAlive,
            minutesAlive: time.minutesAlive,
        })
    }

    async setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    onPressPickAddress = () => {
        this.props.navigation.push("SearchPlace", {
            search: 'Pick',
            placeholder: 'Nhập điểm xuất phát',
        });
    }

    onPressDropAddress = () => {
        this.props.navigation.push("SearchPlace", {
            search: 'Drop',
            placeholder: 'Nhập điểm trả',
        });
    }

    onPressSelectTime = () => {
        this.setState({
            dialogCalendarVisible: true, nhanxe: true,
        })
    }
    onPressSelectTimeRent = () => {
        this.setState({
            dialogCalendarVisible: true, nhanxe: true
        })
    }
    onPressSelectTimeReturn = () => {
        this.setState({
            dialogCalendarVisible: true, nhanxe: false
        })
    }

    onPressVehicle = () => {
        this.setState({
            dialogCarType: true,
        })
    }

    onPressSwap = () => {
        this.props.swapAddress(this.props.drop_add, this.props.component_drop, this.props.latitude_drop, this.props.longitude_drop, this.props.typesDrop, this.props.pick_add, this.props.component_pick, this.props.latitude_pick, this.props.longitude_pick, this.props.typesPick);
    }


    formModalCarType() {
        return (
            <Modal animationType="slide"
                transparent={true}
                visible={this.state.dialogCarType}
                onRequestClose={() => {
                }}>
                <SafeAreaView style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    backgroundColor: '#000000AA'
                }}>
                    <View style={{ flex: 2, }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ dialogCarType: false })}
                            style={{ flex: 1 }}
                        ></TouchableOpacity>
                    </View>

                    <FlatList
                        style={{ flex: 1, backgroundColor: '#ffffff' }}
                        data={this.state.listCarType}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    this.setState({
                                        carType: item.type,
                                        carName: item.name,
                                        dialogCarType: false,
                                    })
                                    this.props.addVehicleType(item.type, item.name)
                                }}
                            >
                                <Text style={item.hide == 1 ? { fontSize: 18, flex: 1, padding: 8, color: '#888' } : { fontSize: 18, flex: 1, padding: 8, color: item.city_name == this.state.city_name_dc ? '#77a300' : '#000' }}>{item.name}</Text>
                                {item.name == this.state.carName ? <Image
                                    style={{ height: 24, width: 24, marginLeft: 8 }}
                                    source={require(imageCheck)}
                                /> : null}
                            </TouchableOpacity>}
                        keyExtractor={item => item.city_id}
                    />
                </SafeAreaView>
            </Modal >
        )
    }


    renderTimePick() {
        return (
            <TouchableOpacity
                style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", alignItems: 'center', flexDirection: 'row', height: 40 }}
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
                    value={this.state.date ? this.state.time_pick : ""}
                    placeholder='Chọn giờ lấy xe'
                    placeholderTextColor={'#999999'}
                    onTouchStart={() => { this.setState({ dialogCalendarVisible: true }) }}
                    pointerEvents='none'
                    style={{ fontSize: 14, color: "#00363d", flex: 1, marginLeft: 8 }}
                />

            </TouchableOpacity>
        )
    }


    formBookingDoortoDoor() {
        return (
            <View style={styles.borderBot}>
                <FormChungxeTuyen
                    onPressPickAddress={this.onPressPickAddress}
                    onPressDropAddress={this.onPressDropAddress}
                    onPressSwap={this.onPressSwap}
                    onPressSelectTime={this.onPressSelectTime}
                />
                <ButtonFull
                    onPress={() => { this.nextScreen() }}
                    value={'TIẾP TỤC'}
                />
            </View>
        )
    }

    nextScreen() {
        this.getTimeAlive();
        this.props.addProductChunkType('car_rental')
        this.props.addCarType('Tất cả loại xe', '0')
        if (this.props.pick_add != '' && this.props.drop_add != '') {
            console.log(this.state.spesentDay)
            if (this.state.date) {
                if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                    if (this.state.hoursAlive > this.state.selectedHours) {
                        this.ToastTime()
                    } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                        this.ToastTime()
                    } else {
                        this.props.navigation.push("ListCar");
                    }
                } else {
                    this.props.navigation.push("ListCar");
                }
            } else {
                this.props.navigation.push("ListCar");
            }
        }
        else {
            this.ToastInfo()
        }
    }

    ToastInfo() {
        Toast.show('Vui lòng điền đầy đủ thông tin để xem giá.', Toast.LONG)
    }

    ToastTime() {
        Toast.show('Giờ đi phải lớn hơn giờ hiện tại', Toast.LONG)
    }

    ToastTimeDrop() {
        Toast.show('Giờ trả xe phải lớn hơn giờ đi.', Toast.LONG)
    }

    formCarTour() {
        return (
            <View style={styles.borderBot}>
                <FormChungxe
                    onPressPickAddress={this.onPressPickAddress}
                    onPressSelectTimeRent={this.onPressSelectTimeRent}
                    onPressSelectTimeReturn={this.onPressSelectTimeReturn}
                    onPressVehicle={this.onPressVehicle}
                />
                <ButtonFull
                    onPress={() => { this.gotoListCarTour() }}
                    value={'TIẾP TỤC'}
                />
            </View>
        )
    }

    formSwitch() {
        return (
            <View style={[{ backgroundColor: '#fff', height: 48, flexDirection: 'row', marginTop: 8, marginLeft: 8, marginRight: 8 }, styles.borderTop]}>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.hourly ? '#fff' : '#aaa', borderTopLeftRadius: 8 }}
                    onPress={() => this.setState({
                        hourly: true
                    })}
                >
                    <Text style={{ color: this.state.hourly ? '#77a300' : '#fff', fontWeight: 'bold', fontSize: 16 }}>Theo ngày</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.hourly ? '#aaaaaa' : '#fff', borderTopRightRadius: 8 }}
                    onPress={() => this.setState({
                        hourly: false
                    })}
                >
                    <Text style={{ color: this.state.hourly ? '#fff' : '#77a300', fontWeight: 'bold', fontSize: 16 }}>Theo tuyến</Text>
                </TouchableOpacity>
            </View>
        )
    }

    formSelectTime() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.dialogTimeVisible}
                // onOrientationChange={true}
                onRequestClose={() => {
                }}>
                <SafeAreaView style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    backgroundColor: '#000000AA'
                }}>
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ dialogTimeVisible: !this.state.dialogTimeVisible })}
                            style={{ flex: 1 }}
                        ></TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                        <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Chọn giờ đi</Text>
                        </View>
                        <FlatList
                            style={{ flex: 1, backgroundColor: '#ffffff' }}
                            data={listHour}
                            initialScrollIndex={this.state.nhanxe ? this.state.scrollNhan - 1 : this.state.scrollTra - 1}
                            getItemLayout={this.getItemLayout}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', height: 40 }}
                                    onPress={() => {
                                        var isDayAlight = this.state.spesentDay == this.state.date2.format('DD-MM-YYYY');
                                        var timeClicker = ((item.hour == this.state.hoursAlive && item.minute > this.state.minutesAlive) || item.hour > this.state.hoursAlive);
                                        if (this.state.nhanxe) {
                                            if (isDayAlight) {
                                                if (timeClicker) {
                                                    this.setState({
                                                        selectedHours: item.hour,
                                                        selectedMinutes: item.minute,
                                                        scrollNhan: item.id,
                                                        dialogTimeVisible: false,
                                                        dialogCalendarVisible: false,
                                                        time_pick: `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`,
                                                        rent_date: `${this.state.date.format('YYYY-MM-DD')}`,
                                                        // time_drop: `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`
                                                    })
                                                    this.props.addDepartTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`, `${this.state.date.format('YYYY-MM-DD')}T${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute}:00.000`);
                                                }
                                            } else {
                                                this.setState({
                                                    selectedHours: item.hour,
                                                    selectedMinutes: item.minute,
                                                    scrollNhan: item.id,
                                                    dialogTimeVisible: false,
                                                    dialogCalendarVisible: false,
                                                    time_pick: `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`,
                                                    rent_date: `${this.state.date.format('YYYY-MM-DD')}`,
                                                    // time_drop: `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`
                                                })
                                                this.props.addDepartTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`, `${this.state.date.format('YYYY-MM-DD')}T${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute}:00.000`);
                                            }
                                        } else {
                                            if (isDayAlight) {
                                                if (timeClicker) {
                                                    this.setState({
                                                        selectedHours1: item.hour,
                                                        selectedMinutes1: item.minute,
                                                        scrollTra: item.id,
                                                        dialogTimeVisible: false,
                                                        dialogCalendarVisible: false,
                                                        time_drop: `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date1.format('DD/MM/YYYY')}`,
                                                        return_date: `${this.state.date1.format('YYYY-MM-DD')}`,
                                                    })
                                                    this.props.addReturnTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date1.format('DD/MM/YYYY')}`, `${this.state.date1.format('YYYY-MM-DD')}T${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute}:00.000`);
                                                }
                                            } else {
                                                this.setState({
                                                    selectedHours1: item.hour,
                                                    selectedMinutes1: item.minute,
                                                    scrollTra: item.id,
                                                    dialogTimeVisible: false,
                                                    dialogCalendarVisible: false,
                                                    time_drop: `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date1.format('DD/MM/YYYY')}`,
                                                    return_date: `${this.state.date1.format('YYYY-MM-DD')}`,
                                                })
                                                this.props.addReturnTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date1.format('DD/MM/YYYY')}`, `${this.state.date1.format('YYYY-MM-DD')}T${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute}:00.000`);
                                            }
                                        }
                                    }}
                                >
                                    <Text style={{ textAlign: 'center', fontSize: 18, flex: 1, padding: 8, backgroundColor: (item.hour == this.state.selectedHours && item.minute == this.state.selectedMinutes) ? '#77a300' : '#fff', color: (this.state.spesentDay == this.state.date2.format('DD-MM-YYYY') && ((item.hour == this.state.hoursAlive && item.minute < this.state.minutesAlive) || item.hour < this.state.hoursAlive)) ? '#aaa' : item.hour == this.state.selectedHours && item.minute == this.state.selectedMinutes ? '#fff' : '#000000' }}>{item.hour < 10 ? '0' + item.hour : item.hour} : {item.minute == 0 ? '00' : item.minute}</Text>
                                </TouchableOpacity>}
                            scrollToIndex={this.state.scroll}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const minDate = new Date();
        if (this.state.isLoading) {
            return (
                <SafeAreaView style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator
                        style={{ marginTop: 8 }}
                        size='large'
                    />
                </SafeAreaView>
            )
        }
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
                <HeaderText textCenter={'Thuê xe tự lái'} onPressLeft={this.goBack} />
                <ImageBackground style={{ flex: 1, resizeMode: "cover", }} source={imageBackground} >
                    <View style={{ justifyContent: 'center', paddingHorizontal: 16 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 21, marginTop: 8, color: '#efefef' }}>Thuê xe tự lái</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 21, marginTop: 8, color: '#efefef' }}>Thoải mái hành trình</Text>
                    </View>
                    {this.formSwitch()}
                    {this.state.hourly ? this.formCarTour() : this.formBookingDoortoDoor()}
                    <View style={{ justifyContent: 'center', paddingHorizontal: 16 }}>
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"Nhiều lựa chọn, giá tốt nhất"} />
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"Dễ dàng tìm kiếm, so sánh"} />
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"Bảo hiểm an tâm"} />
                    </View>
                    <Modal
                        visible={this.state.dialogCalendarVisible}
                        animationType="slide"
                        transparent={true}
                    >
                        <SafeAreaView style={{
                            flex: 1,
                            flexDirection: 'column',
                            backgroundColor: '#fff',
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 8, textAlign: 'center' }}>{this.state.nhanxe ? 'Chọn ngày nhận xe' : 'Chọn ngày trả xe'}</Text>
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
                                            date2: date,
                                            dialogTimeVisible: true,
                                        })
                                    } else {
                                        this.setState({
                                            date1: date,
                                            date2: date,
                                            dialogTimeVisible: true,
                                        })
                                    }

                                }}

                            />
                            {this.formSelectTime()}
                        </SafeAreaView>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalListCity}
                        // onOrientationChange={true}
                        onRequestClose={() => {
                            console.log('a');
                        }}>
                        <SafeAreaView style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            backgroundColor: '#000000AA'
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
                                        style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => this.setState({
                                            city: item.city_name,
                                            city_id: item.city_id,
                                            city_name: item.city_name,
                                            modalListCity: false,
                                        })}
                                    >
                                        <Text style={{ fontSize: 18, flex: 1, padding: 8, color: this.state.city_name == item.city_name ? '#77a300' : '#333333' }}>{item.city_name}</Text>
                                        {item.city_name == this.state.city_name ? <Image
                                            style={{ height: 24, width: 24, marginLeft: 8 }}
                                            source={require(imageCheck)}
                                        /> : null}
                                    </TouchableOpacity>}
                                keyExtractor={item => item.city_id}
                            />

                        </SafeAreaView>
                    </Modal>

                    {this.formModalCarType()}
                </ImageBackground>
            </SafeAreaView>
        );
    }
    selectedDate() {
        // var { rent_date, return_date, selectedHours, selectedHours1, selectedMinutes1, selectedMinutes } = this.state;
        // console.log(rent_date);
        // console.log(return_date);
        // var datePick = new Date(this.state.rent_date).getTime();
        // var dateReturn = new Date(this.state.return_date).getTime();
        // var Difference_In_Time = dateReturn - datePick
        // var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) + 1;
        // console.log('a');
        // console.log(rent_date);
        // console.log(return_date);
        // console.log(datePick);
        // console.log(dateReturn);
        // console.log(Difference_In_Days);
        console.log('----------------------')
        console.log(this.props.depart_time2)
        console.log(this.props.returnTime2)
        if (this.props.depart_time2 == null) {
            Toast.show('Vui lòng chọn thời gian nhận xe.', Toast.SHORT);
            return true;
        } else if (this.props.returnTime2 == null) {
            Toast.show('Vui lòng chọn thời gian trả xe.', Toast.SHORT);
            return true;
        } else {
            var datePick = new Date(this.props.depart_time2).getTime()
            var dateDrop = new Date(this.props.returnTime2).getTime()
            var time = dateDrop - datePick;
            if (time <= 0) {
                this.ToastTimeDrop()
                return true;
            } else {
                return false;
            }
        }

        // if (rent_date != '' && return_date != '') {
        //     if (Difference_In_Days < 1) {
        //         this.ToastTimeDrop()
        //         return true;
        //     } else if (Difference_In_Days == 1) {
        //         if (selectedHours > selectedHours1) {
        //             this.ToastTimeDrop();
        //             return true;
        //         } else if (selectedHours == selectedHours1) {
        //             if (selectedMinutes >= selectedMinutes1) {
        //                 this.ToastTimeDrop()
        //                 return true;
        //             } else {
        //                 return false;
        //             }
        //         } else {
        //             return false;
        //         }
        //     } else {
        //         return false;
        //     }
        // } else {
        //     Toast.show('Vui lòng chọn đầy đủ thời gian.', Toast.SHORT)
        //     return true;
        // }
    }

    gotoListCarTour() {
        const spesentDay = this.getTimeAlive();
        console.log('a')
        console.log(spesentDay)
        console.log('a')
        if (this.props.pick_add == '') {
            this.ToastInfo()
            return;
        } else if (this.selectedDate()) {
            // this.ToastTimeDrop()
            return;
        } else if (this.props.vehicleType == 0) {
            Toast.show('Vui lòng chọn loại xe.', Toast.SHORT);
        } else {
            this.addData()
        }
    }

    addData() {
        const rent_date1 = new Date(`${this.state.rent_date}`);
        this.props.addProductChunkType('hourly_car_rental')
        this.props.navigation.push("ListCar", {
            vehicleType: this.props.carType,
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
    borderBot: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
        marginHorizontal: 8,
        paddingLeft: -2,
        paddingRight: 8,
        paddingTop: 4,
    },
    borderTop: {
        borderTopEndRadius: 8,
        borderTopStartRadius: 8
    }
});

function mapStateToProps(state) {
    return {
        depart_time2: state.info.depart_time2,
        returnTime2: state.info.returnTime2,
        city: state.info.city,
        rent_date: state.info.rent_date,
        return_date: state.info.return_date,
        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
        typesPick: state.info.typesPick,
        typesDrop: state.info.typesDrop,
        component_drop: state.info.component_drop,
        component_pick: state.info.component_pick,
        latitude_pick: state.info.latitude_pick,
        longitude_pick: state.info.longitude_pick,
        latitude_drop: state.info.latitude_drop,
        longitude_drop: state.info.longitude_drop,
        chair: state.info.chair,
        vehicleType: state.info.vehicleType,

    }
}


export default connect(mapStateToProps, { addCityTime: addCityTime, addDepartTime: addDepartTime, swapAddress: swapAddress, addProductChunkType: addProductChunkType, addReturnTime: addReturnTime, addVehicleType: addVehicleType, addCarType: addCarType })(MapChungXe);
