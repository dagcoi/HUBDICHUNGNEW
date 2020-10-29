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
            item: null,
        }
    }

    closeModal = () => {
        this.props.showModalTimePick(false)
        this.props.showModalTimeDrop(false)
    }

    render() {
        return (
            <Modal
                visible={this.props.modalTimePick || this.props.modalTimeDrop}
                transparent={true}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000000AA' }}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={this.closeModal}
                    >

                    </TouchableOpacity>
                    {/* <View style={{ flex: 1, backgroundColor: '#fff' }}> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 8 }}>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 8 }}
                            onPress={this.closeModal}
                        >
                            <Text style={{ fontSize: 20, color: '#ef465f', fontWeight: 'bold', textDecorationLine: 'underline' }}>Hủy</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.props.modalTimeDrop ? 'Thời gian ngừng' : 'Thời gian bắt đầu'}</Text>
                        </View>
                        <TouchableOpacity
                            style={{ backgroundColor: '#77a300', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 }}
                            onPress={this.pressSelectTime}
                        >
                            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Chọn</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        ref={ref => this.refFL = ref}
                        style={{ flex: 1, backgroundColor: '#ffffff' }}
                        data={listHour}
                        renderItem={({ item, index }) => {
                            // const color = this.props.modalTimePick ? this.props.idTimePick == item.id ? '#fff' : '#333' : this.props.idTimeDrop == item.id ? '#fff' : '#333'
                            const color = this.state.item == item ? '#fff' : '#333'
                            const backgroundColor = this.state.item == item ? '#77a300' : '#fff'
                            // const backgroundColor = this.props.modalTimePick ? this.props.idTimePick == item.id ? '#77a300' : '#fff' : this.props.idTimeDrop == item.id ? '#77a300' : '#fff'
                            return (
                                <TouchableOpacity
                                    onPress={() => this.onPressItem(item)}
                                    style={{ flexDirection: 'row', height: 40 }}>
                                    <Text style={{ textAlign: 'center', flex: 1, padding: 8, color: color, fontSize: 18, fontWeight: '500', backgroundColor: backgroundColor }} >{`${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minus < 10 ? '0' + item.minus : item.minus}`}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        initialScrollIndex={this.props.modalTimeDrop ? this.props.idTimeDrop ?? 200 : this.props.idTimePick ?? 96}
                        // scrollToIndex={this.props.modalTimeDrop ? this.props.idTimeDrop - 1 ?? 200 : this.props.idTimePick - 1 ?? 96}
                        // scrollToOffset={(this.props.modalTimeDrop ? this.props.idTimeDrop - 1 ?? 200 : this.props.idTimePick - 1 ?? 96) * 40.5}
                        // scrollToIndex={this.getScrollToItem}
                        keyExtractor={(items, index) => { index.toString() }}
                        getItemLayout={this.getItemLayout}
                    />
                    {/* </View> */}
                </SafeAreaView>
            </Modal>
        )
    }


    getItemLayout = (data, index) => (
        { length: 40, index, offset: 40 * index }
    )

    pressSelectTime = () => {
        const { item } = this.state;
        if (item != null) {
            if (this.props.modalTimeDrop) {
                if (this.props.idTimePick && this.props.idTimePick >= item.id) {
                    Toast.show('Giờ dừng nhận chuyến không phù hợp', Toast.SHORT);
                } else {
                    this.props.addTimeDrop(item.id, `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minus < 10 ? '0' + item.minus : item.minus}`)
                }
            }
            if (this.props.modalTimePick) {
                if (this.props.idTimeDrop && this.props.idTimeDrop <= item.id) {
                    Toast.show('Giờ bắt đầu nhận chuyến không phù hợp', Toast.SHORT);
                } else {
                    this.props.addTimePick(item.id, `${item.hour < 10 ? '0' + item.hour : item.hour}:${item.minus < 10 ? '0' + item.minus : item.minus}`)
                }
            }
        } else {
            Toast.show('Vui lòng chọn thời gian trước', Toast.SHORT)
        }
    }

    onPressItem(item) {
        console.log(item.id)
        // if (this.state.items != item) {
        this.setState({ item: item })
        this.refFL.scrollToIndex({ animated: true, index: item.id > 3 ? item.id - 3 : 0 })
        // } else {

        // }
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