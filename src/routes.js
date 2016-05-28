import React from 'react';
import  { Route, IndexRoute } from 'react-router';
import App from './components/app';
import InfoForm from './components/form/infoForm';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={InfoForm} />
    <Route path="infoForm" component={InfoForm} />
  </Route>
);

