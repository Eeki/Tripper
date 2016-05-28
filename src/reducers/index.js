import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import { attractionsReducer } from './attractionsReducer'
import { tripReducer } from './tripReducer'
import hotels from '../../data/hotels';

const rootReducer = combineReducers({
  hotels: hotels,
  attractions: attractionsReducer,
  trips: tripReducer,
  form: formReducer
});

export default rootReducer;