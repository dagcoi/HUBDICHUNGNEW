import React, { Component } from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet, ActivityIndicator, Modal, Image } from 'react-native'
import StarVote from '../../component/StarVote'
import Header from '../../component/Header'
import ImageTextDiChung from '../../component/ImageTextDiChung'
import DetailTaxi from './DetailTaxi'
import DetailTuLai from './DetailTuLai'
import DetailExpress from './DetailExpress'
import DetailXeChung from './DetailXeChung'
import * as link from '../../URL'


const imagePick = '../../image/location.png'
const imageDrop = '../../image/drop.png'
const imageTime = '../../image/time.png'
const imageMoney = '../../image/money.png'
const imageCancel = '../../image/cancel.png'

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
            ticket: ''
        }
    }

    componentDidMount() {
        this.getListBooking()
    }

    async getTicketInfo(ticket_code, phone_number) {
        const url = link.URL_API + `passenger/get_ticket_info`
        const formData = new FormData();
        formData.append('ticket_code', ticket_code);
        formData.append('phone_number', phone_number)
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
            body: formData
        });
        const jsonRes = await res.json();
        this.setState({
            bookingDetail: jsonRes.data,
            isLoadingTicket: false,
        });
    }

    getListBooking() {
        let url = `http://dev.portal.dichung.vn/api/booking/v1/bookings`
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(resJson => {
                console.log(resJson)
                this.setState({
                    listBooking: resJson.data,
                    isLoading: false,
                })
            });
    }

    selectTime() {
        return (
            <View>

            </View>
        )
    }

    formatDate(string) {
        var date = new Date(string);

        var strDate = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        return strDate;
    }

    renderItem(item) {
        let starVote = Math.floor((Math.random() * 6) + 5) / 2;
        console.log(starVote)
        return (
            item.code ?
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            isLoadingTicket: true,
                            modalTicket: true,
                            ticket: item.code,
                        })
                        this.getTicketInfo(item.code, item.bookingUser.phone);
                    }}
                >
                    <View style={styles.titleTicket}>
                        <Text style={{ flex: 1, textAlign: 'left', fontSize: 16, fontWeight: 'bold' }}>Mã vé : {item.code}</Text>
                        <View style={{ height: 32, borderRadius: 16, backgroundColor: item.rideMethod === 'private' ? '#77a300' : '#ef465f', paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff' }}>{item.rideMethod === 'private' ? 'Đi riêng' : 'Đi chung'}</Text>
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

    renderListBooking(listBooking) {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator
                    style={{ padding: 32, }}
                    size='large'
                />
            )
        }
        return (
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={listBooking}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.card}>
                                {this.renderItem(item)}
                            </View>
                        )
                    }
                    }
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header onPressLeft={() => this.props.navigation.openDrawer()} />
                {this.selectTime()}
                <View style={{ flex: 1 }}>
                    {this.renderListBooking(this.state.listBooking)}
                </View>
                <Modal
                    visible={this.state.modalTicket}
                >
                    <View>
                        <View style={{ flexDirection: 'row', height: 56, borderBottomWidth: 1, borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
                            <Text style={{ flex: 1, textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>Chi tiết mã vé :{this.state.ticket}</Text>
                            <TouchableOpacity
                                onPress={() => { this.setState({ modalTicket: false }) }}
                            >
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={require(imageCancel)}
                                />
                            </TouchableOpacity>
                        </View>
                        {this.state.isLoadingTicket ?
                            <ActivityIndicator
                                style={{ padding: 32, }}
                                size='large'
                            />
                            : this.state.bookingDetail.product_type == 'CAR_RENTAL' ? <DetailTuLai item={this.state.bookingDetail} />
                                : this.state.bookingDetail.product_type == 'DRIVER_RENTAL' ? <DetailXeChung item={this.state.bookingDetail} />
                                    : this.state.bookingDetail.product_type == 'TRUCK' ? <DetailExpress item={this.state.bookingDetail} />
                                        : <DetailTaxi item={this.state.bookingDetail} />
                        }
                    </View>
                </Modal>
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
        marginHorizontal: 8,
        marginVertical: 8,
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
    }
})

export default ListBooking;