import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList, ImageBackground } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { connect } from 'react-redux';
import { addDepartTime, addPeople, swapAddress, addDuration, addProductChunkType, addCarType } from '../../../core/Redux/action/Action'
import ImageTextBold from '../../../component/ImageTextDiChung/ImageTextBold'
import {listHour, listChair, listTime} from '../../../component/TimeSelect/listTime'
import Dialog, { } from 'react-native-popup-dialog';
import { HeaderText } from '../../../component/Header'

import { ButtonFull, ButtonDialog } from '../../../component/Button'
import { SafeAreaView } from 'react-navigation';
import FormTaxi from './FormTaxi';
import FormHourlyTaxi from './FormHourlyTaxi';

const imageCheckWhite = '../../../image/checkw.png'
const imageCheck = '../../../image/done.png'
const imageBackground = { uri: 'https://dichung.vn/static/images/e216031ab3feeb651026e80873156f50.png' }

class MapDiChung extends Component {

    constructor() {
        super();
        this.state = {
            selectTaxi: true,
            people: '1',
            selectedHours: 0,
            selectedMinutes: 0,
            dialogCalendarVisible: false,
            dialogTimeVisible: false,
            dialogSelectPeople: false,
            depart_time: '',
            spesentTime: '',
            spesentDay: '',
            hoursAlive: 0,
            minutesAlive: 0,
            modalSelectTime: false,
            modalSelectCar: false,
            selectCar: [],
            duration: 6,
            carType: '',
            listCar: [
                { 'id': 1, 'carname': 'Tất cả loại xe', 'listCarType': '0' },
                { 'id': 2, 'carname': 'Xe 4 chỗ cốp rộng', 'listCarType': '1' },
                { 'id': 3, 'carname': 'Xe 7 chỗ', 'listCarType': '2' },
                { 'id': 4, 'carname': 'Xe 16 chỗ', 'listCarType': '24' },
            ],
            scroll: 48,
            forceRefresh: 1,
            showAlertTime: false,
            showAlertInfo: false,
            date: null,
        }
        this.mapRef = null;
    }

    setModalVisible(visible) {
        this.setState({ modalListCity: visible });
    }

    componentDidMount() {
        this.setState({ depart_time: this.props.depart_time, carType: this.props.carType })
        this.getDateTimeAlive()
        this.setState({
            isShowLocation: true,
            forceRefresh: Math.floor(Math.random() * 100)
        })
    }

