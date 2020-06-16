/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, createRef } from 'react';
import { NavigationActions, } from 'react-navigation';

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
