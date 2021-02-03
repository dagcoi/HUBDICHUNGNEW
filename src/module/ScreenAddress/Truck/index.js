import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import Calendar from '../../../component/Calendar'
import { connect } from 'react-redux';
import { addDepartTime, addPeople, swapAddress, addDuration, addProductChunkType } from '../../../core/Redux/action/Action'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung'
import { ButtonFull, ButtonDialog } from '../../../component/Button'
import Dialog, { } from 'react-native-popup-dialog';
import ImageTextBold from '../../../component/ImageTextDiChung/ImageTextBold'

import { TextInput } from 'react-native-gesture-handler';
import { listHour, listChair, listTime } from '../../../component/TimeSelect/listTime'
import { HeaderText } from '../../../component/Header';
import FormTruckDoor from './FormTruckDoor';
import FormHourlyTruck from './FormHourlyTruck';
import { imageBackground } from '../../../image/imageLink'

// const destination = { latitude: 21.0019302, longitude: 105.85090579999996 };

const imageLocation = '../../../image/location.png'
const imageDrop = '../../../image/drop.png'
const imageSwap = '../../../image/swap.png'
const imageTime = '../../../image/time.png'
const imageParcel = '../../../image/parcel.png'
const imageHourglass = '../../../image/hourglass.png'
const imageCheck = '../../../image/done.png'
const imageCheckWhite = '../../../image/checkw.png'
const imageDown = '../../../image/arrowdown.png'


class MapTruck extends Component {

    constructor() {
        super();
        this.state = {
            pic_address: '',
            diemdon: '',
            drop_address: '',
            date: null,
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
            hourlyBooking: false,
            duration: 6,
            modalSelectTime: false,
            scroll: 48,
            vehicle_id: 0,
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
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    nextScreen() {
        this.getDateTimeAlive.bind(this);
        this.props.addProductChunkType('truck')
        if (this.props.pick_add != '' && this.props.drop_add != '' && this.props.depart_time != '') {
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
                    console.log('datdem : false')
                    this.props.navigation.push("ListCar", { vehicle_id: this.state.vehicle_id });
                }
            } else {
                this.props.navigation.push("ListCar");
            }
        }
        else {
            this.ToastInfo()
        }
    }

