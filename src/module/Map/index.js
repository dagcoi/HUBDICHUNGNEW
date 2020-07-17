import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, FlatList, SafeAreaView } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const origin = { latitude: 21.2187149, longitude: 105.80417090000003 };

class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            indexMarker: {
                start: 0,
                end: 1
            },
            region: {
                latitude: 13.627235,
                longitude: 100.626800,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            marker: [{
                _id: "01",
                latitude: 13.628235,
                longitude: 100.626800
            }],
            latlng: {
                latitude: 13.627235,
                longitude: 100.626800
            },
            location: null

        };
    }

    renderPickToDrop() {

        return (
            <MapView style={styles.container}
                provider={PROVIDER_GOOGLE}
                // initialRegion={{
                //     latitude: origin.latitude,
                //     longitude: origin.longitude,
                //     latitudeDelta: 2.0,
                //     longitudeDelta: 0.1,
                // }}
                region={this.state.region}
            ></MapView>
        )
    }

    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);

                this.setState({ location: location });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderPickToDrop()}

                <TouchableOpacity onPress={this.findCoordinates}>
                    <Text style={styles.welcome}>Find My Coords?</Text>
                    <Text>Location: {this.state.location}</Text>
                </TouchableOpacity>
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
});

export default Map;