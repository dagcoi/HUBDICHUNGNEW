import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ImageInputTextDiChung from '../../../component/ImageInputTextDiChung'


const imageLocation = '../../../image/location.png'
const imageTime = '../../../image/time.png'
const imageHourglass = '../../../image/hourglass.png'
const imageCar = '../../../image/iconcar.png'

class FormHourlyTravel extends Component {

    constructor() {
        super();
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

    renderHourglass() {
        return (
            <ImageInputTextDiChung
                onPress={this.props.onPressHourglass}
                source={require(imageHourglass)}
                placeholder={'Chọn số giờ'}
                value={(this.props.durationTravel)/24 + ' ngày'}
                imageRight={true}
            />
        )
    }

    renderCarType() {
        return (
            <ImageInputTextDiChung
                onPress={this.props.onPressCarType}
                source={require(imageCar)}
                placeholder={'Chọn loại xe'}
                value={this.props.carType}
                imageRight={true}
            />
        )
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



    render() {
        return (
            <View style={{ flexDirection: 'row' }} >
                <View style={{ flex: 1 }}>
                    {this.renderPickAddress()}
                    <View style={{ height: 40, flexDirection: 'row', }}>
                        {this.renderTimePick()}
                    </View>
                    <View style={{ height: 40, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#e8e8e8', }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            {this.renderHourglass()}
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
        durationTravel: state.info.durationTravel,
    }
}


export default connect(mapStateToProps)(FormHourlyTravel)
