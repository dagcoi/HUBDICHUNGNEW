import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, BackHandler, Alert, Image, Linking, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as link from '../../URL'
import Header from '../../component/Header'
import SwiperFlatList from 'react-native-swiper-flatlist';
import SelectCar from './SelectCar'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';


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
        }

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

    componentDidMount() {
        this.callApiPromotion();
        this.callApiAttractivePlaces();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress = () => {
        Alert.alert(
            'Thoát',
            'Bạn muốn thoát khỏi chương trình ứng dụng?',
            [
                { text: 'Không', style: 'cancel' },
                {
                    text: 'Thoát', onPress: () => {
                        BackHandler.exitApp()
                    }
                }
            ]
        );
        return true;
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


    render() {
        if (this.state.isLoadingAttractivePlaces || this.state.isLoadingPromotion) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00363e' }}>
                    <Image
                        style={{ height: 150, width: 150, marginLeft: 8 }}
                        source={require('../../image/icon.png')}
                    />
                    {(process.env.NODE_ENV === 'development') ? <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
                            Bản Dev
                        </Text>
                    </View> : null}
                </View>
            )
        }
        return (
            <GestureRecognizer
                // onSwipe={this.onSwipe}
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff'
                }}>
                <Header onPressLeft={() => { this.props.navigation.openDrawer() }} />

                <View style={styles.all}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={{ fontSize: 28, fontWeight: 'bold', }}>Chào! Hãy cùng tìm một chuyến đi. </Text>

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

                        <View style={{ height: Dimensions.get('window').width / 2 + 8, backgroundColor: '#ffffff', marginBottom: 16 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Khuyến mãi</Text>
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
                                                    Linking.openURL(item.link)
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

                        <View style={{ height: Dimensions.get('window').width / 2 + 8, backgroundColor: '#ffffff', marginBottom: 16 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Địa điểm hấp đẫn</Text>
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
                                                    Linking.openURL(item.link)
                                                }}
                                            >
                                                <Image
                                                    style={styles.imageChild}
                                                    source={{ uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url }}
                                                />
                                                <View style={{ position: 'absolute', top: -30, left: 8, right: 8, height: 300, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: '#fff', backgroundColor: '#00000033', padding: 4, borderRadius: 4, fontSize: 13, }}>{item.title.rendered}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>

            </GestureRecognizer>
        );
    }
}


const styles = StyleSheet.create({
    all: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8
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

export default connect()(Home)
