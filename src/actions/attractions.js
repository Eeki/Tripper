import { TOGGLE_ATTRACTION } from './const'

export const toggleAttraction = (id) => {
  return {
    type: TOGGLE_ATTRACTION,
    id: id
  };
}