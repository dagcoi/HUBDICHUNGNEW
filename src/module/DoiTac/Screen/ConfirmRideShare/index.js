import React, { Component } from 'react'
import { SafeAreaView, View, Text, TextInput, Image } from 'react-native'
import { connect } from 'react-redux'
import { HeaderText } from '../../../../component/Header'
import ImageInputTextDiChung from '../../../../component/ImageInputTextDiChung'
import styles from '../../style'
import { ButtonFull } from '../../../../component/Button'
import { SvgBulletPoints, SvgPick } from '../../../../icons'
import * as link from '../../../../URL'
const imageLocation = '../../../../image/location.png'
class ConfirmRideShare extends Component {

    constructor(props) {
        super(props);
        this.state = {
            range: '',
            price: '',
            data: null,
        }
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
                        children={<SvgPick color={'#eb6752'} />}
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
                        <Text>{this.state.range}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center', paddingRight: 4, marginRight: 4 }}>
                            <SvgBulletPoints />
                        </View>
                        <Text>Giá bán một chỗ: </Text>
                        <TextInput
                            style={{ borderWidth: 0.5, flex: 1, padding: 8, borderColor: '#e8e8e8', borderRadius: 8 }}
                            value={this.state.price}
                            placeholder={'nhập giá'}
                            keyboardType={'number-pad'}
                            onChangeText={(text) => this.setState({ price: text })}
                        />
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
    }
}


export default connect(mapStateToProps)(ConfirmRideShare);