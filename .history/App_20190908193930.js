/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { GlobalNavigation } from './src/navigation/routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import AppReducer from './src/redux/reducers';

const store = createStore(AppReducer, {}, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      
    </Provider>
    <GlobalNavigation/>
  );
};

export default App;
