import { UPDATE_HOTELS } from './const'

export function updateHotels(hotels) {
  return {
    type: UPDATE_HOTELS,
    hotels: hotels
  };
}