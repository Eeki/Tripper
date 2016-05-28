import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import { attractionsReducer } from './attractionsReducer'
import hotels from '../../data/hotels';

const rootReducer = combineReducers({
  hotels: hotels,
  attractions: attractionsReducer,
  form: formReducer
});

export default rootReducer;