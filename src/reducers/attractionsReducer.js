import { attractions } from '../../data/attractions'
import { TOGGLE_ATTRACTION, UPDATE_ATTRACTIONS } from '../actions/const'

export const attractionsReducer = (state = attractions, action) => {

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
    case UPDATE_ATTRACTIONS:
      return action.attractions;
    default:
      if (state[0].selected === undefined) {
        return state.map((attraction, index) => {
          return Object.assign({}, attraction, {
            id: "a" + index,
            selected: false
          });
        });
      } else {
        return state;
      }
  }
}