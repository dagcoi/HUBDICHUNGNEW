import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, BackHandler, Alert, Image, Linking, Dimensions, ScrollView, SafeAreaView, AsyncStorage, Modal, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import WebView from 'react-native-webview';
import * as link from '../../URL'
import Header from '../../component/Header'
import SwiperFlatList from 'react-native-swiper-flatlist';
import SelectCar from './SelectCar'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { addUser, addToken } from '../../core/Redux/action/Action'

const imageCancel = '../../image/cancel.png'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPromotion: [],
            dataAttractivePlaces: [],
            isLoadingAttractivePlaces: true,
            isLoadingPromotion: true,
            visibleModal: false,
            openDrawer: false,
            detail: null,
            title: null,
            urlWebView: null,
            modalWebView: false,
            titleModal: null,
        }
        this.handleBackPress = this.handleBackPress.bind(this);
    }

    onSwipe(gestureName, gestureState) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_UP:
                console.log('Up')
                break;
            case SWIPE_DOWN:
                console.log('Down')
                break;
            case SWIPE_LEFT:
                console.log('Left')
                break;
            case SWIPE_RIGHT:
                console.log('Right')
                break;
        }
    }

    async componentDidMount() {
        this._retrieveData()
        this.callApiPromotion();
        this.callApiAttractivePlaces();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        if (Platform.OS === "android") {
            Linking.getInitialURL().then(url => {
                console.log('url is', url);
                this.navigate(url);
            });
        }
    }

    navigate = url => {
        const { navigate } = this.props.navigation;
        let regex = /^[a-z][a-z0-9_\.]{3,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;
        const route = url.replace(/.*?:\/\//g, '');
        console.log('route: ' + route)

        const id = route.match(/\/([^\/]+)\/?$/)[1];
        console.log('id: ' + id)

        const routeName = route.split("/")[0];
        if (id === "thue-xe-taxi") {
            navigate("MapDiChung");
        } if (id === "thue-lai-xe") {
            navigate("MapXeChung");
        } if (id === "thue-van-chuyen") {
            navigate("MapExpress");
        } if (id === "thue-xe-tu-lai-theo-km") {
            navigate("MapChungXe");
        }

        console.log('routeName' + routeName)
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    _retrieveData = async () => {
        try {
            const dataLogin = await AsyncStorage.getItem('dataLogin')
            if (dataLogin !== null) {
                let json = JSON.parse(dataLogin)
                console.log(json.username)
                this.props.addUser(json.username, '123', 1)
                this.props.addToken(json.token)
                console.log(json.token)
                console.log(dataLogin)
            } else {
                this.props.addUser(json.username, 'json.avatar', 0)
                this.props.addToken('')
            }
        } catch (error) {
            console.log(error)
        }
    };

    handleBackPress = () => {
        var { modalWebView } = this.state
        console.log(modalWebView)
        if (modalWebView) {
            this.setState({ modalWebView: false })
            return true;
        } else {
            Alert.alert(
                'Thoát',
                'Bạn muốn thoát khỏi chương trình ứng dụng?',
                [
                    { text: 'Không', style: 'cancel' },
                    { text: 'Thoát', onPress: () => { BackHandler.exitApp() } }
                ]
            );
            return true;
        }
    }

    async callApiPromotion() {
        const url = link.URL_REALASE + `wp-json/wp/v2/posts?_embed=1&per_page=5&tags=52`

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
        });
        const jsonRes = await res.json();
        // console.log(jsonRes);
        // console.log('qqq')
        return this.setState({
            dataPromotion: jsonRes,
            isLoadingPromotion: false
        });
    }

    async callApiAttractivePlaces() {
        const url = link.URL_REALASE + `wp-json/wp/v2/posts?_embed=1&per_page=5&tags=56`

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
        });
        const jsonRes = await res.json();
        // console.log(jsonRes);
        return this.setState({
            dataAttractivePlaces: jsonRes,
            isLoadingAttractivePlaces: false
        });
    }

    onMessage({ nativeEvent }) {
        const data = nativeEvent.data;
        if (data !== undefined && data !== null) {
            Linking.openURL(data);
        }
    }

    formWebView() {
        var url = this.state.urlWebView
        var title = this.state.titleModal
        return (
            <Modal
                visible={this.state.modalWebView}
                onRequestClose={this.handleBackPress}
            >
                <View style={{ flex: 1 }}>
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
                    // renderLoading={() => { return (<ActivityIndicator style = {{position: 'absolute',left: 0,right: 0, top: 0,bottom: 0,alignItems: 'center',justifyContent: 'center'}} />)}}
                    // ref={(webView) => { this.webView.ref = webView; }}
                    // onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
                    // onLoadEnd = {true}
                    // dataDetectorTypes={'phoneNumber'}
                    />

                </View>
            </Modal>
        )
    }

    gotoHomeScreen = () =>{
        this.props.navigation.navigate('Home')
    }


    render() {
        // if (this.state.isLoadingAttractivePlaces || this.state.isLoadingPromotion) {
        //     return (
        //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00363e' }}>
        //             <Image
        //                 style={{ height: 150, width: 150, marginLeft: 8 }}
        //                 source={require('../../image/icon.png')}
        //             />
        //             {(process.env.NODE_ENV === 'development') ? <View>
        //                 <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
        //                     Bản Dev
        //                 </Text>
        //             </View> : null}
        //         </View>
        //     )
        // }
        return (
            <SafeAreaView
                // onSwipe={this.onSwipe}
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff'
                }}>
                <Header
                    onPressLeft={() => { this.props.navigation.openDrawer() }}
                    onPressCenter={this.gotoHomeScreen}
                />
                <View style={styles.all}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ minHeight: 48, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Chào! Hãy cùng tìm một chuyến đi.</Text>
                        </View>
                        <SelectCar
                            backgroundColor={'#fff'}
                            onPress={() => { this.props.navigation.push("MapDiChung") }}
                            source={require('../../image/logodichung.png')}
                            title={'Đặt xe có lái'}
                            textDetail={'Đặt xe sân bay, đường dài giá tiết kiệm'}
                        />

                        <SelectCar
                            backgroundColor={'#fff'}
                            onPress={() => { this.props.navigation.push("MapChungXe") }}
                            source={require('../../image/logochungxe.png')}
                            title={'Đặt xe tự lái'}
                            textDetail={'Mạng lưới cho thuê xe tự lái trên toàn quốc'}
                        />

                        <SelectCar
                            backgroundColor={'#fff'}
                            onPress={() => { this.props.navigation.push("MapXeChung") }}
                            source={require('../../image/logoxechung.png')}
                            title={'Thuê lái xe'}
                            textDetail={'Chuyên nghiệp, an toàn, tin cậy'}
                        />

                        <SelectCar
                            backgroundColor={'#fff'}
                            onPress={() => { this.props.navigation.push("MapExpress") }}
                            source={require('../../image/logoexpress.png')}
                            title={'Vận chuyển hàng hóa'}
                            textDetail={'Chuyên tuyến sân bay, liên tỉnh'}
                        />

                        {/* <SelectCar
                            backgroundColor={'#fff'}
                            onPress={() => { this.props.navigation.push("MapDiChungTuLai") }}
                            source={require('../../image/logochungxe.png')}
                            title={'Thuê xe tự lái'}
                            textDetail={'Thuê xe tự lái Đi chung'}
                        /> */}
                        {this.state.isLoadingPromotion ? null :
                            <View style={{ height: Dimensions.get('window').width / 2 + 8, backgroundColor: '#f9f9f9', marginBottom: 16, marginTop: 17 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Khuyến mãi</Text>
                                <SwiperFlatList
                                    autoplay={true}
                                    autoplayDelay={7}
                                    autoplayLoop={true}
                                    index={0}
                                    data={this.state.dataPromotion}
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
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                        }

                        {this.state.isLoadingAttractivePlaces ? null :
                            <View style={{ height: Dimensions.get('window').width / 2 + 8, backgroundColor: '#f9f9f9', marginBottom: 16 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Địa điểm hấp đẫn</Text>
                                <SwiperFlatList
                                    autoplay={true}
                                    autoplayDelay={5}
                                    autoplayLoop={true}
                                    index={0}
                                    data={this.state.dataAttractivePlaces}
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
                                                        source={{ uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url }}
                                                    />
                                                    <View style={{ position: 'absolute', top: -30, left: 8, right: 8, height: 300, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#fff', backgroundColor: '#00000033', padding: 4, borderRadius: 4, fontSize: 12, }}>{item.title.rendered}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }}
                                />
                            </View>}
                        {this.formWebView()}

                    </ScrollView>
                </View>

            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    all: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9'
    },
    textInput: {
        marginTop: 8,
        padding: 8,
        borderWidth: 0.5,
        borderRadius: 4,
        fontSize: 20,
        color: '#00363e'
    },
    child: {
        height: Dimensions.get('window').width / 2 - 20,
        width: Dimensions.get('window').width - 40,
        // paddingTop: 8,
        justifyContent: 'center',
    },
    bntSelectCar: {
        borderRadius: 4,
        borderColor: '#ffffff',
        height: 100,
        marginTop: 8,
    },
    imageChild: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 4,
        margin: 8,
    },
    textBig: {
        marginTop: 8,
        fontSize: 22,
        color: '#77a300'
    },
    buttonFake: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    text: {
        fontSize: 25,
        textAlign: 'center'
    }
})

function mapStateToProps(state) {
    return {
        drop_add: state.info.drop_add,
        pick_add: state.info.pick_add,
    }
}

export default connect(mapStateToProps, { addUser: addUser, addToken: addToken })(Home)
