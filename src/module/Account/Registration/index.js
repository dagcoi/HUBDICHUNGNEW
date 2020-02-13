import React, { Component } from 'react'
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Text, Icon, Footer, FooterTab } from 'native-base';

const logo = '../../../image/logo_dc_taxi.png'
const people = '../../../image/person.png'
const lock = '../../../image/lock.png'
const hide = '../../../image/hide.png'
const visibility = '../../../image/visibility.png'
const cancel = '../../../image/cancel.png'

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            repass : '',
            visibal: true,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require(logo)}
                />
                <View style={styles.borderView}>
                    <Image
                        style={styles.icon}
                        source={require(people)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Tài Khoản"}
                        value={this.state.user}
                        onChangeText={(text) => {
                            this.setState({
                                user: text,
                            })
                        }}
                    />
                    {/* <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                user: '',
                            })
                        }}
                    >
                        <Image
                            style={{ width: 20, height: 20, margin: 8 }}
                            source={this.state.user.length == 0 ? null : require(cancel)}
                        />
                    </TouchableOpacity> */}
                </View>

                <View style={styles.borderView}>
                    <Image
                        style={styles.icon}
                        source={require(lock)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Mật khẩu"}
                        value={this.state.pass}
                        secureTextEntry = {this.state.visibal}
                        onChangeText={(text) => {
                            this.setState({
                                pass: text,
                            })
                        }}
                    />
                    {/* <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                pass: '',
                            })
                        }}
                    ><Image
                            style={{ width: 20, height: 20, margin: 8 }}
                            source={this.state.pass.length == 0 ? null : require(cancel)}
                        />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => { this.setState({ visibal: !this.state.visibal }) }}
                    >
                        <Image
                            style={{ width: 20, height: 20, margin: 8 }}
                            source={this.state.visibal ? require(visibility) : require(hide)}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.borderView}>
                    <Image
                        style={styles.icon}
                        source={require(lock)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Nhập lại mật khẩu"}
                        value={this.state.repass}
                        secureTextEntry = {this.state.visibal}
                        onChangeText={(text) => {
                            this.setState({
                                repass: text,
                            })
                        }}
                    />
                    {/* <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                repass: '',
                            })
                        }}
                    ><Image
                            style={{ width: 20, height: 20, margin: 8 }}
                            source={this.state.repass.length == 0 ? null : require(cancel)}
                        />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => { this.setState({ visibal: !this.state.visibal }) }}
                    >
                        <Image
                            style={{ width: 20, height: 20, margin: 8 }}
                            source={this.state.visibal ? require(visibility) : require(hide)}
                        />
                    </TouchableOpacity>
                </View>

                <Button
                    style={{ padding: 16, margin: 8, backgroundColor: '#77a300', borderRadius : 4 }}
                    vertical
                >
                    <Text style={{ fontSize: 18 }}>Đăng kí</Text>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding : 8,
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
        borderWidth: 0.5,
        borderColor: '#00363d',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        justifyContent : 'center',
        alignItems : 'center',
        margin : 8,
        width: 30,
        height: 30,
    },
    textInput: {
        padding: 8,
        fontSize: 16,
        borderRadius: 8,
        flex: 1,
    }
})

export default Registration;