import React from 'react';
import  { Route, IndexRoute } from 'react-router';
import App from './components/app';

import FormWrapper from './components/form/formWrapper';
import MapWrapper from './components/mapWrapper';
import AttractionsForm from './components/form/attractionsForm';
export default (
  <Route path="/" component={App} >
    <IndexRoute component={FormWrapper} />
    <Route path="infoform" component={FormWrapper} />
    <Route path="attractionsform" component={AttractionsForm} />
    <Route path="map" component={MapWrapper} />
  </Route>
);