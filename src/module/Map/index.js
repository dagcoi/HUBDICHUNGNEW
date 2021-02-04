import React, { Component } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, FlatList, SafeAreaView } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import * as key from '../../component/KeyGG'
import Geocoder from 'react-native-geocoding';
import ImageInputTextDiChung from '../../component/ImageInputTextDiChung';
import { connect } from 'react-redux';
import { ButtonFull } from '../../component/Button';
import * as link from '../../URL'
import Toast from 'react-native-simple-toast';
import { addCaroDuration } from '../../core/Redux/action/Action'
import BottomSheet from 'reanimated-bottom-sheet'
import { HeaderText } from '../../component/Header'
import { SvgPick } from '../../icons';

const origin = { latitude: 20.97820166666667, longitude: 105.79656666666666 };
// const GOOGLE_MAPS_API_KEY = key.KEY_GOOGLE; 
const imageLocation = '../../image/location.png'
const imageMarker = '../../image/markerA.png'
class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            indexMarker: {
                start: 0,
                end: 1
            },
            KEY_GOOGLE: 'AIzaSyCS3220RqSBmfa_Z3c5r5VGNwRbyoE9EJc',
            listCar: [],
        };
    }

    componentDidMount() {
        // this.findCoordinates()
        this.getGGAPIKey()
        this.getCarAround(this.props.addressLocationComponent)

    }

    getGGAPIKey() {
        fetch(`https://taxiairport.vn/api.php/home/get_google_map_api`)
            .then(res => res.json())
            .then(resJson => {
                console.log(JSON.stringify(resJson))
                this.setState({ KEY_GOOGLE: resJson.key });
                // return resJson.key
            }
            )
    }

    async getCarAround(address) {
        var url = link.URL_API_PORTAL + `price/v1/near-products?startPlace=${JSON.stringify(address)}&provider=caro`
        // console.log(url)
        // console.log(this.props.token)
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'token': this.props.token,
                }
            });
            const responseJson = await response.json();
            const listCar = responseJson.data;
            // console.log('abc : .......' + listCar);
            this.setState({ listCar: listCar })
            return true
        }
        catch (error) {
            console.log('abc' + error);
        }
    }

    gotoListCarTaxiNow = () => {
        console.log(this.props.component_drop + '...' + this.props.addressLocationComponent)
        if (this.props.component_drop && this.props.addressLocationComponent) {
            this.props.navigation.navigate('ListCarTaxiNow')
            // this.props.navigation.navigate('MapStartTrip')
        } else {
            Toast.show('Vui lòng điền đầy đủ thông tin!')
        }
    }

    renderListCar(listCar) {
        // console.log('qqq' + listCar)
        if (listCar) {
            return (
                listCar.map((obj, i) => (
                    <Marker
                        image={require(imageMarker)}
                        title={obj.license_plate}
                        coordinate={{
                            latitude: obj.latitude,
                            longitude: obj.longitude,
                        }}
                    />
                ))
            )
        }
    }

    renderPickToDrop() {
        if (this.props.addressLocation == null) {
            return (
                <MapView style={styles.container}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: 2.0,
                        longitudeDelta: 0.1,
                    }}
                ></MapView>
            )
        } else if (!this.props.drop_add) {
            // console.log('1' + this.props.drop_add.length)
            return (
                <MapView style={styles.container}
                    ref={ref => {
                        this.mapRef = ref;
                    }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: parseFloat(this.props.latLocation),
                        longitude: parseFloat(this.props.lngLocation),
                        latitudeDelta: 0,
                        longitudeDelta: 0.05,
                    }}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: parseFloat(this.props.latLocation),
                            longitude: parseFloat(this.props.lngLocation),
                        }}
                        title={"Điểm đón"}
                        identifier={'mk1'}
                    />
                </MapView>
            )
        } else {
            // console.log('2' + this.props.drop_add.length)
            return (
                <MapView style={styles.container}
                    ref={ref => {
                        this.mapRef = ref;
                    }}
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: parseFloat(this.props.latLocation),
                        longitude: parseFloat(this.props.lngLocation),
                        latitudeDelta: 0,
                        longitudeDelta: 0.05,
                    }}
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
                        apikey={this.state.KEY_GOOGLE}
                        strokeWidth={4}
                        strokeColor="#669df6"
                        language={'vn'}
                        timePrecision={'now'}
                        splitWaypoints={true}
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
                            this.props.addCaroDuration(result.duration, result.distance)
                            console.log('thời gian: ' + result.duration)
                            console.log('Quãng đường: ' + result.distance)
                            this.mapRef.fitToElements(true);
                        }}
                    />
                    {this.renderListCar(this.state.listCar)}
                </MapView>
            )
        }
    }

    formInputAddress = () => {
        return (
            <View style={styles.formInput}>
                <ImageInputTextDiChung
                    children={<SvgPick />}
                    onPress={() => {
                        this.props.navigation.push("SearchPlace", {
                            search: 'Location',
                            placeholder: 'Nhập điểm xuất phát',
                        });
                    }}
                    source={require(imageLocation)}
                    placeholder={'Nhập điểm xuất phát'}
                    value={this.props.addressLocation}
                    noBorderTop
                />

                <ImageInputTextDiChung
                    children={<SvgPick color={'#eb6752'} />}
                    onPress={() => {
                        this.props.navigation.push("SearchPlace", {
                            search: 'Drop',
                            placeholder: 'Nhập điểm đến',
                        });
                    }}
                    source={require(imageLocation)}
                    placeholder={'Nhập điểm đến'}
                    value={this.props.drop_add}
                />
                <ButtonFull value={'Tiếp tục'} onPress={() => this.gotoListCarTaxiNow()} />
            </View>
        )
    }

    renderHeaderFilter = () => {
        return (
            <View style={{ height: 50, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 8, backgroundColor: '#fff', borderTopRightRadius: 30, borderTopLeftRadius: 30, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nhập địa chỉ</Text>
                </View>
            </View>
        )
    }

    goBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderPickToDrop()}
                <HeaderText textCenter={'Nhập địa chỉ'} onPressLeft={this.goBack} />
                <BottomSheet
                    snapPoints={[200]}
                    renderContent={this.formInputAddress}
                    renderHeader={this.renderHeaderFilter}
                    enabledContentGestureInteraction={true}
                    enabledBottomInitialAnimation={true}
                    enabledContentTapInteraction={false}
                />

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
        height: 150,
        backgroundColor: '#fff',
        // margin: 8,
        paddingHorizontal: 16,
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

export default connect(mapStateToProps, { addCaroDuration: addCaroDuration })(Map);