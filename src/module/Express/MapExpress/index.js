import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import Calendar from '../../../component/Calendar'
import { connect } from 'react-redux';
import { addDepartTime, addPeople, swapAddress, addDuration, addProductChunkType, addCarType } from '../../../core/Redux/action/Action'
import { ButtonFull, ButtonDialog } from '../../../component/Button'
import Dialog, { } from 'react-native-popup-dialog';
import ImageTextBold from '../../../component/ImageTextDiChung/ImageTextBold'
import { DropAddress } from '../../ScreenAddress/Util/index'
import { TextInput } from 'react-native-gesture-handler';
import { listChair, listHour, listTime } from '../../../component/TimeSelect/listTime'
import { HeaderText } from '../../../component/Header';
import FormExpress from './FormExpress';

// const destination = { latitude: 21.0019302, longitude: 105.85090579999996 };

const imageLocation = '../../../image/location.png'
const imageTime = '../../../image/time.png'
const imageHourglass = '../../../image/hourglass.png'
const imageCheck = '../../../image/done.png'
const imageCheckWhite = '../../../image/checkw.png'
const imageDown = '../../../image/arrowdown.png'
const imageBackground = { uri: 'https://dichung.vn/static/images/e216031ab3feeb651026e80873156f50.png' }


class MapExpress extends Component {

    constructor() {
        super();
        this.state = {
            pic_address: '',
            diemdon: '',
            drop_address: '',
            date: '',
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
            alertTimeSent: false,
            alertTimeRent: false,
            alertInfo: false,
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
        this.props.addProductChunkType('express')
        this.props.addCarType('Tất cả loại xe', '0')
        if (this.props.pick_add != '' && this.props.drop_add != '' && this.props.depart_time != '' && this.state.city_name != '') {
            if (this.state.date) {
                if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                    if (this.state.hoursAlive > this.state.selectedHours) {
                        this.setState({ alertTimeSent: true })
                    } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                        this.setState({ alertTimeSent: true })
                    } else {
                        this.props.navigation.push("ListCar");
                    }
                } else {
                    console.log('datdem : false')
                    this.props.navigation.push("ListCar");
                }
            } else {
                this.props.navigation.push("ListCar");
            }
        }
        else {
            this.setState({ alertInfo: true })
        }
    }

    renderAlertInfo() {
        return (
            <Dialog
                visible={this.state.alertInfo || this.state.alertTimeRent || this.state.alertTimeSent}
                width={0.8}
            >
                <View>
                    <View style={{ padding: 8 }}>
                        {this.state.alertInfo ? <Text style={{ fontSize: 16, fontWeight: '100' }}>Vui lòng điền đầy đủ thông tin để xem giá.</Text> : null}
                        {this.state.alertTimeSent ? <Text style={{ fontSize: 16, fontWeight: '100' }}>Giờ gửi hàng phải lớn hơn giờ hiện tại.</Text> : null}
                        {this.state.alertTimeRent ? <Text style={{ fontSize: 16, fontWeight: '100' }}>Giờ thuê phải lớn hơn giờ hiện tại.</Text> : null}

                        <ButtonDialog
                            text="Đồng ý"
                            onPress={() => {
                                this.setState({
                                    alertInfo: false,
                                    alertTimeRent: false,
                                    alertTimeSent: false,
                                })
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
    pressPickAddress = () => {
        this.props.navigation.push("SearchPlace", {
            search: 'Pick',
            placeholder: 'Điểm lấy hàng'
        });
    }
    pressDropAddress = () => {
        this.props.navigation.push("SearchPlace", {
            search: 'Drop',
            placeholder: 'Nhập điểm trả hàng',
        });
    }
    pressSwap = () => {
        this.props.swapAddress(this.props.drop_add, this.props.component_drop, this.props.latitude_drop, this.props.longitude_drop,this.props.typesDrop, this.props.pick_add, this.props.component_pick, this.props.latitude_pick, this.props.longitude_pick, this.props.typesPick);
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

    renderFormExpressTheoTuyen() {
        return (
            <View style={styles.borderBot}>
                <FormExpress
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
                    <Text style={{ color: this.state.hourlyBooking ? '#fff' : '#77a300', fontWeight: 'bold', fontSize: 16 }}>Vận chuyển hàng</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ backgroundColor: this.state.hourlyBooking ? '#fff' : '#aaa', flex: 1, height: 48, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 8 }}
                    onPress={() => {
                        this.setState({
                            hourlyBooking: true,
                        })
                    }}
                >
                    <Text style={{ color: this.state.hourlyBooking ? '#77a300' : '#fff', fontWeight: 'bold', fontSize: 16 }}>Vận chuyển theo giờ</Text>
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
                <HeaderText textCenter={'Thuê vận chuyển'} onPressLeft={this.goBack} />
                <ImageBackground style={{ flex: 1, resizeMode: "cover", }} source={imageBackground} >
                    <View>
                        <Text style={{ fontSize: 21, color: '#ffffff', marginHorizontal: 16, marginTop: 8, fontWeight: 'bold' }}>Chuyển hàng siêu nhanh</Text>
                        <Text style={{ fontSize: 21, color: '#ffffff', marginHorizontal: 16, marginTop: 8, fontWeight: 'bold' }}>Lấy tận nơi giao tận cửa</Text>
                    </View>
                    {this.renderFormExpressTheoTuyen()}
                    <View style={{ justifyContent: 'center', paddingHorizontal: 16 }}>
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"Giao & nhận tận nhà"} />
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"Thời gian giao siêu tốc"} />
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"Đa dạng loại hàng hoá"} />
                    </View>
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
                                            // this.props.addDuration(item.chair);
                                        }}
                                    >
                                        <Text style={{ fontSize: 18, flex: 1, padding: 8, color: item.chair == this.props.chair ? '#77a300' : '#000000' }}>{item.chair} gói</Text>
                                        {item.chair == this.props.chair ? <Image
                                            style={{ height: 24, width: 24, marginLeft: 8 }}
                                            source={require(imageCheck)}
                                        /> : null}
                                    </TouchableOpacity>}
                                keyExtractor={item => item.chair}
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
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        margin: 8,
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
        pick_add_express: state.rdVanChuyen.pick_add,
        typesPick: state.info.typesPick,
        typesDrop: state.info.typesDrop,
        depart_time: state.info.depart_time,
    }
}


export default connect(mapStateToProps, { addDepartTime: addDepartTime, addPeople: addPeople, swapAddress: swapAddress, addDuration: addDuration, addProductChunkType: addProductChunkType, addCarType: addCarType })(MapExpress)
