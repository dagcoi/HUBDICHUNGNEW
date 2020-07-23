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

const origin = { latitude: 20.97820166666667, longitude: 105.79656666666666 };
const GOOGLE_MAPS_API_KEY = key.KEY_GOOGLE;
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
            location: null,
            addressLocation: null,
            addressLocationComponent: null,
            listCar: [
                {
                    latitude: 21.0151235,
                    longitude: 105.8559721,
                    name: 'Marker 1'
                },
                {
                    latitude: 21.0152985,
                    longitude: 105.8169721,
                    name: 'Marker 2'
                },
                {
                    latitude: 21.0153888,
                    longitude: 105.8189721,
                    name: 'Marker 3'
                },
                {
                    latitude: 21.0154985,
                    longitude: 105.8109600,
                    name: 'Marker 4'
                },
                {
                    latitude: 21.0155985,
                    longitude: 105.8229821,
                    name: 'Marker 5'
                },
                {
                    latitude: 21.0156985,
                    longitude: 105.8349921,
                    name: 'Marker 6'
                },
                {
                    latitude: 21.0157785,
                    longitude: 105.8089721,
                    name: 'Marker 7'
                },
                {
                    latitude: 21.0158685,
                    longitude: 105.8009721,
                    name: 'Marker 8'
                },
            ]
        };
    }

    componentDidMount() {
        this.findCoordinates()
    }

    renderPickToDrop() {
        if (this.state.location == null) {
            return (
                <MapView style={styles.container}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: origin.latitude, //this.state.location!=null && this.state.location.latitude ??
                        longitude: origin.longitude, //this.state.location!=null && this.state.location.longitude ??
                        latitudeDelta: 2.0,
                        longitudeDelta: 0.1,
                    }}
                ></MapView>
            )
        } else {
            return (
                <MapView style={styles.container}
                    ref={ref => {
                        this.map = ref;
                    }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: parseFloat(this.state.location.coords.latitude), //this.state.location!=null && this.state.location.latitude ??
                        longitude: parseFloat(this.state.location.coords.longitude), //this.state.location!=null && this.state.location.longitude ??
                        latitudeDelta: 0,
                        longitudeDelta: 0.0002,
                    }}
                    region={this.state.region}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: parseFloat(this.state.location.coords.latitude),
                            longitude: parseFloat(this.state.location.coords.longitude),
                        }}
                        title={"Điểm nhận"}
                    />
                    {this.state.listCar.map((obj, i) => (
                        <Marker
                            image={require(imageMarker)}
                            title={obj.name}
                            coordinate={{
                                latitude: obj.latitude,
                                longitude: obj.longitude,
                            }}
                        />
                    ))}
                </MapView>
            )
        }
    }

    findCoordinates = () => {
        var location = null;

        Geolocation.getCurrentPosition(
            position => {
                location = position;
                this.setState({ location: location });
                console.log(location)
                this.getAddressComponent(position)
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
        );


        // this.props.navigation.navigate('SearchPlace')

    };

    getAddressComponent = (location) => {
        Geocoder.init(GOOGLE_MAPS_API_KEY);
        Geocoder.from(location.coords.latitude, location.coords.longitude)
            .then(json => {
                var addressLocation = json.results[0].formatted_address;
                var addressLocationComponent = json.results[0];
                // var addressComponent = json.results[0].address_components[0];
                console.log('qqq')
                console.log(addressLocation);
                console.log(addressLocationComponent);
                this.setState({ addressLocation, addressLocationComponent })
            })
            .catch(error => console.warn(error));

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderPickToDrop()}

                <View style={styles.formInput}>
                    <ImageInputTextDiChung
                        source={require(imageLocation)}
                        placeholder={'Nhập điểm xuất phát'}
                        value={this.state.addressLocation}
                        noBorderTop
                    />

                    <ImageInputTextDiChung
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
                    <ButtonFull value={'Tiếp tục'} onPress={() => { this.props.navigation.navigate('ListCarTaxiNow') }} />
                </View>
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
        borderRadius: 8
    }
});


function mapStateToProps(state) {
    return {
        drop_add: state.info.drop_add,
        component_drop: state.info.component_drop,
        latitude_drop: state.info.latitude_drop,
        longitude_drop: state.info.longitude_drop,
    }
}

export default connect(mapStateToProps)(Map);