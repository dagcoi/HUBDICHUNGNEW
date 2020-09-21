import React, { Component } from 'react'
import { Modal, FlatList, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addItemTransmission, showModalTransmission } from '../../../core/Redux/action/Action'

class ModalTransmission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: null,
        }
    }

    componentDidMount() {
        this.setState({
            items: [
                { 'value': 'manual', 'label': 'Số sàn', },
                { 'value': 'auto', 'label': 'Số tự động', },
            ]
        })
    }
    render() {
        return (
            <Modal
                visible={this.props.modalTransmission}
                transparent={true}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000000AA' }}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => this.props.showModalTransmission(false)}
                    >

                    </TouchableOpacity>
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <FlatList
                            data={this.state.items}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => { this.props.addItemTransmission(item) }}
                                        style={{ justifyContent: "center", alignItems: 'baseline', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 0.5 }}>
                                        <Text style={{ color: this.props.itemTransmission?.label == item.label ? '#77a300' : '#333', fontSize: 18, backgroundColor: this.props }}>{item.label}</Text>
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
        modalTransmission: state.rdOperator.modalTransmission,
        itemTransmission: state.rdOperator.itemTransmission
    }
}

export default connect(mapStateToProps, { addItemTransmission: addItemTransmission, showModalTransmission: showModalTransmission })(ModalTransmission);