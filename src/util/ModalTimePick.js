import React, { Component } from 'react'
import { View, Modal, Text } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';
import { setModalTime, setTimePick, setTimeDrop, } from '../core/Redux/action/Action'
class ModalTimePick extends Component {

    render() {
        return (
            <DateTimePickerModal
                isVisible={this.props.modalPick || this.props.modalDrop}
                mode='datetime'
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
                minimumDate={this.props.modalDrop ? new Date(this.props.this.props.TimePick + '+07:00').toISOString() : new Date((new Date()) / 900000 * 900000).toISOString()}
                minuteInterval={15}
            />
        )
    }



    handleConfirm = (date) => {
        console.log('123')
        console.log(date)
        if (this.props.modalPick) {
            this.props.setTimePick(date)
            this.hideDatePicker()
        } else {
            this.props.setTimeDrop(date)
            this.hideDatePicker()
        }
    }

    hideDatePicker = () => {
        this.props.setModalTime(false, false)
    }
}


function mapStateToProps(state) {
    return {
        modalPick: state.info.modalPick,
        modalDrop: state.info.modalDrop,
        TimePick: state.info.TimePick,
        TimeDrop: state.info.TimeDrop,
    }
}
export default connect(mapStateToProps, { setModalTime: setModalTime, setTimeDrop: setTimeDrop, setTimePick: setTimePick })(ModalTimePick);