import { TRIP_ROUTE_SUCCESS, HOTEL, LUNCH, ATTRACTION } from '../actions/const'

// a list of journeys, one should contain fully optimized results (at some point, at least)
const initialState = [
  {
    duration: 300,
    start: {
      type: HOTEL,
      id: 2
    },
    days: [ // a day is a list of itienaries
      {
        itienaries: [
          {
            goal: {
              type: ATTRACTION,
              id: 21
            },
            legs: [
              {
                startTime: 1464426014000,
                endTime: 1464426370000,
                geometry: "_tlnJm`fwC_@NOF@L@H@PFfADhC@TT|DBh@?BFdAJvADp@Dt@HtA?DDr@@H@FJrB@D???B?DBVB\\D|@FfATI",
                mode: "WALK"
              },
              {
                startTime: 1464426371000,
                endTime: 1464426014000,
                mode: "RAIL",
                legGeometry: {
                  points: "splnJgydwC|iDyp@"
                }
              }
            ],
            duration: 1464426014000-1464426014000
          },
          {
            goal: {
              type: LUNCH,
            },
            duration: 100
          }
        ]
      }, // end day 1
      { // start day 2
        itienaries: [ // start day 2
          { // first itienary
            goal: {
              type: ATTRACTION,
              id: 21
            },
            legs: [
              {
                startTime: 1464430457000,
                endTime: 1464430799000,
                mode: "WALK",
                legGeometry: {
                  points: "eepnJeihvCP_AHJBOPRGb@CNCV?N@TBTmCr@uAf@VhFNrC@X?LEJXlF"
                }
              },
              {
                startTime: 1464430800000,
                endTime: 1464431160000,
                mode: "RAIL",
                legGeometry: {
                  points: "eipnJqngvCoHazDfFatN"
                }
              },
              {
                startTime: 1464431160000,
                endTime: 1464431240000,
                mode: "WALK",
                legGeometry: {
                  points: "mkpnJu~|vCU|@DF]tAYc@"
                }
              },
              {
                startTime: 1464431580000,
                endTime: 1464432720000,
                mode: "BUS",
                legGeometry: {
                  points: "{mpnJiz|vCW_@KGYc@_DuFGMwCeF]c@][s@g@a@UwBa@wCm@iBa@i@W{Au@e@YGGOQEGMW@K@UCSEKGGICEBWSi@_@i@YUWi@u@e@_Ay@kBi@wAg@eBCc@yAmI[yBUeBw@kGAKC]DKBQ?M?QEOCKIIGAIBG]AEAIWoB]gCAGKu@Os@UuAOq@Sy@qD}Wk@cEKw@aBuLe@sDE_@mAcIMy@GYGYAMMc@c@uAAGGc@GSY{@IWUm@_AyBMYKMQIe@}@c@}@wCeGIS{@gBYk@oAkCKWQg@Ig@Ga@Gg@Ei@Ci@CsAAaBCwHCyC?Q?q@?a@B[?y@?O?S@U@A@A?C@A@C?A?CJSFKb@e@HGp@u@hAkAnC{Cf@k@HIj@s@LQHOf@{@HMLUJSFQTq@LWVm@P[DIDMNi@\\gBFWrAuGH]Hc@XoAJi@Jk@Ju@J_AH}@JkADmABc@@]BgA@uABuB@iA?_@AmAAqACoACiAC{ACi@EmAOuCKcBO{AYsC]iDCKASe@eDU}Bo@mFIq@GkACSg@uDEYKo@]yBCQOy@_@wAeAiHiAqIAUM{@CMC[AM@EBI@M?IAMCKCGEEECE@GBEFAFCL?L?JBJBHBDBDF@DABCDG@EBIFMPQl@y@LQP_@HO@QBGDGN[pBiELSLWHOHK~CkFHKHMFKz@wABGLQj@w@FCFKDEPSDBFADEBE@I@I?INk@Rm@He@BGJWHS|AsDRO`A_CB_@Xm@h@kAMi@EQMWMOKGO?KBMHQTGDOLG@KCMOUe@Wm@M]]{@Se@c@cAeCaGyCmHMYM]]y@Ma@Mc@Kg@OeAMgAIu@KyAEeAEaACoAAY?qA@mABaBHmCToKJqEBiB@qB@_B?aCIsLKuOAeAAwDKqMEyC?{A@uA@yADyAJwCRkC?Ed@yET}AZkBVcARu@Rs@L[JYTk@Vo@^y@zDgIjA_CBGHQHSFOGNIRHSFO`@gAr@mCTaAZsA\\cBPcAFa@N}AL{@Ry@~@kDdBgGNi@Pm@BQ@M@O?_@?[?SCe@Ec@O[uAeBqA}AWa@Uk@Ke@C_@?W@a@@QNoBHoA"
                }
              },
              {
                startTime: 1464432721000,
                endTime: 1464432922000,
                mode: "WALK",
                legGeometry: {
                  points: "cbrnJwetwCFq@Dm@GKKOAAKEA?a@yBUISk@GAGAY@E@EBA?IDMHAAQCWK][I_@"
                }
              }
            ], // end legs
            duration: 1464432922000-1464430457000
          } // end itienary
        ]
      }
    ] // end days
  }, // end hotel, or trip
  {
    duration: 150,
    start: {
      type: HOTEL,
      id: 3
    },
    days: [
      {
        itienaries: [
          { // itienary
            goal: {
              type: ATTRACTION,
              id: 42
            },
            duration: 11
          },
          {
            goal: {
              type: HOTEL,
              id: 66
            },
            duration: 10
          },
          {
            goal: {
              type: LUNCH,
              time: 45
            },
            duration: 10
          }
        ]
      },
      {
        itienaries: [
          {
            goal: {
              type: ATTRACTION,
              id: 32
            },
            duration: 10
          },
          {
            goal: {
              type: HOTEL,
              id: 66
            },
            duration: 10
          }
        ]
      }
    ]
  }
];


export const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRIP_ROUTE_SUCCESS:
      return action.trips;
    default:
      return state;
  }
}

const hotelTripsMock = [
  {
    hotelId: 19,
    duration: 150,
    days: [
      [2, 5, 1],
      [3, 6]
    ]
  },
  {
    hotelId: 3,
    duration: 150,
    days: [
      [6, 1],
      [3, 5],
      [2]
    ]
  }
]

export const hotelTripReducer = (state = hotelTripsMock, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
