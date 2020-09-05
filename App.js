/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import Navigator from './src/Router'
import { Provider } from 'react-redux'
import store from './src/core/Redux/store'
import { SafeAreaView, StatusBar } from 'react-native'
import NavigationService from './src/service/NavigationService'

// import * as RootNavigation from "./src/service/RootNavigation";
// import { navigationRef } from "./src/service/RootNavigation";




class App extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={'#00000000'} translucent={false} />
        <SafeAreaView style={{ flex: 1 }}>
          <Provider store={store}>
            <Navigator ref={(navigationRef) => {
              NavigationService.setTopLevelNavigator(navigationRef)
            }} />
          </Provider>
        </SafeAreaView>
      </>
    );
  }
}
export default App;
