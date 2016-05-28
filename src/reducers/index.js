import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form'

import hotelData from './hotels';

const rootReducer = combineReducers({
  hotels: hotelData,
  form: formReducer
});

export default rootReducer;