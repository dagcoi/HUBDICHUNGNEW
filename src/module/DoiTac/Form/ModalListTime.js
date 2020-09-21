import React, { Component } from 'react'
import { Modal, FlatList, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addTimePick, addTimeDrop, showModalTimePick, showModalTimeDrop } from '../../../core/Redux/action/Action'
import { listHour } from './listHourly'
import Toast from 'react-native-simple-toast';

class ModalListCar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: null,
        }
    }

    render() {
        return (
            <Modal
                visible={this.props.modalTimePick || this.props.modalTimeDrop}
                transparent={true}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000000AA' }}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => {
                            this.props.showModalTimePick(false)
                            this.props.showModalTimeDrop(false)
                        }}
                    >

                    </TouchableOpacity>
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <FlatList
                            data={listHour}
                            renderItem={({ item, index }) => {
                                const color = this.props.modalTimePick ? this.props.idTimePick == item.id ? '#fff' : '#333' : this.props.idTimeDrop == item.id ? '#fff' : '#333'
                                const backgroundColor = this.props.modalTimePick ? this.props.idTimePick == item.id ? '#77a300' : '#fff' : this.props.idTimeDrop == item.id ? '#77a300' : '#fff'
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.onPressItem(item)}
                                        style={{ justifyContent: "center", alignItems: 'baseline', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 0.5, alignItems: 'center', backgroundColor: backgroundColor, borderColor: '#e8e8e8', height: 40 }}>
                                        <Text style={{ color: color, fontSize: 18, fontWeight: '500' }} >{`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minus < 10 ? '0' + item.minus : item.minus}`}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                            initialScrollIndex={this.props.modalTimeDrop ? this.props.idTimeDrop ?? 200 : this.props.idTimePick ?? 96}
                            keyExtractor={(items, index) => { index.toString() }}
                            getItemLayout={this.getItemLayout}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }


    getItemLayout = (data, index) => (
        { length: 40, offset: 40 * index, index }
    )

    onPressItem(item) {
        if (this.props.modalTimeDrop) {
            if (this.props.idTimePick && this.props.idTimePick > item.id) {
                Toast.show('Giờ dừng nhận chuyến không phù hợp', Toast.LONG);
            } else {
                this.props.addTimeDrop(item.id, `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minus < 10 ? '0' + item.minus : item.minus}`)
            }
        }
        if (this.props.modalTimePick) {
            if (this.props.idTimeDrop && this.props.idTimeDrop < item.id) {
                Toast.show('Giờ bắt đầu nhận chuyến không phù hợp', Toast.LONG);
            } else {
                this.props.addTimePick(item.id, `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minus < 10 ? '0' + item.minus : item.minus}`)
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        idTimePick: state.rdOperator.idTimePick,
        idTimeDrop: state.rdOperator.idTimeDrop,
        modalTimePick: state.rdOperator.modalTimePick,
        modalTimeDrop: state.rdOperator.modalTimeDrop,
    }
}

export default connect(mapStateToProps, {
    addTimePick: addTimePick,
    addTimeDrop: addTimeDrop,
    showModalTimePick: showModalTimePick,
    showModalTimeDrop: showModalTimeDrop,
})(ModalListCar);