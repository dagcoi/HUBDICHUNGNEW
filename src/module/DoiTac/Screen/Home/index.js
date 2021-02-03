import React, { Component } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native'
import styles from '../../style'
import SelectCar from './SelectCar'
import ImageTextBold from '../../../../component/ImageTextDiChung/ImageTextBold'
import Header from '../../../../component/Header/HeaderImage'
import { connect } from 'react-redux'
import { SvgChungXe, SvgDiChungTaxi, SvgExpress } from '../../../../icons'
import { imageBackground } from '../../../../image/imageLink'

const imageCheckWhite = '../../../../image/checkw.png'

class HomeOperator extends Component {
    constructor(props) {
        super(props);
    }

    gotoHomeScreen = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header
                    onPressLeft={() => { this.props.navigation.openDrawer() }}
                    onPressCenter={this.gotoHomeScreen}
                />
                <ImageBackground style={{ flex: 1, resizeMode: "cover", paddingHorizontal: 8 }} source={imageBackground} >
                    <View>
                        <Text style={styles.text21}>Cung cấp dịch vụ</Text>
                        <Text style={styles.text21}>Gia tăng thu nhập</Text>
                    </View>

                    <View>
                        <SelectCar
                            backgroundColor={'#77a300'}
                            title='Dịch vụ xe có lái'
                            textDetail='Tìm khách hàng di chuyển trong phố, sân bay, liên tỉnh'
                            child={<SvgDiChungTaxi color={'#fff'} width={75} height={75} />}
                            onPress={() => { this.props.isLogin == 0 ? this.props.navigation.navigate('Login') : this.props.navigation.navigate('TransferServiceOperator') }}
                        />
                        <SelectCar
                            backgroundColor={'#77a300'}
                            title='Cho thuê xe tự lái'
                            textDetail='Thu nhập thụ động từ xe để trống. Tối ưu chi phí sử dụng xe.'
                            child={<SvgChungXe color={'#fff'} width={75} height={75} />}
                            onPress={() => { this.props.isLogin == 0 ? this.props.navigation.navigate('Login') : this.props.navigation.navigate('CarRentalOperator') }}

                        />
                        <SelectCar
                            backgroundColor={'#77a300'}
                            title='Vận chuyển hàng hóa'
                            textDetail='Gia tăng thu nhập, chuyển hàng cùng hành trình'
                            child={<SvgExpress color={'#fff'} width={75} height={75} />}
                            onPress={() => { this.props.isLogin == 0 ? this.props.navigation.navigate('Login') : this.props.navigation.navigate('ExpressOperator') }}

                        />
                    </View>
                    <View>
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"Dễ dàng tìm kiếm khách hàng"} />
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"Tối ưu chi phí sử dụng xe"} />
                        <ImageTextBold source={require(imageCheckWhite)} textBold={"Hệ thống tự động"} />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

function mapStateToProps(state) {
    return {
        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
        isLogin: state.thongtin.isLogin,
    }
}

export default connect(mapStateToProps)(HomeOperator);