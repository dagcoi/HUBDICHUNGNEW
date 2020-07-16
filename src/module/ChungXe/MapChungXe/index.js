import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Modal, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { addCityTime, addDepartTime, swapAddress, addProductChunkType } from '../../../core/Redux/action/Action'
import { connect } from 'react-redux';
import * as key from '../../../component/KeyGG'
import { TextInput } from 'react-native-gesture-handler';
import listHour from '../../../component/TimeSelect/listTime';
import { ButtonFull } from '../../../component/Button'
import PopUp from '../../../component/PopUp'
import { HeaderText } from '../../../component/Header';
import ImageTextBold from '../../../component/ImageTextDiChung/ImageTextBold'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung'

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
            date2: '',
            spesentTime: '',
            spesentDay: '',
            hoursAlive: 0,
            minutesAlive: 0,
            city_name_dc: "",
            listCityDC: [
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
            isShowModalCity: false,
            scrollNhan: 48,
            scrollTra: 48,
            showAlertTime: false,
            showAlertInfo: false,
            showAlertTimeDrop: false,
            hourly: false,
        },
            this.mapRef = null;
    }

    setModalVisible(visible) {
        this.setState({ modalListCity: visible });
    }

    componentDidMount() {
        this.getListCity()
        this.getDateTimeAlive();

    }

    getItemLayout = (data, index) => (
        { length: 40, offset: 40 * index, index }
    )

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

    renderAlertInfo() {
        return (
            <PopUp
                showModal={this.state.showAlertInfo || this.state.showAlertTime || this.state.showAlertTimeDrop}
                textMessage={this.state.showAlertInfo ? 'Vui lòng điền đầy đủ thông tin để xem giá.' :
                    this.state.showAlertTime ? 'Giờ đi phải lớn hơn giờ hiện tại.' :
                        this.state.showAlertTimeDrop ? 'Giờ trả xe phải lớn hơn giờ đi.' : ''}
                textButtonLeft={'Đồng ý'}
                onPressLeft={() => {
                    this.setState({
                        showAlertInfo: false,
                        showAlertTime: false,
                        showAlertTimeDrop: false
                    })
                }}
            />
        )
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

    async setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    formModalListCity() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.isShowModalCity}
                onRequestClose={() => {
                    console.log('a');
                }}>
                <SafeAreaView style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    backgroundColor: '#000000AA'
                }}>
                    <View style={{ flex: 2, }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ isShowModalCity: false })}
                            style={{ flex: 1 }}
                        ></TouchableOpacity>
                    </View>

                    <FlatList
                        style={{ flex: 1, backgroundColor: '#ffffff' }}
                        data={this.state.listCityDC}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    item.hide == 1 ? console.log(item.city_name) :
                                        this.setState({
                                            city_name_dc: item.city_name,
                                            isShowModalCity: false,
                                        })
                                }}
                            >
                                <Text style={item.hide == 1 ? { fontSize: 18, flex: 1, padding: 8, color: '#888' } : { fontSize: 18, flex: 1, padding: 8, color: item.city_name == this.state.city_name_dc ? '#77a300' : '#000' }}>{item.city_name}</Text>
                                {item.city_name == this.state.city_name_dc ? <Image
                                    style={{ height: 24, width: 24, marginLeft: 8 }}
                                    source={require(imageCheck)}
                                /> : null}
                            </TouchableOpacity>}
                        keyExtractor={item => item.city_id}
                    />
                </SafeAreaView>
            </Modal>
        )
    }

    renderPickAddress() {
        return (
            <ImageInputTextDiChung
                onPress={() => {
                    this.props.navigation.push("SearchPlace", {
                        search: 'Pick',
                        placeholder: 'Nhập điểm xuất phát',
                    });
                }}
                source={require(imageLocation)}
                placeholder={'Nhập điểm xuất phát'}
                value={this.props.pick_add}
            />
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
                    placeholderTextColor={'#333333'}
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
                <View style={{ flexDirection: 'row', borderColor: '#e8e8e8', borderTopWidth: 0.0, justifyContent: 'center', alignItems: 'center', height: 40 }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => {
                            this.setState({
                                isShowModalCity: true,
                            })
                        }}
                    >
                        <Image
                            style={{ height: 28, width: 24, marginLeft: 8 }}
                            source={require(imageLocation)}
                        />

                        <TextInput
                            editable={false}
                            onTouchStart={() => {
                                this.setState({
                                    isShowModalCity: true,
                                })
                            }
                            }
                            style={{ fontSize: 14, color: "#00363d", marginLeft: 8 }}
                            pointerEvents='none'
                            value={this.state.city_name_dc}
                            placeholderTextColor={'#333333'}
                            placeholder='Chọn thành phố'
                            selection={{ start: 0, end: 0 }}
                        />

                    </TouchableOpacity>
                </View>

                {this.renderPickAddress()}

                <View style={{ flexDirection: 'row', borderColor: '#e8e8e8', borderTopWidth: 1, justifyContent: 'center', alignItems: 'center', height: 40 }}>
                    <View style={{ flex: 1, flexDirection: 'row', borderColor: '#e8e8e8', borderRightWidth: 0.1, justifyContent: 'center', alignItems: 'center', }}>
                        <Image
                            style={{ height: 28, width: 24, marginLeft: 8, alignItems: 'center', justifyContent: 'center' }}
                            source={require(imageDrop)}
                        />
                        <TouchableOpacity
                            style={{ flex: 1, }}
                            onPress={() => {
                                this.props.navigation.push("SearchPlace", {
                                    search: 'Drop',
                                    placeholder: 'Nhập điểm đến'
                                });
                            }}
                        >
                            <TextInput
                                editable={false}
                                onTouchStart={() => this.props.navigation.push("SearchPlace", {
                                    search: 'Drop',
                                    placeholder: 'Nhập điểm đến'
                                })
                                }
                                style={{ fontSize: 14, color: "#00363d", marginLeft: 8 }}
                                pointerEvents="none"
                                value={this.props.drop_add}
                                placeholder='Nhập điểm đến'
                                placeholderTextColor={'#333333'}
                                selection={{ start: 0, end: 0 }}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={{ borderLeftWidth: 1, borderColor: '#e8e8e8' }}
                        onPress={() => {
                            this.props.swapAddress(this.props.drop_add, this.props.component_drop, this.props.latitude_drop, this.props.longitude_drop, this.props.pick_add, this.props.component_pick, this.props.latitude_pick, this.props.longitude_pick);
                        }}
                    >
                        <Image
                            style={{ height: 24, width: 24, margin: 8 }}
                            source={require(imageSwap)}
                        />
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', }}>
                    {this.renderTimePick()}
                </View>
                <View style={{ height: 1, backgroundColor: '#e8e8e8', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                </View>
                <ButtonFull
                    onPress={() => { this.nextScreen() }}
                    value={'Xem giá'}
                />
            </View>
        )
    }

    nextScreen() {
        this.getDateTimeAlive();
        this.props.addProductChunkType('car_rental')
        if (this.props.pick_add != '' && this.props.drop_add != '' && this.state.time_pick != '' && this.state.city_name_dc != '') {
            // console.log(this.state.spesentDay)
            // console.log(this.state.date.format('DD-MM-YYYY'))
            if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                if (this.state.hoursAlive > this.state.selectedHours) {
                    this.setState({ showAlertTime: true })
                } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                    this.setState({ showAlertTime: true })
                } else {
                    this.props.navigation.push("ListCar");
                }
            } else {
                this.props.navigation.push("ListCar");
            }
        }
        else {
            this.setState({ showAlertInfo: true })
        }
    }

    formCarTour() {
        return (
            <View style={styles.borderBot}>

                <View style={{ flexDirection: 'row', borderColor: '#e8e8e8', borderTopWidth: 0.0, justifyContent: 'center', alignItems: 'center', height: 40 }}>
                    <Image
                        style={{ height: 30, width: 24, marginLeft: 8 }}
                        source={require('../../../image/location.png')}
                    />
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}
                        onPress={() => {
                            this.setModalVisible(!this.state.modalListCity);
                        }}
                    >
                        <TextInput
                            style={{ fontSize: 14, }}
                            pointerEvents="none"
                            onTouchStart={() => { this.setModalVisible(!this.state.modalListCity); }}
                            value={this.state.city}
                            placeholder='Chọn khu vực'
                            placeholderTextColor={'#333333'}
                        />
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', height: 40, }}>
                    <TouchableOpacity
                        style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", alignItems: 'center', flexDirection: 'row', }}
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
                            placeholderTextColor={'#333333'}
                            onTouchStart={() => { this.setState({ dialogCalendarVisible: true, nhanxe: true }) }}
                            pointerEvents='none'
                            style={{ fontSize: 14, flex: 1, color: '#000' }}
                            editable={false}
                        />

                    </TouchableOpacity>
                    <View style={{ width: 1, backgroundColor: '#e8e8e8' }}></View>
                    <TouchableOpacity
                        style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", flexDirection: 'row', alignItems: 'center' }}
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
                            placeholderTextColor={'#333333'}
                            onTouchStart={() => { this.setState({ dialogCalendarVisible: true, nhanxe: false }) }}
                            pointerEvents='none'
                            style={{ fontSize: 14, flex: 1, color: '#000' }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ height: 1, backgroundColor: '#e8e8e8', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                </View>
                <ButtonFull
                    onPress={() => { this.gotoListCarTour() }}
                    value={'Xem giá'}
                />
            </View>
        )
    }

    formSwitch() {
        return (
            <View style={[{ backgroundColor: '#fff', height: 48, flexDirection: 'row', marginTop: 8, marginLeft: 8, marginRight: 8 }, styles.borderTop]}>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.hourly ? '#aaaaaa' : '#fff', borderTopLeftRadius: 8 }}
                    onPress={() => this.setState({
                        hourly: false
                    })}
                >
                    <Text style={{ color: this.state.hourly ? '#fff' : '#77a300', fontWeight: 'bold', fontSize: 16 }}>Theo tuyến</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.hourly ? '#fff' : '#aaa', borderTopRightRadius: 8 }}
                    onPress={() => this.setState({
                        hourly: true
                    })}
                >
                    <Text style={{ color: this.state.hourly ? '#77a300' : '#fff', fontWeight: 'bold', fontSize: 16 }}>Theo ngày</Text>
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
                                                    // this.props.addDepartTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`);
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
                                                // this.props.addDepartTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`);
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
                    {/* {this.state.hourly ?
                    <ButtonFull
                        onPress={() => { this.gotoListCarTour() }}
                        value={'Xem giá'}
                    /> :
                    <ButtonFull
                        onPress={() => { this.nextScreen() }}
                        value={'Xem giá'}
                    />} */}
                    {this.renderAlertInfo()}
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


                    {this.formModalListCity()}
                </ImageBackground>
            </SafeAreaView>
        );
    }
    selectedDate() {
        var { rent_date, return_date, selectedHours, selectedHours1, selectedMinutes1, selectedMinutes } = this.state;
        console.log(rent_date);
        console.log(return_date);
        var datePick = new Date(this.state.rent_date).getTime();
        var dateReturn = new Date(this.state.return_date).getTime();
        var Difference_In_Time = dateReturn - datePick
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) + 1;
        console.log('a');
        console.log(rent_date);
        console.log(return_date);
        console.log(datePick);
        console.log(dateReturn);
        console.log(Difference_In_Days);
        if (Difference_In_Days < 1) {
            return true;
        } else if (Difference_In_Days == 1) {
            if (selectedHours > selectedHours1) {
                return true;
            } else if (selectedHours == selectedHours1) {
                if (selectedMinutes >= selectedMinutes1) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    gotoListCarTour() {
        const spesentDay = this.getDateTimeAlive();
        console.log('a')
        console.log(spesentDay)
        console.log('a')
        if (this.state.city == '') {
            this.setState({ showAlertInfo: true })
            return;
        } else if (this.state.rent_date == '' || this.state.return_date == '') {
            this.setState({ showAlertInfo: true })
            return;
        } else if (this.selectedDate()) {
            this.setState({ showAlertTimeDrop: true })
            return;
        } else if (spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
            // console.log(spesentDay)
            if (this.state.hoursAlive > this.state.selectedHours) {
                this.setState({ showAlertTime: true })
            } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                this.setState({ showAlertTime: true })
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
        city: state.info.city,
        rent_date: state.info.rent_date,
        return_date: state.info.return_date,

        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
        component_drop: state.info.component_drop,
        component_pick: state.info.component_pick,
        latitude_pick: state.info.latitude_pick,
        longitude_pick: state.info.longitude_pick,
        latitude_drop: state.info.latitude_drop,
        longitude_drop: state.info.longitude_drop,
        chair: state.info.chair,
    }
}


export default connect(mapStateToProps, { addCityTime: addCityTime, addDepartTime: addDepartTime, swapAddress: swapAddress, addProductChunkType: addProductChunkType })(MapChungXe);
