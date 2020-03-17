/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import Router from './src/Router'
import { Provider } from 'react-redux'
import store from './src/core/Redux/store'
import firebase from 'react-native-firebase'
import { Platform, Vibration } from 'react-native'
import OfflineNotice from './src/component/OfflineNotice'

import { PushNotification } from './src/component/PushNotification'
import { View } from 'react-native';

class App extends Component {
  async componentDidMount() {
    // let url = firebase.links().getInitialLink();
    // console.log('incoming url', url);
    // PushNotification.configure()
    const enable = await firebase.messaging().hasPermission();
    const PATTERN = [100, 200, 300, 400, 500];
    firebase.messaging().subscribeToTopic("ALL");
    firebase.messaging().subscribeToTopic("HANOI");  // thêm device vào topics
    //firebase.messaging().unsubscribeFromTopic("HANOI");  // xóa device khỏi opics
    if (enable) {
      const fmcToken = await firebase.messaging().getToken()
      console.log('fmcToken', fmcToken);

      this.notificationListener = firebase.notifications().onNotification(notification => {
        const { title, body, data } = notification;
        console.log(notification)
        // xử lí khi nhận notifi
        Vibration.vibrate(PATTERN)
        if (Platform.OS === 'android') {
          const localNotifi = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true,
          })
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setSubtitle(notification.subtitle)
            .setBody(notification.body)
            .setData(notification.data)
            .android.setChannelId('ChannelId')
            .android.setSmallIcon('ic_stat_ic_notification')
            .android.setColor('#77a300')
            .android.setPriority(firebase.notifications.Android.Priority.Max)
          firebase.notifications()
            .displayNotification(localNotifi)
            .catch((error) => console.log(error));
        } else if (Platform.OS === 'ios') {
          const localNotifi = new firebase.notifications.Notification()
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setSubtitle(notification.subtitle)
            .setBody(notification.body)
            .setData(notification.data)
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
  }
  render() {
    const prefix = 'https://dichung.page.link/';
    return (
      <View style = {{flex : 1}}>
        {/* <OfflineNotice /> */}
        <Provider store={store}>
          <Router uriPrefix={prefix}/>
        </Provider>
      </View>
    );
  }


}
export default App;
