import React from 'react';
import  { Route, IndexRoute } from 'react-router';
import App from './components/app';
import InfoForm from './components/form/infoForm';
import AttractionsForm from './components/form/attractionsForm';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={InfoForm} />
    <Route path="/infoForm" component={InfoForm} />
    <Route path="/attractionsForm" component={AttractionsForm} />
  </Route>
);

