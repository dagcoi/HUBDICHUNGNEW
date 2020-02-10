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
// import firebase from 'react-native-firebase'
// import { Platform } from 'react-native'

import { PushNotification } from './src/component/PushNotification'

class App extends Component {
  async componentDidMount() {
    PushNotification.configure()
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
