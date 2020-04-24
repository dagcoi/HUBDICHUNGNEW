import React, { Component } from 'react'
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text, Modal, AsyncStorage, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import { ButtonWrap, ButtonGray } from '../../../component/Button'
import Header from '../../../component/Header'
import InputPassWord from './InputPassWord'
import InputTextDiChung from '../../../component/InputTextDiChung'

const logo = '../../../image/logo_dc_taxi.png'
const people = '../../../image/person.png'
const lock = '../../../image/lock.png'
const hide = '../../../image/hide.png'
const visibility = '../../../image/visibility.png'
const cancel = '../../../image/cancel.png'
const iconCacbonic = '../../../image/iconcacbonic.png'
const iconHappy = '../../../image/iconhappy.png'
const iconMoney = '../../../image/iconmoney.png'
const home = '../../../image/home.jpg'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            visibal: true,
            showLogin: false,
            showSignUp: false,
            verificationCode: '',
            userId: '',
            loginSuccess: false,
            isLoading: true,
            clickLogin: true,
            clickSignUp: true,
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
        }
    }

    componentDidMount() {
        this._login();
        this._retrieveData()
    }

    apiAddUser(userName, passWord) {
        fetch('http://dev.portal.dichung.vn/api/user/v1/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': userName, 'password': passWord })
        })
            .then(res => res.json())
            .then(resJson => {
                if (resJson.data) {
                    this.addDataLogin(userName, passWord, resJson.data)
                    this.setState({
                        showLogin: false,
                        showSignUp: false,
                        loginSuccess: true,
                        isLoading: false,
                        data: resJson.data,
                        clickLogin: true,
                        user: '',
                        pass: '',
                        rePass: '',
                        infoCustommer: resJson.data,
                    })
                    this.getDataInJson(resJson.data)
                } else (
                    this.setState({
                        messageAddUser: resJson.error.message,
                    })
                )
            });
    }

    apiChangPass(id, newPass, oldPassword) {
        let url = `http://dev.portal.dichung.vn/api/user/v1/users/${id}/password`
        console.log(url)
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
                        passOld : '',
                        changPass : '',
                        reChangPass : '',
                    })
                    alert('đổi mật khẩu thành công')
                }
            })
    }

    apiLogin(userName, passWord) {
        fetch('http://dev.portal.dichung.vn/api/user/v1/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': userName.toLowerCase(), 'password': passWord })
        })
            .then(res => res.json())
            .then(resJson => {
                if (resJson.data) {
                    this.addDataLogin(userName, passWord, resJson.data)
                    this.setState({
                        showLogin: false,
                        loginSuccess: true,
                        isLoading: false,
                        data: resJson.data,
                        clickLogin: true,
                        user: '',
                        pass: '',
                        rePass: '',
                        infoCustommer: resJson.data,
                    })
                    this.getDataInJson(resJson.data)
                }
                else {
                    this.setState({
                        messageLogin: resJson.error.message
                    })
                }
            });
    }

    addDataLogin = async (userName, passWord, dataLogin) => {
        await AsyncStorage.setItem('username', userName)
        await AsyncStorage.setItem('password', passWord)
        await AsyncStorage.setItem('token', dataLogin.token)
        await AsyncStorage.setItem('dataLogin', JSON.stringify(dataLogin))
    }

    removeDataLogin = async () => {
        await AsyncStorage.removeItem('username')
        await AsyncStorage.removeItem('password')
        await AsyncStorage.removeItem('dataLogin')
        await AsyncStorage.removeItem('token')
    }

    _storeDataLogin = async () => {
        try {
            await AsyncStorage.setItem('username', this.state.user);
            await AsyncStorage.setItem('password', this.state.pass);
        } catch (error) {
            // Error saving data
            console.log(error)
        }
    };

    inputUsername() {
        return (
            <View style={styles.borderView}>
                <Image
                    style={styles.icon}
                    source={require(people)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder={"Email"}
                    value={this.state.user}
                    onChangeText={(text) => {
                        this.validateEmail(text);
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            user: '',
                        })
                    }}
                ><Image
                        style={{ width: 20, height: 20, margin: 8 }}
                        source={this.state.user.length == 0 ? null : require(cancel)}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    validateEmail(email) {
        let regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;
        let validate = regex.test(email.toLowerCase());
        this.setState({ validate: validate, user: email })
    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('username', this.state.user);
            await AsyncStorage.setItem('password', this.state.pass);
        } catch (error) {
            // Error saving data
            console.log(error)
        }
    };

    getDataInJson(json) {
        if (json.phone !== undefined) {
            this.setState({
                editablePhone: false,
                phone: '1',
                email: json.email,
            })
        } else {
            this.setState({
                editablePhone: true,
                phone: '',
                email: json.email,
            })
        }
    }

    _retrieveData = async () => {
        try {
            const dataLogin = await AsyncStorage.getItem('dataLogin')
            if (dataLogin !== null) {
                let json = JSON.parse(dataLogin)
                console.log(dataLogin)
                console.log(json.token)
                this.setState({ infoCustommer: json })
                this.getDataInJson(json)
            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    };

    _login = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const userName = await AsyncStorage.getItem('username');
            const pass = await AsyncStorage.getItem('password');
            if (token !== null) {
                this.setState({
                    isLoading: false,
                    loginSuccess: true,
                })
            } else if (userName !== null && pass !== null) {
                this.apiLogin(userName, pass)
            } else {
                this.setState({
                    isLoading: false,
                })
            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    };

    inputPass() {
        return (
            <InputPassWord
                onChangeText={(text) => {
                    this.setState({
                        pass: text.trim().toLowerCase(),
                    })
                }}
                placeholder={"Mật khẩu"}
                pressDelete={() => {
                    this.setState({
                        pass: '',
                    })
                }}
                pressEye={() => { this.setState({ visibal: !this.state.visibal }) }}
                secureTextEntry={this.state.visibal}
                value={this.state.pass}
            />
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


    inputRePass() {
        return (
            <InputPassWord
                onChangeText={(text) => {
                    this.setState({
                        rePass: text.trim().toLowerCase(),
                    })
                }}
                placeholder={"Nhập lại mật khẩu"}
                pressDelete={() => {
                    this.setState({
                        rePass: '',
                    })
                }}
                pressEye={() => { this.setState({ visibal: !this.state.visibal }) }}
                secureTextEntry={this.state.visibal}
                value={this.state.rePass}
            />
        )
    }

    showModalRePass() {
        return (
            <Modal
                visible={this.state.showRePass}
                transparent={true}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000AA' }}>
                    <View style={{ width: '80%', justifyContent: 'center', borderRadius: 8, minHeight: 100, backgroundColor: '#fff', padding: 8 }}>
                        <View style={{ borderBottomWidth: 1, borderColor: '#e8e8e8', padding: 8, justContain: 'center', alignItems: 'center', flexDirection: 'row' }}>
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
                                            this.apiChangPass(this.state.infoCustommer._id, this.state.changPass, this.state.passOld)
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

    showModalLogin() {
        return (
            <Modal
                visible={this.state.showLogin || this.state.showSignUp}
                transparent={true}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000AA' }}>
                    {this.state.showLogin ?
                        <View style={{ width: '80%', justifyContent: 'center', borderRadius: 8, minHeight: 100, backgroundColor: '#fff', padding: 8 }}>
                            <View style={{ borderBottomWidth: 1, borderColor: '#e8e8e8', padding: 8, justContain: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, flex: 1, textAlign: 'center' }}>Đăng nhập</Text>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ showLogin: false }) }}
                                >
                                    <Image
                                        style={{ width: 30, height: 30, }}
                                        source={require(cancel)}
                                    />
                                </TouchableOpacity>
                            </View>
                            {this.inputUsername()}
                            {this.inputPass()}
                            <Text style={{ color: '#ef465f', marginStart: 8 }}>{this.state.messageLogin}</Text>
                            <ButtonWrap
                                onPress={() => {
                                    this.checkDataLogin()
                                }}
                                value={'Đăng nhập'}
                            />
                            <TouchableOpacity style={{ margin: 8 }}
                                onPress={() => {
                                    this.setState({
                                        showLogin: false,
                                        showSignUp: true,
                                    })
                                }}
                            >
                                <Text style={{ color: '#77a300', textAlign: 'center' }}>Bạn chưa có tài khoản? Đăng kí.</Text>
                            </TouchableOpacity>

                            {/* <ButtonWrap
                            onPress={() => {
                                this.setState({
                                    showLogin: false,
                                    showSignUp: true,
                                })
                            }}
                            value={'Đăng kí'}
                        /> */}
                        </View> :
                        <View style={{ width: '80%', justifyContent: 'center', borderRadius: 8, minHeight: 100, backgroundColor: '#fff', padding: 8 }}>

                            <View style={{ borderBottomWidth: 1, borderColor: '#e8e8e8', padding: 8, justContain: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, flex: 1, textAlign: 'center' }}>Đăng kí</Text>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ showSignUp: false }) }}
                                >
                                    <Image
                                        style={{ width: 30, height: 30, }}
                                        source={require(cancel)}
                                    />
                                </TouchableOpacity>
                            </View>
                            {this.inputUsername()}
                            {this.inputPass()}
                            {this.inputRePass()}
                            <Text style={{ color: '#ef465f', marginStart: 8 }}>{this.state.messageAddUser}</Text>
                            <ButtonWrap
                                onPress={() => {
                                    this.checkDataSignUp();
                                }}
                                value={'Đăng kí'}
                            />

                            <TouchableOpacity style={{ margin: 8 }}
                                onPress={() => {
                                    this.setState({
                                        showLogin: true,
                                        showSignUp: false,
                                    })
                                }}
                            >
                                <Text style={{ color: '#77a300', textAlign: 'center' }}>Đã có tài khoản? Đăng nhập</Text>
                            </TouchableOpacity>

                            {/* <ButtonWrap
                            onPress={() => {
                                this.setState({
                                    showLogin: true,
                                    showSignUp: false,
                                })
                            }}
                            value={'Đăng nhập'}
                        /> */}
                        </View>
                    }

                </View>
            </Modal>
        )
    }

    accountInfo() {
        return (
            <View style={{ flex: 1, }}>
                <ScrollView>
                    <View style={{ height: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH, }}>
                        <View style={{ height: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH, justifyContent: 'center', alignItems: 'center', zIndex: 5, position: 'relative' }}>
                            <Image
                                style={{ width: SCREEN_WIDTH / 3, height: SCREEN_WIDTH / 3, borderRadius: SCREEN_WIDTH / 4 }}
                                source={require(logo)}
                            />
                        </View>
                        <View style={{ height: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH, zIndex: 1, position: 'absolute' }}>
                            <View style={{ flex: 1, backgroundColor: '#eee', justifyContent: 'center' }}>
                                <Image
                                    style={{ height: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH, }}
                                    source={require(home)}
                                    resizeMethod={'scale'}
                                    resizeMode={'center'}
                                />
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#eee', justifyContent: 'flex-start', alignItems: 'center', }}>
                                <Text style={{ marginTop: SCREEN_WIDTH / 5, fontSize: 16, fontWeight: 'bold' }}>{this.state.fullName ? this.state.fullName : 'Họ tên'}</Text>
                                <Text style={{ fontSize: 14, margin: 8 }}>{this.state.infoCustommer.username.toUpperCase()}</Text>
                                <Text style={{ color: '#9b9b9b' }}>Mã giới thiệu</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 120, flexDirection: 'row', backgroundColor: '#ddd' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ width: 40, height: 40, borderRadius: 20 }}
                                source={require(iconCacbonic)}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, margin: 8, }}>- Kg</Text>
                            <Text style={{ color: '#9b9b9b' }}>CO2 giảm thải</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ width: 40, height: 40, borderRadius: 20 }}
                                source={require(iconHappy)}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, margin: 8, }}>-</Text>
                            <Text style={{ color: '#9b9b9b' }}>Chuyến đi</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ width: 40, height: 40, borderRadius: 20 }}
                                source={require(iconMoney)}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, margin: 8, }}>- đ</Text>
                            <Text style={{ color: '#9b9b9b' }}>Tiền tiết kiệm</Text>
                        </View>

                    </View>
                    <View style={{ padding: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ flex: 1, textAlign: 'left', fontSize: 16, fontWeight: 'bold' }}>Thông tin cá nhân</Text>
                            <Text
                                style={{ color: '#77a300', borderBottomWidth: 1, borderColor: '#77a300' }}
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

                        <InputTextDiChung
                            value={this.state.email}
                            placeholder='Email'
                            onChangeText={(text) => this.setState({
                                email: text.trim(),
                            })}
                            keyboardType='email-address'
                            onPress={() => {
                                this.state.editable ?
                                    this.setState({
                                        email: ''
                                    }) : null
                            }}
                            editable={this.state.editable}
                        />

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
                            editable={this.state.editablePhone && this.state.editable}
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

                        <ButtonWrap
                            onPress={() => {
                                this.state.editable ? (
                                    alert('Lưu thông tin thành công'),
                                    this.setState({ editable: false }))
                                    : null
                            }}
                            value={'Lưu thông tin'}
                        />

                        <ButtonWrap
                            onPress={() => {
                                this.setState({ showRePass: true })
                            }}
                            value={'Đổi mật khẩu'}
                        />
                        <View style={{ margin: 4 }} />
                        <ButtonGray
                            onPress={() => {
                                { this.removeDataLogin() }
                                this.setState({ loginSuccess: false })
                            }}
                            value={'Đăng xuất'}
                        />
                        {this.showModalRePass()}
                    </View>
                </ScrollView>
            </View>
        )
    }

    checkDataLogin() {
        if (this.state.user.trim().length < 1 || this.state.pass == '') {
            this.setState({ messageLogin: 'Vui lòng nhập đầy đủ thông tin.' })
        } else {
            this.state.validate ?
                this.apiLogin(this.state.user, this.state.pass) : this.setState({ messageLogin: 'Vui lòng nhập đúng địa chỉ email.' })
        }
    }

    checkDataSignUp() {
        if (this.state.user.trim().length < 1 || this.state.pass == '' || this.state.rePass == '') {
            this.setState({ messageAddUser: 'Vui lòng nhập đầy đủ thông tin.' })
        } else if (!this.state.validate) {
            this.setState({ messageAddUser: 'Vui lòng nhập đúng địa chỉ email.' })
        } else if (this.state.pass !== this.state.rePass) {
            this.setState({ messageAddUser: 'Mật khẩu không đồng nhất' })
        } else {
            this.apiAddUser(this.state.user, this.state.pass)
        }
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
                <Header onPressLeft={() => this.props.navigation.openDrawer()} />
                {this.state.loginSuccess ?
                    <View style={styles.container}>
                        {/* <Text>Thông tin tài khoản</Text>

                        <Text>Email : <Text>{this.state.infoCustommer.email}</Text></Text>
                        <Text>Username : <Text>{this.state.infoCustommer.username}</Text></Text>
                        <Text>createdAt : <Text>{this.state.infoCustommer.createdAt}</Text></Text>

                        <ButtonWrap
                            onPress={() => {
                                { this.removeDataLogin() }
                                this.setState({ loginSuccess: false })
                            }}
                            value={'Đăng xuất'}
                        />

                        <ButtonWrap
                            onPress={() => {
                                this.setState({ showRePass: true })
                            }}
                            value={'Đổi mật khẩu'}
                        />
                        {this.showModalRePass()} */}
                        {this.accountInfo()}
                    </View> :
                    <View style={styles.container}>
                        <Image
                            style={styles.logo}
                            source={require(logo)}
                        />
                        <Text>Vui lòng đăng nhập hoặc đăng kí để xem thông tin</Text>

                        <ButtonWrap
                            onPress={() => {
                                this.setState({ showLogin: true })
                            }}
                            value={'Đăng nhập'}
                        />

                        {/* <TouchableOpacity>
                            <Text style={{ color: '#77a300', }}>Quên mật khẩu?</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity style={{ margin: 8 }}
                            onPress={() => {
                                this.setState({
                                    showSignUp: true,
                                })
                            }}
                        >
                            <Text style={{ color: '#77a300', }}>Bạn chưa có tài khoản? Đăng kí.</Text>
                        </TouchableOpacity>

                        {this.showModalLogin()}
                        {/* {this.showModalSignUp()} */}
                    </View>
                }
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
        borderRadius: 4,
    },
    borderView: {
        marginTop: 8,
        borderBottomWidth: 1,
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
        fontSize: 16,
        borderRadius: 4,
        flex: 1,
    }
})

export default Login;