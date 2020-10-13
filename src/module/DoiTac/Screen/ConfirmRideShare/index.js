import React, { Component } from 'react'
import { SafeAreaView, View, Text, TextInput, Image, Button, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { HeaderText } from '../../../../component/Header'
import ImageInputTextDiChung from '../../../../component/ImageInputTextDiChung'
import styles from '../../style'
import { ButtonFull } from '../../../../component/Button'
import { SvgBulletPoints, SvgEdit, SvgMoneyUlgy, SvgPick } from '../../../../icons'
import * as link from '../../../../URL'
const imageLocation = '../../../../image/location.png'

const colorRed = '#ef465e'
class ConfirmRideShare extends Component {

    constructor(props) {
        super(props);
        this.state = {
            range: '',
            price: '',
            data: null,
        }
        this.refInput
    }

    componentDidMount() {
        this.getRange()
    }

    getRange() {
        var time = new Date(this.props.depart_time2 + '+07:00').getTime() / 1000;
        console.log(this.props.depart_time)
        var url;
        if (this.props.pickAddressComponent?.place_id && this.props.dropAddressComponent?.place_id) {
            url = link.URL_API_PORTAL + `rs-schedule/v1/schedules/estimation?departureTime=${time}&startId=${this.props.pickAddressComponent?.place_id}&endId=${this.props.dropAddressComponent?.place_id}`
        }

        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(resJson => {
                console.log(resJson)
                this.setState({
                    range: resJson.data.distanceText,
                    price: resJson.data.price.toString(),
                    data: resJson,
                })
            })
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <SafeAreaView>
                <HeaderText onPressLeft={this.goBack} textCenter={'Giá dịch vụ'} />
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
                        <View style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center', paddingRight: 4, marginRight: 4 }}>
                            <SvgBulletPoints />
                        </View>
                        <Text>Khoảng cách: </Text>
                        <Text style={{ color: '#00363d', fontWeight: 'bold' }}>{this.state.range}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center', paddingRight: 4, marginRight: 4 }}>
                            <SvgBulletPoints />
                        </View>
                        <Text>Giá bán 1 chỗ: </Text>
                        <TextInput
                            ref={(input) => { this.refInput = input; }}
                            style={{ borderWidth: 0, padding: 8, borderColor: '#e8e8e8', borderRadius: 8, color: colorRed, fontWeight: 'bold' }}
                            value={handleChange(this.state.price)}
                            maxLength={12}
                            placeholder={'nhập giá'}
                            keyboardType={'number-pad'}
                            onChangeText={(text) => this.setState({ price: handleChange(text) })}
                        />
                        <Text style={{ color: colorRed, fontWeight: 'bold' }}>đ</Text>
                        {/* <Button title='abc' onPress={() => this.refInput.focus()} /> */}
                        <TouchableOpacity
                            onPress={() => this.refInput.focus()}
                        >
                            <SvgEdit />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center', paddingRight: 4, marginRight: 4 }}>
                            <SvgMoneyUlgy width={20} height={20} color={colorRed} />
                        </View>
                        <Text>Doanh thu tạm tính: </Text>
                        {/* <Text>{replacePoint(this.state.price)}</Text> */}
                        <Text style={{ color: colorRed, fontWeight: 'bold' }}>{handleChange(this.state.price)}</Text>
                        <Text style={{ color: '#00363d', fontWeight: 'bold' }}>{' x ' + this.props.itemSlot?.label + ' Chỗ = '}</Text>
                        <Text style={{ color: colorRed, fontWeight: 'bold' }}>{formatCurrency(this.props.itemSlot?.label * replacePoint(this.state.price))}</Text>
                        <Text style={{ color: colorRed, fontWeight: 'bold' }}>đ</Text>
                    </View>
                    <ButtonFull value={'Tiếp tục'} onPress={this.pressConfirmRideShare} />

                </View>
            </SafeAreaView>
        )
    }

    pressConfirmRideShare = () => {
        this.props.navigation.navigate('CreateRideShare', {
            'sendData': this.state.data,
            'price': this.state.price,
        })
    }
}

function handleChange(num) {
    let number = num.replace(new RegExp(/,/gi), '')
    let money = Number(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return money;
};

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
function replacePoint(currency) {
    return Number(currency.replace(new RegExp(/,/gi), ''))
}


function mapStateToProps(state) {
    return {
        modalCarType: state.rdOperator.modalCarType,
        sendData: state.rdOperator.sendData,
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
        itemSlot: state.rdOperator.itemSlot
    }
}


export default connect(mapStateToProps)(ConfirmRideShare);