    nextScreenHourly() {
        this.getDateTimeAlive.bind(this);
        this.props.addProductChunkType('hourly_freight_truck')
        if (this.props.pick_add != '' && this.props.depart_time != '') {
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

    addPeople(people) {
        // const { people } = this.state;
        this.props.addPeople(people);
    }


    onPressPickAddress = () => {
        this.props.navigation.push("SearchPlace", {
            search: 'Pick',
            placeholder: 'Nhập điểm nhận hàng',
        });
    }

    onPressDropAddress = () => {
        this.props.navigation.push("SearchPlace", {
            search: 'Drop',
            placeholder: 'Nhập điểm trả hàng'
        });
    }

    onPressSwap = () => {
        this.props.swapAddress(this.props.drop_add, this.props.component_drop, this.props.latitude_drop, this.props.longitude_drop, this.props.typesDrop, this.props.pick_add, this.props.component_pick, this.props.latitude_pick, this.props.longitude_pick, this.props.typesPick);
    }

    onPressSelectTime = () => {
        this.setState({
            dialogCalendarVisible: true,
        })
    }
    onPressHourglass = () => {
        this.setState({
            modalSelectTime: true
        })
    }



    renderFormDoorExpress() {
        return (
            <View style={styles.borderBot}>
                <FormTruckDoor
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

    renderFormHourlyExpress() {
        return (
            <View style={styles.borderBot}>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ height: 30, width: 24, marginLeft: 8 }}
                        source={require(imageLocation)}
                    />
                    <TouchableOpacity
                        style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', }}
                        onPress={() => {
                            this.props.navigation.push("SearchPlace", {
                                search: 'Pick',
                                placeholder: 'Điểm nhận hàng'
                            });
                        }}
                    >
                        <TextInput
                            editable={false}
                            onTouchStart={() => this.props.navigation.push("SearchPlace", {
                                search: 'Pick',
                                placeholder: 'Điểm nhận hàng'
                            })
                            }
                            style={{ fontSize: 14, height: 40, color: "#00363d", marginLeft: 8 }}
                            pointerEvents="none"
                            value={this.props.pick_add}
                            placeholder='Điểm nhận hàng'
                            placeholderTextColor={'#e8e8e8'}
                            selection={{ start: 0, end: 0 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40, flexDirection: 'row', }}>
                    <View style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', paddingLeft: 4 }}>
                        <ImageInputTextDiChung
                            widthHeightImage={24}
                            onPress={() => {
                                this.setState({
                                    dialogCalendarVisible: true,
                                })
                            }}
                            placeholder={'Chọn thời gian'}
                            source={require(imageTime)}
                            value={this.state.depart_time}
                        // value={this.state.date ? `${this.state.date.format('DD-MM-YYYY')}  ${this.state.selectedHours} : ${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes}` : ""}
                        />
                    </View>
                    <View style={{ width: 1, backgroundColor: '#e8e8e8' }}></View>
                    <View style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', }}>
                        <ImageInputTextDiChung
                            onPress={() => {
                                this.setState({
                                    modalSelectTime: true,
                                })
                            }}
                            placeholder={'Chọn giờ thuê'}
                            source={require(imageHourglass)}
                            value={this.state.duration + ' giờ'}
                            imageRight={true}
                        />
                    </View>
                </View>
                 */}

                <FormHourlyTruck
                    onPressPickAddress={this.onPressPickAddress}
                    onPressSelectTime={this.onPressSelectTime}
                    onPressHourglass={this.onPressHourglass}
                />

                <ButtonFull
                    onPress={() => { this.nextScreenHourly() }}
                    value={'TIẾP TỤC'}
                />
                <View style={{ height: 1, backgroundColor: '#e8e8e8', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                </View>

            </View>

        )
    }

    getItemLayout = (data, index) => (
        { length: 40, offset: 40 * index, index }
    )

    renderSelect() {
        return (
            <View style={[{ flexDirection: 'row', backgroundColor: '#fff', marginTop: 8, marginLeft: 8, marginRight: 8 }, styles.borderTop]}>
                <TouchableOpacity
                    style={{ backgroundColor: this.state.hourlyBooking ? '#aaa' : '#fff', flex: 1, height: 48, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 8 }}
                    onPress={() => {
                        this.setState({
                            hourlyBooking: false,
                        })
                    }}
                >
                    <Text style={{ color: this.state.hourlyBooking ? '#fff' : '#77a300', fontWeight: 'bold', fontSize: 16 }}>Thuê theo chuyến</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ backgroundColor: this.state.hourlyBooking ? '#fff' : '#aaa', flex: 1, height: 48, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 8 }}
                    onPress={() => {
                        this.setState({
                            hourlyBooking: true,
                        })
                    }}
                >
                    <Text style={{ color: this.state.hourlyBooking ? '#77a300' : '#fff', fontWeight: 'bold', fontSize: 16 }}>Thuê theo giờ</Text>
                </TouchableOpacity>
            </View>
        )
    }

    modalTime() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.dialogTimeVisible}
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
                            onPress={() => this.setState({ dialogTimeVisible: !this.state.dialogTimeVisible })}
                            style={{ flex: 1 }}
                        ></TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                        <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Chọn giờ gửi</Text>
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
                                                // this.props.addDepartTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`);
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
                                            // this.props.addDepartTime(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`);
                                        }
                                    }}
                                >
                                    <Text style={{ textAlign: 'center', fontSize: 18, flex: 1, padding: 8, backgroundColor: (item.hour == this.state.selectedHours && item.minute == this.state.selectedMinutes) ? '#77a300' : '#fff', color: (this.state.spesentDay == this.state.date.format('DD-MM-YYYY') && ((item.hour == this.state.hoursAlive && item.minute < this.state.minutesAlive) || item.hour < this.state.hoursAlive)) ? '#aaa' : item.hour == this.state.selectedHours && item.minute == this.state.selectedMinutes ? '#fff' : '#000000' }}>{item.hour < 10 ? '0' + item.hour : item.hour} : {item.minute == 0 ? '00' : item.minute}</Text>
                                </TouchableOpacity>}
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

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <HeaderText textCenter={'Thuê xe taxi tải'} onPressLeft={this.goBack} />
                <ImageBackground style={{ flex: 1, resizeMode: "cover", }} source={imageBackground} >
                    <View>
                        <Text style={{ fontSize: 21, color: '#ffffff', marginHorizontal: 16, marginTop: 8, fontWeight: 'bold' }}>Bao xe, ghép hàng, tiện chuyến giá đều tốt</Text>
                    </View>
                    {this.renderSelect()}
                    {this.state.hourlyBooking ? this.renderFormHourlyExpress() : this.renderFormDoorExpress()}
                    <View style={{ justifyContent: 'center', paddingHorizontal: 16 }}>
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"Đa dạng lựa chọn"} />
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"Bảo quản an toàn hàng hóa, tài sản"} />
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"ƯU ĐÃI 70% chiều về"} />
                    </View>
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
                                <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 16 }}>Chọn thời gian gửi</Text>
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
                        }}>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ dialogSelectPeople: !this.state.dialogSelectPeople })}
                                    style={{ flex: 1 }}
                                ></TouchableOpacity>
                            </View>

                            <FlatList
                                style={{ flex: 1, backgroundColor: '#ffffff' }}
                                data={this.state.listVehicle}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            this.setState({
                                                people: item.chair,
                                                dialogSelectPeople: false,
                                            })
                                            // this.addPeople(item.chair)
                                            // this.props.addDuration(item.chair);
                                        }}
                                    >
                                        <Text style={{ fontSize: 18, flex: 1, padding: 8, color: item.chair == this.props.chair ? '#77a300' : '#000000' }}>{item.chair}</Text>
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
                                        <Text style={{ fontSize: 18, flex: 1, padding: 8, color: item.time === this.state.duration ? '#77a300' : '#000000' }}>{item.time} giờ</Text>
                                        {item.time == this.state.duration ? <Image
                                            style={{ height: 24, width: 24, marginLeft: 8 }}
                                            source={require(imageCheck)}
                                        /> : null}
                                    </TouchableOpacity>}
                                keyExtractor={item => item.time}
                            />

                        </SafeAreaView>
                    </Modal>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 150,
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
    borderInput: {
        flexDirection: 'row',
        borderColor: '#e8e8e8',
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderBot: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
        marginHorizontal: 8,
        paddingHorizontal: 8,
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


export default connect(mapStateToProps, { addDepartTime: addDepartTime, addPeople: addPeople, swapAddress: swapAddress, addDuration: addDuration, addProductChunkType: addProductChunkType })(MapTruck)
