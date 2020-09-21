import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, Button, ToastAndroid } from 'react-native'
import styles from '../../style'
import ImageInputTextDiChung from '../../../../component/ImageInputTextDiChung'
import { HeaderText } from '../../../../component/Header'
import { showModalOperator, showModalTimePick, showModalTimeDrop, showModalConfirm, addListDayOfWeek, addSendDataOperator } from '../../../../core/Redux/action/Action'
import { connect } from 'react-redux'
import { ButtonFull } from '../../../../component/Button'
import { FormSelectCar, InputImage, ModalConfirm, ModalListCar, ModalListTime, TimePickDrop } from '../../Form'
import Toast from 'react-native-simple-toast';

const imageLocation = '../../../../image/location.png'

class ExpressOperator extends Component {

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
            slot: '',
            moneyNoFormat: null,
            title: '',
            note: '',
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
                <HeaderText textCenter={'Vận chuyển hàng hóa'} onPressLeft={this.goBack} />
                <View style={{ padding: 8 }}>
                    {!this.state.select ?
                        <View style={[styles.borderBottom, { borderTopLeftRadius: 8, borderTopRightRadius: 8, borderTopWidth: 0.5 }]}>
                            <ImageInputTextDiChung
                                noBorderTop
                                value={this.props.pickAddress}
                                placeholder={'Nhập điểm đón'}
                                onPress={this.pressPickAddress}
                                source={require(imageLocation)}
                            />

                            <ImageInputTextDiChung
                                value={this.props.dropAddress}
                                placeholder={'Nhập điểm trả'}
                                onPress={this.pressDropAddress}
                                source={require(imageLocation)}
                            />
                            <InputImage
                                value={this.state.title}
                                onChangeText={(text) => { this.setState({ title: text }) }}
                                placeholder={'VD: Giao bằng xe máy'}
                            />

                            <InputImage
                                value={this.state.note}
                                onChangeText={(text) => { this.setState({ note: text }) }}
                                placeholder={'VD: Tối đa 20kg'} />
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
                            <InputImage
                                keyboardType={'decimal-pad'}
                                value={this.state.slot}
                                onChangeText={(text) => { this.setState({ slot: text }) }}
                                placeholder={'Số gói hàng'} />
                            <ImageInputTextDiChung
                                placeholder={'Hình thức chấp nhận'}
                                value={this.props.itemConfirm?.label}
                                onPress={this.showModalConfirmSelect}
                            />
                            <InputImage
                                keyboardType={'decimal-pad'}
                                maxLength={12} value={this.state.money}
                                onChangeText={(text) => this.handleChange(text.replace(new RegExp(/,/gi), ''))}
                                placeholder={'Giá tiền'} />
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
            Toast.show('Vui lòng nhập điểm trả hàng', Toast.SHORT);
        } else if (this.state.slot < 1) {
            Toast.show('Vui lòng nhập số gói hàng', Toast.SHORT);
        } else if (this.state.slot > 20) {
            Toast.show('Số gói hàng không được quá 20.', Toast.SHORT);
        } else if (this.state.title == '') {
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
        send.description = this.state.note
        send.startPlace = this.props.componentPick
        send.endPlace = this.props.componentDrop
        send.schedule = {
            'applyWeekdays': this.props.listDaySelect,
            'startTimeString': this.props.timePick,
            'endTimeString': this.props.timeDrop,
        }
        send.slot = this.state.slot
        send.type = 'express'
        send.title = this.state.title
        send.note = this.state.note
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
})(ExpressOperator);