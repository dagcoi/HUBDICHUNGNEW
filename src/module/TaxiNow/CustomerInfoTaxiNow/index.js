import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, AsyncStorage, SafeAreaView, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputTextDiChung from '../../../component/InputTextDiChung'
import CheckBox from 'react-native-check-box'
import RadioForm, { } from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { addComment } from '../../../core/Redux/action/Action'
import { Button, ButtonDialog } from '../../../component/Button'
import { HeaderText } from '../../../component/Header'
import { RadioButtonCustom, RadioButtonNormal } from '../../../component/RadioButton'
import Toast from 'react-native-simple-toast';
import * as link from '../../../URL'

var radio_props = [
    { label: 'Nội địa', value: 1 },
    { label: 'Quốc tế', value: 2 }
];

var radio_payment_detail = [
    { label: 'ATM', value: 0, payment_method_ID: '8' },
    { label: 'VISA', value: 1, payment_method_ID: '8' },
    { label: 'VNPAY', value: 2, payment_method_ID: '8' },
    { label: 'PAYPAL', value: 3, payment_method_ID: '4' },
]


class CustomerInfoTaxiNow extends Component {
    constructor() {
        super();
        this.state = {
            value_payment: 0,
            value_paymentDetail: 'ATM',
            full_name: '',
            use_phone: '',
            payment_method_ID: '3',
            email: '',
            mobile_validate: false,
            vat: false,
            company_name: '',
            company_address: '',
            company_mst: '',
            company_address_receive: '',
            comment: '',
            sendCaro: null,
        }
    }

    componentDidMount() {
        this.getData()
        this.setState({ sendCaro: this.props.sendCaro })
    }

    async getData() {
        try {
            const dataLogin = await AsyncStorage.getItem('dataLogin')
            if (dataLogin !== null) {
                let json = JSON.parse(dataLogin)
                this.setState({
                    full_name: json.username,
                    use_phone: json.phone ?? '',
                    email: json.email ?? '',
                    comment: this.props.comment,
                })
                this._validateEmail(json.email ?? '')
                this.mobileValidate(json.phone ?? '')
            }
        } catch (error) {
            console.log(error)
        }

    }

    renderPostpaid() {
        if (this.state.value_payment == 0) {
            return null;
        } else {
            return (
                <View>
                    {radio_payment_detail.map((obj) => (
                        <RadioButtonCustom
                            obj={obj}
                            onPress={() => {
                                this.setState({
                                    value_paymentDetail: obj.label,
                                    payment_method_ID: obj.payment_method_ID,

                                })
                            }}
                            value_paymentDetail={this.state.value_paymentDetail}
                        />
                    ))}
                </View>
            )
        }
    }

    mobileValidate1(text) {
        var test = text.trim()
        const reg = /^[0]?[3789]\d{8}$/;
        if (reg.test(test) === false) {
            this.setState({
                mobile_validate1: false,
                use_phone1: test,
            });
            return false;
        } else {
            this.setState({
                mobile_validate1: true,
                use_phone1: test,
            });
            return true;
        }
    }

    formComment() {
        return (
            <View>
                <Text style={styles.textBig}>Ghi chú(tùy chọn)</Text>
                <InputTextDiChung
                    placeholder='VD: Tài xế không hút thuốc...'
                    value={this.state.comment}
                    multiline={true}
                    onChangeText={(text) => {
                        this.setState({
                            comment: text,
                        })
                        this.props.addComment(text)
                    }}
                    onPress={() => this.setState({
                        comment: ''
                    })}
                />
            </View>
        )
    }

