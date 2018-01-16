import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React, { Component } from 'react';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import storage from 'redux-persist/es/storage';
import Reducers from './reducers';
import App from './App';

const config = {
    key: 'root',
    storage,
};

const reducer = persistCombineReducers(config, Reducers);

const store = createStore(reducer);
const persistor = persistStore(store);

class MyApp extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        );
    }
}

export default MyApp;
