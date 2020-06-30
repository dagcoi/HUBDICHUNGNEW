import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Calendar from '../../../component/Calendar'
import TimePicker from './TimePicker'
import { connect } from 'react-redux';
import { addDepartTimeTaixe, addPeopleTaixe, swapAddressTaixe, addDurationTaiXe } from '../../../core/Redux/action/Action'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung'
import { ButtonFull, ButtonDialog } from '../../../component/Button'
import MapViewDirections from 'react-native-maps-directions';
import { TextInput } from 'react-native-gesture-handler';
import * as key from '../../../component/KeyGG'
import listHour from '../../../component/TimeSelect/listTime'
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';
import PopUp from '../../../component/PopUp'
import { HeaderText } from '../../../component/Header'
import ImageTextBold from '../../../component/ImageTextDiChung/ImageTextBold'

const origin = { latitude: 21.2187149, longitude: 105.80417090000003 };
// const destination = { latitude: 21.0019302, longitude: 105.85090579999996 };
const GOOGLE_MAPS_APIKEY = key.KEY_GOOGLE;

const imageLocation = '../../../image/location.png'
const imageDrop = '../../../image/location.png'
const imageSwap = '../../../image/swap.png'
const imageTime = '../../../image/time.png'
const imageHourglass = '../../../image/hourglass.png'
const imageCheckWhite = '../../../image/checkw.png'
const imageCheck = '../../../image/done.png'
const imageBackground = { uri: 'https://dichung.vn/static/images/e216031ab3feeb651026e80873156f50.png' }

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
            alertCity: false,
            alertTime: false,
            alertInfo: false,
        }
        this.mapRef = null;
    }

    setModalVisible(visible) {
        this.setState({ modalListCity: visible });
    }

    componentDidMount() {
        this.getDateTimeAlive()
    }

    getItemLayout = (data, index) => (
        { length: 40, offset: 40 * index, index }
    )

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
        if (this.props.pick_add != '' && this.props.drop_add != '' && this.state.depart_time != '' && this.state.city_name != '') {
            if (this.props.pick_add.search(this.state.city_name) < 0 || this.props.drop_add.search(this.state.city_name) < 0) {
                this.setState({ alertCity: true })
            } else {
                console.log(this.state.spesentDay)
                console.log(this.state.date.format('DD-MM-YYYY'))
                if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                    if (this.state.hoursAlive > this.state.selectedHours) {
                        this.setState({ alertTime: true })
                    } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                        this.setState({ alertTime: true })
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
            this.setState({ alertInfo: true })
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
                this.setState({ alertCity: true })
            } else {
                if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                    if (this.state.hoursAlive > this.state.selectedHours) {
                        this.setState({ alertTime: true })
                    } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                        this.setState({ alertTime: true })
                    } else {
                        this.props.navigation.push("ListDriverHourlyBooking");
                    }
                } else {
                    this.props.navigation.push("ListDriverHourlyBooking");
                }
            }
        }
        else {
            this.setState({ alertInfo: true })
        }
    }

    renderAlert() {
        return (
            <Dialog
                visible={this.state.alertCity || this.state.alertInfo || this.state.alertTime}
                width={0.8}
            // dialogTitle={<DialogTitle title='Thông tin chưa đủ' />}
            // footer={
            //     <DialogFooter>
            //         <DialogButton
            //             text="Đồng ý"
            //             onPress={() => {
            //                 this.setState({
            //                     alertCity: false,
            //                     alertInfo: false,
            //                     alertTime: false,
            //                 })
            //             }}
            //         />
            //     </DialogFooter>
            // }
            >
                <View>
                    <View style={{ padding: 8, flexDirection: 'column' }}>
                        {this.state.alertCity ? <Text>Vui lòng nhập đúng địa chỉ trong thành phố.</Text> : null}
                        {this.state.alertInfo ? <Text>Vui lòng nhập đầy đủ thông tin trước khi xem giá.</Text> : null}
                        {this.state.alertTime ? <Text>Thời gian chọn phải lớn hơn thời gian hiện tại.</Text> : null}

                        <ButtonDialog
                            text="Đồng ý"
                            onPress={() => {
                                this.setState({
                                    alertCity: false,
                                    alertInfo: false,
                                    alertTime: false,
                                })
                            }}
                        />
                    </View>
                </View>
            </Dialog>
        )
    }

    renderFormThueTaiTheoGio() {
        return (
            <View style={styles.borderBot}>
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
                            placeholder: 'Nhập điểm nhận xe'
                        });
                    }}
                    placeholder={'Nhập điểm nhận xe'}
                    source={require(imageLocation)}
                    value={this.props.pick_add}
                />

                <ImageInputTextDiChung
                    widthHeightImage={24}
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
                    imageRight={true}
                />
                <View style={{ height: 1, backgroundColor: '#e8e8e8', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                </View>
                <ButtonFull
                    onPress={() => {
                        this.gotoListDriverHourlyBooking();
                    }}
                    value={'Xem giá'}
                />
            </View >
        )
    }

    renderFormThueTai() {
        return (
            <View style={styles.borderBot}>

                <ImageInputTextDiChung
                    onPress={() => { this.setState({ modalCity: true }) }}
                    placeholder={'Chọn tỉnh thành'}
                    source={require(imageLocation)}
                    value={this.state.city_name}
                />

                <ImageInputTextDiChung
                    onPress={() => {
                        this.props.navigation.push("SearchPlaceXeChung", {
                            search: 'Pick',
                            placeholder: 'Nhập điểm nhận xe'
                        });
                    }}
                    placeholder={'Nhập điểm nhận xe'}
                    source={require(imageLocation)}
                    value={this.props.pick_add}
                />

                <ImageInputTextDiChung
                    onPress={() => {
                        this.props.navigation.push("SearchPlaceXeChung", {
                            search: 'Drop',
                            placeholder: 'Nhập điểm đích'
                        });
                    }}
                    placeholder={'Nhập điểm đích'}
                    source={require(imageLocation)}
                    value={this.props.drop_add}
                />

                <ImageInputTextDiChung
                    widthHeightImage={24}
                    onPress={() => {
                        this.setState({
                            dialogCalendarVisible: true,
                        })
                    }}
                    placeholder={'Chọn thời gian'}
                    source={require(imageTime)}
                    value={this.state.date ? `${this.state.date.format('DD-MM-YYYY')}  ${this.state.selectedHours} : ${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes}` : ""}
                />
                <View style={{ height: 1, backgroundColor: '#e8e8e8', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                </View>
                <ButtonFull
                    onPress={() => {
                        this.nextScreen()
                    }}
                    value={'Xem giá'}
                />
            </View>
        )
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    modalSelectTime() {
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
                                                this.props.addDepartTimeTaixe(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`, `${this.state.date.format('YYYY-MM-DD')}T${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute}:00.000`);
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
                                            this.props.addDepartTimeTaixe(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`, `${this.state.date.format('YYYY-MM-DD')}T${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute}:00.000`);
                                        }
                                    }}
                                >
                                    <Text style={{ textAlign: 'center', fontSize: 18, flex: 1, padding: 8, backgroundColor: (item.hour == this.state.selectedHours && item.minute == this.state.selectedMinutes) ? '#77a300' : '#fff', color: (this.state.spesentDay == this.state.date.format('DD-MM-YYYY') && ((item.hour == this.state.hoursAlive && item.minute < this.state.minutesAlive) || item.hour < this.state.hoursAlive)) ? '#aaa' : item.hour == this.state.selectedHours && item.minute == this.state.selectedMinutes ? '#fff' : '#000000' }}>{item.hour < 10 ? '0' + item.hour : item.hour} : {item.minute == 0 ? '00' : item.minute}</Text>
                                </TouchableOpacity>}
                            scrollToIndex={this.state.scroll}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }

    render() {
        const minDate = new Date();

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
                <HeaderText textCenter={'Thuê tài xế'} onPressLeft={this.goBack} />
                <ImageBackground style={{ flex: 1, resizeMode: "cover", }} source={imageBackground} >
                    <View>
                        <Text style={{ fontSize: 21, color: '#ffffff', marginHorizontal: 16, marginTop: 8, fontWeight: 'bold' }}>An toàn, siêu tiện lợi</Text>
                        <Text style={{ fontSize: 21, color: '#ffffff', marginHorizontal: 16, marginTop: 8, fontWeight: 'bold' }}>Việc mất thời gian để chúng tôi lo</Text>
                    </View>

                    <View style={[{ flexDirection: 'row', backgroundColor: '#fff', marginLeft: 8, marginRight: 8, marginTop: 8 }, styles.borderTop]}>
                        <TouchableOpacity
                            style={{ backgroundColor: this.state.hourlyBooking ? '#aaa' : '#fff', flex: 1, height: 48, justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 8 }}
                            onPress={() => {
                                this.setState({
                                    hourlyBooking: false,
                                })
                            }}
                        >
                            <Text style={{ color: this.state.hourlyBooking ? '#fff' : '#77a300', fontWeight: 'bold', fontSize: 16 }}>Đặt tài xế</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ backgroundColor: this.state.hourlyBooking ? '#fff' : '#aaa', flex: 1, height: 48, justifyContent: 'center', alignItems: 'center', borderTopEndRadius: 8 }}
                            onPress={() => {
                                this.setState({
                                    hourlyBooking: true,
                                })
                            }}
                        >
                            <Text style={{ color: this.state.hourlyBooking ? '#77a300' : '#fff', fontWeight: 'bold', fontSize: 16 }}>Theo giờ</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        {this.state.hourlyBooking ? this.renderFormThueTaiTheoGio() : this.renderFormThueTai()}
                    </View>

                    <View style={{ justifyContent: 'center', paddingHorizontal: 16 }}>
                        <ImageTextBold source={require(imageCheckWhite)} textBold ={"Chất lượng tài xế đạt chuẩn"} />
                        <ImageTextBold source={require(imageCheckWhite)} textBold ={"Cam kết giá tốt nhất"} />
                        <ImageTextBold source={require(imageCheckWhite)} textBold ={"Người đồng hành tin cậy"} />
                    </View>

                    {/* {this.state.hourlyBooking ?
                    <ButtonFull
                        onPress={() => {
                            this.gotoListDriverHourlyBooking();
                        }}
                        value={'Xem giá'}
                    /> :
                    <ButtonFull
                        onPress={() => {
                            this.nextScreen()
                        }}
                        value={'Xem giá'}
                    />
                } */}
                    {this.renderAlert()}

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
                                <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 16 }}>Chọn thời gian đi</Text>
                                <Calendar
                                    minDate={minDate}
                                    onDateChange={(date) => {
                                        this.setState({
                                            date: date,
                                            dialogTimeVisible: true,
                                        })
                                    }}
                                />
                                {this.modalSelectTime()}
                            </View>
                        </SafeAreaView>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalCity}
                        // onOrientationChange={true}
                        onRequestClose={() => {
                            console.log('a');
                        }}>
                        <SafeAreaView style={{
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
                                        style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            item.hide == 1 ? console.log(item.city_name) :
                                                this.setState({
                                                    city_name: item.city_name,
                                                    modalCity: false,
                                                })
                                        }}
                                    >
                                        <Text style={item.hide == 1 ? { fontSize: 18, flex: 1, padding: 8, color: '#888' } : { fontSize: 18, flex: 1, padding: 8 }}>{item.city_name}</Text>
                                        {item.chair == this.props.chair ? <Image
                                            style={{ height: 24, width: 24, marginRight: 8 }}
                                            source={require(imageCheck)}
                                        /> : null}
                                    </TouchableOpacity>}
                                keyExtractor={item => item.city_id}
                            />
                        </SafeAreaView>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalListTime}
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
                                    onPress={() => this.setState({ modalListTime: !this.state.modalListTime })}
                                    style={{ flex: 1 }}
                                ></TouchableOpacity>
                            </View>

                            <FlatList
                                style={{ flex: 1, backgroundColor: '#ffffff' }}
                                data={this.state.listTime}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            this.setState({
                                                duration: item.time,
                                                modalListTime: false,
                                            })
                                            this.props.addDurationTaiXe(item.time);
                                        }}
                                    >
                                        <Text style={{ fontSize: 18, flex: 1, padding: 8, color: item.time === this.state.duration ? '#77a300' : '#000000' }}>{item.time} giờ</Text>
                                        {item.time == this.state.duration ? <Image
                                            style={{ height: 24, width: 24, marginLeft: 8 }}
                                            source={require(imageCheck)}
                                        /> : null}
                                    </TouchableOpacity>}
                                keyExtractor={item => item.city_id}
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
        marginTop: 210,
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
        paddingLeft: 8,
        paddingRight: 8,
        marginHorizontal: 8
    },
    borderTop: {
        borderTopEndRadius: 8,
        borderTopStartRadius: 8
    }
});

function mapStateToProps(state) {
    return {
        drop_add: state.rdTaixe.drop_add,
        pick_add: state.rdTaixe.pick_add,
        component_drop: state.rdTaixe.component_drop,
        component_pick: state.rdTaixe.component_pick,
        latitude_pick: state.rdTaixe.latitude_pick,
        longitude_pick: state.rdTaixe.longitude_pick,
        latitude_drop: state.rdTaixe.latitude_drop,
        longitude_drop: state.rdTaixe.longitude_drop,
        chair: state.rdTaixe.chair,
    }
}

export default connect(mapStateToProps, { addDepartTimeTaixe: addDepartTimeTaixe, addPeopleTaixe: addPeopleTaixe, swapAddressTaixe: swapAddressTaixe, addDurationTaiXe: addDurationTaiXe })(MapXeChung)
