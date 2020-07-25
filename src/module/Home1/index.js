import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, BackHandler, Alert, Image, Linking, Dimensions, ScrollView, SafeAreaView, AsyncStorage, Modal, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';
import WebView from 'react-native-webview';
import * as link from '../../URL'
import Header from '../../component/Header/HeaderImage'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { addUser, addToken, addLocation } from '../../core/Redux/action/Action'
import { setupPushNotification } from "../../service/pushNotificaion"
import PushNotification from 'react-native-push-notification';
import { notifications } from 'react-native-firebase';
import firebase, { messaging } from 'react-native-firebase'
import { FlatGrid } from 'react-native-super-grid';
import Detail from './infoDetail'
import SwiperFlatListCustom from './SwiperFlatList'
import SwiperFlatList from 'react-native-swiper-flatlist';

import Geocoder from 'react-native-geocoding';
import * as key from '../../component/KeyGG'
const GOOGLE_MAPS_API_KEY = key.KEY_GOOGLE;
import Geolocation from '@react-native-community/geolocation';

const imageCancel = '../../image/cancel.png'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const gridLayoutWidth = (SCREEN_WIDTH - 50) / 3
const gridLayoutHeight = 200

const imageTaxi = '../../image/imagetaxi.png'
const imageRental = '../../image/imagerental.png'
const imageCarShare = '../../image/imagecarshare.png'
const imageDriver = '../../image/imagedriver.png'
const imageTravel = '../../image/imagetravel.png'
const imageCombo = '../../image/imagecombo.png'
const imageExpress = '../../image/imageexpress.png'
const imageTruck = '../../image/imagetruck.png'
const imageFood = '../../image/imagefood.png'

