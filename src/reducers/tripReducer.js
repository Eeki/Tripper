import { OPTIMIZE_TRIP } from '../actions/const'

const initialState = [
  {
    time: 300,
    journey: [
      {
        start: {
          type: HOTEL,
          id: 2
        },
        days: [
          itineraries: [
            {
              goal: {
                type: ATTRACTION,
                id: 21
              }
              legs: [
                {
                  startTime: 1464426014000,
                  endTime: 1464426370000,
                  geometry: "_tlnJm`fwC_@NOF@L@H@PFfADhC@TT|DBh@?BFdAJvADp@Dt@HtA?DDr@@H@FJrB@D???B?DBVB\\D|@FfATI"
                },
                {
                  startTime: 1464426014000,
                  endTime: 1464426370000,
                  geometry: "_tlnJm`fwC_@NOF@L@H@PFfADhC@TT|DBh@?BFdAJvADp@Dt@HtA?DDr@@H@FJrB@D???B?DBVB\\D|@FfATI"
                }
              ]
            },
            goal: {
              type: LUNCH,
              time: 45
            }
          ]
        ]
      }
    ]
  },
  {
    time: 150,
    journey: {
      start: {
        type: HOTEL,
        id: 3
      },
      days: [
        itineraries: [
          goal: {
            type: ATTRACTION,
            id: 42
          }
          // legs is undefined
        ]
      ]
    }
  }
]

export const tripReducer = (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
