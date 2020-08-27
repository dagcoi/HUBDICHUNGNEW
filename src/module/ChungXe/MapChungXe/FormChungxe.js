import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import FormXeChung from '../../XeChung/MapXeChung/FormXeChung'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung';

const imageLocation = '../../../image/location.png'

class FromChungXe extends Component {

    renderPickAddress() {
        return (
            <ImageInputTextDiChung
                noBorderTop
                onPress={this.props.onPressPickAddress}
                source={require(imageLocation)}
                placeholder={'Nhập điểm nhận xe'}
                value={this.props.pick_add}
            />
        )
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }} >
                <View style={{ flex: 1 }}>
                    {this.renderPickAddress()}
                    <View style={{ flexDirection: 'row', height: 40, }}>
                        <TouchableOpacity
                            style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", alignItems: 'center', flexDirection: 'row', }}
                            onPress={this.props.onPressSelectTimeRent}
                        >
                            <Image
                                style={{ height: 24, width: 24, margin: 8 }}
                                source={require('../../../image/time.png')}
                            />

                            <TextInput
                                value={this.props.depart_time}
                                placeholder='Thời gian nhận xe'
                                placeholderTextColor={'#333333'}
                                onTouchStart={this.props.onPressSelectTimeRent}
                                pointerEvents='none'
                                style={{ fontSize: 14, flex: 1, color: '#000' }}
                                editable={false}
                            />

                        </TouchableOpacity>
                        <View style={{ width: 1, backgroundColor: '#e8e8e8' }}></View>
                        <TouchableOpacity
                            style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", flexDirection: 'row', alignItems: 'center' }}
                            onPress={this.props.onPressSelectTimeReturn}
                        >
                            <Image
                                style={{ height: 24, width: 24, margin: 8 }}
                                source={require('../../../image/time.png')}
                            />
                            <TextInput
                                editable={false}
                                value={this.props.returnTime}
                                placeholder='Thời gian trả xe'
                                placeholderTextColor={'#333333'}
                                onTouchStart={this.props.onPressSelectTimeReturn}
                                pointerEvents='none'
                                style={{ fontSize: 14, flex: 1, color: '#000' }}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={{ borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", alignItems: 'center', flexDirection: 'row', }}
                        onPress={this.props.onPressVehicle}
                    >
                        <Image
                            style={{ height: 24, width: 24, margin: 8 }}
                            source={require('../../../image/arrowdown.png')}
                        />

                        <TextInput
                            value={this.props.vehicleName}
                            placeholder='Chọn loại xe'
                            placeholderTextColor={'#333333'}
                            onTouchStart={this.props.onPressVehicle}
                            pointerEvents='none'
                            style={{ fontSize: 14, flex: 1, color: '#000' }}
                            editable={false}
                        />

                        <Image
                            style={{ height: 24, width: 24, margin: 8 }}
                            source={require('../../../image/arrowdown.png')}
                        />

                    </TouchableOpacity>
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
        returnTime: state.info.returnTime,
        vehicleType: state.info.vehicleType,
        vehicleName: state.info.vehicleName,
    }
}

export default connect(mapStateToProps)(FromChungXe)