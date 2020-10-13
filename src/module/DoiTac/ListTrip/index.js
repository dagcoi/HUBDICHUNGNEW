import React, { Component } from 'react'
import { SafeAreaView, View, ScrollView, FlatList, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux';
import Header from '../../../component/Header/HeaderImage';
import * as link from '../../../URL'
import ItemDiChungTaxi from './ItemDichungTaxi'
import ItemRideShare from './ItemRideShare'
import ItemChungXe from './ItemChungXe'
import { NavigationEvents } from 'react-navigation';
class ListTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTrip: null,
            isLoading: true,
            refreshing: false,
        }
    }

    componentDidMount() {
        this.getListTrip()
    }

    getListTrip() {
        url = link.URL_API_PORTAL + `product/v1/user/products?limit=20&offset=0`
        fetch(url, {
            method: 'GET',
            token: this.props.token,
        })
            .then(res => res.json())
            .then(resJson => {
                this.setState({
                    listTrip: resJson.data,
                    isLoading: false,
                })
                console.log(resJson.data)
            })
    }

    renderListTrip() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator
                    style={{ marginTop: 8 }}
                    size='large'
                />
            )
        } else {
            return (
                <View>
                    <FlatList
                        data={this.state.listTrip}
                        renderItem={({ item, index }) => {
                            if (item) {
                                if (item.type == 'ride_share') {
                                    return (
                                        <ItemRideShare item={item} onPress={() => this.onPressItem(item)} />
                                    )
                                } else if (item.type == 'hourly_car_rental') {
                                    return (
                                        <ItemChungXe item={item} onPress={() => this.onPressItem(item)} />
                                    )
                                } else {
                                    return (
                                        <ItemDiChungTaxi item={item} onPress={() => this.onPressItem(item)} />
                                    )
                                }
                            } else {
                                console.log('qqqq')
                            }
                        }}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.getListTrip()}
                        keyExtractor={item => item.minute} />

                </View>
            )
        }
    }

    onPressItem(item) {
        this.props.navigation.navigate('DetailTicketPartner', {
            code: item._id
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header onPressLeft={this.goBack} />
                <NavigationEvents
                    onDidFocus={() => this.getListTrip()}
                />
                <View style={{ flex: 1 }}>
                    {this.renderListTrip()}
                </View>
            </SafeAreaView>
        )
    }

    goBack = () => {
        this.props.navigation.openDrawer()
    }

}

function mapStateToProps(state) {
    return {
        token: state.thongtin.token,
    }
}

export default connect(mapStateToProps)(ListTrip)