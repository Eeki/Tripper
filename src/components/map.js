/**
 * Created by eliel on 28/05/2016.
 */

import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router'
var polyline = require('polyline');


export default class Map extends Component {

  constructor(props) {
    super(props);
    this.attractions;
    this.routes;

    this.map;
  }

  componentDidMount() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZWVraSIsImEiOiJjaW5kMXljMG0wMDUxd3pseWE3dnhmejYyIn0.dJu3Q0_7d37lXkRBvWLiow';

    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/eeki/cio1636cn004cd8nvbc0bgwfb', //stylesheet location
      center: [24.942432, 60.163694], // starting position
      zoom: 11 // starting zoom
    });

    //##### GEOJSONS############//
    this.attractions = {
      "type": "FeatureCollection",
      "features": []
    };

    this.routes = {
      "type": "FeatureCollection",
      "features": []
    };

    let hotel = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": []
      }
    };

    
    //###########MAPONLOAD###########//
    this.map.on('load', () => {
      this.map.addSource('attractions', {
        "type": "geojson",
        "data": this.attractions
      });
      this.map.addSource("routes", {
        "type": "geojson",
        "data": this.routes
      });

      this.map.addLayer({
        "id": "attraction",
        "type": "circle",
        "source": "attractions",
        "paint": {
          'circle-radius': 5,
          'circle-color': '#000'
        }
      });

      this.map.addLayer({
        "id": "routes",
        "type": "line",
        "source": "routes",
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "#f90000",
          "line-width": 1
        }
      });
      
      this.loadSelectedAttractions(this.attractions);
      this.loadRoutes(this.routes);
    });

  }


 /* componentWillReceiveProps(nextProps) {
    console.log("nextProps",nextProps);
    if(nextProps.trips || nextProps.type == "FeatureCollection") {
      this.loadSelectedAttractions(this.attractions);
      this.loadRoutes(this.routes);
    }
  }*/




  render() {
    return (
      <div>
        <div className="navbar">
          <Link to="attractionsForm">Attractions</Link>
        </div>
        <div id='map'></div>
      </div>
    )
  }

  loadRoutes(routes) {


    if(this.props.hotelTrips){
      const hotelIndex = 0;
      const tripPlan = [this.props.hotelTrips[hotelIndex].hotelId];

      this.props.hotelTrips[hotelIndex].days.map( (day)=>{
        day.map((attractio)=>{
          tripPlan.push(attractio)
        });
        tripPlan.push(this.props.hotelTrips[hotelIndex].hotelId)
      });

      //console.log("tripPlan",tripPlan);

      let polylinesEncoded = [];
      for(let i = 0; i<tripPlan.length-1; i++ ) {
        const start = tripPlan[i];
        const end = tripPlan[i+1];
        const trip = this.props.trips.filter(
          function(el) {
            return (el.start.id==start && el.end.id==end);
          }
        )[0];

        if (trip.data == "undefined") {
          continue;
        }
        const legs = trip.data[0].legs;
        legs.map(
          function (leg) {
            polylinesEncoded.push(polyline.decode(leg.legGeometry.points));
            //console.log("AAAAAAAA",polyline.decode(leg.legGeometry.points))
          }
        )
      }
      polylinesEncoded = [].concat.apply([], polylinesEncoded);


      //console.log(polylinesEncoded);
      const reversepolyLineArray = [];
      polylinesEncoded.map(function(coords) {
        reversepolyLineArray.push([coords[1], coords[0]])
      });



      const feature = {
        "type": "Feature",
        "properties": {
          "stroke": "#f90000",
          "stroke-width": 1,
          "stroke-opacity": 1
        },
        "geometry": {
          "type": "LineString",
          "coordinates": reversepolyLineArray
        }
      }
      routes.features[0] = feature;
      console.log("routes",routes)


    }


      /*this.props.trips.map(function(trip) {
        //console.log("trip",trip);

        if(trip.data){
          trip.data[0].legs.map(function(leg) {

            const polyLineArray = polyline.decode(leg.legGeometry.points)
            const reversepolyLineArray = [];
            polyLineArray.map(function(coords) {
              reversepolyLineArray.push([coords[1], coords[0]])
            });

            let color;
            //console.log("leg.mode",leg.mode)

            switch (leg.mode) {
              case "WALK":
                color = "#000000";
                break;
              default:
                color = "#f90000";
                break;
            }

            const feature = {
              "type": "Feature",
              "properties": {
                "stroke": color,
                "stroke-width": 1,
                "stroke-opacity": 1
              },
              "geometry": {
                "type": "LineString",
                "coordinates": reversepolyLineArray
              }
            }
            routes.features.push(feature);
          });
        }
    })*/
  }

  loadSelectedAttractions(attractions) {
    this.props.attractions.map((attraction) => {
      if(attraction.selected){
        console.log("attraction");
        const feature = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              attraction.coords.lon,
              attraction.coords.lat
            ]
          }
        };
        attractions.features.push(feature);
      }
    });
  }

}

const mapStateToProps = (state) => {
  return {
    attractions: state.attractions,
    trips: state.trips,
    hotelTrips: state.hotelTrips
  };
};

export default connect(mapStateToProps)(Map);

