import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, Button, ToastAndroid } from 'react-native'
import styles from '../style'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung'
import { HeaderText } from '../../../component/Header'
import ModalListCar from './ModalListCar'
import { showModalOperator, showModalTimePick, showModalTimeDrop, showModalConfirm, addListDayOfWeek, addSendDataOperator } from '../../../core/Redux/action/Action'
import { connect } from 'react-redux'
import InputImage from './InputImage'
import TimePickDrop from './TimePickDrop'
import ModalListTime from './ModalListTime'
import ModalConfirm from './ModalConfirm'
import FormSelectCar from './FormSelectCar'
import { ButtonFull } from '../../../component/Button'
import Toast from 'react-native-simple-toast';
import { SvgCheckSuccess, SvgPick } from '../../../icons'

const imageLocation = '../../../image/location.png'

class RideShare extends Component {

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
        }
    }

    componentDidMount() {
        console.log(this.props.listDaySelect)
        this.setState({ listDaySelect: this.props.listDaySelect ?? [] })
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
        // console.log(item.DayOfWeek)
        // console.log(array)
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
                    <View style={[styles.borderTop, { height: 40, backgroundColor: '#77a' }]}>
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
                    {!this.state.select ?
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
                                placeholder={'Loại xe'}
                                value={this.props.itemCarOperator?.label}
                                onPress={this.showModalOperator}
                                placeholder2={'số chỗ'}
                                onChangText={(text) => { this.setState({ slot: text }) }}
                            />
                            <InputImage value={this.state.carNameDetail} onChangeText={(text) => { this.setState({ carNameDetail: text }) }} placeholder={'Tên xe'} />
                            <TimePickDrop
                                onPress={this.showModalPick}
                                value={this.props.timePick}
                                placeholder={'Bắt đầu'}
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
                            <InputImage maxLength={12} value={this.state.money} onChangeText={(text) => this.handleChange(text.replace(new RegExp(/,/gi), ''))} placeholder={'Giá tiền'} />
                            <ButtonFull value={'Tiếp tục'} onPress={this.pressConfirm} />
                        </View>
                        :
                        <View style={styles.borderBottom}>

                        </View>
                    }
                    <ModalListCar />
                    <ModalListTime />
                    <ModalConfirm />
                </View>
            </SafeAreaView >
        )
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
        timePick: state.rdOperator.timePick,
        timeDrop: state.rdOperator.timeDrop,
        pickAddress: state.info.pick_add,
        dropAddress: state.info.drop_add,
        componentPick: state.info.component_pick,
        componentDrop: state.info.component_drop,
        itemConfirm: state.rdOperator.itemConfirm,
        listDayOfWeek: state.rdOperator.listDayOfWeek,
        listDaySelect: state.rdOperator.listDaySelect
    }
}

export default connect(mapStateToProps, {
    showModalOperator: showModalOperator,
    showModalTimePick: showModalTimePick,
    showModalTimeDrop: showModalTimeDrop,
    showModalConfirm: showModalConfirm,
    addListDayOfWeek: addListDayOfWeek,
    addSendDataOperator: addSendDataOperator,
})(RideShare);