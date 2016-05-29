/**
 * Created by eliel on 28/05/2016.
 */

import React, { Component } from 'react';
import {connect} from "react-redux";
var polyline = require('polyline');


export default class Map extends Component {

  constructor(props) {
    super(props);

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
    let attractions = {
      "type": "FeatureCollection",
      "features": []
    };

    let routes = {
      "type": "FeatureCollection",
      "features": []
    };

    let hotelli = {
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
        "data": attractions
      });
      this.map.addSource("routes", {
        "type": "geojson",
        "data": routes
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
      
      this.loadSelectedAttractions(attractions);
      this.loadRoutes(routes);
    });

  }


  render() {
    return (
      <div id='map'></div>
    )
  }

  loadRoutes(routes) {
/*    const fakeRoutes = [
      {geometry: "_p~iF~ps|U_ulLnnqC_mqNvxq`@"},
      {geometry: "khnnJulbwCADe@~@Ip@"}
    ];*/
    
      this.props.trips.map(function(trip) {
        console.log("trip",trip);

        trip.data[0].legs.map(function(leg) {

          const polyLineArray = polyline.decode(leg.legGeometry.points)
          const reversepolyLineArray = [];
          polyLineArray.map(function(coords) {
            reversepolyLineArray.push([coords[1], coords[0]])
          });

          let color;
          console.log("leg.mode",leg.mode)

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
    })
  }

  loadSelectedAttractions(attractions) {
    //Oikeesti haetaan this.props.attractions jne...

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
        //console.log(feature);
        attractions.features.push(feature);
      }
    });
  }

}

const mapStateToProps = (state) => {
  return {
    attractions: state.attractions,
    trips: state.trips
  };
};

export default connect(mapStateToProps)(Map);

