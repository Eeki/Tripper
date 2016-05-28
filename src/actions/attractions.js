import { TOGGLE_ATTRACTION, UPDATE_ATTRACTIONS } from './const'

export function toggleAttraction(id) {
  return {
    type: TOGGLE_ATTRACTION,
    id: id
  };
}

function updateAttractions(attractions) {
  return {
    type: UPDATE_ATTRACTIONS,
    attractions: attractions
  };
}

export function fetchCoordinates(sites) {
  return dispatch => {
    const geocodingEndpoint = "http://api.digitransit.fi/geocoding/v1/search";
    const sitesWithCoordinates = sites.map((site) => {
      const query = `${geocodingEndpoint}?text=${location.address}&size=1`
      return fetch(encodeURI(query))
        .then((response) => response.json())
        .then((json) => {
          const coordinates = json.features[0].geometry.coordinates;
          return Object.assign({}, site, {lat: coordinates[1], lon: coordinates[0]});
        }).catch((reason) => {
          console.log(reason);
          return site;
        });
    });
    Promise.all(sitesWithCoordinates).then((sites) => {
      dispatch(updateAttractions(sites));
    });
  };
}