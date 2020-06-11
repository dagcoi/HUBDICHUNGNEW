/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, createRef } from 'react';
import { NavigationActions } from 'react-navigation';

import Navigator from './src/Router'
import { Provider } from 'react-redux'
import store from './src/core/Redux/store'
import { Platform, Vibration } from 'react-native'
import OfflineNotice from './src/component/OfflineNotice'
import NavigationService from './src/service/NavigationService'
import { PushNotification } from './src/component/PushNotification'
import { View } from 'react-native';
// import * as RootNavigation from "./src/service/RootNavigation";
// import { navigationRef } from "./src/service/RootNavigation";




class App extends Component {

  constructor(props) {
    super(props);
    this.onPressNotificacion = this.onPressNotificacion.bind(this); // you need this to use 'this' on 'onPressNotificacion'
    this.navigator = createRef()
  }

  onPressNotificacion = () => {
    console.log('QWER')
    console.log(this.props)
    console.log(this.navigator)
    console.log(NavigationActions)
    // this.props.navogatiom.navigate('ListBooking');
    NavigationService.navigate("ListBooking", {abc : '_id'});
    // this.navigate("ListBooking", null)
    // console.log(navigationRef.current)
    // RootNavigation.navigate("ListBooking")
  }

  navigate(routeName, params = {}) {
    console.log('navigate')
    return {
      type: NavigationActions.NAVIGATE,
      routeName,
      params
    }
  }

  async componentDidMount() {
    console.log(this.navigator)
    // console.log('incoming url', url);
    // PushNotification.configure()
    const PATTERN = [100, 200, 300, 400, 500];

  }

  navigateNotificationDetail = () => {
    // this.props.navigation.navigate('ListBooking')
    console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
    NavigationService.navigate("ListBooking", null);
  }

  getCurrentRoute() {
    let route = this._nav.current.state.nav

    while (route.routes) {
      route = route.routes[route.index]
    }

    return route.routeName
  }

  handleNavigationChange(prevState, newState, action) {
    console.log('handleNavigationChange', prevState, newState, action)
  }

  componentWillUnmount() {
    this.notificationListener();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <OfflineNotice /> */}
        <Provider store={store}>
          <Navigator ref={(navigationRef) => {
            NavigationService.setTopLevelNavigator(navigationRef)
          }} />
        </Provider>
      </View>
    );
  }


}
export default App;
