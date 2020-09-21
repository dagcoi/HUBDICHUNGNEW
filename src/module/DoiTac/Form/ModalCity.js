import React, { Component } from 'react'
import { Modal, FlatList, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addItemCity, showModalCity } from '../../../core/Redux/action/Action'
import Toast from 'react-native-simple-toast';

class ModalCity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: null,
        }
    }

    componentDidMount() {
        this.setState({
            items: [
                { 'value': 0, 'label': 'Hà Nội', 'hide':'0' },
                { 'value': 1, 'label': 'TP.HCM', 'hide':'0' },
                { 'value': 2, 'label': 'Đà Nẵng', 'hide':'1' },
                { 'value': 3, 'label': 'Hải Phòng', 'hide':'1' },
            ]
        })
    }
    render() {
        return (
            <Modal
                visible={this.props.modalCity}
                transparent={true}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000000AA' }}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => this.props.showModalCity(false)}
                    >

                    </TouchableOpacity>
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <FlatList
                            data={this.state.items}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => { item.hide=='0'? this.props.addItemCity(item) : Toast.show('Khu vực sẽ sớm được hỗ trợ',Toast.SHORT) }}
                                        style={{ justifyContent: "center", alignItems: 'baseline', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 0.5, borderColor: '#e8e8e8' }}>
                                        <Text style={{ color:item.hide=='0'? this.props.itemCity?.label == item.label ? '#77a300' : '#333': '#e8e8e8', fontSize: 18, backgroundColor: this.props }}>{item.label}</Text>
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
        modalCity: state.rdOperator.modalCity,
        itemCity: state.rdOperator.itemCity
    }
}

export default connect(mapStateToProps, { addItemCity: addItemCity, showModalCity: showModalCity })(ModalCity);