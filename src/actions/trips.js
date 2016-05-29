import graphql from 'graphql-client'

import { ATTRACTION, HOTEL, TRIP_ROUTE_START, TRIP_ROUTE_FAILURE, TRIP_ROUTE_SUCCESS } from './const'

function setTrips(trips) {
  return {
    type: TRIP_ROUTE_SUCCESS,
    trips: trips
  }
}
function query(from, to) {
  return `{
    plan(
      from: {lat: ${from.coords.lat}, lon: ${from.coords.lon}},
      to: {lat: ${to.coords.lat}, lon: ${to.coords.lon}},
      date: "2016-05-30",
      time: "12:00:00",
      numItineraries: 1,
      modes: "WALK,RAIL,BUS,FERRY"
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
    }
  }`;
}

export function fetchTrips(attractions, hotels) {
  const hslGQLEndPoint = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";
  const client = graphql({url: hslGQLEndPoint});
  return dispatch => {
    const attractionMatrix = attractions.map((a1) => {
      return attractions.map((a2) => {
        if (a1 != a2) {
          return client.query(query(a1, a2))
            .then((result) => {
              return {
                start: {
                  type: ATTRACTION,
                  id: a1.id
                },
                end: {
                  type: ATTRACTION,
                  id: a2.id
                },
                data: result.data.plan.itineraries
              };
            });
        }
      }).filter(a => a);
    });

    const fromHotelMatrix = attractions.map((a) => {
      return hotels.map((h) => client.query(query(a, h))
          .then((result) => {
            return {
              start: {
                type: ATTRACTION,
                id: a.id
              },
              end: {
                type: HOTEL,
                id: h.id
              },
              data: result.data.plan.itineraries
            };
          })
      )
    });
    const toHotelMatrix = attractions.map((a) => {
      return hotels.map((h) => client.query(query(h, a))
          .then((result) => {
            return {
              start: {
                type: HOTEL,
                id: h.id
              },
              end: {
                type: ATTRACTION,
                id: a.id
              },
              data: result.data.plan.itineraries
            };
          })
      )
    });
    const attractionTrips = [].concat.apply([], attractionMatrix);
    const fromHotelTrips = [].concat.apply([], fromHotelMatrix);
    const toHotelTrips = [].concat.apply([], toHotelMatrix);
    const allPossibleTrips = attractionTrips.concat(fromHotelTrips, toHotelTrips);

    Promise.all(allPossibleTrips).then((trips) => {
      return dispatch(setTrips(trips));
    });
  }
}