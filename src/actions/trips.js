import graphql from 'graphql-client'
import Combinatorics from 'js-combinatorics'
import { OPTIMIZE_COMPLETE } from './const'

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
      dispatch(setTrips(trips));
      dispatch(setHotelTrips(optimize(trips)));
    });
  }
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function optimize(allTrips) {
  var attractionIds = allTrips.filter(t => t.start.type == ATTRACTION).map(t => t.start.id);
  attractionIds = attractionIds.filter(onlyUnique);
  var hotelIds = allTrips.filter(t => t.start.type == HOTEL).map(t => t.start.id);
  hotelIds = hotelIds.filter(onlyUnique);

  var durationsH2A = {};
  var durationsA2A = {};


  var h2ATrips = allTrips.filter(t => (t.start.type == HOTEL) && (t.end.type=ATTRACTION));
  var a2ATrips = allTrips.filter(t => (t.start.type == ATTRACTION) && (t.end.type=ATTRACTION));
  

  for (var trip of h2ATrips) {
    if (typeof durationsH2A[trip.start.id] == 'undefined') {
      durationsH2A[trip.start.id] = {};
    }
    durationsH2A[trip.start.id][trip.end.id] = trip.data[0].duration;
  }
  for (trip of a2ATrips) {
    if (typeof durationsA2A[trip.start.id] == 'undefined') {
      durationsA2A[trip.start.id] = {};
    }
    durationsA2A[trip.start.id][trip.end.id] = trip.data[0].duration;
  }

  var results = [];

  for (var hotelId of hotelIds) {
    // fix two days, to show off
    results.push(optimizeMultipleDaysHeuristic(hotelId, attractionIds, durationsH2A, durationsA2A, 2));
  }
  results.sort( function(a, b) {
    return a.duration - b.duration;
  });
  return results;
}

export function setHotelTrips(hotelTrips){
  return {
    type: OPTIMIZE_COMPLETE, // import from const
    hotelTrips: hotelTrips
  }
}

function optimizeMultipleDaysHeuristic(hotelId, attractionIds, durationsH2A, durationsA2A, nDays) {
  var nAttractionsPerDay = Math.trunc(attractionIds.length/nDays+1);
  // this is by far not optimized! (better approach would be to
  // first compute all the possible groupSplits with nDays
  // and then focus on
  var bestSoFar = {
    duration: Infinity,
    days: null,
    hotelId: hotelId
  };
  var attractionPermutations = Combinatorics.permutation(attractionIds).toArray();
  for (var permutation of attractionPermutations) {
    var dayOrders = [];
    var totAttractions = 0;
    while (totAttractions < attractionIds.length) {
      var untilAttractionIndex = Math.min(totAttractions+nAttractionsPerDay, permutation.length);
      var order = permutation.slice(totAttractions, untilAttractionIndex);
      dayOrders.push(order);
      totAttractions += nAttractionsPerDay;
    }
    var evaluatedDuration = 0;
    for (var attractionDayOrder of dayOrders) {
      evaluatedDuration += evaluateDayOrder(hotelId, attractionDayOrder, durationsH2A, durationsA2A);
    }
    if (evaluatedDuration < bestSoFar.duration) {
      bestSoFar.duration = evaluatedDuration;
      bestSoFar.days = dayOrders;
    }
    // console.log(permutation, dayOrders);
    // console.log("multiple duration", bestSoFar.duration);
  }
  return bestSoFar;
}

function evaluateDayOrder(hotelId, attractionsOrder, durationsH2A, durationsA2A) {
  var totDuration = 0;
  totDuration += durationsH2A[hotelId][attractionsOrder[0]];
  for (var i=0; i < attractionsOrder.length-1; i++) {
    var startLocId = attractionsOrder[i];
    var endLocId = attractionsOrder[i+1];
    // console.log(durationsA2A);
    totDuration += durationsA2A[startLocId][endLocId];
  }
  totDuration += durationsH2A[hotelId][attractionsOrder[attractionsOrder.length-1]];
  return totDuration
}