import initialAttractions from '../../data/attractions'
import { TOGGLE_ATTRACTION } from '../actions/const.js'

const INIT_ATTRACTIONS = 'INIT_ATTRACTIONS';

export const attractionsReducer = (attractions = initialAttractions, action = INIT_ATTRACTIONS) => {

  switch (action.type) {
    case TOGGLE_ATTRACTION:
      return attractions.map((attraction) => {
        if (attraction.id === action.id) {
          return Object.assign({}, attraction, {
            selected: !attraction.selected
          });
        } else {
          return attraction;
        }
      });
    default:
      return attractions().map((attraction, index) => {
        return Object.assign({}, attraction, {
          id: index
        });
      });
  }
}