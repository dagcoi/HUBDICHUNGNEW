import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Modal, Keyboard, ActivityIndicator, FlatList, Alert, ScrollView, } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import CheckBox from 'react-native-check-box'
import InputTextDiChung from '../../../component/InputTextDiChung'
import { Button } from '../../../component/Button'

import { addInfoPeople1 } from '../../../core/Redux/action/Action'

import { connect } from 'react-redux'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

var radio_props_rent_car = [
    { label: 'Nhận xe tại đại lý', value: 1, },
    { label: 'Nhận xe tại nhà', value: 2, }
];
const imageLocation = '../../../image/location.png'
const imageCancel = '../../../image/cancel.png'
const imageMore = '../../../image/more.png'
const imageFuel = '../../../image/fuel.png'
const imageAutomatic = '../../../image/automatic.png'
const imageManual = '../../../image/manual.png'

const API_KEY = 'AIzaSyBDZSUAda65OflvYZmZ4G5XSGONZv3pkuY';

class InfoCarChungXe extends Component {

    constructor() {
        super();
        this.state = {
            fullname: '',
            use_phone: '',
            email: '',
            value3Index: 0,
            modalRent: false,
            modalInfoVehicle: false,

            address_component: '',
            address: '',
            blSelect: true,
            showPlacesList: false,
            lat: 0.1,
            lng: 0.2,
            promotionCode: '',
            detailPromotion: '',
            isCheck: false,
            moneyPaymet: 0,
            vat: false,
            company_name: '',
            company_address: '',
            company_mst: '',
            company_address_receive: '',
            selectRentCar: 0,
            loadVehiclePartner: true,
            dataVhcPartId: {},
        }
    }

