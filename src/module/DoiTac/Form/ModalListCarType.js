import React, { Component } from 'react'
import { Modal, FlatList, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addItemCarOperator1, showModalOperator1 } from '../../../core/Redux/action/Action'

class ModalListCarType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: null,
        }
    }

    componentDidMount() {
        this.setState({
            items: [
                { 'value': '4', 'label': '4 chỗ cốp nhỏ' },
                { 'value': '4', 'label': '4 chỗ cốp rộng' },
                { 'value': '7', 'label': '7 chỗ' },
                { 'value': '9', 'label': 'Limousine 9 chỗ' },
                { 'value': '16', 'label': '16 chỗ' }
            ]
        })
    }
    render() {
        return (
            <Modal
                visible={this.props.modalCarTypeOperator1}
                transparent={true}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000000AA' }}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => this.props.showModalOperator1(false)}
                    >

                    </TouchableOpacity>
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <FlatList
                            data={this.state.items}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => { this.props.addItemCarOperator1(item) }}
                                        style={{ justifyContent: "center", alignItems: 'baseline', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 0.5 }}>
                                        <Text style={{ color: this.props.itemCarOperator1?.label === item.label ? '#77a300' : '#333', fontSize: 18, backgroundColor: this.props }}>{item.label}</Text>
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
        modalCarTypeOperator1: state.rdOperator.modalCarTypeOperator1,
        itemCarOperator1: state.rdOperator.itemCarOperator1
    }
}

export default connect(mapStateToProps, { addItemCarOperator1: addItemCarOperator1, showModalOperator1: showModalOperator1 })(ModalListCarType);