import React, { Component } from 'react'
import { SafeAreaView, View, Text, TextInput, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { HeaderText } from '../../../../component/Header'
import ImageInputTextDiChung from '../../../../component/ImageInputTextDiChung'
import { ButtonFull, ButtonDialog } from '../../../../component/Button'
import { FormSelectVehicleSlot } from '../../Form'
import Dialog from 'react-native-popup-dialog';
import * as link from '../../../../URL'

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
        send.distance = data.data.distanceValue / 1000
        send.driverName = this.props.name
        send.end = {
            'address': this.props.dropAddress,
            'dateTime': time + data.data.durationValue,
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
            'distance': data.data.distanceValue,
            'distanceText': data.data.distanceText,
            'district': this.filterComponent(this.props.pickAddressComponent.address_components, [
                'administrative_area_level_2',
                'locality',
            ]),
            'duration': data.data.durationValue,
            'durationText': data.data.durationText,
            'lat': pickAddressComponent.geometry.location.lat,
            'lng': pickAddressComponent.geometry.location.lng,
            'placeId': dropAddressComponent.place_id,
            'price': navigation.getParam('price'),
            'province': this.filterComponent(pickAddressComponent.address_components, [
                'administrative_area_level_1',
            ]),
        }
        send.vehicle = this.props.itemVehicle.value == 'car' ? '2' : '1'
        // console.log((send))
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
                        noBorderTop
                        value={this.props.pickAddress}
                        placeholder={'Nhập điểm đón'}
                        source={require(imageLocation)}
                    />

                    <ImageInputTextDiChung
                        noBorderTop
                        value={this.props.dropAddress}
                        placeholder={'Nhập điểm trả'}
                        source={require(imageLocation)}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Image style={{ width: 32, height: 32, margin: 2 }} />
                        <Text>Khoảng cách: </Text>
                        <Text>{this.state.data?.data?.distanceText}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Image style={{ width: 32, height: 32, margin: 2 }} />
                        <Text>Giá bán một chỗ: </Text>
                        <TextInput
                            style={{ flex: 1, padding: 8, borderColor: '#e8e8e8', borderRadius: 8 }}
                            value={this.state.price}
                            editable={false}
                        />
                    </View>

                    <ImageInputTextDiChung
                        noBorderTop
                        placeholder={'Hình thức chấp nhận'}
                        value={this.props.itemConfirm?.label}
                    />

                    <FormSelectVehicleSlot
                        noBorderTop
                        value={this.props.itemVehicle?.label}
                        value2={this.props.itemSlot ? this.props.itemSlot.label + ' Chỗ' : ''}
                    />
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
                        <Text style={{ fontSize: 16, fontWeight: '100' }}>Đăng chuyến thành công</Text>
                        <ButtonDialog
                            text={'Đóng'}
                            onPress={() => {
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
                    this.setState({
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