    _validateEmail(test) {
        var text = test.trim();
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(String(text).toLowerCase()) === false) {
            console.log("Email is Not Correct ");
            this.setState({ email: text, checkEmail: false })
            return false;
        } else {
            this.setState({ email: text, checkEmail: true })
            console.log("Email is Correct");
            return true;
        }
    }

    mobileValidate(text) {
        var test = text.trim();
        const reg = /^(\+84)?(0)?[3789]\d{8}$/;
        if (reg.test(test) === false) {
            this.setState({
                mobile_validate: false,
                use_phone: test,
            });
            return false;
        } else {
            this.setState({
                mobile_validate: true,
                use_phone: test,
            });
            return true;
        }
    }



    checkInfoCustomer() {
        if (this.state.full_name.trim().length < 2) {
            Toast.show('Vui lòng nhập tên !')
            return;
        }
        else if (!this.state.mobile_validate) {
            Toast.show('Vui lòng nhập số điện thoại !')
            return;
        }
        else if (!this.state.checkEmail) {
            Toast.show('Vui lòng nhập địa chỉ email !')
        }
        else {
            this.checkVat();
        }
    }

    checkVat() {
        if (this.state.vat) {
            if (this.state.company_name.trim() == '') {
                Toast.show('Vui lòng nhập thông tin hóa đơn')
                return;
            } else if (this.state.company_address.trim() == '') {
                Toast.show('Vui lòng nhập thông tin hóa đơn')
                return;
            } else if (this.state.company_mst.trim() == '') {
                Toast.show('Vui lòng nhập thông tin hóa đơn')
                return;
            } else if (this.state.company_address_receive.trim() == '') {
                Toast.show('Vui lòng nhập thông tin hóa đơn')
                return;
            } else {
                this.createBooking()
            }
        } else {
            this.createBooking()
        }
    }

    createBooking() {
        var date = new Date();

        // Toast.show('thông tin ok')
        // console.log(JSON.stringify(this.state.sendCaro))
        const sendCaro = this.props.sendCaro
        sendCaro.startPoints = [
            {
                "address": this.props.addressLocation,
                "lat": this.props.latLocation,
                "long": this.props.lngLocation
            }
        ];
        sendCaro.endPoints = [
            {
                "address": this.props.drop_add,
                "lat": this.props.latitude_drop,
                "long": this.props.longitude_drop
            }
        ]
        sendCaro.bookingTime = date.toISOString();
        sendCaro.bookingUser = {
            "email": this.state.email,
            "phone": this.state.use_phone,
            "fullName": this.state.full_name,
            "gender": ""
        };
        sendCaro.note = this.state.comment
        sendCaro.payment = {
            "method": "cash",
            "provider": "vnpay",
            "return": ""
        }

        // console.log('qqq' +JSON.stringify(sendCaro))
        const url = link.URL_API_PORTAL + `booking/v1/bookings`
        console.log(url)
        const jsonStr = JSON.stringify(sendCaro)
        console.log('abc :.........' + JSON.stringify(this.props.token))
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'token': this.props.token
            },
            body: jsonStr
        })
            .then(res => res.json())
            .then(resJson => {
                console.log(JSON.stringify(resJson))
                console.log('a' + resJson)
                this.props.navigation.navigate('MapStartTrip', {'id': resJson.data._id })
            })
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    renderFormVAT() {
        if (!this.state.vat) {
            return null;
        }

        return (
            <View>
                <InputTextDiChung
                    style={styles.textInput}
                    placeholder='Tên công ty'
                    value={this.state.company_name}
                    onChangeText={(text) => this.setState({
                        company_name: text,
                    })}
                    onPress={() => this.setState({
                        company_name: ''
                    })}
                />

                <InputTextDiChung
                    style={styles.textInput}
                    placeholder='Địa chỉ công ty'
                    value={this.state.company_address}
                    onChangeText={(text) => this.setState({
                        company_address: text,
                    })}
                    onPress={() => this.setState({
                        company_address: ''
                    })}
                />

                <InputTextDiChung
                    style={styles.textInput}
                    placeholder='Mã số thuế'
                    value={this.state.company_mst}
                    onChangeText={(text) => this.setState({
                        company_mst: text,
                    })}
                    onPress={() => this.setState({
                        company_mst: ''
                    })}
                />

                <InputTextDiChung
                    style={styles.textInput}
                    placeholder='Địa chỉ nhận hóa đơn'
                    value={this.state.company_address_receive}
                    onChangeText={(text) => this.setState({
                        company_address_receive: text,
                    })}
                    onPress={() => this.setState({
                        company_address_receive: ''
                    })}
                />
            </View>
        )
    }
    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        var radio_payment = []
        radio_payment.push({ label: 'Trả sau', value: 0, paymentMethodID: '3' })
        radio_payment.push({ label: 'Trả trước', value: 1, paymentMethodID: '8' })
        return (
            <SafeAreaView style={{ flex: 1, paddingBottom: 8, flexDirection: 'column' }}>
                <HeaderText textCenter={'Thông tin đặt xe'} onPressLeft={this.goBack} />
                <ScrollView>
                    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, padding: 8 }} enableOnAndroid={true} enableAutoAutomaticScroll={(Platform.OS === 'ios')} >
                        <Text style={styles.textBig}>Họ và tên</Text>

                        <InputTextDiChung
                            style={styles.textInput}
                            placeholder='Nhập họ tên'
                            value={this.state.full_name}
                            onChangeText={(text) => this.setState({
                                full_name: text,
                            })}
                            onPress={() => this.setState({
                                full_name: ''
                            })}
                        />

                        <Text style={styles.textBig}>Số điện thoại</Text>

                        <InputTextDiChung
                            style={styles.textInput}
                            placeholder='Nhập số điện thoại'
                            value={this.state.use_phone}
                            onChangeText={(text) => this.mobileValidate(text)}
                            keyboardType='numeric'
                            onPress={() => this.setState({
                                use_phone: ''
                            })}
                        />

                        <Text style={styles.textBig}>Email</Text>

                        <InputTextDiChung
                            // ref={(input) => { this.email = input; }}
                            style={styles.textInput}
                            placeholder='Nhập Email'
                            value={this.state.email}
                            onChangeText={(text) => this._validateEmail(text)}
                            onPress={() => this.setState({
                                email: ''
                            })}
                        />

                        {this.formComment()}

                        <Text style={styles.textBig}>Hình thức thanh toán</Text>
                        <View style={{ marginTop: 8 }}>
                            <RadioForm
                                animation={true}
                            >
                                {radio_payment.map((obj, i) => (
                                    <RadioButtonNormal
                                        i={i}
                                        obj={obj}
                                        isSelected={this.state.value_payment}
                                        onPressItem={() => {
                                            console.log(obj.label)
                                            this.setState({
                                                value_payment: obj.value,
                                                selectRentCar: obj.value,
                                                payment_method_ID: obj.payment_method_ID,
                                            })
                                        }}
                                    />
                                ))}
                            </RadioForm>
                        </View>

                        {this.renderPostpaid()}

                        <CheckBox
                            style={{ marginTop: 8 }}
                            onClick={() => {
                                this.setState({
                                    vat: !this.state.vat
                                })
                            }}
                            isChecked={this.state.vat}
                            rightText={"Xuất hóa đơn"}
                            rightTextStyle={{ fontSize: 16 }}
                            checkBoxColor={'#77a300'}
                        />
                        {this.renderFormVAT()}


                        <Button
                            onPress={() => {
                                this.checkInfoCustomer()
                            }}
                            value={'XÁC NHẬN ĐẶT CHUYẾN'}
                        />
                    </KeyboardAwareScrollView>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 8,
    },
    textBig: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333'
    },
    textInput: {
        borderWidth: 0,
        padding: 8,
        borderColor: '#e8e8e8',
        fontSize: 16,
        borderRadius: 4,
        flex: 1,
    },
    textTitle: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333'
    },
});

function mapStateToProps(state) {
    return {
        full_name: state.info.full_name,
        use_phone: state.info.use_phone,
        email: state.info.email,
        full_name1: state.info.full_name2,
        use_phone1: state.info.use_phone2,
        email1: state.info.email2,
        addressLocation: state.info.addressLocation,
        latLocation: state.info.latLocation,
        lngLocation: state.info.lngLocation,
        drop_add: state.info.drop_add,
        latitude_drop: state.info.latitude_drop,
        longitude_drop: state.info.longitude_drop,
        chunk_id: state.info.chunk_id,
        ride_method_id: state.info.ride_method_id,
        depart_time: state.info.depart_time,
        transport_partner_id: state.info.transport_partner_id,
        brand_partner_id: state.info.brand_partner_id,
        comment: state.info.comment,
        is_airport: state.info.is_airport,
        product_chunk_type: state.info.product_chunk_type,
        sendCaro: state.info.sendCaro,
        token: state.thongtin.token,
    }
}

export default connect(mapStateToProps, { addComment: addComment })(CustomerInfoTaxiNow);