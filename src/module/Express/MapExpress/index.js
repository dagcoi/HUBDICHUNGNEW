import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Calendar from '../../../component/Calendar'
import TimePicker from './TimePicker'
import { connect } from 'react-redux';
import { addDepartTimeVanChuyen, addPeopleVanChuyen, swapAddressVanChuyen, addDurationVanChuyen } from '../../../core/Redux/action/Action'
import AmountOfPracel from './AmountOfPracel'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung'
import * as key from '../../../component/KeyGG'
import { ButtonFull, ButtonDialog } from '../../../component/Button'
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';

import MapViewDirections from 'react-native-maps-directions';
import { TextInput } from 'react-native-gesture-handler';
import listHour from '../../../component/TimeSelect/listTime'
import ScrollPicker from 'react-native-picker-scrollview';

const origin = { latitude: 21.2187149, longitude: 105.80417090000003 };
// const destination = { latitude: 21.0019302, longitude: 105.85090579999996 };
const GOOGLE_MAPS_APIKEY = key.KEY_GOOGLE;

const imageLocation = '../../../image/location.png'
const imageDrop = '../../../image/drop.png'
const imageSwap = '../../../image/swap.png'
const imageTime = '../../../image/time.png'
const imageParcel = '../../../image/parcel.png'
const imageHourglass = '../../../image/hourglass.png'
const imageCheck = '../../../image/done.png'
const imageDown = '../../../image/arrowdown.png'


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
            listTime: [
                { 'id': 1, 'time': 2 },
                { 'id': 2, 'time': 4 },
                { 'id': 3, 'time': 6 },
                { 'id': 4, 'time': 8 },
                { 'id': 5, 'time': 10 },
                { 'id': 6, 'time': 12 },
            ],
            listChair: [
                { 'id': 1, 'chair': '1' },
                { 'id': 2, 'chair': '2' },
                { 'id': 3, 'chair': '3' },
                { 'id': 4, 'chair': '4' },
                { 'id': 5, 'chair': '5' },
                { 'id': 6, 'chair': '6' },
                { 'id': 7, 'chair': '7' },
                { 'id': 8, 'chair': '8' },
                { 'id': 9, 'chair': '9' },
                { 'id': 10, 'chair': '10' },
                { 'id': 11, 'chair': '11' },
                { 'id': 12, 'chair': '12' },
                { 'id': 13, 'chair': '13' },
                { 'id': 14, 'chair': '14' },
                { 'id': 15, 'chair': '15' },
                { 'id': 16, 'chair': '16' },
            ],
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
                ref={(ref) => { this.mapRef = ref }}
                provider={PROVIDER_GOOGLE}
                onMapReady={() => {
                    this.mapRef.fitToSuppliedMarkers(['mk1', 'mk2'], {
                        edgePadding:
                        {
                            top: 300,
                            right: 50,
                            bottom: 50,
                            left: 50
                        }
                    })
                    this.mapRef.fitToElements(true)
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: this.props.lattitude_pick,
                        longitude: this.props.lngtitude_pick,
                    }}
                    title={"Điểm nhận hàng"}
                    description={this.props.pick_add}
                    identifier={'mk1'}
                />

                <MapView.Marker
                    coordinate={{
                        latitude: this.props.lattitude_drop,
                        longitude: this.props.lngtitude_drop,
                    }}
                    title={"Điểm trả hàng"}
                    description={this.props.drop_add}
                    identifier={'mk2'}
                />

                <MapViewDirections
                    origin={{ latitude: this.props.lattitude_pick, longitude: this.props.lngtitude_pick }}
                    destination={{ latitude: this.props.lattitude_drop, longitude: this.props.lngtitude_drop }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={5}
                    strokeColor="#669df6"
                    onReady={() => {
                        this.mapRef.fitToSuppliedMarkers(['mk1', 'mk2'], {
                            edgePadding:
                            {
                                top: 300,
                                right: 50,
                                bottom: 50,
                                left: 50
                            }
                        })
                        this.mapRef.fitToElements(true)
                    }}
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
            if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                if (this.state.hoursAlive > this.state.selectedHours) {
                    this.setState({ alertTimeSent: true })
                } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                    this.setState({ alertTimeSent: true })
                } else {
                    this.props.navigation.push("ListDriverExpress", { datdem: false });
                }
            } else {
                console.log('datdem : false')
                this.props.navigation.push("ListDriverExpress", { datdem: false });
            }
        }
        else {
            this.setState({ alertInfo: true })
        }
    }

    nextScreenHourly() {
        this.getDateTimeAlive.bind(this);
        if (this.props.pick_add != '' && this.state.depart_time != '' && this.state.city_name != '') {
            if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                if (this.state.hoursAlive > this.state.selectedHours) {
                    this.setState({ alertTimeRent: true })
                } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                    this.setState({ alertTimeRent: true })
                } else {
                    this.props.navigation.push("ListFreightTruck");
                }
            } else {
                this.props.navigation.push("ListFreightTruck");
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
            // footer={
            //     <DialogFooter>
            //         <DialogButton
            //             text="Đồng ý"
            //             onPress={() => {
            //                 this.setState({
            //                     alertInfo: false,
            //                     alertTimeRent: false,
            //                     alertTimeSent: false,
            //                 })
            //             }}
            //         />
            //     </DialogFooter>
            // }
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

    addPeopleVanChuyen(people) {
        // const { people } = this.state;
        this.props.addPeopleVanChuyen(people);
    }

    renderFormExpressTheoTuyen() {
        return (
            <View style={styles.borderBot}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ height: 30, width: 24, marginLeft: 8 }}
                        source={require(imageLocation)}
                    />
                    <TouchableOpacity
                        style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', }}
                        onPress={() => {
                            this.props.navigation.push("SearchPlaceExpress", {
                                search: 'Pick',
                                placeholder: 'Điểm nhận hàng'
                            });
                        }}
                    >
                        <TextInput
                            editable={false}
                            onTouchStart={() => this.props.navigation.push("SearchPlaceExpress", {
                                search: 'Pick',
                                placeholder: 'Điểm nhận hàng'
                            })
                            }
                            style={{ fontSize: 14, height: 40, color: "#00363d" }}
                            pointerEvents="none"
                            value={this.props.pick_add}
                            placeholder='Điểm nhận hàng'
                            selection={{ start: 0, end: 0 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.borderInput}>
                    <View style={{ flex: 1, flexDirection: 'row', borderColor: '#e8e8e8', borderRightWidth: 0.1, justifyContent: 'center', alignItems: 'center', }}>
                        <Image
                            style={{ height: 30, width: 24, marginLeft: 8, alignItems: 'center', justifyContent: 'center' }}
                            source={require(imageDrop)}
                        />
                        <TouchableOpacity
                            style={{ flex: 1, height: 40 }}
                            onPress={() => {
                                this.props.navigation.push("SearchPlaceExpress", {
                                    search: 'Drop',
                                    placeholder: 'Điểm giao hàng'
                                });
                            }}
                        >
                            <TextInput
                                editable={false}
                                onTouchStart={() => this.props.navigation.push("SearchPlaceExpress", {
                                    search: 'Drop',
                                    placeholder: 'Điểm giao hàng'
                                })
                                }
                                style={{ fontSize: 14, height: 40, color: "#00363d" }}
                                pointerEvents="none"
                                value={this.props.drop_add}
                                placeholder='Điểm giao hàng'
                                selection={{ start: 0, end: 0 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{ borderLeftWidth: 1, borderColor: '#e8e8e8' }}
                        onPress={() => {
                            this.props.swapAddressVanChuyen(this.props.drop_add, this.props.component_drop, this.props.lattitude_drop, this.props.lngtitude_drop, this.props.pick_add, this.props.component_pick, this.props.lattitude_pick, this.props.lngtitude_pick);
                        }}
                    >
                        <Image
                            style={{ height: 24, width: 24, margin: 8 }}
                            source={require(imageSwap)}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', height: 40, }}>
                    <TouchableOpacity
                        style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", alignItems: 'center', flexDirection: 'row', }}
                        onPress={() => {
                            this.setState({
                                dialogCalendarVisible: true,
                            })
                        }}
                    >
                        <Image
                            style={{ height: 24, width: 24, margin: 8 }}
                            source={require(imageTime)}
                        />

                        <TextInput
                            editable={false}
                            value={this.state.date ? `${this.state.date.format('DD-MM-YYYY')}  ${this.state.selectedHours} : ${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes}` : ""}
                            placeholder='Chọn giờ gửi hàng'
                            onTouchStart={() => { this.setState({ dialogCalendarVisible: true }) }}
                            pointerEvents='none'
                            style={{ fontSize: 14, height: 40, color: "#00363d", flex: 1 }}
                        />

                    </TouchableOpacity>

                    <View style={{ width: 1, backgroundColor: '#e8e8e8' }}></View>
                    <TouchableOpacity
                        style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => {
                            this.setState({
                                dialogSelectPeople: true,
                            })
                        }}
                    >
                        <Image
                            style={{ height: 24, width: 24, margin: 8 }}
                            source={require(imageParcel)}
                        />
                        <Text style={{ flex: 1 }}>{this.props.chair} gói</Text>
                        <Image
                            style={{ height: 24, width: 24, margin: 8 }}
                            source={require(imageDown)}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ height: 1, backgroundColor: '#e8e8e8', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
        )
    }

    renderFormExpressTheoGio() {
        return (
            <View style={styles.borderBot}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ height: 30, width: 24, marginLeft: 8 }}
                        source={require(imageLocation)}
                    />
                    <TouchableOpacity
                        style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', }}
                        onPress={() => {
                            this.props.navigation.push("SearchPlaceExpress", {
                                search: 'Pick',
                                placeholder: 'Điểm nhận hàng'
                            });
                        }}
                    >
                        <TextInput
                            editable={false}
                            onTouchStart={() => this.props.navigation.push("SearchPlaceExpress", {
                                search: 'Pick',
                                placeholder: 'Điểm nhận hàng'
                            })
                            }
                            style={{ fontSize: 14, height: 40, color: "#00363d" }}
                            pointerEvents="none"
                            value={this.props.pick_add}
                            placeholder='Điểm nhận hàng'
                            selection={{ start: 0, end: 0 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40, flexDirection: 'row', }}>
                    <View style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', }}>
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
                {/* </View> */}
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
                    <Text style={{ color: this.state.hourlyBooking ? '#fff' : '#77a300', fontWeight: 'bold', fontSize: 20 }}>Vận chuyển hàng</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ backgroundColor: this.state.hourlyBooking ? '#fff' : '#aaa', flex: 1, height: 48, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 8 }}
                    onPress={() => {
                        this.setState({
                            hourlyBooking: true,
                        })
                    }}
                >
                    <Text style={{ color: this.state.hourlyBooking ? '#77a300' : '#fff', fontWeight: 'bold', fontSize: 20 }}>Thuê xe tải</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const minDate = new Date();

        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>

                {this.renderPicktoDrop()}
                {this.renderSelect()}
                {this.state.hourlyBooking ? this.renderFormExpressTheoGio() : this.renderFormExpressTheoTuyen()}
                {this.state.hourlyBooking ?
                    <ButtonFull
                        onPress={() => { this.nextScreenHourly() }}
                        value={'Xem giá'}
                    /> :
                    <ButtonFull
                        onPress={() => { this.nextScreen() }}
                        value={'Xem giá'}
                    />
                }
                {this.renderAlertInfo()}
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
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#77a300', margin: 16 }}>Chọn thời gian gửi</Text>
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
                        <View style={{ flex: 1, }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ dialogTimeVisible: !this.state.dialogTimeVisible })}
                                style={{ flex: 1 }}
                            ></TouchableOpacity>
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
                                                this.props.addDepartTimeVanChuyen(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`);
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
                                            this.props.addDepartTimeVanChuyen(`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minute == 0 ? '00' : item.minute} ${this.state.date.format('DD/MM/YYYY')}`);
                                        }
                                    }}
                                >
                                    <Text style={{ textAlign: 'center', fontSize: 18, flex: 1, padding: 8, backgroundColor: (item.hour == this.state.selectedHours && item.minute == this.state.selectedMinutes) ? '#77a300' : '#fff', color: (this.state.spesentDay == this.state.date.format('DD-MM-YYYY') && ((item.hour == this.state.hoursAlive && item.minute < this.state.minutesAlive) || item.hour < this.state.hoursAlive)) ? '#aaa' : item.hour == this.state.selectedHours && item.minute == this.state.selectedMinutes ? '#fff' : '#000000' }}>{item.hour < 10 ? '0' + item.hour : item.hour} : {item.minute == 0 ? '00' : item.minute}</Text>
                                </TouchableOpacity>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.dialogSelectPeople}
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
                                onPress={() => this.setState({ dialogSelectPeople: !this.state.dialogSelectPeople })}
                                style={{ flex: 1 }}
                            ></TouchableOpacity>
                        </View>

                        <FlatList
                            style={{ flex: 1, backgroundColor: '#ffffff' }}
                            data={this.state.listChair}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent : 'center', alignItems : 'center' }}
                                    onPress={() => {
                                        this.setState({
                                            people: item.chair,
                                            dialogSelectPeople: false,
                                        })
                                        this.addPeopleVanChuyen(item.chair)
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
                                    style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent : 'center', alignItems : 'center' }}
                                    onPress={() => {
                                        this.setState({
                                            duration: item.time,
                                            modalSelectTime: false,
                                        })
                                        this.props.addDurationVanChuyen(item.time);
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

                    </View>
                </Modal>
            </View>
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
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        paddingLeft: 8,
        paddingRight: 8
    },
    borderTop: {
        borderTopEndRadius: 8,
        borderTopStartRadius: 8
    }
});

function mapStateToProps(state) {
    return {
        drop_add: state.rdVanChuyen.drop_add,
        pick_add: state.rdVanChuyen.pick_add,
        component_drop: state.rdVanChuyen.component_drop,
        component_pick: state.rdVanChuyen.component_pick,
        lattitude_pick: state.rdVanChuyen.lattitude_pick,
        lngtitude_pick: state.rdVanChuyen.lngtitude_pick,
        lattitude_drop: state.rdVanChuyen.lattitude_drop,
        lngtitude_drop: state.rdVanChuyen.lngtitude_drop,
        chair: state.rdVanChuyen.chair,
    }
}


export default connect(mapStateToProps, { addDepartTimeVanChuyen: addDepartTimeVanChuyen, addPeopleVanChuyen: addPeopleVanChuyen, swapAddressVanChuyen: swapAddressVanChuyen, addDurationVanChuyen: addDurationVanChuyen })(MapExpress)
