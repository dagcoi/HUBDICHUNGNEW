import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung';
import { connect } from 'react-redux';
import { SvgArrowDown, SvgCalendar, SvgClock, SvgPeople, SvgPick, SvgVehicle } from '../../../icons';
import { FormSelectVehicleSlot, ModalSlot, ModalVehicle } from '../../DoiTac/Form';
import { showModalVehicle, showModalSlot } from '../../../core/Redux/action/Action'
import Toast from 'react-native-simple-toast';

const imageLocation = '../../../image/location.png'
const imagePeople = '../../../image/people.png'
const imageDown = '../../../image/arrowdown.png'
const imageTime = '../../../image/time.png'

class FormRideShare extends Component {

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
                placeholder={'Chọn giờ đi'}
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
                placeholder={'Nhập điểm xuất phát'}
                value={this.props.pick_add}
            />
        )
    }

    renderDropAddress() {
        return (
            <ImageInputTextDiChung
                children={<SvgPick color={'#eb6752'} />}
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
                    {this.renderTimePick()}

                    {/* <View style={{ flexDirection: 'row', height: 40, }}>
                        <View style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', }}>
                            {this.renderTimePick()}
                        </View>
                        <View style={{ width: 1, backgroundColor: '#e8e8e8' }}></View>
                        <TouchableOpacity
                            style={{ flex: 1, borderTopWidth: 1, borderColor: '#e8e8e8', justifyContent: "center", flexDirection: 'row', alignItems: 'center', }}
                            onPress={this.props.onPressSelectSlot}
                        >
                            <View style={{ padding: 4 }}>
                                <SvgPeople />
                            </View>
                            <Text style={{ flex: 1 }}>{this.props.chair} người</Text>
                            <SvgArrowDown />
                        </TouchableOpacity>
                    </View> */}

                    <FormSelectVehicleSlot
                        onPress={this.showModalVehicle}
                        placeholder={'Chọn phương tiện'}
                        value={this.props.itemVehicle?.label}
                        onPress2={this.props.onPressSelectSlot}
                        placeholder2={'Chọn số chỗ'}
                        children={<SvgVehicle />}
                        children2={<SvgPeople />}
                        value2={this.props.chair + ' người'}
                    />
                    <ModalSlot />
                    <ModalVehicle />

                </View>
            </View>
        )
    }
    showModalSlot = () => {
        if (this.props.itemVehicle?.label) {
            this.props.itemVehicle.label == 'Xe máy' ? Toast.show('Xe máy không chọn được chỗ', Toast.SHORT) : this.props.onPressSelectSlot
        } else {
            Toast.show('Vui lòng chọn phương tiện trước.')
        }
    }
    showModalVehicle = () => { this.props.showModalVehicle(true) }

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
        itemVehicle: state.rdOperator.itemVehicle,
        itemSlot: state.rdOperator.itemSlot,
    }
}

export default connect(mapStateToProps, {
    showModalVehicle: showModalVehicle,
    showModalSlot: showModalSlot,
})(FormRideShare);