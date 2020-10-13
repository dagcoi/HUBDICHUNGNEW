import React, { Component } from 'react'
import { Modal, FlatList, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addItemTypePrice, showModalTypePrice } from '../../../core/Redux/action/Action'

class ModalPriceType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: null,
        }
    }

    componentDidMount() {
        this.setState({
            items: [
                { 'value': 'per_unit', 'label': 'Giá thuê một ghế' },
                { 'value': 'full_trip', 'label': 'Giá bao cả xe' },
            ]
        })
    }
    render() {
        return (
            <Modal
                visible={this.props.modalTypePrice}
                transparent={true}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000000AA' }}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => this.props.showModalTypePrice(false)}
                    >

                    </TouchableOpacity>
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <FlatList
                            data={this.state.items}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => { this.props.addItemTypePrice(item) }}
                                        style={{ justifyContent: "center", alignItems: 'baseline', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 0.5 }}>
                                        <Text style={{ color: this.props.itemTypePrice?.label === item.label ? '#77a300' : '#333', fontSize: 18, backgroundColor: this.props }}>{item.label}</Text>
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
        modalTypePrice: state.rdOperator.modalTypePrice,
        itemTypePrice: state.rdOperator.itemTypePrice
    }
}

export default connect(mapStateToProps, { addItemTypePrice: addItemTypePrice, showModalTypePrice: showModalTypePrice })(ModalPriceType);