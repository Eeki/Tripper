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
          "line-width": 8
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
    const fakeRoutes = [
      {geometry: "_p~iF~ps|U_ulLnnqC_mqNvxq`@"},
      {geometry: "khnnJulbwCADe@~@Ip@"}
    ];
    
      fakeRoutes.map(function(route) {
      console.log("route",route)
      const feature = {
        "type": "Feature",
        "properties": {
          "stroke": "#f90000",
          "stroke-width": 6,
          "stroke-opacity": 1
        },
        "geometry": {
          "type": "LineString",
          "coordinates": polyline.decode(route.geometry)
        }
      };
      routes.features.push(feature);
    })
    console.log("routes", routes)
  }

  loadSelectedAttractions(attractions) {
    //Oikeesti haetaan this.props.attractions jne...
    const fakeAttractions = [{lon:24.942432,lat:60.163694, selected: true}, {lon:24.952432,lat:60.173694, selected: true}];
    fakeAttractions.map((attraction) => {
      if(attraction.selected){
        const feature = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              attraction.lon,
              attraction.lat
            ]
          }
        };
        console.log(feature);
        attractions.features.push(feature);
      }
    });
  }

}

const mapStateToProps = (state) => {
  return {
    attractions: state.attractions
  };
};

export default connect(mapStateToProps)(Map);

