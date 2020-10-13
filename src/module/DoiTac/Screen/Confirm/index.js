import React, { Component } from 'react'
import { View, SafeAreaView, Text, ScrollView, ActivityIndicator, } from 'react-native'
import { connect } from 'react-redux';
import { ButtonFull, ButtonDialog } from '../../../../component/Button';
import { HeaderText } from '../../../../component/Header';
import { TextBold, TextNormal } from './Textt';
import Dialog, { DialogTitle } from 'react-native-popup-dialog';
import * as link from '../../../../URL'
class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addingTicket: false,
            popupSuccess: false,
            popupError: false,
            listDay: null,
            ticket: null,
        }
    }
    componentDidMount() {
        this.replaceDay()
    }

    replaceDay() {
        var list = this.props.listDaySelect.toString().replace('6', 'T7').replace('5', 'T6').replace('4', 'T5').replace('3', 'T4').replace('2', 'T3').replace('1', 'T2').replace('0', 'CN');
        console.log(list)
        this.setState({ listDay: list })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderText onPressLeft={this.goBack} textCenter={'Xác nhận đăng chuyến'} />
                <ScrollView style={{ paddingHorizontal: 8 }}>
                    <View>
                        <TextBold text={'Dịch vụ'} />
                        <TextNormal text={this.props.sendDataOperator.type == 'transfer_service' ? 'Sân bay, đường dài' : this.props.sendDataOperator.type == 'express' ? 'Vận chuyển' : this.props.sendDataOperator.type == 'hourly_car_rental' ? 'Xe tự lái' : 'Khác'} />
                        {this.props.sendDataOperator.type == 'hourly_car_rental' &&
                            <View>
                                <TextBold text={'Thành phố'} />
                                <TextNormal text={this.props.sendDataOperator.city} />
                            </View>
                        }
                        <TextBold text={'Điểm xuất phát'} />
                        <TextNormal text={this.props.pickAddress} />
                        {this.props.sendDataOperator.type != 'hourly_car_rental' &&
                            <View>
                                <TextBold text={'Điểm đến'} />
                                <TextNormal text={this.props.dropAddress} />
                            </View>
                        }
                        <TextBold text={'Thời gian'} />
                        <TextNormal text={`${this.props.timePick} - ${this.props.timeDrop}(${this.state.listDay})`} />
                        {this.props.sendDataOperator.vehicleType &&
                            <View>
                                <TextBold text={'Loại phương tiện'} />
                                <TextNormal text={this.props.sendDataOperator.type == 'hourly_car_rental' ? (this.props.itemCarOperator?.label + ' - ' + this.props.sendDataOperator.slot + ' chỗ -' + this.props.itemTransmission.label) : this.props.itemCarOperator?.label} />
                            </View>
                        }
                        {this.props.sendDataOperator?.priceExtra &&
                            <View>
                                <TextBold text={'Giá phụ trội'} />
                                <TextNormal text={`Phụ trội theo km: ${this.props.sendDataOperator.priceExtra.kmExtra} đ/km(tối đa ${this.props.sendDataOperator.priceExtra.kmLimit}km)`} />
                                <TextNormal text={`Phụ trội theo giờ: ${this.props.sendDataOperator.priceExtra.hourExtra} đ/giờ(tối đa ${this.props.sendDataOperator.priceExtra.hourLimit}giờ)`} />
                            </View>
                        }
                        {this.props.sendDataOperator?.title &&
                            <View>
                                <TextBold text={'Tiêu đề'} />
                                <TextNormal text={this.props.sendDataOperator.title} />
                            </View>
                        }
                        {this.props.sendDataOperator?.description &&
                            <View>
                                <TextBold text={'Mô tả'} />
                                <TextNormal text={this.props.sendDataOperator.description} />
                            </View>
                        }
                        {this.props.sendDataOperator?.vehicleName &&
                            <View>
                                <TextBold text={'Tên phương tiện'} />
                                <TextNormal text={`${this.props.sendDataOperator.vehicleName}`} />
                            </View>
                        }
                        <TextBold text={'Hình thức nhận chuyến'} />
                        <TextNormal text={this.props.itemConfirm?.label} />
                        <TextBold text={'Giá'} />
                        <TextNormal text={`${formatCurrency(this.props.sendDataOperator.price)} đ`} />
                    </View>
                    <ButtonFull onPress={() => {
                        this.setState({ addingTicket: true })
                        this.pressConfirm()
                    }}
                        value={'Xác nhận đăng chuyến'} />
                    <Dialog
                        // width={0.8}
                        visible={this.state.addingTicket}
                    >
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='large' />
                            </View>
                        </View>
                    </Dialog>
                    {this.renderSuccess()}
                    {this.renderError()}

                </ScrollView>

            </SafeAreaView>
        )
    }

    renderSuccess() {
        return (
            <Dialog
                visible={this.state.popupSuccess}
                width={0.8}
            >
                <View>
                    <View style={{ padding: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: '100' }}>Đăng chuyến thành công</Text>
                        <ButtonDialog
                            text={'Chi tiết'}
                            onPress={() => {
                                this.ticketDetail(this.state.ticket._id)
                                // this.props.navigation.popToTop()
                                // this.props.navigation.replace('DetailTicketPartner1', { 'code': this.state.ticket._id })
                            }}
                        />
                    </View>
                </View>
            </Dialog>
        )
    }

    async ticketDetail(ticketId) {
        await this.setState({ popupSuccess: false, })
        await this.props.navigation.replace('DetailTicketPartner1', { 'code': ticketId })
    }

    renderError() {
        return (
            <Dialog
                visible={this.state.popupError}
                width={0.8}
            >
                <View>
                    <View style={{ padding: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: '100' }}>Đăng chuyến thất bại vui lòng thử lại sau</Text>
                        <ButtonDialog
                            text={'Đóng'}
                            onPress={() => {
                                this.setState({ popupError: false, })
                            }}
                        />
                    </View>
                </View>
            </Dialog>
        )
    }

    pressConfirm() {
        url = link.URL_API_PORTAL + `product/v1/products`
        jsonStr = JSON.stringify(this.props.sendDataOperator)
        console.log(jsonStr)
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'token': this.props.token
            },
            body: jsonStr
        })
            .then(res => res.json())
            .then(resJson => {
                if (resJson.data) {
                    console.log('success')
                    console.log(resJson.data)
                    this.setState({
                        ticket: resJson.data,
                        addingTicket: false,
                        popupSuccess: true,
                    })
                } else {
                    console.log('error')
                    this.setState({
                        addingTicket: false,
                        popupError: true,
                    })
                }
            })
    }

    goBack = () => {
        this.props.navigation.goBack()
    }


}
function formatCurrency(currency) {
    return currency
        .toString()
        .split('')
        .reverse()
        .join('')
        .match(/.{1,3}/g)
        .map((i) => i.split('').reverse().join(''))
        .reverse()
        .join(',')
}


function mapStateToProps(state) {
    return {
        modalCarType: state.rdOperator.modalCarType,
        itemCarOperator: state.rdOperator.itemCarOperator1,
        timePick: state.rdOperator.timePick,
        timeDrop: state.rdOperator.timeDrop,
        pickAddress: state.info.pick_add,
        dropAddress: state.info.drop_add,
        componentPick: state.info.component_pick,
        componentDrop: state.info.component_drop,
        itemConfirm: state.rdOperator.itemConfirm,
        itemTransmission: state.rdOperator.itemTransmission,
        listDayOfWeek: state.rdOperator.listDayOfWeek,
        listDaySelect: state.rdOperator.listDaySelect,
        sendDataOperator: state.rdOperator.sendDataOperator,
        token: state.thongtin.token
    }
}


export default connect(mapStateToProps)(Confirm)