    componentWillMount() {
        this.setState({
            isShowLocation: true,
            forceRefresh: Math.floor(Math.random() * 100)
        })
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

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    checkNightBooking() {
        const hours = this.state.selectedHours - this.state.hoursAlive;
        const minutes = this.state.selectedMinutes - this.state.minutesAlive
        if (hours > 3) {
            this.props.navigation.push("ListCar", { datdem: false });
        } else if (hours == 3 && minutes >= 0) {
            this.props.navigation.push("ListCar", { datdem: false });
        } else {
            this.props.navigation.push("ListCar", { datdem: true });
        }
    }

    nextScreen() {
        this.getDateTimeAlive();
        this.props.addProductChunkType('transfer_service')
        if (this.props.pick_add != '' && this.props.drop_add != '' && this.state.depart_time != '') {
            console.log(this.state.spesentDay)
            if (this.state.date) {
                if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                    if (this.state.hoursAlive > this.state.selectedHours) {
                        this.setState({ showAlertTime: true })
                    } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                        this.setState({ showAlertTime: true })
                    } else {
                        this.checkNightBooking()
                    }
                } else {
                    this.props.navigation.push("ListCar", { datdem: false });
                }
            }
            else {
                this.props.navigation.push("ListCar", { datdem: false });
            }
        }
        else {
            this.setState({ showAlertInfo: true })
        }
    }

    renderAlertTime() {
        return (
            <Dialog
                visible={this.state.showAlertTime}
                width={0.8}
            >
                <View>
                    <View style={{ padding: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: '100' }}>Giờ đi phải lớn hơn giờ hiện tại</Text>
                        <ButtonDialog
                            text={'Đồng ý'}
                            onPress={() => {
                                this.setState({ showAlertTime: false, })
                            }}
                        />
                    </View>
                </View>
            </Dialog>
        )
    }

    renderAlertInfo() {
        return (
            <Dialog
                visible={this.state.showAlertInfo}
                width={0.8}
            >
                <View>
                    <View style={{ padding: 8, marginTop: 8, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 16, fontWeight: '100' }}>Vui lòng điền đầy đủ thông tin để xem giá.</Text>
                        <ButtonDialog
                            text={'Đồng ý'}
                            onPress={() => {
                                this.setState({ showAlertInfo: false, })
                            }}
                        />
                    </View>
                </View>
            </Dialog>
        )
    }

    addPeople(people) {
        // const { people } = this.state;
        this.props.addPeople(people);
    }

    renderTaxiAirport() {
        return (
            <View style={styles.borderBot}>
                <FormTaxi
                    onPressPickAddress={this.pressPickAddress}
                    onPressDropAddress={this.pressDropAddress}
                    onPressSwap={this.pressSwap}
                    onPressSelectTime={this.pressSelectTime}
                    onPressSelectSlot={this.pressSelectSlot}
                />
                <ButtonFull
                    onPress={() => { this.nextScreen() }}
                    value={'Xem giá'}
                />
            </View>
        )
    }

    pressPickAddress = () => {
        this.props.navigation.push("SearchPlace", {
            search: 'Pick',
            placeholder: 'Nhập điểm xuất phát',
        });
    }
    pressDropAddress = () => {
        this.props.navigation.push("SearchPlace", {
            search: 'Drop',
            placeholder: 'Nhập điểm đến',
        });
    }
    pressSwap = () => {
        this.props.swapAddress(this.props.drop_add, this.props.component_drop, this.props.latitude_drop, this.props.longitude_drop, this.props.pick_add, this.props.component_pick, this.props.latitude_pick, this.props.longitude_pick);
    }
    pressSelectTime = () => {
        this.setState({
            dialogCalendarVisible: true,
        })
    }
    pressSelectSlot = () => {
        this.setState({
            dialogSelectPeople: true,
        })
    }
    pressCarType = () => {
        this.setState({
            modalSelectCar: true
        })
    }

    pressHourglass = () => {
        this.setState({
            modalSelectTime: true
        })
    }

    modalTime() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.dialogTimeVisible}
                // onOrientationChange={true}
                onRequestClose={() => {
                }}
            >
                <SafeAreaView style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    backgroundColor: '#000000AA',
                    zIndex: 9,
                }}>
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ dialogTimeVisible: false, })}
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
                            initialScrollIndex={this.state.scroll - 1}
                            getItemLayout={this.getItemLayout}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', height: 40 }}
                                    onPress={() => {
                                        var isDayAlight = this.state.spesentDay == this.state.date.format('DD-MM-YYYY');
                                        var timeClicker = ((item.hour == this.state.hoursAlive && item.minute > this.state.minutesAlive) || item.hour > this.state.hoursAlive);

                                        if (isDayAlight) {
                                            if (timeClicker) {
                                                this.setState({
                                                    selectedHours: item.hour,
                                                    selectedMinutes: item.minute,
                                                    scroll: item.id,
                                                    dialogTimeVisible: false,
                                                    dialogCalendarVisible: false,
                                                    depart_time: `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`
                                                })
                                                this.props.addDepartTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`, `${this.state.date.format('YYYY-MM-DD')}T${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute}:00.000`);
                                            }
                                        } else {
                                            this.setState({
                                                selectedHours: item.hour,
                                                selectedMinutes: item.minute,
                                                scroll: item.id,
                                                dialogTimeVisible: false,
                                                dialogCalendarVisible: false,
                                                depart_time: `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`
                                            })
                                            this.props.addDepartTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`, `${this.state.date.format('YYYY-MM-DD')}T${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute}:00.000`);
                                        }
                                    }}
                                >
                                    <Text style={{ textAlign: 'center', fontSize: 16, flex: 1, padding: 8, backgroundColor: (item.hour == this.state.selectedHours && item.minute == this.state.selectedMinutes) ? '#77a300' : '#fff', color: (this.state.spesentDay == this.state.date.format('DD-MM-YYYY') && ((item.hour == this.state.hoursAlive && item.minute < this.state.minutesAlive) || item.hour < this.state.hoursAlive)) ? '#aaa' : item.hour == this.state.selectedHours && item.minute == this.state.selectedMinutes ? '#fff' : '#000000' }}>{item.hour < 10 ? '0' + item.hour : item.hour}: {item.minute == 0 ? '00' : item.minute}</Text>
                                </TouchableOpacity>}
                            scrollToIndex={this.state.scroll}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }

    renderTour() {
        return (
            <View style={styles.borderBot}>
                <FormHourlyTaxi
                    onPressPickAddress={this.pressPickAddress}
                    onPressSelectTime={this.pressSelectTime}
                    onPressCarType={this.pressCarType}
                    onPressHourglass={this.pressHourglass}
                />
                <ButtonFull
                    onPress={() => { this.gotoListCarHourlyBooking() }}
                    value={'Xem giá'}
                />
            </View>
        )
    }

    formSwitch() {
        return (
            <View style={[{ flexDirection: 'row', height: 48, backgroundColor: '#fff', marginHorizontal: 8, marginTop: 8 }, styles.borderTop]}>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.selectTaxi ? '#fff' : '#aaa', borderTopStartRadius: 8 }}
                    onPress={() => {
                        this.setState({
                            selectTaxi: true,
                        })
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: this.state.selectTaxi ? '#77a300' : '#fff' }}>Sân bay, Đường dài</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.selectTaxi ? '#aaa' : '#fff', borderTopEndRadius: 8 }}
                    onPress={() => {
                        this.setState({
                            selectTaxi: false,
                        })
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: this.state.selectTaxi ? '#fff' : '#77a300' }}>Thuê xe tour</Text>
                </TouchableOpacity>
            </View>
        )
    }

    getItemLayout = (data, index) => (
        { length: 40, offset: 40 * index, index }
    )

    gotoListCarHourlyBooking() {
        this.props.addProductChunkType('hourly_rent_taxi')
        if (this.props.pick_add != '' && this.state.carType != '' && this.state.depart_time != '') {
            if (this.state.date) {
                if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                    if (this.state.hoursAlive > this.state.selectedHours) {
                        this.setState({ showAlertTime: true })
                    } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                        this.setState({ showAlertTime: true })
                    } else {
                        //sang màn danh sách xe
                        this.props.navigation.navigate("ListCar", {
                            'listCarType': this.state.selectCar,
                        });
                    }
                } else {
                    //sang màn danh sách xe
                    this.props.navigation.navigate("ListCar", {
                        'listCarType': this.state.selectCar,
                    });
                }
            }
            else {
                this.props.navigation.navigate("ListCar", {
                    'listCarType': this.state.selectCar,
                })
            }
        } else {
            this.setState({ showAlertInfo: true })
        }
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const minDate = new Date();

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderText textCenter={'Đặt xe taxi'} onPressLeft={this.goBack} />
                <ImageBackground style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }} source={imageBackground} >
                    <View style={{ justifyContent: 'center', paddingHorizontal: 16 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 21, marginTop: 8, color: '#efefef' }}>Thoải mái như xe nhà</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 21, marginTop: 8, color: '#efefef' }}>Giá rẻ như xe khách</Text>
                    </View>
                    <View style={[{ flex: 1, }]} >
                        {this.formSwitch()}
                        {this.state.selectTaxi ? this.renderTaxiAirport() : this.renderTour()}
                        {/*  */}
                        <View style={{ justifyContent: 'center', paddingLeft: 16, marginTop: 16 }}>
                            <ImageTextBold source={require(imageCheckWhite)} textBold={"An toàn, đúng giờ"} />
                            <ImageTextBold source={require(imageCheckWhite)} textBold={"Giá trọn gói không phí ẩn"} />
                            <ImageTextBold source={require(imageCheckWhite)} textBold={"Miễn phí thay đổi thông tin"} />
                        </View>
                    </View>
                    {this.renderAlertTime()}
                    {this.renderAlertInfo()}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.dialogCalendarVisible}
                        // onOrientationChange={true}
                        onRequestClose={() => {
                            console.log('a');
                        }}>
                        <SafeAreaView style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                        }}>
                            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: "center" }}>
                                <View style={{ flexDirection: 'row', margin: 16 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Chọn thời gian đi</Text>
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
                                    // todayBackgroundColor="#00363d"
                                    selectedDayColor="#77a300"
                                    selectedDayTextColor="#FFFFFF"
                                    dayShape='cicle'

                                    onDateChange={(date) => {
                                        console.log('date: ....' + date)
                                        this.setState({
                                            date: date,
                                            dialogTimeVisible: true,
                                            // dialogCalendarVisible: false,
                                        })
                                    }}

                                />
                            </View>
                            {/* <View style={{ flex: 1 }}>
                            {this.state.dialogTimeVisible ? this.renderTimePick1() : <View></View>}
                        </View> */}
                            {this.modalTime()}

                        </SafeAreaView>
                    </Modal>


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.dialogSelectPeople}
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
                                    onPress={() => this.setState({ dialogSelectPeople: !this.state.dialogSelectPeople })}
                                    style={{ flex: 1 }}
                                ></TouchableOpacity>
                            </View>

                            <FlatList
                                style={{ flex: 1, backgroundColor: '#ffffff' }}
                                data={listChair}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            this.setState({
                                                people: item.chair,
                                                dialogSelectPeople: false,
                                            })
                                            this.addPeople(item.chair)
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, flex: 1, padding: 8, color: item.chair == this.props.chair ? '#77a300' : '#000000' }}>{item.chair} người</Text>
                                        {item.chair == this.props.chair ? <Image
                                            style={{ height: 24, width: 24, marginLeft: 8 }}
                                            source={require(imageCheck)}
                                        /> : null}
                                    </TouchableOpacity>}
                                keyExtractor={item => item.chair}
                            />
                        </SafeAreaView>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalSelectTime}
                        // onOrientationChange={true}
                        onRequestClose={() => {
                            console.log('a');
                        }}>
                        <SafeAreaView style={{
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
                                data={listTime}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            this.setState({
                                                duration: item.time,
                                                modalSelectTime: false,
                                            })
                                            this.props.addDuration(item.time);
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, flex: 1, padding: 8, color: item.time === this.state.duration ? '#77a300' : '#000000' }}>{item.time} giờ</Text>
                                        {item.time === this.state.duration ? <Image
                                            style={{ height: 24, width: 24, marginLeft: 8 }}
                                            source={require(imageCheck)}
                                        /> : null}
                                    </TouchableOpacity>}
                                keyExtractor={item => item.time}
                            />

                        </SafeAreaView>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalSelectCar}
                        // onOrientationChange={true}
                        onRequestClose={() => {
                            console.log('a');
                        }}
                    >
                        <SafeAreaView style={{
                            flex: 2,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                        }}>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ modalSelectCar: false })}
                                    style={{ flex: 1 }}
                                ></TouchableOpacity>
                            </View>
                            <FlatList
                                style={{ flex: 1, backgroundColor: '#ffffff' }}
                                data={this.state.listCar}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            this.setState({
                                                carType: item.carname,
                                                selectCar: item.listCarType,
                                                modalSelectCar: false,
                                            })
                                            this.props.addCarType(item.carname, item.listCarType)
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, flex: 1, padding: 8, color: item.carname === this.state.carType ? '#77a300' : '#000000' }}>{item.carname}</Text>
                                        {item.carname === this.state.carType ? <Image
                                            style={{ height: 24, width: 24, marginLeft: 8 }}
                                            source={require(imageCheck)}
                                        /> : null}
                                    </TouchableOpacity>}
                                keyExtractor={item => item.carname}
                            />

                        </SafeAreaView>
                    </Modal>

                </ImageBackground>
                {/* </View> */}

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 180,
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
        paddingLeft: 8,
        paddingRight: 8,
        marginHorizontal: 8,
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8
    },
    borderTop: {
        borderTopEndRadius: 8,
        borderTopStartRadius: 8
    }
});

function mapStateToProps(state) {
    return {
        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
        component_drop: state.info.component_drop,
        component_pick: state.info.component_pick,
        latitude_pick: state.info.latitude_pick,
        longitude_pick: state.info.longitude_pick,
        latitude_drop: state.info.latitude_drop,
        longitude_drop: state.info.longitude_drop,
        chair: state.info.chair,
        CarType: state.info.CarType,
        depart_time: state.info.depart_time,
    }
}


export default connect(mapStateToProps, { addDepartTime: addDepartTime, addPeople: addPeople, swapAddress: swapAddress, addDuration: addDuration, addProductChunkType: addProductChunkType, addCarType: addCarType })(MapDiChung)
