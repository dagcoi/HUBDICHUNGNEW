import React, { Component } from 'react'
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text, Modal, AsyncStorage, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import { ButtonWrap, ButtonGray } from '../../../component/Button'
import Header from '../../../component/Header'
import InputPassWord from './InputPassWord'
import InputTextDiChung from '../../../component/InputTextDiChung'
import * as link from '../../../URL'
import { addUser, addToken } from '../../../core/Redux/action/Action'
import { connect } from 'react-redux'


const logo = '../../../image/logo_dc_taxi.png'
const people = '../../../image/person.png'
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
            showLogin: true,
            showSignUp: false,
            loginSuccess: false,
            isLoading: false,
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
            email: '',
            passWord: '',
        }
    }

    componentDidMount() {
        this._login();
        // this._retrieveData()
    }


    apiAddUser(userName, passWord) {
        url = link.URL_API_PORTAL + `user/v1/users`
        fetch(url, {
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
                    this.props.addUser(resJson.data.username, '123', 1)
                    this.props.addToken(resJson.data.token)
                    this.setState({
                        showLogin: true,
                        showSignUp: false,
                        loginSuccess: true,
                        isLoading: false,
                        data: resJson.data,
                        clickLogin: true,
                        user: '',
                        pass: '',
                        rePass: '',
                        infoCustommer: resJson.data,
                        messageAddUser: '',
                    })
                    this.gotoProfileScreen(userName, passWord, JSON.stringify(resJson.data))
                    // this.getDataInJson(resJson.data)
                } else (
                    this.setState({
                        messageAddUser: resJson.error.message,
                    })
                )
            });
    }

    apiLogin(userName, passWord) {
        let url = link.URL_API_PORTAL + 'user/v1/users/login'
        console.log(url)
        console.log(userName + passWord)
        fetch(url, {
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
                    this.props.addUser(resJson.data.username, '123', 1)
                    this.props.addToken(resJson.data.token)
                    this.setState({
                        showLogin: true,
                        loginSuccess: true,
                        // isLoading: false,
                        data: resJson.data,
                        clickLogin: true,
                        user: '',
                        pass: '',
                        rePass: '',
                        infoCustommer: resJson.data,
                        passWord: passWord,
                        messageLogin: ''
                    })
                    this.gotoProfileScreen(userName, passWord, JSON.stringify(resJson.data))
                    console.log(resJson.data)
                }
                else {
                    this.setState({
                        messageLogin: resJson.error.message
                    })
                }
            });
    }

    gotoProfileScreen(userName, passWord, dataLogin) {
        this.props.navigation.navigate('Profile', { 'userName': userName, 'passWord': passWord, 'dataLogin': dataLogin })
    }

    gotoHomeScreen = () =>{
        this.props.navigation.navigate('Home')
    }

    addPassWord = async (passWord) => {
        await AsyncStorage.setItem('password', passWord)
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

    inputUsername() {
        return (
            <View style={styles.borderView}>
                <Image
                    style={styles.icon}
                    source={require(people)}
                />
                <TextInput
                    style={[styles.textInput,]}
                    placeholder={"Email/số điện thoại"}
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

    inputUsernameSignUp() {
        return (
            <View style={styles.borderViewAll}>
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
        let regex = /^[a-z][a-z0-9_\.]{3,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;
        let validate = regex.test(email.toLowerCase().trim());
        let reg = /^[0]?[3789]\d{8}$/;
        let validateP = reg.test(email.toLowerCase());
        this.setState({ validate: validate || validateP, user: email.trim() })
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

    _retrieveData = async () => {
        try {
            const dataLogin = await AsyncStorage.getItem('dataLogin')
            const password = await AsyncStorage.getItem('password')
            if (dataLogin !== null) {
                let json = JSON.parse(dataLogin)
                console.log(dataLogin)
                console.log(json.token)
                this.setState({ infoCustommer: json })
                // this.getDataInJson(json)
            }
            if (password !== null) {
                this.setState({ passWord: password })
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
            // if (token !== null) {
            //     this.setState({
            //         // isLoading: false,
            //         loginSuccess: true,
            //     })
            // } else
            if (userName !== null && pass !== null) {
                this.apiLogin(userName, pass)
                this.setState({
                    user: userName,
                    pass: pass,
                })
                this.validateEmail(userName)
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
                imageLeft={true}
                noBorder={true}
                styleRight={{ borderColor: '#e8e8e8', borderStartWidth: 1, }}
            />
        )
    }

    inputPassSignUp() {
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
                hidePass={true}
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
                imageLeft={true}
                noBorder={true}
            />
        )
    }

    inputRePassSignUp() {
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
                hidePass={true}
            />
        )
    }

    FormLogin() {
        return (
            <View style={{ flex: 1, marginTop: 80 }}>
                {this.state.showLogin ?
                    <View style={{ width: SCREEN_WIDTH * 19 / 20, justifyContent: 'center', borderRadius: 8, minHeight: 100, padding: 8, }}>
                        <View style={styles.titleModal}>
                            <Text style={{ fontSize: 20, flex: 1, textAlign: 'center' }}>Đăng nhập</Text>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#e8e8e8', borderRadius: 8, marginVertical: 8 }}>
                            {this.inputUsername()}
                            {this.inputPass()}
                        </View>
                        {this.state.messageLogin == '' ? null :
                            <Text style={{ color: '#ef465f', marginStart: 8 }}>{this.state.messageLogin}</Text>
                        }
                        <ButtonWrap
                            onPress={() => {
                                this.checkDataLogin()
                            }}
                            value={'Đăng nhập'}
                        />
                        <TouchableOpacity style={{ marginTop: 16 }}
                            onPress={() => {
                                this.setState({
                                    showLogin: false,
                                    showSignUp: true,
                                })
                            }}
                        >
                            <Text style={styles.textLine}>Bạn chưa có tài khoản? Đăng ký.</Text>
                        </TouchableOpacity>

                    </View> :
                    <View style={{ width: SCREEN_WIDTH * 19 / 20, justifyContent: 'center', borderRadius: 8, minHeight: 100, padding: 8, }}>

                        <View style={styles.titleModal}>
                            <Text style={{ fontSize: 20, flex: 1, textAlign: 'center' }}>Đăng ký</Text>
                            {/* <TouchableOpacity
                                    onPress={() => { this.setState({ showSignUp: false }) }}
                                >
                                    <Image
                                        style={{ width: 30, height: 30, }}
                                        source={require(cancel)}
                                    />
                                </TouchableOpacity> */}
                        </View>
                        {this.inputUsernameSignUp()}
                        {this.inputPassSignUp()}
                        {this.inputRePassSignUp()}
                        <Text style={{ color: '#ef465f', marginStart: 8 }}>{this.state.messageAddUser}</Text>
                        <ButtonWrap
                            onPress={() => {
                                this.checkDataSignUp();
                            }}
                            value={'Đăng ký'}
                        />

                        <TouchableOpacity style={{ marginTop: 16 }}
                            onPress={() => {
                                this.setState({
                                    showLogin: true,
                                    showSignUp: false,
                                })
                            }}
                        >
                            <Text style={styles.textLine}>Đã có tài khoản? Đăng nhập</Text>
                        </TouchableOpacity>

                    </View>
                }
            </View>
            // </Modal>
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
        return (
            <View style={styles.container}>
                <Header
                    onPressLeft={() => { this.props.navigation.openDrawer() }}
                    onPressCenter={this.gotoHomeScreen}
                />
                {this.FormLogin()}
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
    }
}
export default connect(mapStateToProps, { addUser: addUser, addToken: addToken })(Login);