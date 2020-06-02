import React, { Component } from 'react'
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text, Modal, AsyncStorage, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import { ButtonWrap, ButtonGray } from '../../../component/Button'
import Header from '../../../component/Header'
import InputTextDiChung from '../../../component/InputTextDiChung'
import InputPassWord from '../Login/InputPassWord'
import * as link from '../../../URL'
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import { addUser, addToken } from '../../../core/Redux/action/Action'

const logo = '../../../image/logo_dc_taxi.png'
const people = '../../../image/person.png'
const cancel = '../../../image/cancel.png'
const iconCacbonic = '../../../image/iconcacbonic.png'
const iconHappy = '../../../image/iconhappy.png'
const iconMoney = '../../../image/iconmoney.png'
const home = '../../../image/home.jpg'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            visibal: true,
            showLogin: true,
            showSignUp: false,
            loginSuccess: false,
            isLoading: true,
            clickLogin: true,
            messageAddUser: '',
            messageLogin: '',
            validate: false,
            rePass: '',
            infoCustommer: {},
            showRePass: false,
            passOld: '',
            changPass: '',
            reChangPass: '',
            fullName: '',
            email: '',
            phone: '',
            address: '',
            editable: false,
            editablePhone: false,
            passWord: '',
            dataProfile: {},
            referralCode: '',
            setProfileSuccess: false,
            idCustommer: ''
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        if (navigation.getParam('dataLogin')) {
            let dataLogin = navigation.getParam('dataLogin')
            let json = JSON.parse(dataLogin)
            this.apiGetProfile(json._id)
        } else {
            this._retrieveData()
        }
        if (navigation.getParam('passWord')) {
            this.setState({
                passWord: navigation.getParam('passWord')
            })
        }
    }

    // componentDidUpdate() {
    //     const { navigation } = this.props;
    //     if (navigation.getParam('dataLogin')) {
    //         let dataLogin = navigation.getParam('dataLogin')
    //         let json = JSON.parse(dataLogin)
    //         this.apiGetProfile(json._id)
    //     }

    //     if (navigation.getParam('passWord')) {
    //         this.setState({
    //             passWord: navigation.getParam('passWord')
    //         })
    //     }
    // }

    addDataLogin = async (dataLogin) => {
        await AsyncStorage.setItem('dataLogin', JSON.stringify(dataLogin))
    }

    _retrieveData = async () => {
        try {
            const dataLogin = await AsyncStorage.getItem('dataLogin')
            const password = await AsyncStorage.getItem('password')
            if (dataLogin !== null) {
                let json = JSON.parse(dataLogin)
                // console.log(dataLogin)
                // console.log(json.token)
                this.setState({ infoCustommer: json, idCustommer: json._id })
                this.apiGetProfile(json._id)
            } else {
                this.props.addUser('', '', 0)
                this.props.addToken('')
                this.props.navigation.navigate('Login')
                this.removeDataLogin()
            }

            if (password !== null) {
                this.setState({ passWord: password })
            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    };

    apiSetProfile(id, address, phone, user) {
        let url = link.URL_API_PORTAL + `user/v1/profiles/${id}`
        console.log(url)
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'address': address, 'phone': phone, 'username': user })
        })
            .then(res => res.json())
            .then(resJson => {
                this.setState({
                    dataProfile: resJson.data,
                    fullName: resJson.data.username ?? '',
                    email: resJson.data.email ?? '',
                    referralCode: resJson.data.referralCode,
                    address: resJson.data.address ?? '',
                    phone: resJson.data.phone ?? '',
                    setProfileSuccess: true,
                    editable: false,
                })
                this.addDataLogin(resJson.data)
                this.props.addUser(resJson.data.username, '123', 1)
                this.props.addToken(resJson.data.token)
            })
    }

    apiGetProfile(id) {
        let url = link.URL_API_PORTAL + `user/v1/profiles/${id}`
        // console.log(url)
        // console.log('da den day')
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(resJson => {
                this.setState({
                    dataProfile: resJson.data,
                    fullName: resJson.data.username ?? '',
                    email: resJson.data.email ?? '',
                    referralCode: resJson.data.referralCode ?? '',
                    address: resJson.data.address ?? '',
                    phone: resJson.data.phone ?? '',
                    isLoading: false,
                    idCustommer: id,
                })
                this.addDataLogin(resJson.data)
                this.props.addUser(resJson.data.username, '123', 1)
                this.props.addToken(resJson.data.token)
            })
    }

    apiChangPass(id, newPass, oldPassword) {
        let url = link.URL_API_PORTAL + `user/v1/users/${id}/password`
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'password': newPass, 'oldPassword': oldPassword })
        })
            .then(res => res.json())
            .then(resJson => {
                console.log(JSON.stringify(resJson))
                if (resJson.error) {
                    this.setState({ messageChangPass: resJson.error.message })
                } else {
                    this.setState({
                        showRePass: false,
                        passOld: '',
                        changPass: '',
                        reChangPass: '',
                        passWord: newPass,
                    })
                    alert('đổi mật khẩu thành công')
                }
            })
    }

    showModalRePass() {
        return (
            <Modal
                visible={this.state.showRePass}
                transparent={true}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000AA' }}>
                    <View style={{ width: '80%', justifyContent: 'center', borderRadius: 8, minHeight: 100, backgroundColor: '#fff', padding: 8 }}>
                        <View style={styles.titleModal}>
                            <Text style={{ fontSize: 20, flex: 1, textAlign: 'center' }}>Đổi mật khẩu</Text>
                            <TouchableOpacity
                                onPress={() => { this.setState({ showRePass: false }) }}
                            >
                                <Image
                                    style={{ width: 30, height: 30, }}
                                    source={require(cancel)}
                                />
                            </TouchableOpacity>
                        </View>
                        {this.inputPassOld()}
                        {this.changPassWord()}
                        {this.reChangPassWord()}
                        <Text style={{ color: '#ef465f', marginStart: 8 }}>{this.state.messageChangPass}</Text>
                        <ButtonWrap
                            onPress={() => {
                                {
                                    this.state.passOld.length >= 6 || this.state.changPass >= 6 || this.state.reChangPass >= 6 ?
                                        this.state.changPass === this.state.reChangPass ?
                                            this.apiChangPass(this.state.idCustommer, this.state.changPass, this.state.passOld)
                                            : this.setState({ messageChangPass: 'mật khẩu không đồng nhất' }) : this.setState({ messageChangPass: 'mật khẩu phải dài hơn 6 kí tự' })
                                }
                            }}
                            value={'Xác nhận'}
                        />
                    </View>
                </View>
            </Modal>
        )
    }

    showModalProfileSucess() {
        return (
            <Modal
                visible={this.state.setProfileSuccess}
                transparent={true}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000AA' }}>
                    <View style={{ width: '80%', justifyContent: 'center', borderRadius: 8, minHeight: 100, backgroundColor: '#fff', padding: 8 }}>
                        <View style={styles.titleModal}>
                            <Text style={{ fontSize: 20, flex: 1, textAlign: 'center' }}>Thông báo</Text>
                            <TouchableOpacity
                                onPress={() => { this.setState({ setProfileSuccess: false }) }}
                            >
                                <Image
                                    style={{ width: 30, height: 30, }}
                                    source={require(cancel)}
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={{ textAlign: 'center', fontSize: 18 }}>Thay đổi thông tin thành công</Text>
                        <ButtonWrap
                            onPress={() => { this.setState({ setProfileSuccess: false }) }}
                            value={'Xác nhận'}
                        />
                    </View>
                </View>
            </Modal>
        )
    }

    accountInfo() {
        return (
            <View style={{ flex: 1, }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ height: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH, }}>
                        <View style={{ height: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH, justifyContent: 'center', alignItems: 'center', zIndex: 5, position: 'relative' }}>
                            <Image
                                style={{ width: 120, height: 120, borderRadius: SCREEN_WIDTH / 4 }}
                                source={require(logo)}
                            />
                        </View>
                        <View style={{ height: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH, zIndex: 1, position: 'absolute' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Image
                                    style={{ height: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH, }}
                                    source={require(home)}
                                    resizeMethod={'scale'}
                                    resizeMode={'center'}
                                />
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>
                                <Text style={{ marginTop: SCREEN_WIDTH / 5, fontSize: 16, fontWeight: 'bold' }}>{this.state.fullName}</Text>
                                <Text style={{ fontSize: 14, margin: 8 }}>{this.state.referralCode}</Text>
                                <Text style={{ color: '#a1aab1' }}>Mã giới thiệu</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 120, flexDirection: 'row', backgroundColor: '#f4f5f7' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ width: 40, height: 40, borderRadius: 20 }}
                                source={require(iconCacbonic)}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, margin: 8, color: '#333333' }}>{this.state.dataProfile.co2Saved} Kg</Text>
                            <Text style={{ color: '#9b9b9b' }}>CO2 giảm thải</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ width: 40, height: 40, borderRadius: 20 }}
                                source={require(iconHappy)}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, margin: 8, color: '#333333' }}>{this.state.dataProfile.bookingCount}</Text>
                            <Text style={{ color: '#9b9b9b' }}>Chuyến đi</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ width: 40, height: 40, borderRadius: 20 }}
                                source={require(iconMoney)}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, margin: 8, color: '#333333' }}>{this.state.dataProfile.amountSaved} đ</Text>
                            <Text style={{ color: '#9b9b9b' }}>Tiền tiết kiệm</Text>
                        </View>

                    </View>
                    <View style={{ padding: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ flex: 1, textAlign: 'left', fontSize: 16, fontWeight: 'bold' }}>Thông tin cá nhân</Text>
                            <Text
                                style={styles.textLine}
                                onPress={() => this.setState({ editable: true })}
                            >Chỉnh sửa</Text>
                        </View>

                        <InputTextDiChung
                            value={this.state.fullName}
                            placeholder='Họ và tên'
                            onChangeText={(text) => this.setState({
                                fullName: text,
                            })}
                            keyboardType='ascii-capable'
                            onPress={() => {
                                this.state.editable ?
                                    this.setState({
                                        fullName: ''
                                    }) : null
                            }}
                            editable={this.state.editable}
                        />

                        <View style={[styles.borderViewAll, { backgroundColor: '#eee' }]}>
                            <TextInput
                                style={styles.textInput}
                                value={this.state.email}
                                // secureTextEntry={true}
                                editable={false}
                            />
                        </View>

                        <InputTextDiChung
                            value={this.state.phone}
                            placeholder='Số điện thoại'
                            onChangeText={(text) => this.setState({
                                phone: text,
                            })}
                            keyboardType='numeric'
                            onPress={() => {
                                (this.state.editablePhone && this.state.editable) ? this.setState({
                                    phone: ''
                                }) : null
                            }}
                            editable={this.state.editable}
                        />

                        <InputTextDiChung
                            value={this.state.address}
                            placeholder='Địa chỉ'
                            onChangeText={(text) => this.setState({
                                address: text,
                            })}
                            keyboardType='ascii-capable'
                            onPress={() => {
                                this.state.editable ? this.setState({
                                    address: ''
                                }) : null
                            }}
                            editable={this.state.editable}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                            <Text style={{ flex: 1, textAlign: 'left', fontSize: 16, fontWeight: 'bold' }}>Mật khẩu</Text>
                            <Text
                                style={styles.textLine}
                                onPress={() => this.setState({ showRePass: true })}
                            >Chỉnh sửa</Text>
                        </View>

                        <View style={styles.borderViewAll}>
                            <TextInput
                                style={styles.textInput}
                                value={this.state.passWord}
                                secureTextEntry={true}
                                editable={false}
                            />
                        </View>
                        {this.state.editable ?
                            <View>
                                <ButtonWrap
                                    onPress={() => {
                                        this.state.editable ? this.apiSetProfile(this.state.idCustommer, this.state.address, this.state.phone, this.state.fullName)
                                            : null
                                    }}
                                    value={'Lưu thông tin'}
                                />

                                <ButtonGray
                                    onPress={() => {
                                        this.setState({ editable: false })
                                    }}
                                    value={'Hủy'}
                                />
                            </View>
                            :
                            <ButtonGray
                                onPress={() => {
                                    { this.removeDataLogin() }
                                    this.props.addUser('', '', 0)
                                    this.props.addToken('')
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'Login' })
                                        ]
                                    })
                                    this.props.navigation.dispatch(resetAction)
                                }}
                                value={'Đăng xuất'}
                            />
                        }
                        <View style={{ margin: 4 }} />
                        {this.showModalRePass()}
                    </View>
                </ScrollView>
            </View>
        )
    }

    inputPassOld() {
        return (
            <InputPassWord
                onChangeText={(text) => {
                    this.setState({
                        passOld: text.trim().toLowerCase(),
                    })
                }}
                placeholder={"Mật khẩu cũ"}
                pressDelete={() => {
                    this.setState({
                        passOld: '',
                    })
                }}
                pressEye={() => { this.setState({ visibal: !this.state.visibal }) }}
                secureTextEntry={this.state.visibal}
                value={this.state.passOld}
            />
        )
    }


    changPassWord() {
        return (
            <InputPassWord
                onChangeText={(text) => {
                    this.setState({
                        changPass: text.trim().toLowerCase(),
                    })
                }}
                placeholder={"Mật khẩu mới"}
                pressDelete={() => {
                    this.setState({
                        changPass: '',
                    })
                }}
                pressEye={() => { this.setState({ visibal: !this.state.visibal }) }}
                secureTextEntry={this.state.visibal}
                value={this.state.changPass}
            />
        )
    }

    reChangPassWord() {
        return (
            <InputPassWord
                onChangeText={(text) => {
                    this.setState({
                        reChangPass: text.trim().toLowerCase(),
                    })
                }}
                placeholder={"Xác nhận mật khẩu"}
                pressDelete={() => {
                    this.setState({
                        reChangPass: '',
                    })
                }}
                pressEye={() => { this.setState({ visibal: !this.state.visibal }) }}
                secureTextEntry={this.state.visibal}
                value={this.state.reChangPass}
            />
        )
    }

    removeDataLogin = async () => {
        await AsyncStorage.removeItem('username')
        await AsyncStorage.removeItem('password')
        await AsyncStorage.removeItem('dataLogin')
        await AsyncStorage.removeItem('token')
    }

    gotoHomeScreen = () =>{
        this.props.navigation.navigate('Home')
    }

    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator
                    style={{ marginTop: 8 }}
                    size='large'
                />
            )
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Header
                    onPressLeft={() => { this.props.navigation.openDrawer() }}
                    onPressCenter={this.gotoHomeScreen}
                />

                <View style={styles.container}>
                    {this.accountInfo()}
                </View>
                {this.showModalProfileSucess()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    borderView: {
        borderBottomWidth: 0,
        borderColor: '#e8e8e8',
        borderRadius: 80,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    borderViewAll: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        width: 30,
        height: 30,
    },
    textInput: {
        padding: 8,
        fontSize: 14,
        borderRadius: 4,
        flex: 1,
    },
    titleModal: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textLine: {
        color: '#77a300',
        textDecorationLine: 'underline',
        textAlign: 'center'
    }
})

function mapStateToProps(state) {
    return {
        link_avatar: state.thongtin.link_avatar,
        name: state.thongtin.name,
        isLogin: state.thongtin.isLogin,
        token: state.thongtin.token,
    }
}

export default connect(mapStateToProps, { addUser: addUser, addToken: addToken })(Profile);