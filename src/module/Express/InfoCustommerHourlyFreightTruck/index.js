import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert, Image, TextInput, ScrollView } from 'react-native';
import InputTextDiChung from '../../../component/InputTextDiChung'
import CheckBox from 'react-native-check-box'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { addInfoPeople1, addInfoPeople2, addVAT, addInfoFlight, addPromotionCode, addPaymentMethodID, addComment } from '../../../core/Redux/action/Action'
import * as link from '../../../URL'

var radio_payment_detail = [
    { label: 'ATM', value: 0, payment_method_ID: '8' },
    { label: 'Visa', value: 1, payment_method_ID: '8' },
    { label: 'Vnpay', value: 2, payment_method_ID: '8' },
    { label: 'Paypal', value: 3, payment_method_ID: '4' },
]

// var radio_payment = [
//     { label: 'Trả sau', value: 0 },
//     // { label: 'Trả trước', value: 1 },
// ]

const imageCancel = '../../../image/cancel.png'
const imageCheck = '../../../image/checked.png'
const imageUnCheck = '../../../image/unchecked.png'


class InfoCustommerHourlyFreightTruck extends Component {

    constructor() {
        super();
        this.state = {
            is_checked: false,
            value_payment: 0,
            full_name: '',
            full_name1: '',
            use_phone: '',
            use_phone1: '',
            payment_method_ID: '3',
            email: '',
            email1: '',
            comment: '',
            mobile_validate: false,
            mobile_validate1: false,
            plane_number: '',
            promotion_code: '',
            detailPromotion: '',
            isLoading: false,
            vat: false,
            boardPrice: false,
            company_name: '',
            company_address: '',
            company_mst: '',
            company_address_receive: '',
            discount_price: 0,
            blDiscount: false,
            promotionStatus: false,
        }
    }

    componentDidMount() {
        console.log(this.props.merged)
        console.log(this.props.partner_name)
        console.log(this.props.extra_price_km_format)
        console.log(this.props.extra_price_hour_format)
        console.log(this.props.km_limit_format)
        this.setState({
            full_name: this.props.full_name,
            full_name1: this.props.full_name1,
            use_phone: this.props.use_phone,
            use_phone1: this.props.use_phone1,
            email: this.props.email,
            email1: this.props.email1,
        })
        this._validateEmail(this.props.email)
        this.mobileValidate(this.props.use_phone)
        this.mobileValidate1(this.props.use_phone1)
    }

    renderPostpaid() {
        if (this.state.value_payment == 0) {
            return null;
        } else {
            return (
                <View style={{ padding: 8 }}>
                    <RadioForm
                        animation={true}
                    >
                        {radio_payment_detail.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i} >
                                <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    isSelected={this.state.value_paymentDetail === i}
                                    onPress={() => {
                                        console.log(obj.label)
                                        this.setState({
                                            value_paymentDetail: i,
                                            selectRentCar: i,
                                            payment_method_ID: obj.payment_method_ID,
                                        })
                                    }}
                                    borderWidth={1}
                                    buttonInnerColor={'#00363d'}
                                    buttonOuterColor={'#00363d'}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    buttonStyle={7}
                                    buttonWrapStyle={{ marginLeft: 10 }}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    key={i}
                                    labelHorizontal={true}
                                    onPress={() => {
                                        console.log(obj.label)
                                        console.log(obj.payment_method_ID)
                                        this.setState({
                                            value_paymentDetail: i,
                                            payment_method_ID: obj.payment_method_ID,
                                        })
                                    }}
                                    labelStyle={{ fontSize: 18, color: '#000' }}
                                    labelWrapStyle={{}}
                                />
                            </RadioButton>
                        ))}


