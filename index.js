import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/reducers/';

import App from './App';
import {name as appName} from './app.json';

let store = createStore(Reducers, applyMiddleware(ReduxThunk));

const Index = () => 
  <Provider store={store}>
    <App />
  </Provider>;

AppRegistry.registerComponent(appName, () => Index);
