import React, { Component } from 'react'
import { Modal, SafeAreaView, View, TouchableOpacity, Image, FlatList, Text } from 'react-native'
import { connect } from 'react-redux';
import { addVehicleType, setModalVehicleType } from '../../../../core/Redux/action/Action'

const imageCheck = '../../../../image/done.png'

class ModalVehicleType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listVehicle: []
        }
    }
    componentDidMount() {
        this.setState({
            listVehicle: [
                {
                    "id": 1,
                    "VehicleName": "Xe máy",
                    "VehicleType": "motorbike"
                },
                {
                    "id": 2,
                    "VehicleName": "Ô tô",
                    "VehicleType": "car"
                }
            ]
        })
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVehicleType}
                // onOrientationChange={true}
                onRequestClose={() => {
                    console.log('a');
                }}
            >
                <SafeAreaView style={{
                    flex: 2,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity
                            onPress={() => { this.props.setModalVehicleType(false) }}
                            style={{ flex: 1 }}
                        ></TouchableOpacity>
                    </View>
                    <FlatList
                        style={{ flex: 1, backgroundColor: '#ffffff' }}
                        data={this.state.listVehicle}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    this.props.setModalVehicleType(false)
                                    this.props.addVehicleType(item.VehicleType, item.VehicleName)
                                }}
                            >
                                <Text style={{ fontSize: 16, flex: 1, padding: 8, color: item.VehicleName === this.state.VehicleType ? '#77a300' : '#000000' }}>{item.VehicleName}</Text>
                                {item.VehicleType === this.props.vehicleType ? <Image
                                    style={{ height: 24, width: 24, marginLeft: 8 }}
                                    source={require(imageCheck)}
                                /> : null}
                            </TouchableOpacity>}
                        keyExtractor={item => item.VehicleName}
                    />

                </SafeAreaView>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        returnTime: state.info.returnTime,
        vehicleType: state.info.vehicleType,
        modalVehicleType: state.info.modalVehicleType
    }
}
export default connect(mapStateToProps, { addVehicleType: addVehicleType, setModalVehicleType: setModalVehicleType })(ModalVehicleType)