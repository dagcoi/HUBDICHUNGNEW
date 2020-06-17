import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { ButtonFull } from '../../../component/Button'
import { HeaderText } from '../../../component/Header'

class Procedure extends Component {

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderText textCenter={'Thủ tục thuê xe'} onPressLeft={this.goBack} />

                <View style={styles.container}>
                    <Text style={styles.TextBig}>Thủ tục:</Text>
                    <Text style={styles.TextNomal}>- CMND: Bản gốc</Text>
                    <Text style={styles.TextNomal}>- Sổ hộ khẩu: Bản gốc hoặc KT3</Text>
                    <Text style={styles.TextNomal}>- Bằng lái: B2 trở lên</Text>
                    <Text style={styles.TextNomal}>- Đặt cọc: Xe máy + đăng ký xe chính chủ hoặc 20 triệu tiền mặt</Text>

                    <ButtonFull
                        onPress={() => {
                            this.props.navigation.push("InfoCustommerTuLai")
                        }}
                        value={'TÔI ĐÃ HIỂU'}
                    />

                </View>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 8
    },
    TextBig: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    TextNomal: {
        fontSize: 14,
    },
    buttom: {
        backgroundColor: '#77a300',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Procedure;