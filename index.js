/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import configuration from './src/store/reducer/Configuration';
import App from './App';
import {name as appName} from './app.json';

const store = configuration();

const RNapp = () => (
    <Provider store={store}>
        <App />
    </Provider>
)
AppRegistry.registerComponent(appName,() => RNapp);
