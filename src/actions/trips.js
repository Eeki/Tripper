import graphql from 'graphql-client'

import { TRIP_ROUTE_START, TRIP_ROUTE_FAILURE, TRIP_ROUTE_SUCCESS } from './const'

function setTrips(trips) {
  debugger;
  return {
    type: TRIP_ROUTE_SUCCESS,
    trips
  }
}

export function fetchTrips(attractions, hotels) {
  const hslGQLEndPoint = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";
  const client = graphql({url: hslGQLEndPoint});
  return dispatch => {
    debugger;
    const attractionMatrix = attractions.map((a1) => {
      attractions.map((a2) => {
        if (a1 != a2) {
          const query = `
            plan(
              from: {lat: ${a1.coords.lat}, lon: ${a1.coords.lon}},
              to: {lat: ${a2.coords.lat}, lon: ${a2.coords.lon}},
              date: '2016-05-30',
              time: '12:00:00',
              numItineraries: 1,
              modes: 'WALK,RAIL,BUS,FERRY'
            ) {
              itineraries {
                legs {
                  startTime
                  endTime
                  mode
                  legGeometry {
                      points
                  }
                }
                duration
              }
            }`;
          return client.query(query)
            .then((result) => result.data);
        }
      });
    });
    dispatch(setTrips(attractionMatrix));
  }
}