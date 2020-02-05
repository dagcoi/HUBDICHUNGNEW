/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{ Component } from 'react';

import Router from './src/Router'
import { Provider } from 'react-redux'
import store from './src/core/Redux/store'
import firebase from 'react-native-firebase'

class App extends Component {
  async componentDidMount() {
    const enable = await firebase.messaging().hasPermission();
    if (enable) {
      const fmcToken = await firebase.messaging().getToken()
      console.log('fmcToken', fmcToken);

      firebase.notifications().onNotification(notification => {
        alert(notification.body)
        console.log(notification.body)
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
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }

  
}
export default App;
