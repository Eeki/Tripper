/**
 * Created by eliel on 28/05/2016.
 */

import React, { Component } from 'react';
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

      const layers =[
        {mode:"WALK", color:"#000"},
        {mode:"BUS", color:"#007ac9"},
        {mode:"TRAM", color:"#00985f"},
        {mode:"METRO", color:"#ff6319"},
        {mode:"FERRY", color:"#00b9e4"},
        {mode:"RAIL", color:"#8c4799"},
      ];

      layers.map((layer, i)=>{
        this.map.addLayer({
          "id": "route-"+i,
          "type": "line",
          "source": "routes",
          "layout": {
            "line-join": "round",
            "line-cap": "round"
          },
          "paint": {
            "line-color": layer.color,
            "line-width": 2
          },
          "filter": ['==', 'mode', layer.mode]
        });
        //this.map.setFilter("route-" + i, ['==', 'mode', layer.mode])
      });
      
      this.loadSelectedAttractions(this.attractions);
      this.loadRoutes(this.routes);
    });

  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    this.routes = {
      "type": "FeatureCollection",
      "features": []
    };
    this.attractions = {
      "type": "FeatureCollection",
      "features": []
    };
    
    this.loadSelectedAttractions(this.attractions);
    this.loadRoutes(this.routes);
  }

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
    const hotelIndex = 0; //<--Paras hotelli on ekana
    const tripPlan = [{id: this.props.hotelTrips[hotelIndex].hotelId, day: 0}];

    this.props.hotelTrips[hotelIndex].days.map( (day,i)=>{
      day.map((attraction)=>{
        tripPlan.push({id: attraction, day: i})
      });
      tripPlan.push({id: this.props.hotelTrips[hotelIndex].hotelId, day: i})
    });

    let polylinesEncoded = [];
    for(let i = 0; i<tripPlan.length-1; i++ ) {
      const start = tripPlan[i].id;
      const end = tripPlan[i+1].id;

      const filteredTrip = this.props.trips.filter(
        function(el) {
          return (el.start.id==start && el.end.id==end);
        }
      )[0];

      filteredTrip.data[0].legs.map(function (leg) {
          polylinesEncoded.push(
            {coords: polyline.decode(leg.legGeometry.points), mode: leg.mode, day:tripPlan[i].day}
          );
        })
    }

    polylinesEncoded.map((route)=>{
      const feature = {
        "type": "Feature",
        "properties": {
          "mode": route.mode,
          "day": route.day
        },
        "geometry": {
          "type": "LineString",
          "coordinates": this.reverseLatLonInArray(route.coords)
        }
      };
      routes.features.push(feature);
    });
    console.log(routes);
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

  //##########################//
  //    Helper functions      //
  //##########################//

  reverseLatLonInArray(array) {
    let reversed = [];
    array.map(function(coords) {
      reversed.push([coords[1], coords[0]])
    });
    return reversed;
  }

}

