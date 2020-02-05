import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Dialog } from 'react-native-simple-dialogs';

const imageLocation = '../../../image/location.png'
const imageCalendar = '../../../image/calendar.png'
const imageIconCar = '../../../image/iconcar.png'
const imagePerson = '../../../image/person.png'
const imageIconPhone = '../../../image/iconphone.png'
const imageEmail = '../../../image/email.png'
const imagePayment = '../../../image/payment.png'

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

class ChungXeTicketInformation extends Component {

    constructor() {
        super();
        this.state = {
            codeSuccess: 0,
            addingTicket: false,
            data: {},
            isLoading: true,
        }
    }

    async componentDidMount() {
        { this.getTicketInfo() }
    }

    async getTicketInfo() {
        const { navigation } = this.props;

        const url = `https://api.chungxe.vn/booking/get-detail-booking/${navigation.getParam('ticket_id')}`

        const res = await fetch(url);

        const jsonRes = await res.json();
        if (jsonRes.code = 'success') {
            this.setState({
                data: jsonRes.data,
                isLoading: false
            })
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator
                    style={{ marginTop: 16 }}
                    size='large'
                />
            )
        } else {
            var { data } = this.state;
            return (
                <View style={{ flex: 1, }}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.container}>
                            <Image
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                                source={{ uri: data.vhc_imgs[0].vhc_img_link }}
                            />

                            {this.renderBookingDetail(data)}

                            {this.renderPickCar(data)}

                            {this.renderInfoCustommer(data)}

                            {/* {this.renderPayment(data)} */}

                            {this.renderTotalCode(data)}

                            <Button
                                color='#77a300'
                                title='TRANG CHỦ'
                                onPress={() => {
                                    this
                                    // this.addBookingChungXe();
                                    this.props.navigation.navigate('Home')
                                    // this.setState({ addingTicket: true, })
                                }}
                            />

                        </View>
                    </ScrollView>
                </View>
            )
        }
    }

    renderBookingDetail(data) {
        return (
            <View>
                <Text style={styles.textBold}>Chi tiết Mã vé</Text>

                <View style={styles.viewChild}>
                    <Image
                        style={styles.imageIcon}
                        source={require(imageLocation)}
                    />
                    <Text style={styles.textNomal}>{data.city_name}</Text>

                </View>

                <View style={styles.viewChild}>
                    <Image
                        style={styles.imageIcon}
                        source={require(imageCalendar)}
                    />
                    <Text style={styles.textNomal}>{this.formatDate(data.book_rent_date)} - {this.formatDate(data.book_retun_date)}</Text>
                </View>
            </View>
        )
    }

    renderPickCar(data) {
        return (
            <View>
                <Text style={styles.textBold}>Hình thức nhận xe</Text>

                <View style={styles.viewChild}>
                    <Image
                        style={styles.imageIcon}
                        source={require(imageIconCar)}
                    />
                    <Text style={styles.textNomal}>{data.book_deli_form_id == 2 ? `Nhận tại đại lý` : `Nhận tại nhà`}</Text>

                </View>

                {/* <View style={styles.viewChild}>
                    <Image
                        style={styles.imageIcon}
                        source={require(imageLocation)}
                    />
                    <Text style={styles.textNomal}>{navigation.getParam('selectRentCar') == 0 ? item.part.part_addr : this.props.pick_add}</Text>

                </View> */}
            </View>
        )
    }

    renderInfoCustommer(data) {
        return (
            <View>
                <Text style={styles.textBold}>Khách hàng</Text>

                <View style={styles.viewChild}>
                    <Image
                        style={styles.imageIcon}
                        source={require(imagePerson)}
                    />
                    <Text style={styles.textNomal}>{data.cstm_name}</Text>
                </View>

                <View style={styles.viewChild}>
                    <Image
                        style={styles.imageIcon}
                        source={require(imageIconPhone)}
                    />
                    <Text style={styles.textNomal}>{data.cstm_phon}</Text>
                </View>

                <View style={styles.viewChild}>
                    <Image
                        style={styles.imageIcon}
                        source={require(imageEmail)}
                    />
                    <Text style={styles.textNomal}>{data.cstm_emai}</Text>
                </View>
            </View>
        )
    }

    // renderPayment(data) {
    //     return (
    //         <View>
    //             <Text style={styles.textBold}>Thanh toán</Text>

    //             <View style={styles.viewChild}>
    //                 <Image
    //                     style={styles.imageIcon}
    //                     source={require(imagePayment)}
    //                 />
    //                 <Text style={styles.textNomal}>Trả sau</Text>

    //             </View>
    //         </View>
    //     )
    // }

    renderTotalCode(data) {
        return (
            <View style={styles.viewChild}>
                <Text style={styles.textBold}>Tổng giá</Text>

                <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold', fontSize: 16, color: '#77a300', }}>
                    {data.book_prie_tota.format(0, 3, ',')} đ
                </Text>
            </View>
        )
    }

    formatDate(string) {
        var date = new Date(string);

        var strDate = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        return strDate;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },

    viewChild: {
        marginLeft: 0,
        flexDirection: 'row',
        padding: 2,
        alignItems: "center"
    },

    imageIcon: {
        width: 25,
        height: 25,
    },

    textBold: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#00363d',
        marginTop: 8,
        marginLeft: 8,
    },

    textNomal: {
        fontSize: 16,
        color: "#00363d",
        padding: 2,
    }

})

export default connect()(ChungXeTicketInformation);
