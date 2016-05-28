import React from 'react';
import  { Route, IndexRoute } from 'react-router';
import App from './components/app';

import FormWrapper from './components/form/formWrapper';
import MapWrapper from './components/mapWrapper';
import AttractionsForm from './components/form/attractionsForm';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={FormWrapper} />
    <Route path="infoForm" component={FormWrapper} />
    <Route path="map" component={MapWrapper} />
    <Route path="/attractionsForm" component={AttractionsForm} />
  </Route>
);

