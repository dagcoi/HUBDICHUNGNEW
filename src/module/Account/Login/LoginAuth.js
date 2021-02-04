import React, { Component } from 'react';
import { View, Text, TextInput, Image, ScrollView } from 'react-native';
import * as link from '../../../URL'
import { ButtonFull } from '../../../component/Button'
import firebase from 'react-native-firebase';
import CountDown from 'react-native-countdown-component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../../component/Header/HeaderImage'
import AsyncStorage from '@react-native-community/async-storage'
const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

export default class PhoneAuthTest extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.getIdToken = null;
        this.state = {
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '+84',
            confirmResult: null,
            countdown: 10,
            timesup: true,
            timing: false,
            numberCard: '',
        };
    }


    async componentDidMount() {
        this.unsubscribe = await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });
                console.log('1...' + user); // this is shown. Firebase user and provider data
                console.log('2...' + user.uid); // Shown
                // this.cpn()
                user.getIdToken().then((idToken) => {  // <------ Check this line
                    console.log('3...' + idToken); // It shows the Firebase token now
                    this.apiLogin(idToken)
                })
            } else {
                // User has been signed out, reset the state
                this.setState({
                    user: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '+84',
                    confirmResult: null,
                });
            }
        });

    }

    startTimer() {
        console.log('auth')
        this.clockCall = setInterval(() => {
            this.decrementClock();
        }, 1000);
        this.setState({
            timing: true,
            timer: 120,
        })
        this.signIn()
    }


    componentWillUnmount() {
        clearInterval(this.clockCall);
    }

    decrementClock = () => {
        this.setState((prevstate) => ({
            timer: prevstate.timer - 1
        }), () => {
            if (this.state.timer === 0) {
                clearInterval(this.clockCall)
                this.setState({
                    timesup: true,
                    timing: false,
                })
            }
        })
    }

    addDataLogin = async (dataLogin) => {
        await AsyncStorage.setItem('dataLogin', JSON.stringify(dataLogin))
    }

    apiLogin = (token) => {
        let url = link.URL_API_PORTAL + 'user/v1/users/login/phone'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "IDToken": token })
        })
            .then(res => res.json())
            .then(resJson => {
                if (resJson.data) {
                    this.addDataLogin(resJson.data)
                    this.gotoProfileScreen(JSON.stringify(resJson.data))
                    console.log('4...resJson.data' + resJson.data)
                }
                else {
                    this.setState({
                        messageLogin: resJson.error.message
                    })
                }
            }).catch((error) => { console.log('5...' + error) });
    }
    gotoProfileScreen(dataLogin) {
        this.props.navigation.replace('Profile', { 'dataLogin': dataLogin })
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
        if (this.getIdToken) this.getIdToken();
    }

    signIn = () => {
        const { phoneNumber } = this.state;
        this.setState({ message: 'Sending code ...' });
        console.log('Sign in')

        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {
                this.setState({ confirmResult, message: 'Code has been sent!' })
                console.log('6....confirmResult:   ' + confirmResult)
            })
            .catch(error => {
                this.setState({ message: `Sign In With Phone Number Error: ${error.message}` })
                console.log('sai gì đó?' + error.message)
            });
    };

    confirmCode = async () => {
        const { codeInput, confirmResult } = this.state;
        var credential = firebase.auth.PhoneAuthProvider.credential(confirmResult.verificationId, codeInput);
        firebase.auth().signInWithCredential(credential).then(
            this.unsubscribe
        );

    };

    goBack = () => {
        this.props.navigation.goBack()
    }

    renderPhoneNumberInput() {
        const { numberCard } = this.state;
        return (

            <View style={{ flex: 1, padding: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00363d' }}>
                <Text style={{ textAlign: 'center', color: '#fff', fontSize: 22, fontWeight: 'bold' }}>Chào mừng đến với Đi Chung</Text>
                <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 16 }}>Đăng nhập bằng số điện thoại</Text>
                <View style={{ flexDirection: 'row', height: 50, marginVertical: 20, paddingHorizontal: 8 }}>
                    <View
                        style={{ flex: 1, paddingHorizontal: 16, borderColor: '#77a300', backgroundColor: '#fff', borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}
                    >
                        <TextInput
                            style={{ marginRight: 4, justifyContent: 'center', alignItems: 'center' }}
                            value={'+84'}
                            editable={false}
                        />
                        <TextInput
                            autoFocus
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                            onChangeText={value => this.setState({ phoneNumber: `+84${value}`, numberCard: value })}
                            placeholder={'Số điện thoại'}
                            value={numberCard}
                            maxLength={9}
                            keyboardType={'decimal-pad'}
                        />
                    </View>
                </View>
                {/* <Text>{this.state.message}</Text> */}
                <ButtonFull value="Gửi" onPress={() => this.startTimer()} />
            </View>
        );
    }

    renderVerificationCodeInput() {
        const { codeInput } = this.state;

        return (
            <View style={{ flex: 1, padding: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00363d' }}>
                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>Số điện thoại:<Text style={{ fontWeight: 'bold' }}>{this.state.phoneNumber}</Text></Text>
                <View style={{ flexDirection: 'row', height: 50, marginVertical: 20, paddingHorizontal: 8 }}>
                    <TextInput
                        autoFocus
                        style={{ flex: 1, textAlign: 'left', paddingHorizontal: 16, borderColor: '#77a300', backgroundColor: '#fff', borderRadius: 8 }}
                        onChangeText={value => this.setState({ codeInput: value })}
                        placeholder={'Nhập OTP ... '}
                        value={codeInput}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff' }}>Bạn chưa nhận được mã xác thực?</Text>
                    <TouchableOpacity
                        onPress={this.state.timing ? null : this.startTimer.bind()}
                    >
                        {this.state.timing ? <Text style={{ color: '#fff' }}>Gửi lại sau: {Math.floor(this.state.timer / 60)}:{this.state.timer % 60}</Text> :
                            <Text style={{ color: '#77a300', textDecorationLine: 'underline' }}>Gửi lại</Text>}
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                confirmResult: false,
                            })
                        }}
                    >
                        <Text style={{ color: '#77a300', textDecorationLine: 'underline' }}>Nhập lại SĐT</Text>
                    </TouchableOpacity>
                </View>
                <ButtonFull value="Xác nhận" onPress={this.confirmCode} />
            </View>
        );
    }

    gotoHomeScreen = () => {
        this.props.navigation.navigate("Home")
    }

    render() {
        const { user, confirmResult } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    onPressLeft={() => { this.props.navigation.openDrawer() }}
                    onPressCenter={this.gotoHomeScreen}
                />
                {!user && !confirmResult && this.renderPhoneNumberInput()}

                {!user && confirmResult && this.renderVerificationCodeInput()}

            </View>
        );
    }
}