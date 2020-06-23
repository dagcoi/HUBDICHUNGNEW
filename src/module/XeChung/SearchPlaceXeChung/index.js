import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import { connect } from 'react-redux';

import { pickAddressTaixe, dropAddressTaixe, addAddressYCDB } from '../../../core/Redux/action/Action'
import { HeaderText } from '../../../component/Header'

const API_KEY = 'AIzaSyBDZSUAda65OflvYZmZ4G5XSGONZv3pkuY';
Geocoder.init(API_KEY); // use a valid API key

class SearchPlaceXeChung extends Component {

    constructor() {
        super()
        this.state = {
            address_component: '',
            address: '',
            blSelect: true,
            showPlacesList: false,
            lat: 0.1,
            lng: 0.2,
        }
    }

    _validateAddress(address_component, address) {
        const { navigation } = this.props;
        const address11 = navigation.getParam('search');
        this.setState(() => ({
            address_component: address_component,
            address: address,
            blSelect: false,
        }))
        console.log(JSON.stringify(this.state.address_component));
        console.log(this.state.address);
        if (address11 == 'Pick') {
            this._addPick();
        } else {
            this._addDrop();
        }

    }

    _addPick() {
        const { address, address_component, lat, lng } = this.state;
        this.props.pickAddressTaixe(address, address_component, lat, lng);
        this.props.addAddressYCDB(address, address_component, lat, lng)
        this.goBack();
    }

    _addDrop() {
        const { address, address_component, lat, lng } = this.state;
        this.props.dropAddressTaixe(address, address_component, lat, lng);
        this.goBack();
    }
    addlatlng(lattitude, lngtitude) {
        this.setState({
            lat: lattitude,
            lng: lngtitude,
        });
        console.log(`lat: ${this.state.lat} lng: ${this.state.lng}`);
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { navigation } = this.props;
        const imageLocation = '../../../image/location.png'
        const imageDrop = '../../../image/drop.png'
        const imageCancel = '../../../image/cancel.png'
        const address11 = navigation.getParam('search');
        const placeholder = navigation.getParam('placeholder');
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <HeaderText textCenter={'Nhập địa chỉ'} onPressLeft={this.goBack} />
                <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <GooglePlacesAutocomplete
                            placeholder={placeholder}
                            minLength={2}
                            autoFocus={true}
                            returnKeyType={'search'}
                            listViewDisplayed={this.state.showPlacesList}
                            fetchDetails={true}
                            textInputProps={{
                                onFocus: () => this.setState({ showPlacesList: true, blSelect: true }),
                                onBlur: () => this.setState({ showPlacesList: false }),
                            }}
                            renderDescription={row => row.description}
                            onPress={(data, details = null) => {
                                console.log(data, details);
                                this.addlatlng(details.geometry.location.lat, details.geometry.location.lng);
                                Geocoder.from(details.geometry.location.lat, details.geometry.location.lng)
                                    .then(json => {
                                        details = json.results[0];
                                        this._validateAddress(details, data.description)
                                    })
                                    .catch(error => console.warn(error));
                            }}

                            getDefaultValue={() => address11 == 'Pick' ? this.props.pick_add : this.props.drop_add}

                            query={{
                                key: API_KEY,
                                language: 'vi', // language of the results
                                components: "country:vn"
                            }}

                            styles={{
                                textInputContainer: {
                                    borderRadius: 4,
                                    borderBottomWidth: 0.5,
                                    borderTopWidth: 2,
                                    borderTopColor: '#ffffff',
                                    backgroundColor: '#ffffff',
                                    width: '100%',
                                },
                                description: {
                                    fontWeight: 'normal',
                                },
                                predefinedPlacesDescription: {
                                    color: '#77a300'
                                }
                            }}

                            currentLocation={false}
                            currentLocationLabel="Current location"
                            nearbyPlacesAPI='GooglePlacesSearch'
                            GoogleReverseGeocodingQuery={{
                            }}
                            GooglePlacesSearchQuery={{
                                rankby: 'distance',
                                types: "food"
                            }}

                            filterReverseGeocodingByTypes={['locality', 'sublocality', 'postal_code', 'administrative_area_level_1', 'administrative_area_level_2']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                            debounce={500}
                            ref={ref => this.GooglePlaceRef1 = ref}
                            renderLeftButton={() => <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 8, }}>
                                <Image
                                    style={{ width: 30, height: 30, }}
                                    source={address11 == 'Pick' ? require(imageLocation) : require(imageDrop)}
                                />
                            </View>
                            }
                            renderRightButton={() => <View style={{ padding: 8, justifyContent: 'center', alignItems: 'center' }}>
                                {Platform.OS === 'android' ?
                                    <TouchableOpacity
                                        onPress={
                                            () => {
                                                this._clearInput(this.GooglePlaceRef1)
                                                this.setState(() => ({ blSelect: true }))
                                            }
                                            // () => this.refs.textInput.value = ''
                                        }>
                                        <Image
                                            style={{ width: 20, height: 20, margin: 8 }}
                                            source={require(imageCancel)} />
                                    </TouchableOpacity>
                                    : null
                                }
                            </View>}
                        />

                    </View>
                </View>
            </SafeAreaView>
        );
    }
    _clearInput(inputT) {
        if (inputT) {
            inputT.setAddressText('')
            inputT.refs.textInput.focus()
        }
    }

    goBack() {
        const { navigation } = this.props
        navigation.goBack()
        // navigation.state.params.onBack();  // Call onBack function of ScreenA
    }

}


function mapStateToProps(state) {
    return {
        drop_add: state.rdTaixe.drop_add,
        pick_add: state.rdTaixe.pick_add,
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 20,
        justifyContent: 'center',
        alignItems: "center"
    },
});

export default connect(mapStateToProps, { dropAddressTaixe: dropAddressTaixe, pickAddressTaixe: pickAddressTaixe, addAddressYCDB: addAddressYCDB })(SearchPlaceXeChung)