import { View, TouchableOpacity, Image } from 'react-native';

const API_KEY = 'AIzaSyBDZSUAda65OflvYZmZ4G5XSGONZv3pkuY';

<GooglePlacesAutocomplete
    placeholder={'Nhập địa chỉ ... '}
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
        // this.addlatlng(details.geometry.location.lat, details.geometry.location.lng);
        Geocoder.from(details.geometry.location.lat, details.geometry.location.lng)
            .then(json => {
                details = json.results[0];
                this._validateAddress(details, data.description)
            })
            .catch(error => console.warn(error));
    }}

    getDefaultValue={() => this.state.address}

    query={{
        key: API_KEY,
        language: 'vi', // language of the results
        components: "country:vn"
    }}

    styles={{
        textInputContainer: {
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor: '#ffffff',
            width: '99%',
        },
        description: {
            fontWeight: 'normal',
        },
        predefinedPlacesDescription: {
            color: '#77a300'
        }
    }}

    currentLocation={false}
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
    renderLeftButton={() =>
        <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 8, }}>
            <Image
                style={{ width: 30, height: 30, }}
                source={require(imageLocation)}
            />
        </View>
    }
    renderRightButton={() =>
        <View style={{ padding: 8, justifyContent: 'center', alignItems: 'center' }}>
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
        </View>
    }
/>