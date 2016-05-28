import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form'

import hotels from '../../data/hotels';
import attractions from '../../data/attractions';

const rootReducer = combineReducers({
  hotels: hotels,
  attractions: attractions,
  form: formReducer
});

export default rootReducer;