import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import promise from 'redux-promise';

const firstStore = applyMiddleware( promise )(createStore);
const finalStore = firstStore(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f);


ReactDOM.render(
  <Provider store={finalStore} >
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.app-container'));
