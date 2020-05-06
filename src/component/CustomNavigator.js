import React, { Component } from 'react'
import { View, Image, Text, AsyncStorage, TouchableOpacity } from 'react-native'
import { DrawerItems, DrawerView } from 'react-navigation-drawer'

const imageAvatar = '../image/logo_dc_taxi.png'


class CustomNavigator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            infoCustommer: {},
            idCustommer: ''
        }
    }

    componentDidMount(){
        this._retrieveData()
    }

    componentDidUpdate() {
        this._retrieveData()
    }

    _retrieveData = async () => {
        try {
            const dataLogin = await AsyncStorage.getItem('dataLogin')
            if (dataLogin !== null) {
                let json = JSON.parse(dataLogin)
                // console.log(dataLogin)
                // console.log(json.token)
                this.setState({ infoCustommer: json, idCustommer: json._id })
            } else {
                this.setState({
                    infoCustommer: {},
                    idCustommer: ''
                })
            }
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => {
                        this.state.idCustommer == '' ?
                            this.props.navigation.navigate('Login')
                            : this.props.navigation.navigate('Profile')
                    }}
                    style={{ height: 60, alignItems: 'center', padding: 16, flexDirection: 'row', borderColor: '#e8e8e8', borderBottomWidth: 1 }}
                >
                    {/* Avatar */}
                    {this.state.idCustommer == '' ? null :
                        <Image
                            source={require(imageAvatar)}
                            style={{ height: 40, width: 40, borderRadius: 40, borderWidth: 1, borderColor: '#e8e8e8' }}
                        />
                    }
                    <Text style={{ color: '#77a300', fontSize: 16, marginLeft: 16, flex: 1, fontWeight: 'bold' }}>{this.state.infoCustommer.username ?? 'Đăng nhập'}</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <DrawerItems {...this.props} />
                </View>
            </View>
        )
    }
}

export default CustomNavigator;