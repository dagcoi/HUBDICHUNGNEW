import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import FormXeChung from '../../XeChung/MapXeChung/FormXeChung'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung';
import { SvgClock, SvgPick, SvgPosition, SvgVehicle, SvgArrowDown } from '../../../icons';

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
                children={<SvgPick />}
            />
        )
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }} >
                <View style={{ flex: 1, paddingHorizontal: 8 }}>
                    {this.renderPickAddress()}
                    <View style={{ flexDirection: 'row', height: 40 }}>
                        <TouchableOpacity
                            style={{ paddingLeft: 4, flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", alignItems: 'center', flexDirection: 'row', }}
                            onPress={this.props.onPressSelectTimeRent}
                        >
                            <SvgClock />
                            <TextInput
                                value={this.props.depart_time}
                                placeholder='Thời gian nhận xe'
                                placeholderTextColor={'#333333'}
                                onTouchStart={this.props.onPressSelectTimeRent}
                                pointerEvents='none'
                                style={{ marginLeft: 12, fontSize: 14, flex: 1, color: '#000' }}
                                editable={false}
                            />
                        </TouchableOpacity>
                        <View style={{ width: 1, backgroundColor: '#e8e8e8' }}></View>
                        <TouchableOpacity
                            style={{ paddingLeft: 4, flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", flexDirection: 'row', alignItems: 'center' }}
                            onPress={this.props.onPressSelectTimeReturn}
                        >
                            <SvgClock />
                            <TextInput
                                editable={false}
                                value={this.props.returnTime}
                                placeholder='Thời gian trả xe'
                                placeholderTextColor={'#333333'}
                                onTouchStart={this.props.onPressSelectTimeReturn}
                                pointerEvents='none'
                                style={{ marginLeft: 8, fontSize: 14, flex: 1, color: '#000' }}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={{ borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", alignItems: 'center', flexDirection: 'row', height: 40 }}
                        onPress={this.props.onPressVehicle}
                    >
                        <View style={{ width: 28, height: 28, justifyContent: "center", alignItems: "center" }}>
                            <SvgVehicle />
                        </View>
                        <TextInput
                            value={this.props.vehicleName}
                            placeholder='Chọn loại xe'
                            placeholderTextColor={'#333333'}
                            onTouchStart={this.props.onPressVehicle}
                            pointerEvents='none'
                            style={{ marginLeft: 8, fontSize: 14, flex: 1, color: '#000' }}
                            editable={false}
                        />

                        <SvgArrowDown />

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