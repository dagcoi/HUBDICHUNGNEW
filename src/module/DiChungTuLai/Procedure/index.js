import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

class Procedure extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.TextBig}>Thủ tục :</Text>
                </View>
                <View style = {{margin : 8}}>
                    <Text style={styles.TextNomal}>- CMND: Bản gốc</Text>
                    <Text style={styles.TextNomal}>- Sổ hộ khẩu: Bản gốc hoặc KT3</Text>
                    <Text style={styles.TextNomal}>- Bằng lái: B2 trở lên</Text>
                    <Text style={styles.TextNomal}>- Đặt cọc: Xe máy + đăng ký xe chính chủ hoặc 20 triệu tiền mặt</Text>
                </View>
                <TouchableOpacity 
                style = {styles.buttom}
                onPress = {() => {
                    this.props.navigation.push("InfoCustommerTuLai")
                }}
                >
                    <Text style = {{color : '#fff'}}>TÔI ĐÃ HIỂU</Text>
                </TouchableOpacity>
            </View>
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    TextNomal: {
        fontSize: 16,
    },
    buttom: {
        backgroundColor: '#77a300',
        padding : 8, 
        justifyContent : 'center',
        alignItems : 'center'
    }
})

export default Procedure;