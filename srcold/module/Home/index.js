import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, BackHandler, Alert, Image, ActivityIndicator, Linking, Modal, Dimensions } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import HTML from 'react-native-render-html';
import * as link from '../../URL'
import Header from '../../component/Header'
import SwiperFlatList from 'react-native-swiper-flatlist';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPromotion: [],
            dataAttractivePlaces: [],
            isLoading: true,
            visibleModal: false,
            detail: null,
            title: null,
        }

    }

    componentDidMount() {
        this.callApiPromotion();
        this.callApiAttractivePlaces();
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
            // isLoading: false
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
            isLoading: false
        });
    }


    handleBackButtonClick = () => {
        Alert.alert(
            'Thoát',
            'Bạn muốn thoát ứng dụng?',
            [
                { text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Thoát', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false });
        return true;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00363e' }}>
                    <Image
                        style={{ height: 150, width: 150, marginLeft: 8 }}
                        source={require('../../image/icon.png')}
                    />
                </View>
            )
        }
        return (
            <GestureRecognizer
                onSwipe={this.onSwipe}
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
                        <View style={styles.bntSelectCar}>
                            <TouchableOpacity
                                style={{ flex: 1, flexDirection: 'row', }}
                                onPress={() => { this.props.navigation.push("MapDiChung") }}
                            >
                                <View style={{ flex: 2, justifyContent: 'center', backgroundColor: '#007aff', borderBottomLeftRadius: 8, borderTopLeftRadius: 8, alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 40, width: 70, margin: 8 }}
                                        source={require('../../image/taxi.png')}
                                    />
                                </View>
                                <View style={{ flex: 5, padding: 8, justifyContent: 'center', borderBottomEndRadius: 8, borderTopRightRadius: 8, backgroundColor: '#eeeeee' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Thuê xe taxi</Text>
                                    <Text>Thuê xe taxi siêu rẻ</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.bntSelectCar}>
                            <TouchableOpacity
                                style={{ flex: 1, flexDirection: 'row', }}
                                onPress={() => { this.props.navigation.push("MapChungXe") }}
                            >
                                <View style={{ flex: 2, justifyContent: 'center', backgroundColor: '#77a300', borderBottomLeftRadius: 8, borderTopLeftRadius: 8, alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 30, width: 70, margin: 8 }}
                                        source={require('../../image/car.png')}
                                    />
                                </View>
                                <View style={{ flex: 5, padding: 8, justifyContent: 'center', borderBottomEndRadius: 8, borderTopRightRadius: 8, backgroundColor: '#eeeeee' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Thuê xe tự lái</Text>
                                    <Text>Thuê xe tự lái</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: Dimensions.get('window').width / 2 + 8, backgroundColor: '#ffffff', }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Khuyến mãi</Text>
                            <SwiperFlatList
                                autoplay
                                autoplayDelay={7}
                                autoplayLoop
                                index={0}
                                data={this.state.dataPromotion}
                                showPagination
                                paginationDefaultColor='#fff'
                                paginationActiveColor='#00363e'
                                style={{ flexDirection: 'row' }}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={[styles.child,{alignItems : 'center'}]}>
                                            <TouchableOpacity
                                                style={styles.child}
                                                onPress={() => {
                                                    // console.log(item.link)
                                                    Linking.openURL(item.link)
                                                }}
                                            >
                                                <Image
                                                    style={styles.imageChild}
                                                    source={{ uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url }}
                                                />
                                                <View style={{ position: 'absolute', top: -110, left: 8, right: 8, height: 300, alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ backgroundColor: '#aaa', padding: 8, borderRadius: 8, }}>
                                                        <HTML
                                                            html={item.title.rendered}
                                                        />
                                                    </View>

                                                    {/* <Text style={{ color: '#fff', backgroundColor: '#00000033' }}>{item.title.rendered}</Text> */}

                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                            />
                        </View>

                        <View style={{ height: Dimensions.get('window').width / 2 + 8, backgroundColor: '#ffffff', marginBottom : 16 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Địa điểm hấp đẫn</Text>
                            <SwiperFlatList
                                autoplay={true}
                                autoplayDelay={4}
                                autoplayLoop={true}
                                index={0}
                                data={this.state.dataAttractivePlaces}
                                // showPagination
                                paginationDefaultColor='#fff'
                                paginationActiveColor='#00363e'
                                style={{ flexDirection: 'row' }}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={[styles.child,{alignItems : 'center'}]}>
                                            <TouchableOpacity
                                                style={styles.child}
                                                onPress={() => {
                                                    Linking.openURL(item.link)
                                                    // this.setState({
                                                    //     detail: item.content.rendered,
                                                    //     title: item.title.rendered,
                                                    //     visibleModal: true,
                                                    // })
                                                    // console.log(this.props.navigation.state.routeName)
                                                }}
                                            >
                                                <Image
                                                    style={styles.imageChild}
                                                    source={{ uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url }}
                                                />
                                                <View style={{ position: 'absolute', top: -30, left: 8, right: 8, height: 300, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: '#fff', backgroundColor: '#00000033', padding: 4, borderRadius: 8, fontSize: 13, }}>{item.title.rendered}</Text>
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
        borderWidth: 1,
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
        borderRadius: 6,
        borderColor: '#ffffff',
        height: 100,
        marginTop: 8,
    },
    imageChild: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 10,
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
