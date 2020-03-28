import React, { Component } from 'react'
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Button, Text } from 'react-native'

const logo = '../../../image/logo_dc_taxi.png'
const people = '../../../image/person.png'
const lock = '../../../image/lock.png'
const hide = '../../../image/hide.png'
const visibility = '../../../image/visibility.png'
const cancel = '../../../image/cancel.png'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
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

                <View style={styles.borderView}>
                    <Image
                        style={styles.icon}
                        source={require(lock)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Mật khẩu"}
                        value={this.state.pass}
                        secureTextEntry={this.state.visibal}
                        onChangeText={(text) => {
                            this.setState({
                                pass: text,
                            })
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                pass: '',
                            })
                        }}
                    ><Image
                            style={{ width: 20, height: 20, margin: 8 }}
                            source={this.state.pass.length == 0 ? null : require(cancel)}
                        />
                    </TouchableOpacity>
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
                    style={{ padding: 16, margin: 8, backgroundColor: '#77a300', borderRadius: 4 }}
                    vertical
                >
                    <Text style={{ fontSize: 18 }}>Đăng nhập</Text>
                </Button>

                <TouchableOpacity>
                    <Text style={{ color: '#77a300', }}>Quên mật khẩu?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ margin: 8 }}
                    onPress={() => { this.props.navigation.navigate("Registration") }}
                >
                    <Text style={{ color: '#77a300', }}>Bạn chưa có tài khoản? Tạo mới.</Text>
                </TouchableOpacity>
            </View>




        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
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
        borderWidth: 0.2,
        borderColor: '#00363d',
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