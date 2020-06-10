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
import firebase, { messaging } from 'react-native-firebase'
import { Platform, Vibration } from 'react-native'
import OfflineNotice from './src/component/OfflineNotice'
import NavigationService from './src/service/NavigationService'
import { PushNotification } from './src/component/PushNotification'
import { View } from 'react-native';
import * as RootNavigation from "./src/service/RootNavigation";

class App extends Component {

  constructor(props) {
    super(props);
    this.onPressNotificacion = this.onPressNotificacion.bind(this); // you need this to use 'this' on 'onPressNotificacion'
    firebase.notifications().onNotificationOpened(this.onPressNotificacion);
    this.navigator = createRef()
    this.prefix = 'https://dichung.page.link/';
  }

  onPressNotificacion = () => {
    console.log('QWER')
    console.log(this.navigator)
    // this.navigator.navigate('ListBooking');
    NavigationActions.navigate('ListBooking');
  }

  async componentDidMount() {
    console.log(this.navigator)
    // let url = firebase.links().getInitialLink();
    // console.log('incoming url', url);
    // PushNotification.configure()
    const enable = await firebase.messaging().hasPermission();
    console.log('enable:........' + enable)
    const PATTERN = [100, 200, 300, 400, 500];
    firebase.messaging().subscribeToTopic("ALL");
    firebase.messaging().subscribeToTopic("HANOI");  // thêm device vào topics
    //firebase.messaging().unsubscribeFromTopic("HANOI");  // xóa device khỏi opics
    if (enable) {
      const fmcToken = await firebase.messaging().getToken()
      console.log('fmcToken', fmcToken);

      // cũ
      this.notificationListener = firebase.notifications().onNotification(notification => {
        const { title, body, data, click_action } = notification;
        console.log(notification)
        // xử lí khi nhận notifi hiện notifi ở mọi chế độ
        // const channelId = new firebase.notifications.Android.Channel("Default", "Default", firebase.notifications.Android.Importance.Max);
        // firebase.notifications().android.createChannel(channelId);

        Vibration.vibrate(PATTERN)
        if (Platform.OS === 'android') {

          const localNotifi = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true,
          })
            .setNotificationId(notification.notificationId)
            .setTitle(title)
            .setSubtitle(notification.subtitle)
            .setBody(body)
            .setData(data)
            .android.setClickAction(click_action)
            .android.setChannelId('ChannelId')
            .android.setSmallIcon('ic_stat_ic_notification')
            // .android.setClickAction(navigateBookingDetail)
            .android.setColor('#77a300')
            .android.setPriority(firebase.notifications.Android.Priority.Max)
          firebase.notifications()
            .displayNotification(localNotifi)
            .catch((error) => console.error(error));
        } else if (Platform.OS === 'ios') {
          const localNotifi = new firebase.notifications.Notification()
            .setNotificationId(notification.notificationId)
            .setTitle(title)
            .setSubtitle(notification.subtitle)
            .setBody(body)
            .setData(data)
            .ios.setBadge(notification.ios.badge);

          firebase.notifications()
            .displayNotification(localNotifi)
            .catch((error) => console.log(error));
        }
      })
    } else {
      try {
        firebase.messaging().requestPermission();
      }
      catch (e) {
        alert('use rejected the permissions');
      }
    }

    // click Notification from StatusBar
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      const notification = notificationOpen.notification;
      console.log('notificationOpenedListenernotificationOpenedListenernotificationOpenedListener : ', notification)
      if (notification.data && notification.data._id && notification.data.screen) {
        //todo
      }
      // notification.android.setChannelId(notification.notificationId)
    })

    // App close -> action open app
    firebase.notifications().getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          const notification = notificationOpen.notification;
          if (notification && notification.data && notification.data._id && notification.data.screen) {
            //todo            
          }
          // notification.android.setChannelId(notification.notificationId)
        }
      });

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
          <Navigator />
        </Provider>
      </View>
    );
  }


}
export default App;
