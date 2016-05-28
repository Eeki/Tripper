import { OPTIMIZE_START } from './const'
import { OPTIMIZE_SUCCESS } from './const'
import { OPTIMIZE_FAILURE } from './const'

import { TRIP_ROUTE_START } from './const'
import { TRIP_ROUTE_FAILURE } from './const'
import { TRIP_ROUTE_SUCCESS } from './const'


export const optimizeTrips = (hotels, attractions, startTime, endTime) => {
    return {
        type: OPTIMIZE_START,
        startedAt: Date.now()
    };
};

export const optimizeFailure = (reason) => {
    return {
        type: OPTIMIZE_FAILURE,
        reason: reason
    };
};

export const optimizeTripSuccess = (journeys) => {
    return {
        type: OPTIMIZE_SUCCESS,
        journeys: journes,
        completedAt: Date.now()
    }
}