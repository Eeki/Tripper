import { hotels } from '../../data/hotels'
import { CHANGE_HOTEL } from '../actions/const'

export const hotelsReducer = (state = hotels, action) => {
  switch (action.type) {
    case CHANGE_HOTEL:
      return state.map((hotel) => {
        if (hotel.id === action.id) {
          return Object.assign({}, hotel, {
            selected: true
          });
        } else if (hotel.selected) {
          return Object.assign({}, hotel, {
            selected: false
          });
        } else {
          return hotel;
        }
      });
    default:
      return state;
  }
};