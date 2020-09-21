import React, { Component } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView,ImageBackground } from 'react-native'
import styles from '../../style'
import SelectCar from './SelectCar'
import ImageTextBold from '../../../../component/ImageTextDiChung/ImageTextBold'
import Header from '../../../../component/Header/HeaderImage'

const imageCheckWhite = '../../../../image/checkw.png'
const imageBackground = { uri: 'https://dichung.vn/static/images/e216031ab3feeb651026e80873156f50.png' }

class HomeOperator extends Component {
    constructor(props) {
        super(props);
    }

    gotoHomeScreen = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#77a' }}>
                <Header
                    onPressLeft={() => { this.props.navigation.openDrawer() }}
                    onPressCenter={this.gotoHomeScreen}
                />
                <ImageBackground style={{ flex: 1, resizeMode: "cover", paddingHorizontal:8 }} source={imageBackground} >
                    <View>
                        <Text style={styles.text21}>Lên lịch đi chung</Text>
                        <Text style={styles.text21}>Vui mọi nẻo đường</Text>
                    </View>

                    <View>
                        <SelectCar
                            title='Dịch vụ xe có lái'
                            textDetail='Tìm khách hàng di chuyển trong phố, sân bay, liên tỉnh'
                            onPress={()=>{this.props.navigation.navigate('TransferServiceOperator')}}
                            source={require('../../../../image/logodichung.png')}
                        />
                        <SelectCar
                            title='Cho thuê xe tự lái'
                            textDetail='Thu nhập thụ động từ xe để trống. Tối ưu chi phí sử dụng xe.'
                            source={require('../../../../image/logochungxe.png')}
                            onPress={()=>{this.props.navigation.navigate('CarRentalOperator')}}

                        />
                        <SelectCar
                            title='Vận chuyển hàng hóa'
                            textDetail='Gia tăng thu nhập, chuyển hàng cùng hành trình'
                            onPress={()=>{this.props.navigation.navigate('ExpressOperator')}}
                            source={require('../../../../image/logoexpress.png')}

                        />
                    </View>
                    <View>
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"Đi chung"} />
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"Better together"} />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

export default HomeOperator;