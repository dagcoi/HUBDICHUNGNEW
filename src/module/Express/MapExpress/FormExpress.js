import React, { Component } from 'react'
import { View, TouchableOpacity, TextInput, Image,Text } from 'react-native'
import { DropAddress } from '../../ScreenAddress/Util/index'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung'
import { connect } from 'react-redux'

const imageLocation = '../../../image/location.png'
const imageTime = '../../../image/time.png'
const imageDown = '../../../image/arrowdown.png'
const imageParcel = '../../../image/parcel.png'

class FormExpress extends Component {

    render() {
        return (
            <View style={{ flexDirection: 'row' }} >
                <View style={{ flex: 1 }} >
                    <ImageInputTextDiChung
                        onPress={this.props.onPressPickAddress}
                        source={require(imageLocation)}
                        placeholder={'Điểm nhận hàng'}
                        value={this.props.pick_add}
                    />
                    <DropAddress
                        onPressInput={this.props.onPressDropAddress}
                        onPressSwap={this.props.onPressSwap}
                        placeholder={'Điểm giao hàng'}
                        value={this.props.drop_add}
                    />

                    <View style={{ flexDirection: 'row', height: 40, }}>
                        <TouchableOpacity
                            style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", alignItems: 'center', flexDirection: 'row', }}
                            onPress={this.props.onPressSelectTime}
                        >
                            <Image
                                style={{ height: 24, width: 24, marginLeft: 8, }}
                                source={require(imageTime)}
                            />

                            <TextInput
                                editable={false}
                                // value={this.state.date ? `${this.state.date.format('DD-MM-YYYY')}  ${this.state.selectedHours} : ${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes}` : ""}
                                value={this.props.depart_time}
                                placeholder='Chọn giờ gửi hàng'
                                placeholderTextColor={'#333333'}
                                onTouchStart={this.props.onPressSelectTime}
                                pointerEvents='none'
                                style={{ fontSize: 14, height: 40, color: "#00363d", flex: 1, marginLeft: 8 }}
                            />
                        </TouchableOpacity>

                        <View style={{ width: 1, backgroundColor: '#e8e8e8' }}></View>
                        <TouchableOpacity
                            style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", flexDirection: 'row', alignItems: 'center' }}
                            onPress={this.props.onPressSelectSlot}
                        >
                            <Image
                                style={{ height: 24, width: 24, margin: 8 }}
                                source={require(imageParcel)}
                            />
                            <Text style={{ flex: 1 }}>{this.props.chair} gói</Text>
                            <Image
                                style={{ height: 24, width: 24, margin: 8 }}
                                source={require(imageDown)}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
        component_drop: state.info.component_drop,
        component_pick: state.info.component_pick,
        latitude_pick: state.info.latitude_pick,
        longitude_pick: state.info.longitude_pick,
        latitude_drop: state.info.latitude_drop,
        longitude_drop: state.info.longitude_drop,
        chair: state.info.chair,
        depart_time: state.info.depart_time,
        duration: state.info.duration,
    }
}

export default connect(mapStateToProps)(FormExpress)

