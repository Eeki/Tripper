import { CHANGE_HOTEL, UPDATE_HOTELS } from './const'

export function updateHotels(hotels) {
  return {
    type: UPDATE_HOTELS,
    hotels: hotels
  };
}

export function changeHotel(id) {
  return {
    type: CHANGE_HOTEL,
    id: id
  };
};