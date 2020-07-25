import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import * as key from '../KeyGG'
import { addLocation } from '../../core/Redux/action/Action'
const GOOGLE_MAPS_API_KEY = key.KEY_GOOGLE;

getLocation = () => {
    var data;
    Geolocation.getCurrentPosition(
        position => {
            Geocoder.init(GOOGLE_MAPS_API_KEY);
            Geocoder.from(position.coords.latitude, position.coords.longitude)
                .then(json => {
                    var addressLocation = json.results[0].formatted_address;
                    var addressLocationComponent = json.results[0];
                    var lat = 'a'
                    var lng = 'b'
                    addLocation(addressLocation, addressLocationComponent, lat, lng)
                    console.log(json)
                })
                .catch(error => console.warn(error));
        },
        error => { console.log(error) },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
    );
    return data
};

function mapStateToProps(state) {
    return {
        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
    }
}

export default getLocation;
