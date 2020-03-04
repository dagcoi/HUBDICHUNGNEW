import React, { Component } from 'react'
import { View, Text, Image, Button, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import * as link from '../../../URL'
import ImageTextDiChung from '../../../component/ImageTextDiChung'
import { NavigationActions, StackActions } from 'react-navigation';


const imageLocation = '../../../image/location.png'
const imageCalendar = '../../../image/calendar.png'
const imageIconCar = '../../../image/iconcar.png'
const imagePerson = '../../../image/person.png'
const imageIconPhone = '../../../image/iconphone.png'
const imageEmail = '../../../image/email.png'
const imageDone = '../../../image/done.png'
const imagePayment = '../../../image/payment.png'
const imageComment = '../../../image/comment.png'


Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

class TicketInformationXeChung extends Component {

    constructor() {
        super();
        this.state = {
            info: {},
            is_loading: true,
            message: '',
            value: 0,
        }
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const url = link.URL_API + `passenger/get_ticket_info`
        const formData = new FormData();
        formData.append('ticket_code', navigation.getParam('ticket_id'));
        formData.append('phone_number', navigation.getParam('phone_number'))
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
            body: formData
        });
        const jsonRes = await res.json();
        this.setState({
            info: jsonRes.data,
            is_loading: false,
        });
        return (jsonRes);
    }

    renderDetailTrip(item) {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết dịch vụ</Text>
 
                <ImageTextDiChung
                    source={require(imageLocation)}
                    text={item.pick_address_api}
                />

                <ImageTextDiChung
                    source={require(imageLocation)}
                    text={item.drop_address_api}
                />

                <ImageTextDiChung
                    source={require(imageCalendar)}
                    text={item.in_time+' ' +item.in_date}
                />
            </View>
        )
    }

    renderDetailOrder(item) {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết đơn hàng</Text>

                <ImageTextDiChung
                    source={require(imageIconCar)}
                    text={'Loại dịch vụ : ' +item.transport_partner_name}
                />
            </View>
        )
    }

    renderDetailCustommer(item) {
        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết khách hàng</Text>

                <ImageTextDiChung
                    source={require(imagePerson)}
                    text={item.fullname}
                />

                <ImageTextDiChung
                    source={require(imageIconPhone)}
                    text={item.other_phone}
                />

                <ImageTextDiChung
                    source={require(imageEmail)}
                    text={item.email}
                />

                <ImageTextDiChung
                    source={require(imageComment)}
                    text={item.note}
                />
            </View>
        )
    }

    renderDetailPeopleMove(item) {

        return (
            <View>
                <Text style={styles.textBigLeft1}>Chi tiết người đi</Text>

                <ImageTextDiChung
                    source={require(imagePerson)}
                    text={item.use_name}
                />

                <ImageTextDiChung
                    source={require(imageIconPhone)}
                    text={item.use_phone}
                />
            </View>
        )

    }



    renderOther(item) {
        return (
            <View style={{ marginBottom: 8 }}>
                <Text style={styles.textBigLeft1}>Thanh toán và khác</Text>
                <ImageTextDiChung
                    source={require(imagePayment)}
                    text={item.pay_method_name}
                />
                {item.xhd == 1 ?
                    <ImageTextDiChung
                        source={require(imageDone)}
                        text={'+10 %'}
                    /> : null}
            </View>
        )
    }

    render() {
        if (this.state.is_loading) {
            return (
                <ActivityIndicator
                    style={{ padding: 32, }}
                    size='large'
                />
            )
        } else {
            const item = this.state.info;
            return (
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ height: 150, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                                source={{ uri: item.vehicle_icon }}
                            />
                        </View>

                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ backgroundColor: '#77a300', color: '#fff' }}>{item.vehicle_name}</Text>
                        </View>

                        <Text style={styles.textBigRight}>Mã đặt xe của bạn là : <Text style={{ fontWeight: 'bold' }}>{item.ticket_code}</Text></Text>

                        <Text style={styles.textBigRight}>Yêu cầu đặt xe của bạn đã được hệ thồng ghi nhận. Chúng tôi sẽ liên lạc trong thời gian sớm nhất</Text>

                        {this.renderDetailTrip(item)}
                        {this.renderDetailOrder(item)}
                        {this.renderDetailCustommer(item)}
                        {this.renderDetailPeopleMove(item)}
                        {this.renderOther(item)}

                        <Button
                            style={{ marginTop: 8, fontSize: 22 }}
                            color='#77a300'
                            title='Trang chủ'
                            onPress={() => {
                                // this.props.navigation.navigate('Home')
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    key: null,
                                    actions: [NavigationActions.navigate({ routeName: 'Main' })],
                                });
                                this.props.navigation.dispatch(resetAction);
                            }}
                        />
                        <View style={{ marginBottom: 8, }}></View>
                    </ScrollView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 8,
    },

    textBigRight: {
        padding: 1,
        fontSize: 15,
        color: '#00363d',
        flex: 1,
    },
    textBigLeft1: {
        fontSize: 18,
        marginTop: 8,
        fontWeight: 'bold',
    },
})

export default TicketInformationXeChung;