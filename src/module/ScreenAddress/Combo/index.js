import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList, ImageBackground } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { connect } from 'react-redux';
import { addDepartTime, swapAddress, addDuration } from '../../../core/Redux/action/Action'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung'
import ImageTextBold from '../../../component/ImageTextDiChung/ImageTextBold'
import { listHour, listTime } from '../../../component/TimeSelect/listTime'
import { HeaderText } from '../../../component/Header'
import { FormSwitch, Warning, DropAddress } from '../Util'
import { ButtonFull } from '../../../component/Button'
import { SafeAreaView } from 'react-navigation';
import { SvgCar, SvgClock, SvgDuration, SvgPick } from '../../../icons';
import { imageBackground } from '../../../image/imageLink'

const imageLocation = '../../../image/location.png'
const imageCheckWhite = '../../../image/checkw.png'
const imageTime = '../../../image/time.png'
const imageHourglass = '../../../image/hourglass.png'
const imageCar = '../../../image/iconcar.png'
const imageCheck = '../../../image/done.png'

class MapCombo extends Component {

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
            duration: 24,
            day: 1,
            carType: '',
            listCar: [
                { 'id': 1, 'carname': 'Tất cả loại xe', 'listCarType': '1,2,17,24' },
                { 'id': 2, 'carname': 'Xe 4 chỗ cốp rộng', 'listCarType': '1' },
                { 'id': 3, 'carname': 'Xe 7 chỗ', 'listCarType': '2' },
                { 'id': 4, 'carname': 'Xe 16 chỗ', 'listCarType': '24' },
            ],
            scroll: 48,
        }
        this.mapRef = null;
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

    nextScreen() {
        this.getDateTimeAlive();
        if (this.props.pick_add != '' && this.props.drop_add != '' && this.state.depart_time != '') {
            console.log(this.state.spesentDay)
            console.log(this.state.date.format('DD-MM-YYYY'))
            if (this.state.date) {
                if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                    if (this.state.hoursAlive > this.state.selectedHours) {
                        this.ToastTime()
                    } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                        this.ToastTime()
                    }
                } else {
                    console.log('datdem: false')
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

    renderPickAddress() {
        return (
            <ImageInputTextDiChung
                children={<SvgPick />}
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

    renderHourglass() {
        return (
            <ImageInputTextDiChung
                children={<SvgDuration />}
                onPress={() => {
                    this.setState({
                        modalSelectTime: true
                    })
                }}
                source={require(imageHourglass)}
                placeholder={'Chọn số giờ'}
                value={this.state.day + ' ngày'}
                imageRight={true}
            />
        )
    }

    renderCarType() {
        return (
            <ImageInputTextDiChung
                children={<SvgCar />}
                onPress={() => {
                    this.setState({
                        modalSelectCar: true
                    })
                }}
                source={require(imageCar)}
                placeholder={'Chọn loại xe'}
                value={this.state.carType}
                imageRight={true}
            />
        )
    }

    renderTimePick() {
        return (
            <View style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", alignItems: 'center', flexDirection: 'row', }}
            >
                <ImageInputTextDiChung
                    children={<SvgClock />}
                    widthHeightImage={24}
                    onPress={() => {
                        this.setState({
                            dialogCalendarVisible: true,
                        })
                    }}
                    source={require(imageTime)}
                    placeholder={'Chọn giờ đi'}
                    // value={this.state.date ? `${this.state.date.format('DD-MM-YYYY')}  ${this.state.selectedHours}: ${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes}` : ""}
                    value={this.state.depart_time}
                />
            </View>
        )
    }

    dropAddress() {
        return (
            <DropAddress
                value={this.props.drop_add}
                placeholder='Nhập điểm đến'
                onPressInput={() => {
                    this.props.navigation.push("SearchPlace", {
                        search: 'Drop',
                        placeholder: 'Nhập điểm đến'
                    });
                }}
                onPressSwap={() => {
                    this.props.swapAddress(this.props.drop_add, this.props.component_drop, this.props.latitude_drop, this.props.longitude_drop, this.props.typesDrop, this.props.pick_add, this.props.component_pick, this.props.latitude_pick, this.props.longitude_pick, this.props.typesPick);
                }}
            />
        )
    }

    renderTravel() {
        return (
            <View style={styles.borderBot}>
                {this.renderPickAddress()}
                {this.dropAddress()}

                <View style={{ flexDirection: 'row', height: 40, }}>
                    {this.renderTimePick()}
                </View>

                <ButtonFull
                    onPress={() => { this.nextScreen() }}
                    value={'TIẾP TỤC'}
                />

                <View style={{ height: 1, backgroundColor: '#e8e8e8', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                </View>

            </View>
        )
    }

    modalTime() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.dialogTimeVisible}
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
                {this.renderPickAddress()}
                <View style={{ height: 40, flexDirection: 'row', }}>
                    {this.renderTimePick()}
                </View>
                <View style={{ height: 40, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#e8e8e8', }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        {this.renderHourglass()}
                    </View>
                </View>
                <ButtonFull
                    onPress={() => { this.gotoListCarHourlyBooking() }}
                    value={'TIẾP TỤC'}
                />
                <View style={{ height: 1, backgroundColor: '#e8e8e8', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
        )
    }

    formSwitch() {
        return (
            <FormSwitch
                onPressLeft={() => {
                    this.setState({
                        selectTaxi: true,
                    })
                }}
                onPressRight={() => {
                    this.setState({
                        selectTaxi: false,
                    })
                }}
                textLeft={'Thuê theo chuyến'}
                textRight={'Thuê theo ngày'}
                select={this.state.selectTaxi}
            />
        )
    }

    getItemLayout = (data, index) => (
        { length: 40, offset: 40 * index, index }
    )

    gotoListCarHourlyBooking() {
        if (this.props.pick_add != '' && this.state.carType != '' && this.state.depart_time != '') {
            if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                if (this.state.hoursAlive > this.state.selectedHours) {
                    this.ToastTime()
                } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                    this.ToastTime()
                } else {
                    this.props.navigation.navigate("ListCarHourlyBooking", {
                        'listCarType': this.state.selectCar,
                    });
                }
            } else {
                this.props.navigation.navigate("ListCarHourlyBooking", {
                    'listCarType': this.state.selectCar,
                });
            }
        } else {
            this.ToastInfo()
        }
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const minDate = new Date();

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderText textCenter={'Đặt xe du lịch'} onPressLeft={this.goBack} />
                <ImageBackground style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }} source={imageBackground} >
                    <View style={{ justifyContent: 'center', paddingHorizontal: 16 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 21, marginVertical: 8, color: '#efefef' }}>Thuê xe du lịch</Text>
                    </View>
                    <View style={[{ flex: 1, }]} >
                        {this.formSwitch()}
                        {this.state.selectTaxi ? this.renderTravel() : this.renderTour()}
                        <View style={{ justifyContent: 'center', paddingLeft: 16, marginTop: 16 }}>
                            <ImageTextBold source={require(imageCheckWhite)} textBold={"Chưa dùng."} />
                            <ImageTextBold source={require(imageCheckWhite)} textBold={"Tiết kiệm thời gian"} />
                            <ImageTextBold source={require(imageCheckWhite)} textBold={"Cam kết giá tốt"} />
                        </View>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.dialogCalendarVisible}
                        onRequestClose={() => {
                            console.log('a');
                        }}>
                        <SafeAreaView style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                        }}>
                            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: "center" }}>
                                <View style={{ flexDirection: 'row', margin: 16, alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => { this.setState({ dialogCalendarVisible: false }) }}
                                    >
                                        <Image
                                            style={{ width: 20, height: 20, margin: 8 }}
                                            source={require('../../../image/cancel.png')}
                                        />
                                    </TouchableOpacity>
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
                                        this.setState({
                                            date: date,
                                            dialogTimeVisible: true,
                                        })
                                    }}

                                />
                            </View>

                            {this.modalTime()}

                        </SafeAreaView>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalSelectTime}
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
                                                day: item.id,
                                                modalSelectTime: false,
                                            })
                                            this.props.addDuration(item.time);
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, flex: 1, padding: 8, color: item.time === this.state.duration ? '#77a300' : '#000000' }}>{item.id} ngày</Text>
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
                                        onPress={() => this.setState({
                                            carType: item.carname,
                                            selectCar: item.listCarType,
                                            modalSelectCar: false,
                                        })}
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
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
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
        typesPick: state.info.typesPick,
        typesDrop: state.info.typesDrop,
    }
}


export default connect(mapStateToProps, { addDepartTime: addDepartTime, swapAddress: swapAddress, addDuration: addDuration })(MapCombo)
