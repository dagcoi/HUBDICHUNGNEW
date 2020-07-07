import { View, Image, Text, StyleSheet } from 'react-native'
import React, { Component } from 'react'

const iconCacbonic = '../../image/iconcacbonic.png'
const iconHappy = '../../image/iconhappy.png'
const iconMoney = '../../image/iconmoney.png'
class Detail extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textTitle}>Giải pháp vận chuyển toàn diện</Text>
                <Text style={styles.textNormal}>Giải pháp toàn diện: cung cấp đa dịch vụ, tiện ích xoay quanh lĩnh vực đi lại, vận chuyển như đưa đón sân bay, vận chuyển đường dài, thuê xe tự lái, các dịch vụ vận chuyển hàng hóa, thực phẩm… trên phạm vi toàn quốc.</Text>

                <Image
                    style={styles.imageType}
                    source={require(iconMoney)}
                    resizeMode='contain'
                />
                <Text style={styles.textTitle}>Đảm bảo giá tốt</Text>
                <Text style={styles.textNormal}>Dịch vụ đi ghép, tiện chuyến giá siêu rẻ</Text>
                <Text style={styles.textNormal}>So sánh nhà cung cấp để tìm giá tốt nhất</Text>

                <Image
                    style={styles.imageType}
                    source={require(iconHappy)}
                    resizeMode='contain'
                />
                <Text style={styles.textTitle}>Cam kết chất lượng</Text>
                <Text style={styles.textNormal}>Hoàn tiền nếu không hài lòng</Text>
                <Text style={styles.textNormal}>Hệ thống đánh giá nhà cung cấp ưu việt</Text>

                <Image
                    style={styles.imageType}
                    source={require(iconCacbonic)}
                    resizeMode='contain'
                />
                <Text style={styles.textTitle}>Giảm khí thải</Text>
                <Text style={styles.textNormal}>Di chuyển xanh vì môi trường</Text>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    textTitle:{
        marginVertical : 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00363d',
        textAlign: 'center',
    },
    textNormal:{
        fontSize: 14,
        color: '#00363d',
        lineHeight: 28,
        textAlign: 'center',
    },
    imageType:{
        marginTop: 8,
        width: 80,
        height: 80,
    }
})

export default Detail;