import React, { Component } from 'react'
import { Modal, FlatList, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addItemConfirm, showModalConfirm } from '../../../core/Redux/action/Action'

class ModalConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: null,
        }
    }

    componentDidMount() {
        this.setState({
            items: [
                { 'value': 0, 'label': 'Không tự động chấp nhận đặt xe', },
                { 'value': 1, 'label': 'Tự động chấp nhận đặt xe', },
            ]
        })
    }
    render() {
        return (
            <Modal
                visible={this.props.modalConfirm}
                transparent={true}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000000AA' }}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => this.props.showModalConfirm(false)}
                    >

                    </TouchableOpacity>
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <FlatList
                            data={this.state.items}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => { this.props.addItemConfirm(item) }}
                                        style={{ justifyContent: "center", alignItems: 'baseline', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 0.5 }}>
                                        <Text style={{ color: this.props.itemConfirm?.label == item.label ? '#77a300' : '#333', fontSize: 18, backgroundColor: this.props }}>{item.label}</Text>
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
        modalConfirm: state.rdOperator.modalConfirm,
        itemConfirm: state.rdOperator.itemConfirm
    }
}

export default connect(mapStateToProps, { addItemConfirm: addItemConfirm, showModalConfirm: showModalConfirm })(ModalConfirm);