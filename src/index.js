import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk'
import promise from 'redux-promise';

import reducers from './reducers';
import routes from './routes';
import { fetchCoordinates } from './actions/attractions'
import { updateAttractions } from './actions/attractions'
import { updateHotels } from './actions/hotels'

const firstStore = applyMiddleware(
  promise,
  thunkMiddleware
)(createStore);
const store = firstStore(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f);

store.dispatch(fetchCoordinates(store.getState().attractions, updateAttractions));


ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('#app-container')
);
