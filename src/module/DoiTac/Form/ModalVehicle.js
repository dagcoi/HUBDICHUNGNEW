import React, { Component } from 'react'
import { Modal, FlatList, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addItemVehicle, showModalVehicle } from '../../../core/Redux/action/Action'
import Toast from 'react-native-simple-toast';

class ModalVehicle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: null,
        }
    }

    componentDidMount() {
        this.setState({
            items: [
                { 'value': 'motorbike', 'label': 'Xe máy' },
                { 'value': 'car', 'label': 'Ô tô' },
            ]
        })
    }
    render() {
        return (
            <Modal
                visible={this.props.modalVehicle}
                transparent={true}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000000AA' }}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => this.props.showModalVehicle(false)}
                    >
                    </TouchableOpacity>
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <FlatList
                            data={this.state.items}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {  this.props.addItemVehicle(item)}}
                                        style={{ justifyContent: "center", alignItems: 'baseline', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 0.5, borderColor: '#e8e8e8' }}>
                                        <Text style={{ color:  this.props.itemVehicle?.label == item.label ? '#77a300' : '#333' , fontSize: 18, backgroundColor: this.props }}>{item.label}</Text>
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
        modalVehicle: state.rdOperator.modalVehicle,
        itemVehicle: state.rdOperator.itemVehicle
    }
}

export default connect(mapStateToProps, { addItemVehicle: addItemVehicle, showModalVehicle: showModalVehicle })(ModalVehicle);