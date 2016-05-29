import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import { attractionsReducer } from './attractionsReducer'
import { hotelsReducer } from './hotelsReducer'
import { tripReducer, hotelTripsReducer } from './tripReducer'

const rootReducer = combineReducers({
  hotels: hotelsReducer,
  attractions: attractionsReducer,
  trips: tripReducer,
  hotelTrips: hotelTripsReducer,
  form: formReducer
});

export default rootReducer;