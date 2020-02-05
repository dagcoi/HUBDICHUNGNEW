import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import InputTextDiChung from '../../../component/InputTextDiChung'
import CheckBoxList from '../../../component/CheckBoxList'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { addInfoPeople1, addInfoPeople2, addVAT, addComment, addPromotionCode, addPaymentMethodID,  } from '../../../core/Redux/action/Action'

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
            email: '',
            email1: '',
            comment: '1',
            mobile_validate: false,
            mobile_validate1: false,
            isLoading: false,
            vat: false,
            company_name: '',
            company_address: '',
            company_mst: '',
            company_address_receive: '',
            blDiscount: false,
        }
    }

    componentDidMount() {
        this.setState({
            full_name: this.props.full_name,
            full_name1: this.props.full_name1,
            use_phone: this.props.use_phone,
            use_phone1: this.props.use_phone1,
            email: this.props.email,
            email1: this.props.email1,
            comment : this.props.comment,
        })
        this._validateEmail(this.props.email)
        this.mobileValidate(this.props.use_phone)
        this.mobileValidate1(this.props.use_phone1)
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

    checkInfoCustommerXeChung() {
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
                            placeholder='VD : Mercedes S500'
                            value={this.state.comment}
                            onChangeText={(text) => this.setState({
                                comment: text
                            })}
                            onPress={() => this.setState({
                                comment: ''
                            })}
                        />
                    </View>


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

                    <TouchableOpacity
                        style={{ marginTop: 8, backgroundColor: '#77a300', justifyContent: 'center', alignItems: "center", height: 40, borderRadius: 6 }}
                        onPress={() => {
                            const { xhd, company_name, company_address, company_address_receive, company_mst, full_name, use_phone, email, full_name1, use_phone1, email1, comment, payment_method_ID } = this.state;
                            this.props.addVAT(xhd ? '1' : '0', company_name, company_address, company_mst, company_address_receive);
                            this.props.addInfoPeople2(full_name1, use_phone1, email1);
                            this.props.addInfoPeople1(full_name, use_phone, email);
                            // add payment method id
                            this.props.addComment(comment);
                            console.log(payment_method_ID);
                            this.props.addPaymentMethodID(payment_method_ID);
                            this.checkInfoCustommerXeChung();
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
        comment : state.info.comment,
        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
        chunk_id: state.info.chunk_id,
        ride_method_id: state.info.ride_method_id,
        depart_time: state.info.depart_time,
        transport_partner_id: state.info.transport_partner_id,
    }
}

export default connect(mapStateToProps, { addComment: addComment, addInfoPeople1: addInfoPeople1, addInfoPeople2: addInfoPeople2, addVAT: addVAT, addPromotionCode: addPromotionCode, addPaymentMethodID: addPaymentMethodID })(InfoCustommerXeChung);