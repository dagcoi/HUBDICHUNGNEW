import React, { Component } from 'react'
import { View, Image, Text, AsyncStorage, TouchableOpacity, AppState, SafeAreaView } from 'react-native'
import { DrawerNavigatorItems, DrawerView } from 'react-navigation-drawer'
import { connect } from 'react-redux'

const imageAvatar = '../image/logo_dc_taxi.png'


class CustomNavigator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            infoCustommer: {},
            idCustommer: '',
        }
    }

    render() {
        console.log(this.props.link_avatar)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.isLogin == 0 ?
                            this.props.navigation.navigate('Login')
                            : this.props.navigation.navigate('Profile')
                    }}
                    style={{ height: 60, alignItems: 'center', padding: 16, flexDirection: 'row', borderColor: '#e8e8e8', borderBottomWidth: 1 }}
                >
                    {/* Avatar */}
                    {this.props.isLogin == 0 ?
                        <Text style={{ color: '#77a300', fontSize: 16, marginLeft: 16, flex: 1, fontWeight: 'bold' }}>Đăng nhập</Text>
                        :
                        <View style={{ alignItems: 'center', flexDirection: 'row', }}>
                            {/* <Image
                                source={require(imageAvatar)}
                                style={{ height: 40, width: 40, borderRadius: 40, borderWidth: 1, borderColor: '#e8e8e8' }}
                            /> */}
                            {this.props.link_avatar ?
                                <Image
                                    style={{ height: 40, width: 40, borderRadius: 40, borderWidth: 1, borderColor: '#e8e8e8' }}
                                    source={{ uri: this.props.link_avatar }}
                                /> :
                                <Image
                                    style={{ height: 40, width: 40, borderRadius: 40, borderWidth: 1, borderColor: '#e8e8e8' }}
                                    source={require(imageAvatar)} />
                            }
                            <Text style={{ color: '#77a300', fontSize: 16, marginLeft: 16, flex: 1, fontWeight: 'bold' }}>{this.props.name}</Text>
                        </View>
                    }
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <DrawerNavigatorItems {...this.props} />
                </View>
            </SafeAreaView>
        )
    }
}

function mapStateToProps(state) {
    return {
        link_avatar: state.thongtin.link_avatar,
        name: state.thongtin.name,
        isLogin: state.thongtin.isLogin,
    }
}

export default connect(mapStateToProps)(CustomNavigator);