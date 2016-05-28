import { attractions } from '../../data/attractions'
import { TOGGLE_ATTRACTION } from '../actions/const'

const INIT_ATTRACTIONS = 'INIT_ATTRACTIONS';

export const attractionsReducer = (state = attractions, action = INIT_ATTRACTIONS) => {

  switch (action.type) {
    case TOGGLE_ATTRACTION:
      return state.map((attraction) => {
        if (attraction.id === action.id) {
          return Object.assign({}, attraction, {
            selected: !attraction.selected
          });
        } else {
          return attraction;
        }
      });
    default:
      if (state[0].selected === undefined) {
        return state.map((attraction, index) => {
          return Object.assign({}, attraction, {
            id: index,
            selected: false
          });
        });
      } else {
        return state;
      }
  }
}