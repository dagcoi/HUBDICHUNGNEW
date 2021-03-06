import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, AsyncStorage } from 'react-native';
import InputTextDiChung from '../../../component/InputTextDiChung'
import CheckBoxList from '../../../component/CheckBoxList'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import * as link from '../../../URL'
import { addInfoPeople1Taixe, addInfoPeople2Taixe, addVATTaixe, addCommentTaixe, addPromotionCodeTaixe, addPaymentMethodIDTaixe, } from '../../../core/Redux/action/Action'
import { Button, ButtonDialog } from '../../../component/Button'
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';
import PopUp from '../../../component/PopUp'

class InfoCustommerXeChung extends Component {

    constructor() {
        super();
        this.state = {
            is_checked: false,
            plane_type: 1,
            value_payment: 0,
            full_name: '',
            full_name1: '',
            use_phone: '',
            use_phone1: '',
            payment_method_ID: '3',
            promotion_code: '',
            email: '',
            email1: '',
            comment: '',
            mobile_validate: false,
            mobile_validate1: false,
            isLoading: false,
            vat: false,
            company_name: '',
            company_address: '',
            company_mst: '',
            company_address_receive: '',
            blDiscount: false,
            alertName: false,
            alertPhone: false,
            alertEmail: false,
            alertName2: false,
            alertPhone2: false,
            alertCompany: false,
            detailPromotion : '',
            promotion : '',
        }
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        try {
            const dataLogin = await AsyncStorage.getItem('dataLogin')
            if (dataLogin !== null) {
                let json = JSON.parse(dataLogin)
                this.setState({
                    full_name: json.username,
                    full_name1: this.props.full_name1,
                    use_phone: json.phone ?? '',
                    use_phone1: this.props.use_phone1,
                    email: json.email ?? '',
                    email1: this.props.email1,
                    comment: this.props.comment,
                    promotion_code: '',
                })
                this._validateEmail(json.email ?? '')
                this.mobileValidate(json.phone ?? '')
                this.mobileValidate1(this.props.use_phone1)
            }
        } catch (error) {
            console.log(error)
        }
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
                        promotion_code: this.state.promotion_code.toUpperCase(),
                        blDiscount: true,
                    })
                    this.props.addPromotionCodeTaixe(this.state.promotion_code, this.state.discount_price);
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


    mobileValidate1(text) {
        var test = text.trim();
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

    renderAlert() {
        return (
            <Dialog
                visible={this.state.alertName || this.state.alertPhone || this.state.alertEmail || this.state.alertName2 || this.state.alertPhone2 || this.state.alertCompany}
                width={0.8}
                dialogTitle={<DialogTitle title='Thông tin chưa đủ' />}
            >
                <View>
                    <View style={{ padding: 8, flexDirection: 'column' }}>
                        {this.state.alertName ? <Text>Vui lòng nhập tên</Text> : null}
                        {this.state.alertPhone ? <Text>Vui lòng nhập số điện thoại</Text> : null}
                        {this.state.alertEmail ? <Text>Vui lòng nhập Email</Text> : null}
                        {this.state.alertName2 ? <Text>Vui lòng nhập tên người đi</Text> : null}
                        {this.state.alertPhone2 ? <Text>Vui lòng nhập số điện thoại người đi</Text> : null}
                        {this.state.alertCompany ? <Text>Vui lòng nhập đầy đủ thông tin nhận hóa đơn</Text> : null}

                        <ButtonDialog
                            text="Đồng ý"
                            onPress={() => {
                                this.setState({
                                    alertName: false,
                                    alertPhone: false,
                                    alertEmail: false,
                                    alertName2: false,
                                    alertPhone2: false,
                                    alertCompany: false,
                                })
                            }}
                        />
                    </View>
                </View>
            </Dialog>
        )
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
        const reg = /^[0]?[3789]\d{8}$/;
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

    checkInfoCustommerXeChung() {
        if (this.state.full_name.trim().length < 2) {
            this.setState({ alertName: true })
            return;
        }
        else if (!this.state.mobile_validate) {
            this.setState({ alertPhone: true })
            return;
        }
        else if (!this.state.checkEmail) {
            this.setState({ alertEmail: true })
        }
        else {
            if (this.state.is_checked) {
                if (this.state.full_name1.trim().length < 2) {
                    this.setState({ alertName2: true })
                    return;
                }
                else if (!this.state.mobile_validate1) {
                    this.setState({ alertPhone2: true })
                    return;
                }
            }
            // else {
            //     this.checkVat();
            // }
            this.checkVat();
        }
    }

    checkVat() {
        if (this.state.vat) {
            if (this.state.company_name.trim() == '') {
                this.setState({ alertCompany: true })
                return;
            } else if (this.state.company_address.trim() == '') {
                this.setState({ alertCompany: true })
                return;
            } else if (this.state.company_mst.trim() == '') {
                this.setState({ alertCompany: true })
                return;
            } else if (this.state.company_address_receive.trim() == '') {
                this.setState({ alertCompany: true })
                return;
            } else {
                this.nextScreen();
            }
        } else {
            this.nextScreen();
        }
    }

    nextScreen() {
        this.props.navigation.navigate('ConfirmInformationXeChung', {
            "not_use": this.state.is_checked,
            "xhd": this.state.vat,
            "plane_type": this.state.plane_type,
            "promotion": this.state.promotion_code,
            "blDiscount": this.state.blDiscount,
            "Payment": this.state.value_payment,
            "detailPromotion": this.state.detailPromotion,
        });
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
        var radio_payment = [
            { label: 'Trả sau', value: 0, paymentMethodID: '3' },
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

                    <CheckBoxList
                        onClick={() => {
                            this.setState({
                                is_checked: !this.state.is_checked
                            })
                        }}
                        isChecked={this.state.is_checked}
                        rightText={"Đặt xe cho người khác"}
                    />

                    {this.renderDatHo()}

                    <View>
                        <Text style={styles.textBig}>Ghi chú * <Text style={{ color: 'red', fontWeight: 'normal', fontSize: 14, }}>(chi tiết xe)</Text></Text>

                        <InputTextDiChung
                            style={styles.textInput}
                            placeholder='Nhập thông tin xe của bạn. VD. Mercedes S500'
                            value={this.state.comment}
                            multiline={true}
                            onChangeText={(text) => this.setState({
                                comment: text
                            })}
                            onPress={() => this.setState({
                                comment: ''
                            })}
                        />
                    </View>


                    <Text style={styles.textBig}>Hình thức thanh toán</Text>
                    <View style={{ marginTop: 8 }}>
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
                                        borderWidth={0.5}
                                        buttonInnerColor={'#77a300'}
                                        buttonOuterColor={'#77a300'}
                                        buttonSize={10}
                                        buttonOuterSize={16}
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
                                        labelStyle={{ fontSize: 14, color: '#000' }}
                                        labelWrapStyle={{}}
                                    />
                                </RadioButton>
                            ))}


                        </RadioForm>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 8, marginBottom: 8, height: 50 }}>
                        <View style={{ flex: 1, }} >
                            <InputTextDiChung
                                placeholder='Mã giảm giá'
                                value={this.state.promotion_code}
                                onChangeText={(text) => this.setState({
                                    promotion_code: text,
                                    detailPromotion : '',
                                    blDiscount : false
                                })}
                                onPress={() => this.setState({
                                    promotion_code: ''
                                })}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    isLoading: true,
                                })
                                this.checkPromotionCode();
                            }}
                            style={{ padding: 8, justifyContent: 'center', backgroundColor: '#77a300', marginLeft: 8, borderRadius: 4, marginTop: 8 }}
                        >
                            <Text style={{ color: '#ffffff' }}>ÁP DỤNG</Text>
                        </TouchableOpacity>
                    </View>

                    <View>{this.state.detailPromotion == '' ? null : <Text style={{ color: this.state.promotion_code=='' ? "#EF465E" : "#77a300" }}>{this.state.detailPromotion}</Text>}</View>

                    <CheckBoxList
                        onClick={() => {
                            this.setState({
                                vat: !this.state.vat
                            })
                        }}
                        isChecked={this.state.vat}
                        rightText={"VAT 10 %"}
                    />
                    {this.renderFormVAT()}

                    <Button
                        value={'TIẾP TỤC'}
                        onPress={() => {
                            const { xhd, company_name, company_address, company_address_receive, company_mst, full_name, use_phone, email, full_name1, use_phone1, email1, comment, payment_method_ID } = this.state;
                            this.props.addVATTaixe(xhd ? '1' : '0', company_name, company_address, company_mst, company_address_receive);
                            this.props.addInfoPeople2Taixe(full_name1, use_phone1, email1);
                            this.props.addInfoPeople1Taixe(full_name, use_phone, email);
                            this.props.addCommentTaixe(comment);
                            console.log(payment_method_ID);
                            this.props.addPaymentMethodIDTaixe(payment_method_ID);
                            this.checkInfoCustommerXeChung();
                        }}
                    />

                    {this.renderAlert()}

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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00363e'
    },

    textNomal: {
        marginTop: 8,
        fontSize: 14,
    },

    textSmall: {
        marginTop: 8,
        fontSize: 12,
    },

    textInput: {
        borderWidth: 0.5,
        padding: 8,
        borderColor: '#e8e8e8',
        fontSize: 14,
        borderRadius: 4,
        flex: 1,
    },
    borderView: {
        marginTop: 8,
        borderWidth: 0.5,
        borderColor: '#e8e8e8',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    }
});

function mapStateToProps(state) {
    return {
        full_name: state.rdTaixe.full_name,
        use_phone: state.rdTaixe.use_phone,
        email: state.rdTaixe.email,
        full_name1: state.rdTaixe.full_name2,
        use_phone1: state.rdTaixe.use_phone2,
        email1: state.rdTaixe.email2,
        comment: state.rdTaixe.comment,
        drop_add: state.rdTaixe.drop_add,
        pick_add: state.rdTaixe.pick_add,
        chunk_id: state.rdTaixe.chunk_id,
        ride_method_id: state.rdTaixe.ride_method_id,
        depart_time: state.rdTaixe.depart_time,
        transport_partner_id: state.rdTaixe.brand_partner_id,
    }
}

export default connect(mapStateToProps, { addCommentTaixe: addCommentTaixe, addInfoPeople1Taixe: addInfoPeople1Taixe, addInfoPeople2Taixe: addInfoPeople2Taixe, addVATTaixe: addVATTaixe, addPromotionCodeTaixe: addPromotionCodeTaixe, addPaymentMethodIDTaixe: addPaymentMethodIDTaixe })(InfoCustommerXeChung);