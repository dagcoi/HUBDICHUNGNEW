import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung';
import { connect } from 'react-redux';

const imageLocation = '../../../image/location.png'
const imagePeople = '../../../image/people.png'
const imageDown = '../../../image/arrowdown.png'
const imageTime = '../../../image/time.png'

class FormTruckDoor extends Component {

    constructor(props) {
        super(props);
    }

    renderTimePick() {
        return (
            <View style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", alignItems: 'center', flexDirection: 'row', }}
            >
                <ImageInputTextDiChung
                    widthHeightImage={24}
                    onPress={this.props.onPressSelectTime}
                    source={require(imageTime)}
                    placeholder={'Chọn giờ đi'}
                    value={this.props.depart_time}
                />
            </View>
        )
    }

    renderPickAddress() {
        return (
            <ImageInputTextDiChung
                noBorderTop
                onPress={this.props.onPressPickAddress}
                source={require(imageLocation)}
                placeholder={'Nhập điểm xuất phát'}
                value={this.props.pick_add}
            />
        )
    }

    renderDropAddress() {
        return (
            <ImageInputTextDiChung
                onPress={this.props.onPressDropAddress}
                source={require(imageLocation)}
                placeholder={'Nhập điểm đến'}
                value={this.props.drop_add}
                onPressSwap={this.props.onPressSwap}
            />
        )
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    {this.renderPickAddress()}
                    {this.renderDropAddress()}

                    <View style={{ flexDirection: 'row', height: 40, }}>
                        {this.renderTimePick()}
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
    }
}

export default connect(mapStateToProps)(FormTruckDoor);