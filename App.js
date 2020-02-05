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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }

  
}
export default App;
