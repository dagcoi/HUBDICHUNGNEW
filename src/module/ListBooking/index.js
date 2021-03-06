import React, { Component } from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet, ActivityIndicator, Modal, Image, ScrollView, Dimensions, AsyncStorage, Linking } from 'react-native'
import StarVote from '../../component/StarVote'
import Header from '../../component/Header'
import ImageTextDiChung from '../../component/ImageTextDiChung'
import DetailTaxi from './DetailTaxi'
import DetailTuLai from './DetailTuLai'
import DetailExpress from './DetailExpress'
import DetailXeChung from './DetailXeChung'
import DetailHourlyTaxi from './DetailHourlyTaxi'
import * as link from '../../URL'
import { Button, ButtonGray } from '../../component/Button'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation';

const imagePick = '../../image/location2.png'
const imageDrop = '../../image/location2.png'
const imageTime = '../../image/time.png'
const imageCancel = '../../image/cancel.png'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const cancel_booking = link.URL_API + `passenger/cancel_booking`
const cancel_booking_token = link.URL_API + `passenger/generate_cancel_booking_token`

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

class ListBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listBooking: [],
            selectLeft: true,
            isLoading: true,
            bookingDetail: {},
            isLoadingTicket: true,
            modalTicket: false,
            modalTicketHourly: false,
            ticket: '',
            otp: '',
            message: '',
            dialogOTP: false,
            modalVisible: false,
            modalWhyCancel: false,
            listWhyCan: [],
            value: 0,
            dialogCancelSuccess: false,
            showMessage: false,
            token: null,
            refreshing: false,
            modalTell: false,
        }
    }

    componentDidMount() {
        this._retrieveData()
    }

    _retrieveData = async () => {
        try {
            const dataLogin = await AsyncStorage.getItem('dataLogin')
            if (dataLogin !== null) {
                let json = JSON.parse(dataLogin)
                console.log(dataLogin)
                console.log(json.token)
                console.log(json._id)
                this.setState({
                    token: json.token,
                    isLoading: true,
                })
                this.getListBooking(json.token)
            } else {
                // this.props.addUser(json.username, 'json.avatar', 0)
                this.props.addToken('')
                this.setState({
                    listBooking: [],
                    isLoading: false,
                })
            }
        } catch (error) {
            // console.log(error)
            this.setState({
                listBooking: [],
                isLoading: false,
            })
        }
    };

    async getTicketInfoDC(_id) {
        const url = link.URL_API_PORTAL + `booking/v1/user/bookings/${_id}`

        const res = await fetch(url, {
            headers: {
                'token': this.state.token,
            },
            method: 'GET',
        });
        const jsonRes = await res.json();
        this.setState({
            bookingDetail: jsonRes.data,
            isLoadingTicket: false,
        });
        // console.log(jsonRes.data)
    }

    modalLoading() {
        return (

            <Modal
                visible={this.state.modalVisible}
                animationType="slide"
                onRequestClose={() => this.setState({ modalVisible: false })}
                onOrientationChange={true}
                transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000AA', zIndex: 5 }}>
                    <View style={{ width: '80%', justifyContent: 'center', borderRadius: 8, minHeight: 100, backgroundColor: '#eee', padding: 8, zIndex: 6 }}>
                        <View style={{ borderBottomWidth: 1, borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 20, }}>Hủy vé</Text>
                        </View>
                        <View style={{ padding: 8 }}>
                            <Text>Vui lòng liên hệ: <Text
                                style={{ color: '#77a300', textDecorationLine: 'underline' }}
                                onPress={() => Linking.openURL(`tel: 19006022`)}
                            >
                                19006022
                                        </Text> để được hỗ trợ</Text>


                        </View>

                        <View style={{ flexDirection: 'row', height: 48, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        modalVisible: false,
                                    })
                                }}
                                style={{ backgroundColor: '#77a300', margin: 4, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', margin: 8 }}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    getListBooking = (token) => {
        let url = link.URL_API_PORTAL + `booking/v1/user/bookings`
        // console.log(url)
        fetch(url, {
            headers: {
                'token': token
            },
            method: 'GET',
        })
            .then(res => res.json())
            .then(resJson => {
                console.log(JSON.stringify(resJson.data))
                console.log('url: ' + url)
                console.log('token: ' + token)
                this.setState({
                    listBooking: resJson.data,
                    isLoading: false,
                })
            }).finally(() => this.setState({ isLoading: false }));
    }

    selectTime() {
        return (
            <View style={{ height: 64, flexDirection: 'row' }}>
                <View style={[styles.card, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                    <Text>time 1</Text>
                </View>
                <View style={[styles.card, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                    <Text>time 2</Text>
                </View>
            </View>
        )
    }

    formatDate(string) {
        var date = new Date(string);

        var strDate = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        return strDate;
    }

    renderItem(item) {
        let starVote = 0;
        return (
            item.code ?
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => {
                        this.props.navigation.push('DetailTicket', { 'ticket_id': item._id })
                    }}
                >
                    <View style={styles.titleTicket}>
                        <Text style={{ flex: 1, textAlign: 'left', fontSize: 16, fontWeight: 'bold' }}>{item.code}</Text>
                        <View style={{ height: 32, borderRadius: 16, backgroundColor: item.rideMethod === 'private' ? '#ef465f' : '#77a300', paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff' }}>{item.productType == 'TRANSFER_SERVICE' ? 'Thuê taxi' : item.productType == 'EXPRESS' ? 'Thuê vận chuyển' : item.productType == 'DRIVER_RENTAL' ? 'Thuê tài xế' : 'Khác'}</Text>
                        </View>
                    </View>

                    <View style={styles.contentTicket}>
                        <ImageTextDiChung
                            source={require(imagePick)}
                            text={item.startPoints[0].address}
                        />
                        <ImageTextDiChung
                            source={require(imageDrop)}
                            text={item.endPoints[0].address}
                        />
                        <ImageTextDiChung
                            source={require(imageTime)}
                            textBold={this.formatDate(item.bookingTime)}
                        />
                        {/* <ImageTextDiChung
                        source={require(imageMoney)}
                        textBold={`${parseInt(item.totalCost).format(0, 3, '.')}` + ' đ'}
                    /> */}
                    </View>
                    <View style={{ padding: 8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <StarVote number={starVote} margin={4} />
                    </View>
                </TouchableOpacity>

                : null
        )
    }

    renderItem2(item) {
        let starVote = 0;
        return (
            item.forward.error ? null
                : //item.forward.result.code ?
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => {
                        this.props.navigation.push('DetailTicket', {
                            'ticket_id': item._id,
                        })
                    }}
                >
                    <View style={styles.titleTicket}>
                        <Text style={{ flex: 1, textAlign: 'left', fontSize: 16, fontWeight: 'bold' }}>
                            {/* {item.forward.result.data.trip_price_inquiry_code} */}
                            {item.code}
                        </Text>
                        <View style={{ height: 32, borderRadius: 16, backgroundColor: '#77a300', paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Text style={{ color: '#fff' }}>{item.productType == 'HOURLY_RENT_TAXI' ? 'Thuê taxi theo giờ' : item.productType == 'HOURLY_FREIGHT_TRUCK' ? 'Thuê vận chuyển theo giờ' : item.productType == 'HOURLY_RENT_DRIVER' ? 'Thuê tài xế theo giờ' : 'Khác'}</Text>
                        </View>
                    </View>

                    <View style={styles.contentTicket}>
                        <ImageTextDiChung
                            source={require(imagePick)}
                            text={item.startPoints[0].address}
                        />

                        <ImageTextDiChung
                            source={require(imageTime)}
                            textBold={this.formatDate(item.bookingTime)}
                        />

                        <ImageTextDiChung
                            source={require(imageTime)}
                            textBold={'Thời gian: '}
                            text={item.duration + ' giờ'}
                        />
                    </View>
                    <View style={{ padding: 8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <StarVote number={starVote} margin={4} />
                    </View>
                </TouchableOpacity>
            // : null
        )
    }

    renderListBooking() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator
                    style={{ padding: 32, }}
                    size='large'
                />
            )
        }
        return (
            <View style={{ flex: 1 }}>
                {this.state.listBooking.length == 0 ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Text>{this.props.isLogin == '0' ? 'Đăng nhập để xem danh sách vé của bạn.' : 'Chưa có chuyến trong danh sách vé.'}</Text>
                    </View> :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.listBooking}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    {(item.productType == 'TRANSFER_SERVICE' || item.productType == 'EXPRESS' || item.productType == 'DRIVER_RENTAL') ? this.renderItem(item) : this.renderItem2(item)}
                                </View>
                            )
                        }
                        }
                        keyExtractor={item => item.code}
                        refreshing={this.state.refreshing}
                        onRefresh={this._retrieveData}
                    />}
            </View>
        )
    }

    gotoHomeScreen = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    onPressLeft={() => { this.props.navigation.openDrawer() }}
                    onPressCenter={this.gotoHomeScreen}
                />
                <NavigationEvents
                    onDidFocus={this.state.listBooking.length ==0 ? this._retrieveData : null}
                    // onDidBlur = {this._retrieveData}
                />
                {/* {this.selectTime()} */}
                <View style={{ flex: 1 }}>
                    {this.renderListBooking()}
                </View>            
            </View>
        )
    }

}

const styles = StyleSheet.create({
    card: {
        shadowOffset: { height: 1, width: 1 },
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0,
        elevation: 5,
        margin: 8,
        borderRadius: 8,
    },
    contentTicket: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderColor: '#e8e8e8',
    },
    titleTicket: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#e8e8e8'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 8,
    },
    textBigRight: {
        padding: 1,
        fontSize: 15,
        color: '#00363d',
        flex: 1,
    },
    textBigLeft1: {
        fontSize: 18,
        marginTop: 8,
        fontWeight: 'bold',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 4,
    },

    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#e8e8e8',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#77a300',
    },
    textBigRight1: {
        padding: 1,
        fontSize: 18,
        color: '#77a300',
        flex: 1,
        textAlign: "right"
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#77a300",
    },
})

function mapStateToProps(state) {
    return {
        link_avatar: state.thongtin.link_avatar,
        name: state.thongtin.name,
        isLogin: state.thongtin.isLogin,
        token: state.thongtin.token,
    }
}

export default connect(mapStateToProps)(ListBooking);