    componentDidMount() {
        const date1 = new Date(this.props.rent_date);
        const date2 = new Date(this.props.retun_date)
        const Difference_In_Time = date2.getTime() - date1.getTime();
        const Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24)) + 1;
        const item = this.props.navigation.getParam('item');

        console.log(Difference_In_Days)
        console.log('a')
        console.log(this.props.rent_date)
        console.log(this.props.retun_date)
        console.log(Difference_In_Time)
        this.setState({
            moneyPaymet: (Difference_In_Days * item.vhc_part_defa_prie)
        })
        { this.getDetailVehiclePartner() }
    }

    async getDetailVehiclePartner() {
        const item = this.props.navigation.getParam('item');
        const url = `https://api.chungxe.vn/vehicle-partner/get-detail-vehicle-partner?vhc_part_id=${item.vhc_part_id}`
        const res = await fetch(url);
        const jsonRes = await res.json();
        console.log(jsonRes.data)
        return this.setState({ dataVhcPartId: jsonRes.data, loadVehiclePartner: false });
    }

    setModalVisible(visible) {
        this.setState({ modalRent: visible });
    }


    _validateAddress(address_component, address) {
        this.setState(() => ({
            address_component: address_component,
            address: address,
            blSelect: false,
        }))
        // this.setModalVisible(false);
    }

    renderLocationRentCar() {
        if (this.state.value3Index == 1) {
            return (
                <View
                    style={{ borderRadius: 4, borderColor: '#e8e8e8', borderWidth: 1 }}
                >
                    <TouchableOpacity
                        style={{ flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', }}
                        onPress={() => {
                            this.props.navigation.push("SearchPlace", {
                                search: 'Pick',
                                placeholder: 'Nhập điểm nhận xe'
                            });
                        }}
                    >
                        <TextInput
                            editable={false}
                            ref="myInput"
                            onTouchStart={() => this.props.navigation.push("SearchPlace", {
                                search: 'Pick',
                                placeholder: 'Nhập điểm nhận xe'
                            })
                            }
                            pointerEvents="none"
                            onSubmitEditing={Keyboard.dismiss}
                            placeholder='Nhập điểm nhận xe'
                            style={{ fontSize: 14, height: 40, color: '#000' }}
                            pointerEvents="none"
                            value={this.props.pick_add}
                        />
                    </TouchableOpacity>

                </View>
            )
        } else {
            return null;
        }
    }

    _clearInput(inputT) {
        if (inputT) {
            inputT.setAddressText('')
            inputT.refs.textInput.focus()
        }
    }

    render() {
        if (this.state.loadVehiclePartner) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator
                        size='large'
                    />
                </View>
            )
        }

        const item = this.props.navigation.getParam('item');
        // var moneyPaymet = ((this.state.isCheck ? 11 / 10 : 1) * Difference_In_Days * item.vhc_part_defa_prie).format(0, 3, '.')
        return (
            <View style={styles.container}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >

                    <Image
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 140, resizeMode: 'contain' }}
                        source={{ uri: item.vhc.vhc_imgs }}
                    />
                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Text style={{ backgroundColor: '#77a300', padding: 4, color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{item.vhc_part_name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 4, marginLeft: 8 }}>
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={(item.vhc.vhc_tms_id == '1' || item.vhc.vhc_tms_id == '3') ? require(imageAutomatic) : require(imageManual)}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }} >{item.vhc.vhc_tms_name}</Text>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 4, marginLeft: 8 }}>
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require(imageFuel)}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }} >{item.vhc.vhc_fuel_name}</Text>
                        </View>

                        <View >
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', padding: 4, marginLeft: 8 }}
                                onPress={() => {
                                    this.setState({
                                        modalInfoVehicle: true,
                                    })
                                }}
                            >
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={require(imageMore)}
                                />
                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#77a300' }} >Chi tiết</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.textBig}>Họ và tên</Text>

                    <InputTextDiChung
                        value={this.state.fullname}
                        placeholder='Nhập họ tên'
                        onChangeText={(text) => this.setState({
                            fullname: text,
                        })}
                        keyboardType='ascii-capable'
                        onPress={() => this.setState({
                            fullname: ''
                        })}
                    />


                    <Text style={styles.textBig}>Số điện thoại</Text>

                    <InputTextDiChung
                        value={this.state.use_phone}
                        placeholder='Nhập số điện thoại'
                        onChangeText={(text) => this.mobilevalidate(text)}
                        keyboardType='numeric'
                        onPress={() => this.setState({
                            use_phone: ''
                        })}
                    />

                    <Text style={styles.textBig}>Email</Text>

                    <InputTextDiChung
                        value={this.state.email}
                        placeholder='Nhập email'
                        onChangeText={(text) => this._validateEmail(text)}
                        keyboardType='ascii-capable'
                        onPress={() => this.setState({
                            email: ''
                        })}
                    />

                    <Text style={styles.textBig}>Hình thức nhận xe</Text>

                    <View style={{ marginTop: 8 }}>
                        <RadioForm
                            animation={true}
                        >
                            {radio_props_rent_car.map((obj, i) => (
                                <RadioButton labelHorizontal={true} key={i} >
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={this.state.value3Index === i}
                                        onPress={() => {
                                            console.log(obj.label)
                                            this.setState({
                                                value3Index: i,
                                                selectRentCar: i
                                            })
                                        }}
                                        borderWidth={1}
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
                                                value3Index: i,
                                                selectRentCar: i
                                            })
                                        }}
                                        labelStyle={{ fontSize: 14, color: '#000' }}
                                        labelWrapStyle={{}}
                                    />
                                </RadioButton>
                            ))}


                        </RadioForm>

                        <Text style={{ marginLeft: 32, color: '#000', margin: 4 }}>{this.state.selectRentCar == 1 ? 'Xe được giao đến địa chỉ của quý khách. phí giao xe tại nhà sẽ được thông báo qua bộ phận chăm sóc khách hàng.' : 'Khách hàng sẽ đến đại lí để nhận xe.'}</Text>

                        {this.renderLocationRentCar()}

                        <Text style={styles.textBig}>Mã giảm giá</Text>

                        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", flex: 1, }} >
                                <InputTextDiChung
                                    value={this.state.promotionCode}
                                    onChangeText={(text) => this.setState({
                                        promotionCode: text,
                                        blDiscount: false,
                                    })}
                                    placeholder={'Mã giảm giá'}
                                    onPress={() => this.setState({
                                        promotionCode: '',
                                        blDiscount: false,
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
                                style={{ padding: 8, justifyContent: 'center', backgroundColor: '#77a300', marginLeft: 8, borderRadius: 4, marginTop: 8, }}
                            >
                                <Text style={{ color: '#ffffff' }}>ÁP DỤNG</Text>
                            </TouchableOpacity>
                        </View>

                        <View>{this.state.detailPromotion == '' ? null : <Text>{this.state.detailPromotion}</Text>}</View>

                        <CheckBox
                            style={{ marginTop: 8 }}
                            onClick={() => {
                                this.setState({
                                    vat: !this.state.vat
                                })
                                console.log(this.state.moneyPaymet);

                            }}
                            isChecked={this.state.vat}
                            rightText={"Xuất hóa đơn"}
                            rightTextStyle={{ fontSize: 16 }}
                            checkBoxColor = {'#77a300'}
                        />

                        {this.renderFormVAT()}
                        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                            <Text style={styles.textBig}>Tổng thanh toán</Text>

                            <Text style={{ flex: 1, textAlign: 'right', color: '#77a300', fontWeight: 'bold', fontSize: 16, marginTop: 8 }}>
                                {((this.state.vat ? 11 / 10 : 1) * (this.state.moneyPaymet)).format(0, 3, `.`)} đ
                            </Text>

                        </View>

                        <Button
                            value='TIẾP TỤC'
                            onPress={() => {
                                const { fullname, use_phone, email } = this.state;
                                console.log(fullname + use_phone + email)
                                this.props.addInfoPeople1(fullname, use_phone, email);
                                this.checkInfoCustommer()
                            }}
                        />
                        {this.renderInFoVehicle(this.state.dataVhcPartId)}

                    </View>


                </ScrollView>
            </View>
        )
    }

    renderInFoVehicle(dataVhcPartId) {
        // if(this.state.loadVehiclePartner){
        //     this.setState({modalInfoVehicle : false});
        // }

        return (
            <View
                View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 10,
                }}
            >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalInfoVehicle}
                    onOrientationChange={true}
                >
                    <View style={{ flex: 1, backgroundColor: '#fff', padding: 8 }}>

                        <View style={{ height: 50, justifyContent: 'center', flexDirection: 'row', padding: 0 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ modalInfoVehicle: false })
                                }}
                            >
                                <Image
                                    style={{ width: 40, height: 40 }}
                                    source={require(imageCancel)}
                                />
                            </TouchableOpacity>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#33333', fontSize: 16, fontWeight: 'bold' }}>Chi tiết xe</Text>
                            </View>
                        </View>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <View>
                                <View style={{ alignItems: 'center', height: 150 }}>
                                    <Image
                                        style={{ flex: 1, height: 140, width: 250, resizeMode: 'contain' }}
                                        source={{ uri: dataVhcPartId.vhc.vhc_imgs[0].vhc_img_link }}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ backgroundColor: '#77a300', color: '#fff', padding: 4, fontSize: 14, fontWeight: 'bold' }}>{dataVhcPartId.vhc_part_name}</Text>
                                </View>

                                <View>
                                    <Text style={styles.textBig}>Thông tin</Text>
                                    <Text style={styles.textSmall}>{dataVhcPartId.vhc.vhc_tms_name}</Text>
                                    <Text style={styles.textSmall}>{dataVhcPartId.vhc.vhc_fuel_name}</Text>
                                </View>

                                <View>
                                    <Text style={styles.textBig}>Tính năng</Text>
                                    {/* {dataVhcPartId.vhc.vhc_opts.length > 0 ? <View> */}
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        data={dataVhcPartId.vhc.vhc_opts}
                                        renderItem={({ item }) => {
                                            return (
                                                <View>
                                                    <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Image
                                                            style={{ height: 20, width: 20, }}
                                                            source={{ uri: `https://chungxe.vn/` + item.vhc_opt_ico }}
                                                        />
                                                        <Text style={{ flex: 1, marginLeft: 8, fontSize: 14 }}>{item.vhc_opt_name}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }
                                        }
                                    />
                                    {/* </View> : null} */}
                                </View>

                                <View>
                                    <Text style={styles.textBig}>Yêu cầu thủ tục</Text>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        data={dataVhcPartId.part.part_procs}
                                        renderItem={({ item }) => {
                                            return (
                                                <View>
                                                    <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Image
                                                            style={{ height: 20, width: 20, }}
                                                            source={{ uri: `https://chungxe.vn/` + item.proc.proc_ico }}
                                                        />
                                                        <Text style={{ flex: 1, marginLeft: 8, fontSize: 14 }}>{item.proc.proc_name}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }
                                        }
                                    />
                                </View>

                                <View>
                                    <Text style={styles.textBig}>Thanh toán</Text>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        data={dataVhcPartId.part.part_pay_meths}
                                        renderItem={({ item }) => {
                                            return (
                                                <View>
                                                    <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Image
                                                            style={{ height: 20, width: 20, }}
                                                            source={{ uri: `https://chungxe.vn/` + item.pay_meth_ico }}
                                                        />
                                                        <Text style={{ flex: 1, marginLeft: 8, fontSize: 14 }}>{item.pay_meth_name}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }
                                        }
                                    />
                                </View>

                                <View>
                                    <Text style={styles.textBig}>Ghi chú</Text>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        data={dataVhcPartId.part.part_procs}
                                        renderItem={({ item }) => {
                                            return (
                                                <View>
                                                    <Text style={{ flex: 1, marginLeft: 8, fontSize: 14 }}>- {item.part_proc_note}</Text>
                                                    {/* {item.proc.proc_name}  */}
                                                </View>
                                            )
                                        }
                                        }
                                    />
                                </View>

                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        )

    }

    renderFormVAT() {
        if (!this.state.vat) {
            return null;
        }

        return (
            <View>

                <InputTextDiChung
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

    mobilevalidate(text) {
        var test = text.trim();
        const reg = /^[0]?[3789]\d{8}$/;
        if (reg.test(test) === false) {
            this.setState({
                mobilevalidate: false,
                use_phone: test,
            });
            return false;
        } else {
            this.setState({
                mobilevalidate: true,
                use_phone: test,
            });
            return true;
        }
    }

    checkVat() {
        if (this.state.vat) {
            if (this.state.company_name.trim() == '') {
                Alert.alert('Nhập tên công ty');
                return;
            } else if (this.state.company_address.trim() == '') {
                Alert.alert('nhập địa chỉ công ty');
                return;
            } else if (this.state.company_mst.trim() == '') {
                Alert.alert('nhập mã số thuế');
                return;
            } else if (this.state.company_address_receive.trim() == '') {
                Alert.alert('nhập địa chỉ nhận hóa đơn')
                return;
            } else {
                this.nextScreen();
            }
        } else {
            this.nextScreen();
        }
    }

    checkInfoCustommer() {
        if (this.state.fullname.trim().length < 2) {
            Alert.alert('Vui lòng nhập tên');
            return;
        }
        else if (!this.state.mobilevalidate) {
            Alert.alert(`Vui lòng nhập đúng Số điện thoại`);
            return;
        }
        else if (!this.state.checkEmail) {
            Alert.alert(`Vui lòng nhập đúng địa chỉ email.`)
        }
        else {
            this.checkVat();
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

    nextScreen() {
        this.props.navigation.navigate('ConfirmInfoChungXe', {
            item: this.props.navigation.getParam('item'),
            "not_use": this.state.isChecked,
            "xhd": this.state.vat,
            "plane_type": this.state.plane_type,
            "promotion": this.state.promotionCode,
            "blDiscount": this.state.blDiscount,
            "moneyPaymet": this.state.moneyPaymet,
            "selectRentCar": this.state.selectRentCar,
        })
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async checkPromotionCode() {
        const item = this.props.navigation.getParam('item');

        const url = `https://api.chungxe.vn/booking/promotion?book_rent_date=${this.props.rent_date}&book_retun_date=${this.props.retun_date}&promo_code=${this.state.promotionCode}&vhc_part_id=${item.part.part_id}`;
        console.log(url)
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == 'error') {
                    this.setStateAsync({
                        isLoading: false,
                        detailPromotion: responseJson.message,
                        promotionCode: '',
                        blDiscount: false,
                    })
                } else {
                    this.setStateAsync({
                        isLoading: false,
                        detailPromotion: responseJson.data.discount_text,
                        discount_price: responseJson.data.discount_price,
                        blDiscount: true,
                    })
                    this.props.addPromotionCode(this.state.promotionCode, this.state.discount_price);
                }
                return responseJson.code;
            })
            .catch((error) => {
                this.setStateAsync({
                    isLoading: false
                })
            });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 8,
    },

    textBig: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333'
    },

    textNomal: {
        marginTop: 8,
        fontSize: 14,
    },

    textSmall: {
        marginTop: 8,
        fontSize: 13,
    },

    textInput: {
        borderWidth: 0,
        padding: 8,
        borderColor: '#e8e8e8',
        fontSize: 14,
        borderRadius: 4,
        flex: 1,
    },
    borderView: {
        marginTop: 8,
        borderWidth: 1,
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
        city: state.info.city,
        rent_date: state.info.rent_date,
        retun_date: state.info.retun_date,
        pick_add: state.info.pick_add,
        component_pick: state.info.component_pick,
        time_pick: state.info.time_pick,
    }
}

export default connect(mapStateToProps, { addInfoPeople1: addInfoPeople1 })(InfoCarChungXe);