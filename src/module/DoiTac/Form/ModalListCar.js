import React, { Component } from 'react'
import { Modal, FlatList, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addItemCarOperator, showModalOperator } from '../../../core/Redux/action/Action'

class ModalListCar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: null,
        }
    }

    componentDidMount() {
        this.setState({
            items: [
                { 'value': 'sedan', 'label': 'Sedan', },
                { 'value': 'suv', 'label': 'SUV', },
                { 'value': 'pick_up_truck', 'label': 'Xe bán tải', },
                { 'value': 'cuv', 'label': 'CUV', },
                { 'value': 'mpv', 'label': 'MPV', },
                { 'value': 'hatchback', 'label': 'Hatchback', },
                { 'value': 'truck', 'label': 'Xe tải nhỏ', },
                { 'value': 'van', 'label': 'Van', },
                { 'value': 'city_car', 'label': 'Xe 4 chỗ cốp nhỏ', },
                { 'value': 'sport_car', 'label': 'Xe thể thao', },
                { 'value': 'couple', 'label': 'Couple', },
                { 'value': 'convertible', 'label': 'Mui trần', },
                { 'value': 'wagon', 'label': 'Wagon', },
                { 'value': 'special_purpose', 'label': 'Xe tải lớn', },
            ]
        })
    }
    render() {
        return (
            <Modal
                visible={this.props.modalCarTypeOperator}
                transparent={true}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000000AA' }}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => this.props.showModalOperator(false)}
                    >

                    </TouchableOpacity>
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <FlatList
                            data={this.state.items}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => { this.props.addItemCarOperator(item) }}
                                        style={{ justifyContent: "center", alignItems: 'baseline', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 0.5 }}>
                                        <Text style={{ color: this.props.itemCarOperator?.label == item.label ? '#77a300' : '#333', fontSize: 18, backgroundColor: this.props }}>{item.label}</Text>
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
        modalCarTypeOperator: state.rdOperator.modalCarTypeOperator,
        itemCarOperator: state.rdOperator.itemCarOperator
    }
}

export default connect(mapStateToProps, { addItemCarOperator: addItemCarOperator, showModalOperator: showModalOperator })(ModalListCar);