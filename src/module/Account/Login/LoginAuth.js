import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import * as link from '../../../URL'
import { ButtonFull } from '../../../component/Button'
import firebase from 'react-native-firebase';

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
        };
    }


    async componentDidMount() {
        this.unsubscribe = await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });
                console.log(user); // this is shown. Firebase user and provider data
                console.log(user.uid); // Shown
                // this.cpn()
                user.getIdToken().then((idToken) => {  // <------ Check this line
                    console.log(idToken); // It shows the Firebase token now
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

    apiLogin = (token) => {
        let url = link.URL_API_PORTAL + 'user/v1/users/login/phone'
        // console.log(url)
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
                    // this.addDataLogin(userName, passWord, resJson.data)
                    this.gotoProfileScreen(JSON.stringify(resJson.data))
                    console.log('resJson.data' + resJson.data)
                }
                else {
                    this.setState({
                        messageLogin: resJson.error.message
                    })
                }
            }).catch((error) => { console.log(error) });
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

        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {
                this.setState({ confirmResult, message: 'Code has been sent!' })
                console.log('confirmResult:   ' + confirmResult)
            })
            .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
    };

    confirmCode = async () => {
        const { codeInput, confirmResult } = this.state;
        var credential = firebase.auth.PhoneAuthProvider.credential(confirmResult.verificationId, codeInput);
        firebase.auth().signInWithCredential(credential).then(
            this.unsubscribe
        );

    };

    renderPhoneNumberInput() {
        const { phoneNumber } = this.state;

        return (
            <View style={{ flex: 1, padding: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00363d' }}>
                <Text style={{ textAlign: 'center', color: '#fff', fontSize: 22, fontWeight: 'bold' }}>Chào mừng đến với Đi Chung</Text>
                <View style={{ flexDirection: 'row', height: 50, marginVertical: 20, paddingHorizontal: 8 }}>
                    <TextInput
                        autoFocus
                        style={{ flex: 1, textAlign: 'left', paddingHorizontal: 16, borderColor: '#77a300', backgroundColor: '#fff', borderRadius: 8 }}
                        onChangeText={value => this.setState({ phoneNumber: value })}
                        placeholder={'Số điện thoại'}
                        value={phoneNumber}
                    />
                </View>
                <ButtonFull value="Xác nhận" onPress={this.signIn} />
            </View>
        );
    }

    renderVerificationCodeInput() {
        const { codeInput } = this.state;

        return (
            <View style={{ flex: 1, padding: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00363d' }}>
                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>Số điện thoại:<Text style={{fontWeight: 'bold'}}>{this.state.phoneNumber}</Text></Text>
                <View style={{ flexDirection: 'row', height: 50, marginVertical: 20, paddingHorizontal: 8 }}>
                    <TextInput
                        autoFocus
                        style={{ flex: 1, textAlign: 'left', paddingHorizontal: 16, borderColor: '#77a300', backgroundColor: '#fff', borderRadius: 8 }}
                        onChangeText={value => this.setState({ codeInput: value })}
                        placeholder={'Nhập OTP ... '}
                        value={codeInput}
                    />
                </View>
                <ButtonFull value="Xác nhận" onPress={this.confirmCode} />
            </View>
        );
    }

    render() {
        const { user, confirmResult } = this.state;
        return (
            <View style={{ flex: 1 }}>

                {!user && !confirmResult && this.renderPhoneNumberInput()}

                {!user && confirmResult && this.renderVerificationCodeInput()}

            </View>
        );
    }
}