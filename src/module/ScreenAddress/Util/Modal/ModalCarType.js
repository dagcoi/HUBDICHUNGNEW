import React, { Component } from 'react'
import { Modal, SafeAreaView, View, TouchableOpacity, Image, FlatList, Text } from 'react-native'
import { connect } from 'react-redux';
import { addCarType, setModalCarType } from '../../../../core/Redux/action/Action'

const imageCheck = '../../../../image/done.png'

class ModalCarType extends Component {
    constructor(props){
        super(props)
        this.state={
            listCar: []
        }
    }
    componentDidMount() {
        this.setState({
            listCar: [
                { 'id': 1, 'carname': 'Tất cả loại xe', 'listCarType': '0' },
                { 'id': 2, 'carname': 'Xe 4 chỗ cốp rộng', 'listCarType': '1' },
                { 'id': 3, 'carname': 'Xe 7 chỗ', 'listCarType': '2' },
                { 'id': 4, 'carname': 'Xe 16 chỗ', 'listCarType': '24' },
            ],
        })
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalCarType}
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
                            onPress={() => { this.props.setModalCarType(false) }}
                            style={{ flex: 1 }}
                        ></TouchableOpacity>
                    </View>
                    <FlatList
                        style={{ flex: 1, backgroundColor: '#ffffff' }}
                        data={this.state.listCar}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', borderBottomColor: '#e8e8e8', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    this.props.setModalCarType(false)
                                    this.props.addCarType(item.carname, item.listCarType)
                                }}
                            >
                                <Text style={{ fontSize: 16, flex: 1, padding: 8, color: item.carname === this.state.carType ? '#77a300' : '#000000' }}>{item.carname}</Text>
                                {item.listCarType === this.props.carType ? <Image
                                    style={{ height: 24, width: 24, marginLeft: 8 }}
                                    source={require(imageCheck)}
                                /> : null}
                            </TouchableOpacity>}
                        keyExtractor={item => item.carname}
                    />

                </SafeAreaView>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        returnTime: state.info.returnTime,
        carType: state.info.carType,
        modalCarType: state.info.modalCarType, 
        product_chunk_type: state.info.product_chunk_type,
    }
}
export default connect(mapStateToProps, { addCarType: addCarType, setModalCarType: setModalCarType })(ModalCarType)