import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import Moment from 'moment';
import ImageTextDiChung from '../../../component/ImageTextDiChung'
import { NavigationActions, StackActions } from 'react-navigation';
import { Button } from '../../../component/Button'

const imageLocation = '../../../image/location.png'
const imageCalendar = '../../../image/calendar.png'
const imagePeople = '../../../image/people.png'
const imageIconCar = '../../../image/iconcar.png'
const imagePerson = '../../../image/person.png'
const imageIconPhone = '../../../image/iconphone.png'
const imageEmail = '../../../image/email.png'
const imagePayment = '../../../image/payment.png'

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

class ConfirmInfoChungXe extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            codeSuccess: 0,
            dialogSuccess: false,
            book_code: null,
            addingTicket: false,
        }
    }

    componentDidMount() {

    }

    render() {
        // console.log(this.props.rent_date)
        // console.log(this.props.retun_date)
        var dateRent = (new Date(this.props.rent_date)).toISOString();
        var dateRetun = (new Date(this.props.retun_date)).toISOString();
        // console.log(dateRent)
        // console.log(dateRetun)
        const { navigation } = this.props;
        const item = this.props.navigation.getParam('item');

        if (this.state.isLoading) {
            return (
                <ActivityIndicator
                    style={{ marginTop: 16 }}
                    size='large'
                />
            )
        }

        return (

            <View style={{ flex: 1, }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        <Image
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                            source={{ uri: item.vhc.vhc_imgs }}
                        />

                        {this.renderBookingDetail()}

                        {this.renderPickCar()}

                        {this.renderInfoCustommer()}

                        {this.renderPayment()}

                        {this.renderTotalCode()}

                        <Button
                            value={'TIẾP TỤC'}
                            onPress={() => {
                                this.addBookingChungXe();
                                this.setState({ addingTicket: true, })
                            }}
                        />

                        <Dialog
                            visible={this.state.addingTicket}
                            title="">
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='large' />
                            </View>
                        </Dialog>

                        <Dialog
                            visible={this.state.dialogSuccess}
                            title="Đặt xe thành công">
                            <View style={{ flexDirection: 'column' }}>
                                <Image
                                    style={{ justifyContent: 'center', alignItems: 'center', height: 120, resizeMode: 'contain' }}
                                    source={{ uri: item.vhc.vhc_imgs }}
                                />
                                <Text>Mã đặt xe của bạn : <Text style={{ fontWeight: 'bold' }}>{this.state.book_code}</Text></Text>

                                <Text>Yêu cầu đặt xe của bạn đã được hệ thống ghi nhận. Chúng tôi sẽ liên lạc trong thời gian sớm nhất</Text>
                                <View style={{ flexDirection: 'row', height: 45, padding: 4 }}>
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#77a300', justifyContent: 'center', borderRadius: 4, flex: 1, alignItems: 'center', borderWidth: 0.2, }}
                                        onPress={() => {
                                            // this.props.navigation.navigate('Home')
                                            const resetAction = StackActions.reset({
                                                index: 0,
                                                key: null,
                                                actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                            });
                                            this.props.navigation.dispatch(resetAction);
                                        }}
                                    >
                                        <Text style={{ color: '#fff' }}>TRANG CHỦ</Text>
                                    </TouchableOpacity>

                                    <View style={{ margin: 8 }}></View>

                                    <TouchableOpacity
                                        style={{ backgroundColor: '#77a300', justifyContent: 'center', borderRadius: 4, flex: 1, alignItems: 'center', borderWidth: 0.2, }} //, borderWidth: 0.5
                                        onPress={() => {
                                            this.props.navigation.navigate('ChungXeTicketInformation', {
                                                'ticket_id': this.state.book_code,
                                                'phone_number': this.props.use_phone,
                                            })
                                            this.setState({ dialogSuccess: false })
                                        }}
                                    >
                                        <Text style={{ color: '#fff' }}>CHI TIẾT</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </Dialog>


                    </View>
                </ScrollView>
            </View>
        )
    }

    renderBookingDetail() {
        return (
            <View>
                <Text style={styles.textBold}>Chi tiết đặt xe</Text>

                <ImageTextDiChung
                    source={require(imageLocation)}
                    text={this.props.city_name}
                />

                <ImageTextDiChung
                    source={require(imageCalendar)}
                    text={this.props.time_pick + ' - ' + this.props.time_drop}
                />
            </View>
        )
    }

    renderPickCar() {
        const { navigation } = this.props;
        const item = this.props.navigation.getParam('item');
        return (
            <View>
                <Text style={styles.textBold}>Hình thức nhận xe</Text>

                <View style={styles.viewChild}>
                    <Image
                        style={styles.imageIcon}
                        source={require(imageIconCar)}
                    />
                    <Text style={styles.textNomal}>{navigation.getParam('selectRentCar') == 0 ? `Nhận tại đại lý` : `Nhận tại nhà`}</Text>
                </View>

                <View style={styles.viewChild}>
                    <Image
                        style={styles.imageIcon}
                        source={require(imageLocation)}
                    />
                    <Text style={styles.textNomal}>{navigation.getParam('selectRentCar') == 0 ? item.part.part_addr : this.props.pick_add}</Text>
                </View>
            </View>
        )
    }

    renderInfoCustommer() {
        return (
            <View>
                <Text style={styles.textBold}>Khách hàng</Text>

                <ImageTextDiChung
                    source={require(imagePerson)}
                    text={this.props.full_name}
                />

                <ImageTextDiChung
                    source={require(imageIconPhone)}
                    text={this.props.use_phone}
                />

                <ImageTextDiChung
                    source={require(imageEmail)}
                    text={this.props.email}
                />
            </View>
        )
    }

    renderPayment() {
        return (
            <View>
                <Text style={styles.textBold}>Thanh toán</Text>

                <ImageTextDiChung
                    source={require(imagePayment)}
                    text={'Trả sau'}
                />
            </View>
        )
    }

    addBookingChungXe() {
        const { navigation } = this.props;
        const item = this.props.navigation.getParam('item');
        console.log(item);
        var dateRent = (new Date(this.props.rent_date)).toISOString();
        var dateRetun = (new Date(this.props.retun_date)).toISOString();
        console.log(dateRent)
        console.log(dateRetun)
        const url = 'https://api.chungxe.vn/booking'

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                aff_sub: '',
                book_deli_form_id: navigation.getParam('selectRentCar') == 0 ? 2 : 1,
                book_rent_date: dateRent,
                book_retun_date: dateRetun,
                book_src_key: '',
                cstm_deli_addr: navigation.getParam('selectRentCar') == 0 ? null : this.props.pick_add,
                cstm_deli_addr_lat: navigation.getParam('selectRentCar') == 0 ? null : this.props.lattitude_pick,
                cstm_deli_addr_lng: navigation.getParam('selectRentCar') == 0 ? null : this.props.lngtitude_pick,
                // latitude: navigation.getParam('selectRentCar') == 0 ? this.props.lattitude_pick : null,
                // longitude:navigation.getParam('selectRentCar') == 0 ? this.props.lngtitude_pick : null,
                cstm_name: this.props.full_name,
                cstm_emai: this.props.email,
                cstm_pay_meth_id: '1',
                cstm_phon: this.props.use_phone,
                promo_code: '',
                source: 'https://dichung.vn',
                user_acc_id: '',
                utm_campaign: '',
                utm_content: '',
                utm_medium: '',
                vhc_part_id: item.vhc_part_id,
                vhc_part_name: item.vhc_part_name,
            })
        })
            .then((res) => res.json())
            .then((jsonRes) => {
                console.log(JSON.stringify(jsonRes))
                this.setState({
                    book_code: jsonRes.data.book_code,
                    dialogSuccess: true,
                    addingTicket: false,
                })
                console.log(jsonRes.data.book_code)
            })
    }

    renderTotalCode() {
        const { navigation } = this.props;
        return (
            <View style={styles.viewChild}>
                <Text style={styles.textBold}>Tổng thanh toán</Text>
                <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold', fontSize: 16, color: '#77a300', }}>{((navigation.getParam('xhd') ? 11 / 10 : 1) * navigation.getParam('moneyPaymet')).format(0, 3, ',')} đ</Text>
            </View>
        )
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
        fontSize: 16,
        fontWeight: "bold",
        color: '#333333',
        marginTop: 8,
        marginLeft: 8,
    },

    textNomal: {
        fontSize: 14,
        color: "#333333",
        padding: 2,
    }

})

function mapStateToProps(state) {
    return {
        city: state.info.city,
        rent_date: state.info.rent_date,
        retun_date: state.info.retun_date,
        full_name: state.info.full_name,
        use_phone: state.info.use_phone,
        email: state.info.email,
        city_name: state.info.city_name,
        time_pick: state.info.time_pick,
        time_drop: state.info.time_drop,
        pick_add: state.info.pick_add,
        component_pick: state.info.component_pick,
        lattitude_pick: state.info.lattitude_pick,
        lngtitude_pick: state.info.lngtitude_pick
    }
}

export default connect(mapStateToProps)(ConfirmInfoChungXe);
