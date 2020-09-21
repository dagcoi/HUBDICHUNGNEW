import React, { Component } from 'react'
import { SafeAreaView, View, Text, TextInput } from 'react-native'
import { HeaderText } from '../../../../component/Header'

class ConfirmRideShare extends Component{


    goBack = () =>{
        this.props.navigation.goBack()
    }

    render(){
        return(
            <SafeAreaView>
                <HeaderText onPressLeft={this.goBack} textCenter={'Xác nhận chia sẻ chỗ trống'} />
                <View>

                </View>
            </SafeAreaView>
        )
    }
}

export default ConfirmRideShare;