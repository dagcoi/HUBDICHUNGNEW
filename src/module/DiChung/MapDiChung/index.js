import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import CalendarPicker from 'react-native-calendar-picker';
import { connect } from 'react-redux';
import { addDepartTime, addPeople, swapAddress, addDuration } from '../../../core/Redux/action/Action'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung'
import * as key from '../../../component/KeyGG'
import listHour from '../../../component/TimeSelect/listTime'
import AwesomeAlert from 'react-native-awesome-alerts'
import Dialog, { DialogFooter, DialogContent, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import PopUp from '../../../component/PopUp'
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../../../component/AndroidBackButton'

import MapViewDirections from 'react-native-maps-directions';
import { TextInput } from 'react-native-gesture-handler';
import { ButtonFull, ButtonDialog } from '../../../component/Button'
import { SafeAreaView } from 'react-navigation';

const origin = { latitude: 21.2187149, longitude: 105.80417090000003 };
// const destination = { latitude: 21.0019302, longitude: 105.85090579999996 };
const GOOGLE_MAPS_APIKEY = key.KEY_GOOGLE;
const imageLocation = '../../../image/location.png'
const imageDrop = '../../../image/drop.png'
const imageSwap = '../../../image/swap.png'
const imagePeople = '../../../image/people.png'
const imageTime = '../../../image/time.png'
const imageCancel = '../../../image/cancel.png'
const imageHourglass = '../../../image/hourglass.png'
const imageCar = '../../../image/iconcar.png'
const imageDown = '../../../image/arrowdown.png'
const imageCheck = '../../../image/done.png'

class MapDiChung extends Component {

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
            dialogSelectPeople: false,
            depart_time: '',
            dateTimeSelect: '',
            spesentTime: '',
            spesentDay: '',
            hoursAlive: 0,
            minutesAlive: 0,
            selectedStartDate: null,
            modalSelectTime: false,
            modalSelectCar: false,
            selectCar: [],
            duration: 6,
            carType: '',
            listTime: [
                { 'id': 1, 'time': 2 },
                { 'id': 2, 'time': 4 },
                { 'id': 3, 'time': 6 },
                { 'id': 4, 'time': 8 },
                { 'id': 5, 'time': 10 },
                { 'id': 6, 'time': 12 },
            ],
            listCar: [
                { 'id': 1, 'carname': 'Tất cả loại xe', 'listCarType': '1,2,17,24' },
                { 'id': 2, 'carname': 'Xe 4 chỗ cốp rộng', 'listCarType': '1' },
                { 'id': 3, 'carname': 'Xe 7 chỗ', 'listCarType': '2' },
                { 'id': 4, 'carname': 'Xe 16 chỗ', 'listCarType': '24' },
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
            forceRefresh: 1,
            showAlertTime: false,
            showAlertInfo: false,
        }
        this.mapRef = null;
    }

    setModalVisible(visible) {
        this.setState({ modalListCity: visible });
    }

    componentDidMount() {
        this.getDateTimeAlive()
        this.setState({
            isShowLocation: true,
            forceRefresh: Math.floor(Math.random() * 100)
        })
        // handleAndroidBackButton(this.goBack)
    }

    // goBack = () => {
    //     this.props.navigation.pop()
    // }

    // componentWillUnmount() {
    //     removeAndroidBackButtonHandler();
    // }

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

    renderPicktoDrop() {

        // if (this.props.drop_add == '' || this.props.pick_add == '') {
        //     return (
        //         <MapView style={styles.container}
        //             provider={PROVIDER_GOOGLE}
        //             initialRegion={{
        //                 latitude: this.props.pick_add == '' ? origin.latitude : parseFloat(this.props.lattitude_pick),
        //                 longitude: this.props.pick_add == '' ? origin.longitude : parseFloat(this.props.lngtitude_pick),
        //                 latitudeDelta: 2.0,
        //                 longitudeDelta: 0.1,
        //             }}
        //         ></MapView>
        //     );
        // }
        // return (
        //     <MapView style={styles.container}
        //         key={this.state.forceRefresh}
        //         ref={(ref) => { this.mapRef = ref }}
        //         provider={PROVIDER_GOOGLE}
        //         // initialCamera={{
        //         //     center: {
        //         //         latitude: (this.props.lattitude_pick + this.props.lattitude_drop) / 2,
        //         //         longitude: (this.props.lngtitude_pick + this.props.lngtitude_drop) / 2,
        //         //     },
        //         //     pitch: 1,
        //         //     heading: 1,
        //         //     zoom: 12,
        //         //     altitude: 1,
        //         // }}

        //         onMapReady={() => {
        //             this.mapRef.fitToSuppliedMarkers(['mk1', 'mk2'], {
        //                 edgePadding:
        //                 {
        //                     top: 300,
        //                     right: 100,
        //                     bottom: 100,
        //                     left: 100
        //                 }
        //             })
        //             this.mapRef.fitToElements(true);
        //         }}
        //     >
        //         <MapView.Marker
        //             coordinate={{
        //                 latitude: this.props.lattitude_pick,
        //                 longitude: this.props.lngtitude_pick,
        //             }}
        //             title={"Điểm đón"}
        //             description={this.props.pick_add}
        //             identifier={'mk1'}
        //         />

        //         <MapView.Marker
        //             coordinate={{
        //                 latitude: this.props.lattitude_drop,
        //                 longitude: this.props.lngtitude_drop,
        //             }}
        //             title={"Điểm trả"}
        //             description={this.props.drop_add}
        //             identifier={'mk2'}
        //         />

        //         <MapViewDirections
        //             origin={{ latitude: this.props.lattitude_pick, longitude: this.props.lngtitude_pick }}
        //             destination={{ latitude: this.props.lattitude_drop, longitude: this.props.lngtitude_drop }}
        //             apikey={GOOGLE_MAPS_APIKEY}
        //             strokeWidth={5}
        //             strokeColor="#669df6"
        //             resetOnChange={true}
        //             onReady={result => {
        //                 this.mapRef.fitToSuppliedMarkers(['mk1', 'mk2'], {
        //                     edgePadding:
        //                     {
        //                         top: 300,
        //                         right: 100,
        //                         bottom: 100,
        //                         left: 100
        //                     }
        //                 })
        //                 this.mapRef.fitToElements(true);
        //             }}
        //         />
        //     </MapView>
        // );
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
            console.log('datdem: false1')
            this.props.navigation.push("ListCar", { datdem: false });
        } else if (hours == 3 && minutes >= 0) {
            console.log('datdem: false2')
            this.props.navigation.push("ListCar", { datdem: false });
        } else {
            console.log('datdem: true')
            this.props.navigation.push("ListCar", { datdem: true });
        }
    }

    nextScreen() {
        this.getDateTimeAlive();
        if (this.props.pick_add != '' && this.props.drop_add != '' && this.state.depart_time != '') {
            console.log(this.state.spesentDay)
            console.log(this.state.date.format('DD-MM-YYYY'))
            if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                if (this.state.hoursAlive > this.state.selectedHours) {
                    this.setState({ showAlertTime: true })
                } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                    this.setState({ showAlertTime: true })
                } else {
                    this.checkNightBooking()
                }
            } else {
                console.log('datdem: false')
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
            // footer={
            //     <DialogFooter>
            //         <DialogButton
            //             text="Đồng ý"
            //             onPress={() => {
            //                 this.setState({ showAlertTime: false, })
            //             }}
            //         />
            //     </DialogFooter>
            // }
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
            // footer={
            //     // <DialogFooter>
            //     //     <DialogButton
            //     //         text="Đồng ý"
            //     //         onPress={() => {
            //     //             this.setState({ showAlertInfo: false, })
            //     //         }}
            //     //     />
            //     // </DialogFooter>
            //     <View>
            //         <View style={{ padding: 8, justifyContent: 'center', alignItems: 'center' }}>
            //             <ButtonDialog
            //                 text={'Đồng ý'}
            //                 onPress={() => {
            //                     this.setState({ showAlertInfo: false, })
            //                 }}
            //             />
            //         </View>
            //     </View>
            // }
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
            // <View style={{ flexDirection: 'row', borderColor: '#e8e8e8', borderTopWidth: 0, justifyContent: 'center', alignItems: 'center' }}>
            //     <Image
            //         style={{ height: 30, width: 24, marginLeft: 8 }}
            //         source={require(imageLocation)}
            //     />
            //     <TouchableOpacity
            //         style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', }}
            //         onPress={() => {
            //             this.props.navigation.push("SearchPlace", {
            //                 search: 'Pick',
            //                 placeholder: 'Nhập điểm xuất phát',
            //             });
            //         }}
            //     >
            //         <TextInput
            //             editable={false}
            //             onTouchStart={() => this.props.navigation.push("SearchPlace", {
            //                 search: 'Pick',
            //                 placeholder: 'Nhập điểm xuất phát'
            //             })
            //             }
            //             style={{ fontSize: 14, height: 40, color: "#00363d" }}
            //             pointerEvents="none"
            //             value={this.props.pick_add}
            //             placeholder='Nhập điểm xuất phát'
            //             selection={{ start: 0, end: 0 }}
            //         />
            //     </TouchableOpacity>
            // </View>
        )
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
                placeholder={'Chọn số giờ'}
                value={this.state.duration + ' giờ'}
                imageRight={true}
            />
        )
    }

    renderCarType() {
        return (
            <ImageInputTextDiChung
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
            // <TouchableOpacity
            //     style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", alignItems: 'center', flexDirection: 'row', }}
            //     onPress={() => {
            //         this.setState({
            //             dialogCalendarVisible: true,
            //         })
            //     }}
            // >
            //     <Image
            //         style={{ height: 24, width: 24, marginLeft: 8 }}
            //         source={require(imageTime)}
            //     />

            //     <TextInput
            //         editable={false}
            //         value={this.state.date ? `${this.state.date.format('DD-MM-YYYY')}  ${this.state.selectedHours}: ${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes}` : ""}
            //         placeholder='Chọn giờ đi'
            //         onTouchStart={() => { this.setState({ dialogCalendarVisible: true }) }}
            //         pointerEvents='none'
            //         style={{ fontSize: 14, height: 40, color: "#00363d", flex: 1 }}
            //     />

            // </TouchableOpacity>
            <View style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", alignItems: 'center', flexDirection: 'row', }}
            >
                <ImageInputTextDiChung
                    widthHeightImage={24}
                    onPress={() => {
                        this.setState({
                            dialogCalendarVisible: true,
                        })
                    }}
                    source={require(imageTime)}
                    placeholder={'Chọn giờ đi'}
                    value={this.state.date ? `${this.state.date.format('DD-MM-YYYY')}  ${this.state.selectedHours}: ${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes}` : ""}
                />
            </View>
        )
    }

    renderTaxiAirport() {
        return (
            <View style={styles.borderBot}>
                {this.renderPickAddress()}

                <View style={{ flexDirection: 'row', borderColor: '#e8e8e8', borderTopWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', borderColor: '#e8e8e8', borderRightWidth: 0.0, justifyContent: 'center', alignItems: 'center', }}>
                        <Image
                            style={{ height: 28, width: 28, marginLeft: 4, alignItems: 'center', justifyContent: 'center' }}
                            source={require(imageLocation)}
                        />
                        <TouchableOpacity
                            style={{ flex: 1, height: 40, marginLeft: -4 }}
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
                                style={{ fontSize: 14, height: 40, color: "#00363d" }}
                                pointerEvents="none"
                                value={this.props.drop_add}
                                placeholder='Nhập điểm đến'
                                selection={{ start: 0, end: 0 }}
                                placeholderTextColor={'#333333'}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={{ borderLeftWidth: 1, borderColor: '#e8e8e8' }}
                        onPress={() => {
                            this.props.swapAddress(this.props.drop_add, this.props.component_drop, this.props.lattitude_drop, this.props.lngtitude_drop, this.props.pick_add, this.props.component_pick, this.props.lattitude_pick, this.props.lngtitude_pick);
                        }}
                    >
                        <Image
                            style={{ height: 24, width: 24, margin: 8 }}
                            source={require(imageSwap)}
                        />
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', height: 40, }}>
                    {this.renderTimePick()}
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
                            source={require(imagePeople)}
                        />
                        <Text style={{ flex: 1 }}>{this.props.chair} người</Text>
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
                    <View style={{ width: 1, backgroundColor: '#e8e8e8' }}></View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        {this.renderCarType()}
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: '#e8e8e8', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
        )
    }

    formSwitch() {
        return (
            <View style={[{ flexDirection: 'row', height: 48, backgroundColor: '#fff', marginLeft: 8, marginRight: 8 }, styles.borderTop]}>
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
        if (this.props.pick_add != '' && this.state.carType != '' && this.state.depart_time != '') {
            if (this.state.spesentDay == `${this.state.date.format('DD-MM-YYYY')}`) {
                if (this.state.hoursAlive > this.state.selectedHours) {
                    this.setState({ showAlertTime: true })
                } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                    this.setState({ showAlertTime: true })
                } else {
                    //sang màn danh sách xe
                    this.props.navigation.navigate("ListCarHourlyBooking", {
                        'listCarType': this.state.selectCar,
                    });
                }
            } else {
                //sang màn danh sách xe
                this.props.navigation.navigate("ListCarHourlyBooking", {
                    'listCarType': this.state.selectCar,
                });
            }
        } else {
            this.setState({ showAlertInfo: true })
        }
    }

    renderTimePick1() {
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
    }

    render() {
        const minDate = new Date();

        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 48, backgroundColor: '#eee', justifyContent: 'center', paddingLeft: 16 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bạn sẽ đi đâu hôm nay?</Text>
                </View>
                <View style={[{ flex: 1, backgroundColor: '#eee' }]}>
                    {this.renderPicktoDrop()}
                    {this.formSwitch()}
                    {this.state.selectTaxi ? this.renderTaxiAirport() : this.renderTour()}
                    {this.state.selectTaxi ?
                        <ButtonFull
                            onPress={() => { this.nextScreen() }}
                            value={'Xem giá'}
                        /> :
                        <ButtonFull
                            onPress={() => { this.gotoListCarHourlyBooking() }}
                            value={'Xem giá'}
                        />
                    }
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
                                {/* <TouchableOpacity
                                    onPress={() => this.setState({
                                        dialogCalendarVisible: false
                                    })}
                                >
                                    <Image
                                        style={{ width: 30, height: 30, }}
                                        source={require(imageCancel)}
                                    />
                                </TouchableOpacity> */}
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
                        {this.state.dialogTimeVisible ? this.renderTimePick1() : null}

                    </SafeAreaView>
                </Modal>

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
                        backgroundColor: '#000000AA',
                        zIndex: 9,
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
                            data={this.state.listChair}
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
                            data={this.state.listTime}
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
                    }}>
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


                {/* </View> */}

            </View>
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
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0
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
        lattitude_pick: state.info.lattitude_pick,
        lngtitude_pick: state.info.lngtitude_pick,
        lattitude_drop: state.info.lattitude_drop,
        lngtitude_drop: state.info.lngtitude_drop,
        chair: state.info.chair,
    }
}


export default connect(mapStateToProps, { addDepartTime: addDepartTime, addPeople: addPeople, swapAddress: swapAddress, addDuration: addDuration })(MapDiChung)
