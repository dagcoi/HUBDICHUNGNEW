import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung';
import { connect } from 'react-redux';
import { SvgClock, SvgPick } from '../../../icons';

const imageLocation = '../../../image/location.png'
const imagePeople = '../../../image/people.png'
const imageDown = '../../../image/arrowdown.png'
const imageTime = '../../../image/time.png'

class FormChungXeTuyen extends Component {

    constructor(props) {
        super(props);
    }

    renderTimePick() {
        return (
            <ImageInputTextDiChung
                children={<SvgClock />}
                widthHeightImage={24}
                onPress={this.props.onPressSelectTime}
                source={require(imageTime)}
                placeholder={'Chọn giờ nhận xe'}
                value={this.props.depart_time}
            />
        )
    }

    renderPickAddress() {
        return (
            <ImageInputTextDiChung
                children={<SvgPick />}
                noBorderTop
                onPress={this.props.onPressPickAddress}
                source={require(imageLocation)}
                placeholder={'Nhập điểm nhận xe'}
                value={this.props.pick_add}
            />
        )
    }

    renderDropAddress() {
        return (
            <ImageInputTextDiChung
                children={<SvgPick />}
                onPress={this.props.onPressDropAddress}
                source={require(imageLocation)}
                placeholder={'Nhập điểm trả xe'}
                value={this.props.drop_add}
                onPressSwap={this.props.onPressSwap}
            />
        )
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingHorizontal: 8 }}>
                    {this.renderPickAddress()}
                    {this.renderDropAddress()}

                    <View style={{ flexDirection: 'row', height: 40, }}>
                        <View style={{ flex: 1 }}>
                            {this.renderTimePick()}
                        </View>
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
        returnTime: state.info.returnTime,
    }
}

export default connect(mapStateToProps)(FormChungXeTuyen);