                    </RadioForm>
                </View>
            )
        }
    }

    mobileValidate1(text) {
        const reg = /^[0]?[3789]\d{8}$/;
        if (reg.test(text) === false) {
            this.setState({
                mobile_validate1: false,
                use_phone1: text,
            });
            return false;
        } else {
            this.setState({
                mobile_validate1: true,
                use_phone1: text,
            });
            return true;
        }
    }

    renderDatHo() {
        if (this.state.is_checked) {
            return (
                <View>
                    <Text style={styles.textBig}>Thông tin người đi</Text>

                    <Text style={styles.textBig}>Họ và tên</Text>

                    <InputTextDiChung
                        placeholder='Họ tên người đi'
                        value={this.state.full_name1}
                        onChangeText={(text) => this.setState({
                            full_name1: text,
                        })}
                        onPress={() => this.setState({
                            full_name1: ''
                        })}
                    />

                    <Text style={styles.textBig}>Số điện thoại</Text>

                    <InputTextDiChung
                        style={styles.textInput}
                        placeholder='Số điện thoại'
                        value={this.state.use_phone1}
                        keyboardType='numeric'
                        onChangeText={(text) => this.mobileValidate1(text)}
                        onPress={() => this.setState({
                            use_phone1: ''
                        })}
                    />

                    <Text style={styles.textBig}>Email</Text>

                    <InputTextDiChung
                        style={styles.textInput}
                        placeholder='Email'
                        value={this.state.email1}
                        onChangeText={(text) => this.setState({
                            email1: text,
                        })}
                        onPress={() => this.setState({
                            email1: ''
                        })}
                    />
                </View>
            )
        } else {
            return null;
        }
    }

    renderComment() {
        return (
            <View>
                <Text style={styles.textBig}>Ghi chú(Tùy chọn)</Text>

                <InputTextDiChung
                    style={styles.textInput}
                    placeholder='VD : Lái xe không hút thuốc'
                    value={this.state.comment}
                    onChangeText={(text) => this.setState({
                        comment: text,
                    })}
                    onPress={() => this.setState({
                        comment: ''
                    })}
                />
            </View>
        )
    }

    _validateEmail(text) {
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
        const reg = /^[0]?[3789]\d{8}$/;
        if (reg.test(text) === false) {
            this.setState({
                mobile_validate: false,
                use_phone: text,
            });
            return false;
        } else {
            this.setState({
                mobile_validate: true,
                use_phone: text,
            });
            return true;
        }
    }

    checkInfoCustommerHourlyFreightTruck() {
        if (this.state.full_name.trim().length < 2) {
            Alert.alert('Vui lòng nhập tên');
            return;
        }
        else if (!this.state.mobile_validate) {
            Alert.alert(`Vui lòng nhập đúng Số điện thoại`);
            return;
        }
        else if (!this.state.checkEmail) {
            Alert.alert(`Vui lòng nhập đúng địa chỉ email.`)
        }
        else {
            if (this.state.is_checked) {
                if (this.state.full_name1.trim().length < 2) {
                    Alert.alert('Vui lòng nhập tên người đi');
                    return;
                }
                else if (!this.state.mobile_validate1) {
                    Alert.alert(`Vui lòng nhập đúng Số điện thoại người đi`);
                    return;
                }
            } else {
                this.checkVat();
            }
            this.checkVat();
        }
    }

    checkVat() {
        if (this.state.vat) {
            if (this.state.company_name == '') {
                Alert.alert('Nhập tên công ty');
                return;
            } else if (this.state.company_address == '') {
                Alert.alert('nhập địa chỉ công ty');
                return;
            } else if (this.state.company_mst == '') {
                Alert.alert('nhập mã số thuế');
                return;
            } else if (this.state.company_address_receive == '') {
                Alert.alert('nhập địa chỉ nhận hóa đơn')
                return;
            } else {
                this.props.navigation.navigate('ConfirmInformationHB', {
                    "broad_price": this.state.boardPrice,
                    "not_use": this.state.is_checked,
                    "xhd": this.state.vat,
                    "promotion": this.state.promotion_code,
                    "blDiscount": this.state.blDiscount,
                });
            }
        } else {
            this.props.navigation.navigate('ConfirmInformationHB', {
                "broad_price": this.state.boardPrice,
                "not_use": this.state.is_checked,
                "xhd": this.state.vat,
                "promotion": this.state.promotion_code,
                "blDiscount": this.state.blDiscount,
                "Payment": this.state.value_payment,
            });
        }
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async checkPromotionCode() {
        const url = link.URL_API + `passenger/check_promotion_code?promotion_code=${this.state.promotion_code}&phone_number=84${this.state.use_phone}&chunk_id=${this.props.chunk_id}&ride_method_id=${this.props.ride_method_id}&depart_time=${this.props.depart_time}&transport_partner_id=${this.props.transport_partner_id}`;
        console.log(url)
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.code)
                if (responseJson.code == 'error') {
                    console.log('a')
                    this.setStateAsync({
                        isLoading: false,
                        promotionStatus: false,
                        detailPromotion: responseJson.message,
                        promotion_code: '',
                        blDiscount: false,
                    })
                    console.log(responseJson.message)
                } else {
                    console.log(responseJson.data)
                    this.setStateAsync({
                        isLoading: false,
                        promotionStatus: true,
                        detailPromotion: responseJson.data.discount_text,
                        discount_price: responseJson.data.discount_price,
                        blDiscount: true,
                    })
                    this.props.addPromotionCode(this.state.promotion_code, this.state.discount_price);
                }
                return responseJson.code;
            })
            .catch((error) => {
                this.setStateAsync({
                    isLoading: false
                })
                console.log('a1');
                console.log(error);
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
                    placeholder='Địa cỉ công ty'
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

    render() {
        const { navigation } = this.props;
        var radio_payment =
            [
                { label: 'Trả sau', value: 0, paymentMethodID: '3' }
            ]
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
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

                    <CheckBox
                        style={{ marginTop: 8 }}
                        onClick={() => {
                            this.setState({
                                is_checked: !this.state.is_checked
                            })
                        }}
                        isChecked={this.state.is_checked}
                        rightText={"Đặt xe cho người khác"}
                        rightTextStyle={{ fontSize: 20 }}
                        checkedImage={<Image source={require(imageCheck)} style={{ width: 25, height: 25 }} />}
                        unCheckedImage={<Image source={require(imageUnCheck)} style={{ width: 25, height: 25 }} />}
                    />

                    {this.renderDatHo()}
                    {this.renderComment()}


                    <Text style={styles.textBig}>Hình thức thanh toán</Text>

                    <RadioForm
                        animation={true}
                    >
                        {radio_payment.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i} >
                                <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    isSelected={this.state.value_payment === i}
                                    onPress={() => {
                                        console.log(obj.label)
                                        this.setState({
                                            value_payment: i,
                                            selectRentCar: i,
                                            payment_method_ID: obj.payment_method_ID,
                                        })
                                    }}
                                    borderWidth={1}
                                    buttonInnerColor={'#77a300'}
                                    buttonOuterColor={'#77a300'}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    buttonStyle={7}
                                    buttonWrapStyle={{ marginLeft: 10 }}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    key={i}
                                    labelHorizontal={true}
                                    onPress={() => {
                                        console.log(obj.label)
                                        this.setState({
                                            value_payment: i,
                                            payment_method_ID: obj.payment_method_ID,
                                        })
                                    }}
                                    labelStyle={{ fontSize: 18, color: '#000' }}
                                    labelWrapStyle={{}}
                                />
                            </RadioButton>
                        ))}


                    </RadioForm>

                    {this.renderPostpaid()}

                    <Text style={styles.textBig}>Mã giảm giá</Text>

                    <View style={{ flexDirection: 'row', marginTop: 8, marginBottom: 8, height: 50 }}>
                        <View style={{ marginTop: 8, borderWidth: 0.5, borderColor: '#00363d', borderRadius: 8, flexDirection: 'row', justifyContent: "center", alignItems: "center", flex: 1, }} >
                            <TextInput
                                style={[styles.textInput]}
                                value={this.state.promotion_code}
                                onChangeText={(text) => this.setState({
                                    promotion_code: text,
                                    blDiscount: false,
                                })}
                            />
                            <TouchableOpacity
                                onPress={() => this.setState({
                                    promotion_code: '',
                                    blDiscount: false,
                                }
                                )}
                            >
                                <Image
                                    style={{ width: 20, height: 20, margin: 8 }}
                                    source={this.state.promotion_code.length == 0 ? null : require(imageCancel)}
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    isLoading: true,
                                })
                                this.checkPromotionCode();
                            }}
                            style={{ padding: 8, justifyContent: 'center', backgroundColor: '#77a300', marginLeft: 8, borderRadius: 6, marginTop: 8 }}
                        >
                            <Text style={{ color: '#ffffff' }}>ÁP DỤNG</Text>
                        </TouchableOpacity>
                    </View>

                    <View>{this.state.detailPromotion == '' ? null : <Text style={{ color: this.state.promotion ? "#77a300" : "#fa0000" }}>{this.state.detailPromotion}</Text>}</View>

                    <CheckBox
                        style={{ marginTop: 8 }}
                        onClick={() => {
                            this.setState({
                                vat: !this.state.vat
                            })
                        }}
                        isChecked={this.state.vat}
                        rightText={"VAT 10 %"}
                        rightTextStyle={{ fontSize: 20 }}
                        checkedImage={<Image source={require(imageCheck)} style={{ width: 25, height: 25 }} />}
                        unCheckedImage={<Image source={require(imageUnCheck)} style={{ width: 25, height: 25 }} />}
                    />
                    {this.renderFormVAT()}

                    <TouchableOpacity
                        style={{ marginTop: 8, backgroundColor: '#77a300', justifyContent: 'center', alignItems: "center", height: 40, borderRadius: 6 }}
                        onPress={() => {
                            const { xhd, company_name, company_address, company_address_receive, company_mst, full_name, use_phone, email, full_name1, use_phone1, email1, payment_method_ID, comment } = this.state;
                            this.props.addVAT(xhd ? '1' : '0', company_name, company_address, company_mst, company_address_receive);
                            this.props.addInfoPeople2(full_name1, use_phone1, email1);
                            this.props.addInfoPeople1(full_name, use_phone, email);
                            this.props.addComment(comment);
                            // add payment method id
                            console.log(payment_method_ID)
                            this.props.addPaymentMethodID(payment_method_ID);
                            this.checkInfoCustommerHourlyFreightTruck();
                        }}
                    >
                        <Text style={{ color: '#ffffff' }}>TIẾP TỤC</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        padding: 8,
    },

    textBig: {
        marginTop: 8,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00363e'
    },

    textNomal: {
        marginTop: 8,
        fontSize: 18,
    },

    textSmall: {
        marginTop: 8,
        fontSize: 14,
    },

    textInput: {
        borderWidth: 0,
        padding: 8,
        borderColor: '#00363d',
        fontSize: 16,
        borderRadius: 8,
        flex: 1,
    },
    borderView: {
        marginTop: 8,
        borderWidth: 0.5,
        borderColor: '#00363d',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    }
});

function mapStateToProps(state) {
    return {
        full_name: state.info.full_name,
        use_phone: state.info.use_phone,
        email: state.info.email,
        full_name1: state.info.full_name2,
        use_phone1: state.info.use_phone2,
        email1: state.info.email2,
        pick_add: state.info.pick_add,
        chunk_id: state.info.chunk_id,
        ride_method_id: state.info.ride_method_id,
        partner_name: state.info.partner_name,
        merged: state.info.merged,
        depart_time: state.info.depart_time,
        extra_price_km_format: state.info.extra_price_km_format,
        extra_price_hour_format: state.info.extra_price_hour_format,
        km_limit_format: state.info.km_limit_format,
    }
}

export default connect(mapStateToProps, { addInfoFlight: addInfoFlight, addInfoPeople1: addInfoPeople1, addInfoPeople2: addInfoPeople2, addVAT: addVAT, addPromotionCode: addPromotionCode, addPaymentMethodID: addPaymentMethodID, addComment: addComment, })(InfoCustommerHourlyFreightTruck);