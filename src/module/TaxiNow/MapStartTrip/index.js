import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import { View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ActivityIndicator, Dimensions, Linking } from 'react-native';
import * as key from '../../../component/KeyGG'
import { connect } from 'react-redux';
import * as link from '../../../URL'
import Toast from 'react-native-simple-toast';
import TextSpaceBetween from '../../../component/ImageTextDiChung/TextSpaceBetween';
import BottomSheet from 'reanimated-bottom-sheet'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const GOOGLE_MAPS_API_KEY = key.KEY_GOOGLE;
const height1 = 600
const height2 = 400
const height3 = 50
class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            infoTrip: null,
            indexMarker: {
                start: 0,
                end: 1
            },
            showFillDriver: true,
            showDriverInformation: false,
            timeReload: 15000,
            count: 0,
            loadData: true,
            driverInformation: {
                name: "dangth",
                phone: "0338622820",
                email: "dangth@dichung.vn",
                count: "9111",
                star: 4.9,
            }

        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        // this.findCoordinates()
        this.setState({ showFillDriver: true, showDriverInformation: false })
        Toast.show(navigation.getParam('id'))
        this.getTicketByBookingId(navigation.getParam('id'))
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }


    getTicketByBookingId(id) {
        this._interval = setInterval(() => {
            const url = link.URL_API_PORTAL + `booking/v1/bookings/${id}`
            console.log(url)
            if (this.state.loadData) {
                return fetch(url)
                    .then((res) => res.json())
                    .then((jsonRes) => {
                        console.log(this.state.count + JSON.stringify(jsonRes))
                        this.setState({
                            infoTrip: jsonRes.data,
                            is_loading: false,
                            bookingDetail: jsonRes.data,
                            count: this.state.count + 1
                        })
                    }
                    )
            } else {
                return null;
            }
        }, this.state.timeReload);
    }

    renderPickToDrop() {
        return (
            <MapView style={styles.container}
                ref={(ref) => { this.mapRef = ref }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: parseFloat(this.props.latLocation),
                    longitude: parseFloat(this.props.lngLocation),
                    latitudeDelta: 0,
                    longitudeDelta: 0.05,
                }}
                region={this.state.region}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: parseFloat(this.props.latLocation),
                        longitude: parseFloat(this.props.lngLocation),
                    }}
                    title={"Điểm đón"}
                    identifier={'mk1'}
                />

                <MapView.Marker
                    coordinate={{
                        latitude: parseFloat(this.props.latitude_drop),
                        longitude: parseFloat(this.props.longitude_drop),
                    }}
                    title={"Điểm trả"}
                    identifier={'mk2'}
                />

                <MapViewDirections
                    origin={{ latitude: this.props.latLocation, longitude: this.props.lngLocation }}
                    destination={{ latitude: this.props.latitude_drop, longitude: this.props.longitude_drop }}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={4}
                    strokeColor="#669df6"
                    onReady={result => {
                        this.mapRef.fitToSuppliedMarkers(['mk1', 'mk2'], {
                            edgePadding:
                            {
                                top: 300,
                                right: 100,
                                bottom: 100,
                                left: 100
                            }
                        })
                        this.mapRef.fitToElements(true);
                    }}
                />

            </MapView>
        )
    }

    formFillDriver = () => {
        return (
            <View>
                <View style={{ alignItems: 'center', backgroundColor: '#fff', height: 600, }}>
                    <View style={{ width: SCREEN_WIDTH * 4 / 5, height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                        <ActivityIndicator />
                        <Text>Đang tìm tài xế...</Text>
                        <TouchableOpacity
                            onPress={() => { this.setState({ showDriverInformation: true, showFillDriver: false }) }}
                        >
                            <Text>Thông tin tài xế</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    renderHeaderFilter = () => {
        return (
            <View style={{ width: SCREEN_WIDTH, height: 50, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 8, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Đang tìm tài xế</Text>
                </View>
            </View>
        )
    }

    renderHeader = () => {
        return (
            <View style={{ width: SCREEN_WIDTH, height: 50, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 8, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thông tin tài xế</Text>
                </View>
            </View>
        )
    }

    formDriverInformation = () => {

        if (this.state.infoTrip.forward) {
            // console.log('tripppppp999 : .......' + JSON.stringify(this.state.infoTrip))
            { this.state.infoTrip.forward && this.state.infoTrip.forward.result && this.state.infoTrip.forward.result.status ? console.log(this.state.infoTrip.forward.result.status) : console.log('a') }
            return (
                <View style={{ backgroundColor: '#fff', }}>

                    <View style={{ paddingHorizontal: 8, height: 600 }}>
                        <TextSpaceBetween
                            textBold={'Họ tên: '}
                            text={this.state.infoTrip.forward.result.driver_info.name}
                        />
                        <TextSpaceBetween
                            textBold={'Số điện thoại: '}
                            text={this.state.infoTrip.forward.result.driver_info.phone}
                        />
                        <TextSpaceBetween
                            textBold={'Xe: '}
                            text={this.state.infoTrip.forward.result.driver_info.vehicle_model}
                        />
                        {/* <TextSpaceBetween
                            textBold={'Số chuyến: '}
                            text={this.state.infoTrip.forward.result + ' chuyến'}
                        />
                        <TextSpaceBetween
                            textBold={'Đánh giá: '}
                            text={this.state.infoTrip.forward.result}
                        /> */}
                        {this.state.infoTrip.forward && this.state.infoTrip.forward.result && this.state.infoTrip.forward.result.status ?
                            <TextSpaceBetween
                                textBold={'Trạng thái chuyến đi: '}
                                text={
                                    this.state.infoTrip.forward.result.status == 'WAITING' ? 'Đang tìm tài xế' :
                                        this.state.infoTrip.forward.result.status == 'DRIVER_COMMING' ? 'Tài xế đang đến đón' :
                                            this.state.infoTrip.forward.result.status == 'FAILED' ? 'Không tìm thấy tài xế' :
                                                this.state.infoTrip.forward.result.status == 'DRIVER_WAITING' ? ' Tài xế đã đến vị trí đón' :
                                                    this.state.infoTrip.forward.result.status == 'DRIVER_CANCEL' ? 'Tài xế hủy chuyến ' :
                                                        this.state.infoTrip.forward.result.status == 'MOVING' ? 'Khách đã lên xe, chuyến đi bắt đầu' :
                                                            this.state.infoTrip.forward.result.status == 'DROP' ? 'Khách xuống xe ' :
                                                                this.state.infoTrip.forward.result.status == 'PAYMENT' ? 'Nhận thanh toán từ khách hàng' :
                                                                    this.state.infoTrip.forward.result.status == 'FINISHED' ? 'Hoàn thành chuyến đi' : ''}
                            /> :
                            null
                        }
                        <TouchableOpacity
                            style={{ padding: 8, height: 50, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => Linking.openURL(`tel: ${this.state.driverInformation.phone}`)}
                        >
                            <Text style={{ color: '#77a300', textDecorationLine: 'underline' }}>Liên hệ với lái xe</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ padding: 8, height: 50, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => { this.setState({ showFillDriver: true }) }}
                        >
                            <Text>Tìm tài xế</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return null;
    }

    bottomInformation() {
        return (
            < BottomSheet
                snapPoints={[height3, height1, height2,]}
                renderContent={this.state.showFillDriver ? this.formFillDriver : this.formDriverInformation}
                renderHeader={this.state.showFillDriver ? this.renderHeaderFilter : this.renderHeader}
                enabledContentGestureInteraction={false}
                enabledBottomInitialAnimation={true}
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderPickToDrop()}
                {this.bottomInformation()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 2,
        left: 2,
        right: 2,
        bottom: 2,
        justifyContent: 'center',
        alignItems: "center",
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 400,
    },
    formInput: {
        backgroundColor: '#fff',
        margin: 8,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});


function mapStateToProps(state) {
    return {
        drop_add: state.info.drop_add,
        component_drop: state.info.component_drop,
        latitude_drop: state.info.latitude_drop,
        longitude_drop: state.info.longitude_drop,
        pick_add: state.info.pick_add,
        component_pick: state.info.component_pick,
        latitude_pick: state.info.latitude_pick,
        longitude_pick: state.info.longitude_pick,
        addressLocation: state.info.addressLocation,
        addressLocationComponent: state.info.addressLocationComponent,
        latLocation: state.info.latLocation,
        lngLocation: state.info.lngLocation,
        token: state.thongtin.token,
    }
}

export default connect(mapStateToProps)(Map);