class Home1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listItem: [
                { name: 'Đặt xe có lái', image: 1 },
                { name: 'Thuê xe tự lái', image: 2 },
                // { name: 'Đi chung xe', image: 3 },
                { name: 'Thuê tài xế', image: 4 },
                { name: 'Thuê xe du lịch', image: 5 },
                // { name: 'Combo du lịch', image: 6 },
                { name: 'Vận chuyển hàng hóa', image: 7 },
                { name: 'Thuê xe taxi tải', image: 8 },
                // { name: 'Giao thực phẩm', image: 9 }
                { name: 'Đặt xe đi luôn', image: 10 }
            ],
            dataNewPaper: [],
            isLoadingNewPaper: true,
            dataInteresting: [],
            isLoadingInteresting: true,
            modalWebView: false,
            titleModal: null,
            urlWebView: null,
        }
    }

    componentDidMount() {
        this.getLocation()
        this.callApiInteresting()
        this.callApiNewPaper()
        this._retrieveData()
    }


    getLocation = () => {
        var data;
        Geolocation.getCurrentPosition(
            position => {
                Geocoder.init(GOOGLE_MAPS_API_KEY);
                Geocoder.from(position.coords.latitude, position.coords.longitude)
                    .then(json => {
                        var addressLocation = json.results[0].formatted_address;
                        var addressLocationComponent = json.results[0];
                        var lat = json.results[0].geometry.location.lat;
                        var lng = json.results[0].geometry.location.lng;
                        this.props.addLocation(addressLocation, addressLocationComponent, lat, lng)
                        console.log('addressLocation: ' + addressLocation)
                        console.log('addressLocationComponent: ' + JSON.stringify(addressLocationComponent))
                        console.log('lat: ' + lat)
                        console.log('lng: ' + lng)
                    })
                    .catch(error => console.warn(error));
            },
            error => { console.log(error) },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
        );
    };

    _retrieveData = async () => {
        try {
            const dataLogin = await AsyncStorage.getItem('dataLogin')
            if (dataLogin !== null) {
                let json = JSON.parse(dataLogin)
                this.props.addUser(json.username, '123', 1)
                this.props.addToken(json.token)
            } else {
                this.props.addUser(json.username, 'json.avatar', 0)
                this.props.addToken('')
            }
        } catch (error) {
            console.log(error)
        }
    };

    async callApiNewPaper() {
        const url = link.URL_REALASE + `wp-json/wp/v2/posts?_embed=1&per_page=5&tags=79`

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
        });
        const jsonRes = await res.json();
        return this.setState({
            dataNewPaper: jsonRes,
            isLoadingNewPaper: false
        });
    }

    async callApiInteresting() {
        const url = link.URL_REALASE + `wp-json/wp/v2/posts?_embed=1&per_page=5&tags=95`

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
        });
        const jsonRes = await res.json();
        return this.setState({
            dataInteresting: jsonRes,
            isLoadingInteresting: false
        });
    }

    gotoHomeScreen = () => {
        this.props.navigation.navigate('Home')
    }

    formWebView() {
        var url = this.state.urlWebView
        var title = this.state.titleModal
        return (
            <Modal
                visible={this.state.modalWebView}
                onRequestClose={this.handleBackPress}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', height: 60, borderBottomWidth: 1, borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
                        <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 'bold', }}>{title}</Text>
                        <TouchableOpacity
                            onPress={() => { this.setState({ modalWebView: false }) }}
                        >
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require(imageCancel)}
                            />
                        </TouchableOpacity>
                    </View>

                    <WebView
                        source={{ uri: url }}
                        style={{ marginTop: -60, height: SCREEN_HEIGHT }}
                        onMessage={this.onMessage}
                    />

                </SafeAreaView>
            </Modal>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
                <Header
                    onPressLeft={() => { this.props.navigation.openDrawer() }}
                    onPressCenter={this.gotoHomeScreen}
                />
                <ScrollView>
                    <View style={{ backgroundColor: '#00363d', minHeight: 40, flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 44, color: '#fff', fontSize: 16, fontWeight: 'bold', lineHeight: 30 }}>Trải nghiệm ngay hệ sinh thái vận chuyển toàn quốc hàng đầu Việt Nam</Text>
                    </View>
                    <FlatGrid
                        spacing={10}
                        style={styles.gridView}
                        itemDimension={gridLayoutWidth}
                        data={this.state.listItem}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => {
                                    item.image === 1 ? this.props.navigation.navigate('MapDiChung') :
                                        item.image === 2 ? this.props.navigation.navigate('MapChungXe') :
                                            item.image === 3 ? this.props.navigation.navigate('MapDiChung') :
                                                item.image === 4 ? this.props.navigation.navigate('MapXeChung') :
                                                    item.image === 5 ? this.props.navigation.navigate('MapTravel') :
                                                        item.image === 6 ? this.props.navigation.navigate('MapTravel') :
                                                            item.image === 7 ? this.props.navigation.navigate('MapExpress') :
                                                                item.image === 8 ? this.props.navigation.navigate('MapTruck') :
                                                                    item.image === 9 ? this.props.navigation.navigate('MapFood') :
                                                                        this.props.navigation.navigate('Map')
                                }}
                            >
                                <Image
                                    style={{ width: 54, height: 54 }}
                                    source={
                                        item.image == 1 ? require(imageTaxi) :
                                            item.image == 2 ? require(imageRental) :
                                                item.image == 3 ? require(imageCarShare) :
                                                    item.image == 4 ? require(imageDriver) :
                                                        item.image == 5 ? require(imageTravel) :
                                                            item.image == 6 ? require(imageCombo) :
                                                                item.image == 7 ? require(imageExpress) :
                                                                    item.image == 8 ? require(imageTruck) :
                                                                        require(imageFood)}
                                    resizeMode='contain'
                                />
                                <Text style={styles.itemName}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <Detail />

                    {this.state.isLoadingNewPaper ? null :
                        <View style={{ height: Dimensions.get('window').width / 2 + 24, marginHorizontal: 16, }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 8 }}>Báo chí</Text>
                            <SwiperFlatList
                                autoplay={true}
                                autoplayDelay={7}
                                autoplayLoop={true}
                                index={0}
                                data={this.state.dataNewPaper}
                                style={{ flexDirection: 'row' }}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.child}
                                            onPress={() => {
                                                // Linking.openURL(item.link)
                                                this.setState({
                                                    urlWebView: item.link,
                                                    modalWebView: true,
                                                    titleModal: item.title.rendered,
                                                })
                                            }}
                                        >
                                            <Image
                                                style={styles.imageChild}
                                                source={{ uri: item._embedded['wp:featuredmedia'][0].source_url }}
                                            />
                                            <Text style={styles.textTitle}>{item.title.rendered}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                    }

                    {this.state.isLoadingInteresting ? null :
                        <View style={{ height: Dimensions.get('window').width / 2 + 24, marginHorizontal: 16, }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 8 }}>Nội dung hấp đẫn</Text>
                            <SwiperFlatList
                                autoplay={true}
                                autoplayDelay={7}
                                autoplayLoop={true}
                                index={0}
                                data={this.state.dataInteresting}
                                style={{ flexDirection: 'row' }}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={[styles.child, { alignItems: 'center' }]}>
                                            <TouchableOpacity
                                                style={styles.child}
                                                onPress={() => {
                                                    // Linking.openURL(item.link)
                                                    this.setState({
                                                        urlWebView: item.link,
                                                        modalWebView: true,
                                                        titleModal: item.title.rendered,
                                                    })
                                                }}
                                            >
                                                <Image
                                                    style={styles.imageChild}
                                                    source={{ uri: item._embedded['wp:featuredmedia'][0].source_url }}
                                                />
                                                <Text style={styles.textTitle}>{item.title.rendered}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    }

                    {this.state.isLoadingInteresting || this.state.isLoadingNewPaper ? <ActivityIndicator /> : null}

                    {this.formWebView()}

                </ScrollView>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    gridView: {
        flex: 1,
        marginTop: -38
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 2,
        height: 120,
        width: gridLayoutWidth,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5

    },
    itemName: {
        marginTop: 4,
        fontSize: 14,
        color: '#333333',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    itemImage: {
        fontWeight: '600',
        fontSize: 12,
        color: '#333333',
    },
    imageChild: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 4,
        width: Dimensions.get('window').width - 40,
        height: Dimensions.get('window').width / 2 - 20,
    },
    child: {
        height: Dimensions.get('window').width / 2 - 20,
        width: Dimensions.get('window').width - 40,
        marginHorizontal: 4,
        justifyContent: 'center',
    },
    textTitle: {
        marginVertical: 4,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#00363d'
    }
});


function mapStateToProps(state) {
    return {
        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
    }
}

export default connect(mapStateToProps, { addUser: addUser, addToken: addToken, addLocation: addLocation })(Home1)
