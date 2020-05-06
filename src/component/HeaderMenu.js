import React, { Component } from 'react'
import { TouchableOpacity, Image, Text } from 'react-native'

const imageAvatar = '../image/logo_dc_taxi.png'

class HeaderMenu extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.closeDrawer()
                }}
                style={{ height: 100, alignItems: 'center', padding: 16, flexDirection: 'row', borderColor: '#e8e8e8', borderBottomWidth: 1 }}
            >
                {/* Avatar */}
                <Image
                    source={require(imageAvatar)}
                    style={{ height: 80, width: 80, borderRadius: 40, borderWidth: 1, borderColor: '#e8e8e8' }}
                />
                <Text style={{ color: '#77a300', fontSize: 16, margin: 8, flex: 1, fontWeight: 'bold' }}>Đăng nhập để nhận thêm ưu đã khi đặt xe</Text>
            </TouchableOpacity>
        )
    }
}

export default HeaderMenu;
