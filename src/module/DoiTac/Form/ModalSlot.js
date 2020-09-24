import React, { Component } from 'react'
import { Modal, FlatList, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addItemSlot, showModalSlot } from '../../../core/Redux/action/Action'
import Toast from 'react-native-simple-toast';

class ModalSlot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: null,
        }
    }

    componentDidMount() {
        this.setState({
            items: [
                { 'value': 0, 'label': '1' },
                { 'value': 1, 'label': '2' },
                { 'value': 2, 'label': '3' },
                { 'value': 3, 'label': '4' },
                { 'value': 4, 'label': '5' },
                { 'value': 5, 'label': '6' },
                { 'value': 6, 'label': '7' },
                { 'value': 7, 'label': '8' },
                { 'value': 8, 'label': '9' },
                { 'value': 9, 'label': '10' },
                { 'value': 10, 'label': '11' },
                { 'value': 11, 'label': '12' },
                { 'value': 12, 'label': '13' },
                { 'value': 13, 'label': '14' },
                { 'value': 14, 'label': '15' },
                { 'value': 15, 'label': '16' },
            ]
        })
    }
    render() {
        return (
            <Modal
                visible={this.props.modalSlot}
                transparent={true}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000000AA' }}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => this.props.showModalSlot(false)}
                    >
                    </TouchableOpacity>
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <FlatList
                            data={this.state.items}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {  this.props.addItemSlot(item)}}
                                        style={{ justifyContent: "center", alignItems: 'baseline', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 0.5, borderColor: '#e8e8e8' }}>
                                        <Text style={{ color:  this.props.itemSlot?.label == item.label ? '#77a300' : '#333' , fontSize: 18, backgroundColor: this.props }}>{item.label+ ' Chỗ'}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={(items, index) => { index.toString() }}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        modalSlot: state.rdOperator.modalSlot,
        itemSlot: state.rdOperator.itemSlot
    }
}

export default connect(mapStateToProps, { addItemSlot: addItemSlot, showModalSlot: showModalSlot })(ModalSlot);