import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, Button, Modal } from 'react-native'
import styles from '../../style'
import { listHour } from '../../../../component/TimeSelect/listTime'
import CalendarPicker from 'react-native-calendar-picker'
import ImageInputTextDiChung from '../../../../component/ImageInputTextDiChung'
import { HeaderText } from '../../../../component/Header'
import { showModalOperator, showModalTimePick, showModalTimeDrop, showModalConfirm, addListDayOfWeek, addSendDataOperator, addDepartTime, showModalVehicle, showModalSlot } from '../../../../core/Redux/action/Action'
import { connect } from 'react-redux'
import { ButtonFull } from '../../../../component/Button'
import { FormSelectCar, InputImage, ModalConfirm, ModalListCar, ModalListTime, TimePickDrop, FormSelectVehicleSlot, ModalVehicle, ModalSlot } from '../../Form'
import Toast from 'react-native-simple-toast';
import { SvgCheckSuccess, SvgClock, SvgMoney, SvgPeople, SvgPick, SvgTitle, SvgVehicle } from '../../../../icons'

const imageLocation = '../../../../image/location.png'

class OperatorTransferService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: false,
            carNameDetail: '',
            money: '0',
            timePick: '',
            timeDrop: '',
            listDayOfWeek: [
                { 'id': 0, 'DayOfWeek': 'CN' },
                { 'id': 1, 'DayOfWeek': 'T2' },
                { 'id': 2, 'DayOfWeek': 'T3' },
                { 'id': 3, 'DayOfWeek': 'T4' },
                { 'id': 4, 'DayOfWeek': 'T5' },
                { 'id': 5, 'DayOfWeek': 'T6' },
                { 'id': 6, 'DayOfWeek': 'T7' },
            ],
            listDaySelect: [],
            slot: '',
            moneyNoFormat: null,
            dialogCalendarVisible: false,
            dialogTimeVisible: false,
            hoursAlive: 0,
            minutesAlive: 0,
        }
    }

    componentDidMount() {
        console.log(this.props.listDaySelect)
        this.setState({ listDaySelect: this.props.listDaySelect ?? [] })
        this.getDateTimeAlive()
    }

    pressSelectTime = () => {
        this.setState({
            dialogCalendarVisible: true,
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

    goBack = () => {
        this.props.navigation.goBack()
    }

    handleChange(num) {
        let money = Number(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        this.setState({
            money, moneyNoFormat: num
        });
    };

    onPressItemDay(item) {
        const array = [...this.state.listDaySelect]
        const index = array.indexOf(item.id)
        var list
        console.log(array)
        if (index < 0) {
            list = array.concat(item.id)
            this.setState({ listDaySelect: list })
        }
        else {
            list = this.remove(array, item.id)
            this.setState({ listDaySelect: list })
        }
        this.props.addListDayOfWeek(list.sort((a, b) => a - b))
    }

    remove(array, element) {
        return array.filter(el => el !== element);
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderText textCenter={'Cho thuê dịch vụ'} onPressLeft={this.goBack} />
                <View style={{ padding: 8 }}>
                    <View style={[styles.borderTop, { height: 40, backgroundColor: '#77a300' }]}>
                        <TouchableOpacity style={[this.state.select ? styles.selectSwitch : styles.normalSwitch, { borderTopLeftRadius: 8 }]}
                            onPress={() => { this.setState({ select: false }) }}
                        >
                            <Text style={this.state.select ? styles.textSwitch : styles.textSwitchSelect}>Cho thuê xe có lái</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[this.state.select ? styles.normalSwitch : styles.selectSwitch, { borderTopRightRadius: 8 }]}
                            onPress={() => { this.setState({ select: true }) }}
                        >
                            <Text style={this.state.select ? styles.textSwitchSelect : styles.textSwitch}>Chia sẻ chỗ trống</Text>
                        </TouchableOpacity>
                    </View>
                    {!this.state.select ? this.formTransfer() : this.formRideShare()}
                    <View>
                        {/* <SvgComponent />
                        <SvgBulletPoints  color={'#77a300'}/>
                        <SvgVehicle color={'#00363d'} /> */}
                        {/* <Text>abc</Text> */}
                    </View>
                    <ModalListCar />
                    <ModalListTime />
                    <ModalConfirm />
                </View>
            </SafeAreaView >
        )
    }

    formRideShare() {
        const minDate = new Date();
        return (
            <View style={styles.borderBottom}>
                <ImageInputTextDiChung
                    children={<SvgPick />}
                    value={this.props.pickAddress}
                    placeholder={'Nhập điểm đón'}
                    onPress={this.pressPickAddress}
                    source={require(imageLocation)}
                />

                <ImageInputTextDiChung
                    children={<SvgPick color={'#eb6752'} />}
                    value={this.props.dropAddress}
                    placeholder={'Nhập điểm trả'}
                    onPress={this.pressDropAddress}
                    source={require(imageLocation)}
                />
                <ImageInputTextDiChung
                    children={<SvgClock />}
                    widthHeightImage={24}
                    onPress={this.pressSelectTime}
                    // source={require(imageTime)}
                    placeholder={'Chọn giờ đi'}
                    value={this.props.depart_time}
                />
                <ImageInputTextDiChung
                    children={<SvgCheckSuccess />}
                    placeholder={'Hình thức chấp nhận'}
                    value={this.props.itemConfirm?.label}
                    onPress={this.showModalConfirmSelect}
                />
                <FormSelectVehicleSlot
                    onPress={this.showModalVehicle}
                    placeholder={'Chọn phương tiện'}
                    value={this.props.itemVehicle?.label}
                    onPress2={this.showModalSlot}
                    placeholder2={'Chọn số chỗ'}
                    children={<SvgVehicle />}
                    children2={<SvgPeople />}
                    value2={this.props.itemSlot ? this.props.itemSlot.label + ' Chỗ' : ''}
                />
                <ModalVehicle />
                <ModalSlot />

                <ButtonFull value={'Tiếp tục'} onPress={this.pressConfirmRideShare} />
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
                                selectedDayColor="#77a300"
                                selectedDayTextColor="#FFFFFF"
                                dayShape='cicle'

                                onDateChange={(date) => {
                                    console.log('date: ....' + date)
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
            </View>
        )
    }

    formTransfer() {
        return (
            <View style={styles.borderBottom}>
                <ImageInputTextDiChung
                    children={<SvgPick />}
                    value={this.props.pickAddress}
                    placeholder={'Nhập điểm đón'}
                    onPress={this.pressPickAddress}
                    source={require(imageLocation)}
                />

                <ImageInputTextDiChung
                    children={<SvgPick />}
                    value={this.props.dropAddress}
                    placeholder={'Nhập điểm trả'}
                    onPress={this.pressDropAddress}
                    source={require(imageLocation)}
                />
                <FormSelectCar
                    children={<SvgVehicle />}
                    placeholder={'Loại xe'}
                    value={this.props.itemCarOperator?.label}
                    onPress={this.showModalOperator}
                    children2={<SvgPeople />}
                    placeholder2={'số chỗ'}
                    onChangText={(text) => { this.setState({ slot: text }) }}
                />
                <InputImage
                    children={<SvgTitle />}
                    value={this.state.carNameDetail}
                    onChangeText={(text) => { this.setState({ carNameDetail: text }) }}
                    placeholder={'Tên xe'}
                />
                <TimePickDrop
                    onPress={this.showModalPick}
                    value={this.props.timePick}
                    placeholder={'Giờ bắt đầu'}
                    onPress2={this.showModalDrop}
                    value2={this.props.timeDrop}
                    placeholder2={'Giờ ngưng nhận'}
                />
                <View style={styles.listDayOfWeek}>
                    <FlatList
                        horizontal
                        style={{ flex: 1 }}
                        data={this.state.listDayOfWeek}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.dayOfWeek, { backgroundColor: this.state.listDaySelect?.indexOf(item.id) > -1 ? '#77a300' : '#fff' }]}
                                    onPress={() => this.onPressItemDay(item)}
                                >
                                    <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '400', color: this.state.listDaySelect?.indexOf(item.id) > -1 ? '#fff' : '#77a300' }}>{item.DayOfWeek}</Text>
                                </TouchableOpacity>

                            )
                        }}
                    />
                </View>
                <ImageInputTextDiChung
                    children={<SvgCheckSuccess />}
                    placeholder={'Hình thức chấp nhận'}
                    value={this.props.itemConfirm?.label}
                    onPress={this.showModalConfirmSelect}
                />
                <InputImage
                    children={<SvgMoney />}
                    maxLength={12}
                    value={this.state.money}
                    onChangeText={(text) => this.handleChange(text.replace(new RegExp(/,/gi), ''))}
                    placeholder={'Giá tiền'}
                    keyboardType={'decimal-pad'}
                />
                <ButtonFull value={'Tiếp tục'} onPress={this.pressConfirm} />
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

    pressConfirmRideShare = () => {
        if (!this.props.pickAddress) {
            Toast.show('Vui lòng nhập điểm xuất phát', Toast.SHORT);
        } else if (!this.props.dropAddress) {
            Toast.show('Vui lòng nhập điểm đến', Toast.SHORT);
        } else if (!this.props.depart_time) {
            Toast.show('Vui lòng chọn thời gian đi', Toast.SHORT);
        } else if (!this.props.itemConfirm) {
            Toast.show('Vui lòng chọn hình thức nhận chuyến', Toast.SHORT);
            // } else if (this.state.money < 1) {
            //     Toast.show('Vui lòng nhập giá tiền', Toast.SHORT);
        } else {
            this.props.navigation.navigate('ConfirmRideShare')
        }
    }

    pressConfirm = () => {
        if (!this.props.pickAddress) {
            Toast.show('Vui lòng nhập điểm xuất phát', Toast.SHORT);
        } else if (!this.props.dropAddress) {
            Toast.show('Vui lòng nhập điểm đến', Toast.SHORT);
        } else if (!this.props.itemCarOperator) {
            Toast.show('Vui lòng chọn loại phương tiện', Toast.SHORT);
        } else if (this.state.slot < 1) {
            Toast.show('Vui lòng nhập số chỗ', Toast.SHORT);
        } else if (this.state.carNameDetail == '') {
            Toast.show('Vui lòng nhập tên phương tiện', Toast.SHORT);
        } else if (this.props.timePick == '') {
            Toast.show('Vui lòng chọn thời gian bắt đầu nhận', Toast.SHORT);
        } else if (this.props.timeDrop == '') {
            Toast.show('Vui lòng chọn thời gian ngừng nhận', Toast.SHORT);
        } else if (this.props.listDaySelect.length < 1) {
            Toast.show('Vui lòng chọn ngày hoạt động', Toast.SHORT);
        } else if (!this.props.itemConfirm) {
            Toast.show('Vui lòng chọn hình thức nhận chuyến', Toast.SHORT);
        } else if (this.state.money < 1) {
            Toast.show('Vui lòng nhập giá tiền', Toast.SHORT);
        } else {
            this.addDataSend()
        }
    }

    addDataSend = async () => {
        var send = {}
        send.autoAccept = this.props.itemConfirm?.value
        send.startPlace = this.props.componentPick
        send.endPlace = this.props.componentDrop
        send.schedule = {
            'applyWeekdays': this.props.listDaySelect,
            'startTimeString': this.props.timePick,
            'endTimeString': this.props.timeDrop,
        }
        send.slot = this.state.slot
        send.type = 'transfer_service'
        send.vehicleName = this.state.carNameDetail,
            send.vehicleType = this.props.itemCarOperator?.value
        send.note = ''
        send.price = this.state.moneyNoFormat
        console.log(JSON.stringify(send))
        this.props.addSendDataOperator(send)
        this.props.navigation.navigate('Confirm')
    }
    showModalSlot = () => {
        this.props.itemVehicle.label == 'Xe máy' ? Toast.show('Xe máy không chọn được chỗ', Toast.SHORT) : this.props.showModalSlot(true)
    }
    showModalVehicle = () => { this.props.showModalVehicle(true) }
    showModalOperator = () => { this.props.showModalOperator(true) }
    showModalConfirmSelect = () => { this.props.showModalConfirm(true) }
    showModalPick = () => { this.props.showModalTimePick(true) }
    showModalDrop = () => { this.props.showModalTimeDrop(true) }
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

}


function mapStateToProps(state) {
    return {
        modalCarType: state.rdOperator.modalCarType,
        itemCarOperator: state.rdOperator.itemCarOperator,
        itemVehicle: state.rdOperator.itemVehicle,
        timePick: state.rdOperator.timePick,
        timeDrop: state.rdOperator.timeDrop,
        pickAddress: state.info.pick_add,
        dropAddress: state.info.drop_add,
        componentPick: state.info.component_pick,
        componentDrop: state.info.component_drop,
        itemConfirm: state.rdOperator.itemConfirm,
        listDayOfWeek: state.rdOperator.listDayOfWeek,
        listDaySelect: state.rdOperator.listDaySelect,
        depart_time: state.info.depart_time,
        itemSlot: state.rdOperator.itemSlot,

    }
}

export default connect(mapStateToProps, {
    showModalOperator: showModalOperator,
    showModalTimePick: showModalTimePick,
    showModalTimeDrop: showModalTimeDrop,
    showModalConfirm: showModalConfirm,
    addListDayOfWeek: addListDayOfWeek,
    addSendDataOperator: addSendDataOperator,
    addDepartTime: addDepartTime,
    showModalVehicle: showModalVehicle,
    showModalSlot: showModalSlot,
})(OperatorTransferService);