import React, { Component } from 'react'
import { SafeAreaView, View, Text, TextInput, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { HeaderText } from '../../../../component/Header'
import ImageInputTextDiChung from '../../../../component/ImageInputTextDiChung'
import { ButtonFull, ButtonDialog } from '../../../../component/Button'
import { FormSelectVehicleSlot } from '../../Form'
import Dialog from 'react-native-popup-dialog';
import * as link from '../../../../URL'
import { SvgBulletPoints, SvgCheckSuccess, SvgMoneyUlgy, SvgPeople, SvgPick, SvgVehicle } from '../../../../icons'

const colorRed = '#ef465e'

const imageLocation = '../../../../image/location.png'
class CreateRideShare extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: 1,
            price: null,
            sendData: {},
            addingTicket: false,
            popupSuccess: false,
            popupError: false,
            ticket: null,
        }
    }

    componentDidMount() {
        this.addDataSend()
        this.getData()
    }

    getData() {
        const { navigation } = this.props;
        this.setState({
            price: navigation.getParam('price'),
            data: navigation.getParam('sendData')
        })
    }

    filterComponent(data, types) {
        const component = data.filter((ele) => {
            for (const type of types) {
                if (ele.types.includes(type)) return ele
            }
        })
        return component.length ? component[0].long_name : ''
    }

    addDataSend = async () => {
        const { navigation } = this.props;
        const data = navigation.getParam('sendData');
        console.log(data.data)
        var time = new Date(this.props.depart_time2 + '+07:00').getTime() / 1000;
        var send = {}
        const { dropAddressComponent, pickAddressComponent } = this.props
        send.autoAcceptBooking = this.props.itemConfirm.value == 1 ? true : false
        send.baseSlots = this.props.itemSlot.value + 1
        send.distance = data.data.rows[0].elements[0].distance.value / 1000
        send.driverName = this.props.name
        send.end = {
            'address': this.props.dropAddress,
            'dateTime': time + data.data.rows[0].elements[0].duration.value,
            'district': this.filterComponent((dropAddressComponent.address_components), [
                'administrative_area_level_2',
                'locality',
            ]),
            'lat': dropAddressComponent.geometry.location.lat,
            'lng': dropAddressComponent.geometry.location.lng,
            'placeId': dropAddressComponent.place_id,
            'province': this.filterComponent((dropAddressComponent.address_components), [
                'administrative_area_level_1',
            ]),
        }
        send.places = [];
        send.start = {
            'address': this.props.pickAddress,
            'dateTime': time,
            'distance': data.data.rows[0].elements[0].distance.value,
            'distanceText': data.data.rows[0].elements[0].distance.text,
            'district': this.filterComponent(this.props.pickAddressComponent.address_components, [
                'administrative_area_level_2',
                'locality',
            ]),
            'duration': data.data.rows[0].elements[0].duration.value,
            'durationText': data.data.rows[0].elements[0].duration.text,
            'lat': pickAddressComponent.geometry.location.lat,
            'lng': pickAddressComponent.geometry.location.lng,
            'placeId': dropAddressComponent.place_id,
            'price': replacePoint(navigation.getParam('price')),
            'province': this.filterComponent(pickAddressComponent.address_components, [
                'administrative_area_level_1',
            ]),
        }
        send.vehicle = this.props.itemVehicle.value == 'car' ? 2 : 1
        console.log((send))
        this.setState({ sendData: send })
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <SafeAreaView>
                <HeaderText onPressLeft={this.goBack} textCenter={'Xác nhận đăng chuyến'} />
                <View style={{ paddingHorizontal: 8 }}>
                    <ImageInputTextDiChung
                        children={<SvgPick />}
                        noBorderTop
                        value={this.props.pickAddress}
                        placeholder={'Nhập điểm đón'}
                        source={require(imageLocation)}
                    />

                    <ImageInputTextDiChung
                        children={<SvgPick color={colorRed} />}
                        noBorderTop
                        value={this.props.dropAddress}
                        placeholder={'Nhập điểm trả'}
                        source={require(imageLocation)}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center' }}>
                            <SvgBulletPoints />
                        </View>
                        <Text style={{ paddingLeft: 4 }}>Khoảng cách: </Text>
                        <Text style={{ color: colorRed, fontWeight: 'bold' }}>{this.state.data?.data?.rows[0]?.elements[0]?.distance.text}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center' }}>
                            <SvgBulletPoints />
                        </View>
                        <Text style={{ paddingLeft: 4 }}>Giá bán một chỗ: </Text>
                        {this.state.price != null &&
                            <Text style={{ flex: 1, padding: 8, borderColor: '#e8e8e8', borderRadius: 8, color: colorRed, fontWeight: 'bold' }}>{handleChange(this.state.price) + ' ₫'}</Text>}
                    </View>

                    <FormSelectVehicleSlot
                        noBorderTop
                        children={<SvgVehicle />}
                        children2={<SvgPeople />}
                        value={this.props.itemVehicle?.label}
                        value2={this.props.itemSlot ? this.props.itemSlot.label + ' Chỗ' : ''}
                    />

                    <ImageInputTextDiChung
                        children={<SvgCheckSuccess />}
                        noBorderTop
                        placeholder={'Hình thức chấp nhận'}
                        value={this.props.itemConfirm?.label}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center', paddingRight: 4, marginRight: 4 }}>
                            <SvgMoneyUlgy width={20} height={20} color={colorRed} />
                        </View>
                        <Text>Doanh thu tạm tính: </Text>
                        {this.state.price != null &&
                            <Text style={{ color: colorRed, fontWeight: 'bold' }}>{formatCurrency(this.props.itemSlot?.label * replacePoint(this.state.price)) + 'đ'}</Text>

                        }
                    </View>

                    <ButtonFull
                        value={'Đăng chuyến'}
                        onPress={() => {
                            this.setState({ addingTicket: true })
                            this.pressCreateRideShare(this.state.sendData)
                        }}
                    />

                    <Dialog
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
                </View>
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
                        <Text style={{ fontSize: 16, fontWeight: '100' }}>Đăng chuyến thành công! Vui lòng kiểm tra trong phần danh sách chuyến tạo</Text>
                        <ButtonDialog
                            text={'Trang chủ'}
                            onPress={() => {
                                // this.ticketDetail(this.state.ticket._id)
                                this.setState({ popupSuccess: false, })
                                this.props.navigation.popToTop()
                            }}
                        />
                    </View>
                </View>
            </Dialog>
        )
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

    async ticketDetail(ticketId) {
        console.log(ticketId)
        await this.setState({ popupSuccess: false, })
        await this.props.navigation.replace('DetailTicketPartner1', { 'code': ticketId })
    }

    pressCreateRideShare(send) {
        const url = link.URL_API_PORTAL + `rs-schedule/v1/schedules`
        console.log(this.props.token)
        console.log('...' + JSON.stringify(send))
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
                'Referer': 'https://hubdev.dichungtaxi.com/'
            },
            body: JSON.stringify(send)
        })
            .then(res => res.json())
            .then(resJson => {
                console.log(JSON.stringify(resJson))
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
}


function handleChange(num) {
    let number = num.replace(new RegExp(/,/gi), '')
    let money = Number(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return money;
};

function formatCurrency(currency) {
    console.log(currency)
    // return '123'
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
function replacePoint(currency) {
    return Number(currency.replace(new RegExp(/,/gi), ''))
}

function mapStateToProps(state) {
    return {
        modalCarType: state.rdOperator.modalCarType,
        itemCarOperator: state.rdOperator.itemCarOperator,
        timePick: state.rdOperator.timePick,
        timeDrop: state.rdOperator.timeDrop,
        pickAddress: state.info.pick_add,
        pickAddressComponent: state.info.component_pick,
        dropAddress: state.info.drop_add,
        dropAddressComponent: state.info.component_drop,
        componentPick: state.info.component_pick,
        componentDrop: state.info.component_drop,
        itemConfirm: state.rdOperator.itemConfirm,
        listDayOfWeek: state.rdOperator.listDayOfWeek,
        listDaySelect: state.rdOperator.listDaySelect,
        depart_time: state.info.depart_time,
        depart_time2: state.info.depart_time2,
        itemSlot: state.rdOperator.itemSlot,
        itemVehicle: state.rdOperator.itemVehicle,
        name: state.thongtin.name,
        token: state.thongtin.token,
    }
}


export default connect(mapStateToProps)(CreateRideShare);