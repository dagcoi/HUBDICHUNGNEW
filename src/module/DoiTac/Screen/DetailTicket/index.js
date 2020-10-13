import React, { Component } from 'react'
import { View, SafeAreaView, ActivityIndicator, Text } from 'react-native'
import ImageTextDiChung from '../../../../component/ImageTextDiChung';
import { SvgAvatarIcon, SvgCalendar, SvgCar, SvgDiChungTaxi, SvgMoneyUlgy, SvgPeople, SvgPerson, SvgPhone, SvgPhoneCD, SvgPick, SvgVehicle } from '../../../../icons';
import * as link from '../../../../URL'
import styles from '../../style';
import { formatDate, formatCurrency, handleChange } from '../../../../until'
import { HeaderText } from '../../../../component/Header';
import { ButtonFull } from '../../../../component/Button';

class DetailTicketPartner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: null,
            isLoading: true,
        }
    }

    componentDidMount() {
        const { navigation } = this.props
        const code = navigation.getParam('code')
        this.getBookingDetail(code);
    }

    getBookingDetail(code) {
        var url = link.URL_API_PORTAL + `product/v1/products/${code}`
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(jsonRes => {
                console.log(url)
                console.log(jsonRes.data)
                this.setState({
                    detail: jsonRes.data,
                    isLoading: false,
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        if (this.state.isLoading)
            return (
                <SafeAreaView>
                    <HeaderText textCenter={'Chi tiết'} onPressLeft={() => this.props.navigation.popToTop()} />
                    <ActivityIndicator />
                </SafeAreaView>
            )
        return (
            <SafeAreaView>
                <HeaderText textCenter={'Chi tiết'} onPressLeft={() => this.props.navigation.popToTop()} />
                <View style={{ paddingHorizontal: 8 }}>
                    <View style={{ height: 90, flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <SvgDiChungTaxi width={120} height={80} />
                        </View>
                    </View>
                    {this.renderDriver(this.state.detail)}
                    {this.state.detail?.type == 'hourly_car_rental' && this.renderVehicle(this.state.detail)}
                    {this.state.detail?.type == 'transfer_service' && this.renderVehicle(this.state.detail)}
                    {this.renderDetailService(this.state.detail)}
                    {this.state.detail?.type == 'hourly_car_rental' && this.renderExtra(this.state.detail)}
                    {this.renderPrice(this.state.detail)}
                    <ButtonFull onPress={() => { this.props.navigation.popToTop() }} value={'Trang chủ'} />
                </View>
            </SafeAreaView>
        )
    }

    renderDriver(detail) {
        return (
            <View style={{ marginTop: 8, borderTopWidth: 0.5, paddingTop: 8 }}>
                <Text style={styles.textBold}>Thông tin tài xế</Text>
                <ImageTextDiChung text={detail.user.username} children={<SvgAvatarIcon />} />
                <ImageTextDiChung text={detail.user.phone} children={<SvgPhoneCD />} />
            </View>
        )
    }

    renderDetailService(detail) {
        return (
            <View style={{ marginTop: 8, borderTopWidth: 0.5, paddingTop: 8 }}>
                <Text style={styles.textBold}>Chi tiết dịch vụ</Text>
                <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                    <Text style={styles.textBold14}>Dịch vụ: </Text>
                    <Text>{detail.type == 'express' ? 'Vận Chuyển' : detail.type == 'transfer_service' ? 'Sân bay, đường dài' : detail.type == 'hourly_car_rental' ? 'Thuê xe tự lái' : 'Chia sẻ chỗ trống'}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                    <Text style={styles.textBold14}>Tạo lúc: </Text>
                    <Text>{formatDate(detail.createdAt)}</Text>
                </View>
                {detail.type == 'express' ?
                    <View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textBold14}>Tiêu đề: </Text>
                            <Text>{detail.title ?? ''}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                            <Text style={styles.textBold14}>Mô tả: </Text>
                            <Text>{detail.description ?? ''}</Text>
                        </View>
                    </View> : null}
                <ImageTextDiChung text={detail.startPlace.formatted_address} children={<SvgPick />} />
                {detail.endPlace && <ImageTextDiChung text={detail.endPlace.formatted_address} children={<SvgPick color={'#ef465e'} />} />}
                {detail.type != 'ride_share' ? this.timeExpress(detail) : null}
            </View>
        )
    }

    timeExpress(detail) {
        return (
            <ImageTextDiChung text={`${detail.schedule.startTimeString} - ${detail.schedule.endTimeString} (${detail.schedule.applyWeekdays.toString().replace('6', 'T7').replace('5', 'T6').replace('4', 'T5').replace('3', 'T4').replace('2', 'T3').replace('1', 'T2').replace('0', 'CN')})`} children={<SvgCalendar />} />
            //.toString().replace('6', 'T7').replace('5', 'T6').replace('4', 'T5').replace('3', 'T4').replace('2', 'T3').replace('1', 'T2').replace('0', 'CN')
        )
    }

    renderExtra(detail) {
        return (
            <View>
                <ImageTextDiChung text={`Phụ trội theo km: ${formatCurrency(detail.priceExtra.kmExtra)} đ/km (tối đa ${detail.priceExtra.kmLimit} km)`} children={<SvgCar />} />
                <ImageTextDiChung text={`Phụ trội theo giờ: ${formatCurrency(detail.priceExtra.hourExtra)} đ/giờ (tối đa ${detail.priceExtra.hourLimit} giờ)`} children={<SvgCar />} />
            </View>
        )
    }

    renderRideShare(detail) {
        return (
            <View>
                <ImageTextDiChung text={`Số người muốn đi cùng: ${detail.slot}`} children={<SvgPeople />} />
                <ImageTextDiChung text={`Chi phí chia sẻ: ${formatCurrency(detail.price)} đ/người`} children={<SvgPerson />} />
                {/* <ImageTextDiChung text={`Thu nhập tạm tính: ${detail.price * detail.slot} đ`} children={<SvgMoneyUlgy width={20} height={20} color={'#ef465e'} />} /> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, }}>
                    <View style={{ padding: 2 }}>
                        <SvgMoneyUlgy width={20} height={20} color={'#ef465e'} />
                    </View>
                    <Text style={{ fontWeight: 'bold', color: '#00363d' }}>Thu nhập tạm tính:</Text>
                    <Text style={{ fontWeight: 'bold', color: '#ef465e' }}>{`${formatCurrency(detail.price * detail.slot)} đ`}</Text>
                </View>
            </View>
        )
    }

    renderPrice(detail) {
        return (
            <View>
                {this.state.detail?.type == 'ride_share' ? this.renderRideShare(detail) :
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, borderTopWidth: 0.5, paddingTop: 8 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#00363d' }}>Giá tiền: </Text>
                        <View style={{ flex: 1 }} />
                        <Text style={{ textAlight: 'right', fontSize: 20, fontWeight: 'bold', color: '#77a300' }}>{formatCurrency(detail.price) + ' đ'}</Text>
                    </View>}
            </View>
        )
    }

    renderVehicle(detail) {
        return (
            <View style={{ marginTop: 8, borderTopWidth: 0.5, paddingTop: 8 }}>
                <Text style={styles.textBold}>Thông tin phương tiện</Text>
                <ImageTextDiChung text={detail.driver.vehicle.type} children={<SvgVehicle />} />
                <ImageTextDiChung text={detail.driver.vehicle.name} children={<SvgCar />} />
            </View>
        )
    }
}

export default DetailTicketPartner;