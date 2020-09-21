import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, Button, ToastAndroid, ScrollView } from 'react-native'
import styles from '../../style'
import ImageInputTextDiChung from '../../../../component/ImageInputTextDiChung'
import { HeaderText } from '../../../../component/Header'
import { showModalOperator, showModalTimePick, showModalTimeDrop, showModalConfirm, addListDayOfWeek, addSendDataOperator, showModalCity, showModalTransmission } from '../../../../core/Redux/action/Action'
import { connect } from 'react-redux'
import { FormSelectCar, Input, InputImage, ModalCity, ModalConfirm, ModalListCar, ModalListTime, TimePickDrop, ModalTransmission } from '../../Form'
import { ButtonFull } from '../../../../component/Button'
import Toast from 'react-native-simple-toast';

const imageLocation = '../../../../image/location.png'

class OperatorTransferService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: false,
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
            slot: '1',
            moneyNoFormat: null,
            title: '',
            note: '',
            extraKm: '',
            maxKm: '',
            extraHour: '',
            maxHour: '',
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
                <HeaderText textCenter={'Cho thuê xe tự lái'} onPressLeft={this.goBack} />
                <ScrollView style={{ padding: 8 }}>
                    <View style={[styles.borderBottom, { borderTopLeftRadius: 8, borderTopRightRadius: 8, borderTopWidth: 0.5 }]}>
                        <ImageInputTextDiChung
                            noBorderTop
                            value={this.props.itemCity?.label ?? ''}
                            placeholder={'Chọn thành phố'}
                            onPress={this.showModalCity}
                            source={require(imageLocation)}
                        />
                        <ImageInputTextDiChung
                            value={this.props.pickAddress}
                            placeholder={'Nhập địa chỉ'}
                            onPress={this.pressPickAddress}
                            source={require(imageLocation)}
                        />
                        <ImageInputTextDiChung
                            value={this.props.itemCarOperator?.label ?? ''}
                            placeholder={'Chọn loại xe'}
                            onPress={this.showModalOperator}
                        />

                        <InputImage
                            value={this.state.title}
                            onChangeText={(text) => { this.setState({ title: text }) }}
                            placeholder={'Tên xe VD: Vinfast Lux A2.0'}
                            onPressClear={()=> {this.setState({title : ''})}}
                        />
                        <ImageInputTextDiChung
                            value={this.props.itemTransmission?.label ?? ''}
                            placeholder={'Chọn loại số'}
                            onPress={this.showModalTransmission}
                        />
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
                        <Input
                            value={this.state.extraKm}
                            text={'Giá phụ trội 1 Km:'}
                            onChangeText={(text) => this.setState({ extraKm: text })}
                            onPressClear={() => this.setState({ extraKm: '' })}
                            keyboardType={'decimal-pad'}
                            placeholder={'VND'}
                        />
                        <Input
                            value={this.state.maxKm}
                            text={'Số Km tối đa:'}
                            onChangeText={(text) => this.setState({ maxKm: text })}
                            onPressClear={() => this.setState({ maxKm: '' })}
                            keyboardType={'decimal-pad'}
                            placeholder={'KM'}
                        />
                        <Input
                            value={this.state.extraHour}
                            text={'Giá phụ trội 1 giờ:'}
                            onChangeText={(text) => this.setState({ extraHour: text })}
                            onPressClear={() => this.setState({ extraHour: '' })}
                            keyboardType={'decimal-pad'}
                            placeholder={'VND'}
                        />
                        <Input
                            value={this.state.maxHour}
                            text={'Số giờ tối đa'}
                            onChangeText={(text) => this.setState({ maxHour: text })}
                            onPressClear={() => this.setState({ maxHour: '' })}
                            keyboardType={'decimal-pad'}
                            placeholder={'Giờ'}
                        />
                        <ImageInputTextDiChung
                            placeholder={'Hình thức chấp nhận'}
                            value={this.props.itemConfirm?.label}
                            onPress={this.showModalConfirmSelect}
                        />
                        <InputImage
                            maxLength={12} value={this.state.money}
                            onChangeText={(text) => this.handleChange(text.replace(new RegExp(/,/gi), ''))}
                            placeholder={'Giá tiền'}
                            keyboardType={'decimal-pad'}
                        />
                        <ButtonFull value={'Tiếp tục'} onPress={this.pressConfirm} />
                    </View>
                    <ModalListCar />
                    <ModalListTime />
                    <ModalConfirm />
                    <ModalCity />
                    <ModalTransmission />
                </ScrollView>
            </SafeAreaView >
        )
    }

    pressConfirm = () => {
        if (!this.props.itemCity) {
            Toast.show('Vui chọn thành phố', Toast.SHORT);
        } else if (!this.props.pickAddress) {
            Toast.show('Vui lòng nhập điểm xuất phát', Toast.SHORT);
        } else if (this.state.title.length < 1) {
            Toast.show('Vui lòng nhập phương tiện', Toast.SHORT);
        } else if (this.state.slot < 1) {
            Toast.show('Vui lòng nhập số chỗ', Toast.SHORT);
        } else if (this.props.timePick == '') {
            Toast.show('Vui lòng chọn thời gian bắt đầu nhận', Toast.SHORT);
        } else if (!this.props.itemTransmission) {
            Toast.show('Vui lòng chọn loại số sàn hoặc số tự động', Toast.SHORT);
        } else if (this.props.timeDrop == '') {
            Toast.show('Vui lòng chọn thời gian ngừng nhận', Toast.SHORT);
        } else if (this.props.listDaySelect.length < 1) {
            Toast.show('Vui lòng chọn ngày hoạt động', Toast.SHORT);
        } else if (!this.props.itemConfirm) {
            Toast.show('Vui lòng chọn hình thức nhận chuyến', Toast.SHORT);
        } else if (this.state.money < 1) {
            Toast.show('Vui lòng nhập giá tiền', Toast.SHORT);
        } else if (this.state.extraKm < 1) {
            Toast.show('Vui lòng nhập phụ trội theo km', Toast.SHORT);
        } else if (this.state.maxKm < 1) {
            Toast.show('Vui lòng nhập số km tối đa', Toast.SHORT);
        } else if (this.state.extraHour < 1) {
            Toast.show('Vui lòng nhập phụ trội theo giờ', Toast.SHORT);
        } else if (this.state.maxHour < 1) {
            Toast.show('Vui lòng nhập số giờ tối đa', Toast.SHORT);
        } else {
            this.addDataSend()
        }
    }

    addDataSend = async () => {
        var send = {}
        send.autoAccept = this.props.itemConfirm?.value
        send.city = this.props.itemCity?.label
        send.startPlace = this.props.componentPick
        send.endPlace = null
        send.schedule = {
            'applyWeekdays': this.props.listDaySelect,
            'startTimeString': this.props.timePick,
            'endTimeString': this.props.timeDrop,
        }
        send.slot = this.state.slot
        send.type = 'hourly_car_rental'
        send.vehicleName = this.state.title
        send.vehicleType = this.props.itemCarOperator?.value
        send.note = ''
        send.price = this.state.moneyNoFormat
        send.vehicleTransmission = this.props.itemTransmission?.value
        send.priceExtra = {
            'hourExtra': this.state.extraHour,
            'hourLimit': this.state.maxHour,
            'kmExtra': this.state.extraKm,
            'kmLimit': this.state.maxKm,
        }
        console.log(JSON.stringify(send))
        this.props.addSendDataOperator(send)
        this.props.navigation.navigate('Confirm')
    }

    showModalCity = () => { this.props.showModalCity(true) }
    showModalOperator = () => { this.props.showModalOperator(true) }
    showModalTransmission = () => { this.props.showModalTransmission(true) }
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
        itemTransmission: state.rdOperator.itemTransmission,
        itemCity: state.rdOperator.itemCity,
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
    showModalCity: showModalCity,
    showModalTimePick: showModalTimePick,
    showModalTimeDrop: showModalTimeDrop,
    showModalConfirm: showModalConfirm,
    showModalTransmission: showModalTransmission,
    addListDayOfWeek: addListDayOfWeek,
    addSendDataOperator: addSendDataOperator,
})(OperatorTransferService);