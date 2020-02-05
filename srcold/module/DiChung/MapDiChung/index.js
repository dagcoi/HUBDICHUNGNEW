import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { ConfirmDialog } from 'react-native-simple-dialogs';
import CalendarPicker from 'react-native-calendar-picker';
import TimePicker from './TimePicker'
import AmountOfPeople from './AmountOfPeople'
import { connect } from 'react-redux';
import { addDepartTime, addPeople, swapAddress } from '../../../core/Redux/action/Action'

import MapViewDirections from 'react-native-maps-directions';
import { TextInput } from 'react-native-gesture-handler';

const origin = { latitude: 21.2187149, longitude: 105.80417090000003 };
// const destination = { latitude: 21.0019302, longitude: 105.85090579999996 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyDZo1_9CxTewBrzsX7RXFEeyf2J-pIQXYs';

class MapDiChung extends Component {

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
        }
    }

    setModalVisible(visible) {
        this.setState({ modalListCity: visible });
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
                provider={PROVIDER_GOOGLE}
                initialCamera={{
                    center: {
                        latitude: this.props.lattitude_pick,
                        longitude: this.props.lngtitude_pick,
                    },
                    pitch: 1,
                    heading: 1,
                    zoom: 12,
                    altitude: 1,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: this.props.lattitude_pick,
                        longitude: this.props.lngtitude_pick,
                    }}
                    title={"Điểm đón"}
                    description={this.props.pick_add}
                />

                <MapView.Marker
                    coordinate={{
                        latitude: this.props.lattitude_drop,
                        longitude: this.props.lngtitude_drop,
                    }}
                    title={"Điểm trả"}
                    description={this.props.drop_add}
                />

                <MapViewDirections
                    origin={{ latitude: this.props.lattitude_pick, longitude: this.props.lngtitude_pick }}
                    destination={{ latitude: this.props.lattitude_drop, longitude: this.props.lngtitude_drop }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={5}
                    strokeColor="#00363d"
                />

            </MapView>

        );
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
            console.log('datdem : false1')
            this.props.navigation.push("ListCar", { datdem: false });
        } else if (hours == 3 && minutes >= 0) {
            console.log('datdem : false2')
            this.props.navigation.push("ListCar", { datdem: false });
        } else {
            console.log('datdem : true')
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
                    Alert.alert('Giờ đi phải lớn hơn giờ hiện tại')
                } else if ((this.state.hoursAlive == this.state.selectedHours) && (this.state.minutesAlive >= this.state.selectedMinutes)) {
                    Alert.alert('Giờ đi phải lớn hơn giờ hiện tại')
                } else {
                    this.checkNightBooking()
                }

            } else {
                console.log('datdem : false')
                this.props.navigation.push("ListCar", { datdem: false });
            }
        }
        else {
            Alert.alert('Vui lòng điền đầy đủ thông tin để xem giá.')
        }
    }

    addPeople() {
        const { people } = this.state;
        this.props.addPeople(people);
    }

    render() {
        const minDate = new Date();
        const imageLocation = '../../../image/location.png'
        const imageDrop = '../../../image/drop.png'
        const imageSwap = '../../../image/swap.png'
        const imagePeople = '../../../image/people.png'
        const imageTime = '../../../image/time.png'

        return (
            <View style={{ flex: 1, padding: 8 }}>

                {this.renderPicktoDrop()}

                <View style={{ height: 200, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderRadius: 8, }}>
                    <View style={{ flexDirection: 'row', borderColor: '#00363e', borderWidth: 0.5, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ height: 30, width: 24, marginLeft: 8 }}
                            source={require(imageLocation)}
                        />
                        <TouchableOpacity
                            style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', }}
                            onPress={() => {
                                this.props.navigation.push("SearchPlace", {
                                    search: 'Pick'
                                });
                            }}
                        >
                            <TextInput
                                editable={false}
                                onTouchStart={() => this.props.navigation.push("SearchPlace", {
                                    search: 'Pick'
                                })
                                }
                                style={{ fontSize: 14, height: 40, color: "#00363d" }}
                                pointerEvents="none"
                                value={this.props.pick_add}
                                placeholder='Nhập điểm đón'
                            />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', borderColor: '#00363e', borderWidth: 0.5, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 8, }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderColor: '#00363e', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Image
                                style={{ height: 30, width: 24, marginLeft: 8, alignItems: 'center', justifyContent: 'center' }}
                                source={require(imageDrop)}
                            />
                            <TouchableOpacity
                                style={{ flex: 1, height: 40 }}
                                onPress={() => {
                                    this.props.navigation.push("SearchPlace", {
                                        search: 'Drop'
                                    });
                                }}
                            >
                                <TextInput
                                    editable={false}
                                    onTouchStart={() => this.props.navigation.push("SearchPlace", {
                                        search: 'Drop'
                                    })
                                    }
                                    style={{ fontSize: 14, height: 40, color: "#00363d" }}
                                    pointerEvents="none"
                                    value={this.props.drop_add}
                                    placeholder='Nhập điểm trả'
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
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

                    <View style={{ flexDirection: 'row', height: 40, marginTop: 8 }}>
                        <TouchableOpacity
                            style={{ flex: 1, borderRadius: 8, borderWidth: 0.5, justifyContent: "center", alignItems: 'center', flexDirection: 'row', }}
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
                                placeholder='Chọn thời gian'
                                onTouchStart={() => { this.setState({ dialogCalendarVisible: true }) }}
                                pointerEvents='none'
                                style={{ fontSize: 14, height: 40, color: "#00363d", flex: 1 }}
                            />

                        </TouchableOpacity>
                        <View style={{ width: 8 }}></View>
                        <TouchableOpacity
                            style={{ flex: 1, borderRadius: 8, borderWidth: 1, justifyContent: "center", flexDirection: 'row', alignItems: 'center' }}
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
                        </TouchableOpacity>
                    </View>



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
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#77a300', margin: 16 }}>Chọn thời gian đi</Text>
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
                            <View style={{ flex: 2, }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ dialogTimeVisible: !this.state.dialogTimeVisible })}
                                    style={{ flex: 1 }}
                                ></TouchableOpacity>
                            </View>

                            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: "center", padding: 10 }}>
                                <Text style={{ color: '#00363d', fontSize: 18, fontWeight: 'bold' }}>Chọn giờ đi</Text>
                                <TimePicker
                                    selectedHours={this.state.selectedHours}
                                    selectedMinutes={this.state.selectedMinutes}
                                    onChange={(hours, minutes) => {
                                        this.setState({ selectedHours: hours, selectedMinutes: minutes, })
                                    }}
                                />
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                dialogCalendarVisible: false,
                                                dialogTimeVisible: false,
                                                depart_time: `${this.state.selectedHours}:${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes} ${this.state.date.format('DD/MM/YYYY')}`
                                            })
                                            this.props.addDepartTime(`${this.state.selectedHours}:${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes} ${this.state.date.format('DD/MM/YYYY')}`);

                                        }}
                                    >
                                        <Text style={{ textAlign: "right", backgroundColor: "#77a300", color: '#fff', padding: 8, borderRadius: 4, fontSize: 16 }}>Tiếp tục</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                    </Modal>

                    {/* <ConfirmDialog
                        visible={this.state.dialogSelectPeople}
                        title="Chọn số người"
                        positiveButton={{
                            title: "OK",
                            onPress: () => {
                                this.setState({
                                    dialogSelectPeople: false,
                                })
                                this.addPeople();
                            }
                        }}
                    >
                        <View>
                            <AmountOfPeople
                                selectedPeoples={this.state.selectedPeoples}
                                onChange={(people) => {
                                    this.setState({ people: people })
                                }}
                            />
                        </View>
                    </ConfirmDialog> */}

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
                            <View style={{ flex: 2, }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ dialogSelectPeople: !this.state.dialogSelectPeople })}
                                    style={{ flex: 1 }}
                                ></TouchableOpacity>
                            </View>

                            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: "center" }}>
                                <Text style={{ color: '#00363d', fontSize: 18, fontWeight: 'bold' }}>Chọn số người</Text>
                                <AmountOfPeople
                                    selectedPeoples={this.state.selectedPeoples}
                                    onChange={(people) => {
                                        this.setState({ people: people })
                                    }}
                                />
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                dialogSelectPeople: false,
                                            })
                                            this.addPeople();
                                        }}
                                    >
                                        <Text style={{ textAlign: "right", backgroundColor: '#77a300', color: "#fff", padding: 8, borderRadius: 4, fontSize: 16 }}>Tiếp tục</Text>
                                    </TouchableOpacity>
                                </View>
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


export default connect(mapStateToProps, { addDepartTime: addDepartTime, addPeople: addPeople, swapAddress: swapAddress })(MapDiChung)
