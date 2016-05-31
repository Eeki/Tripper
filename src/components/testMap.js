import React, { Component } from 'react';
import { routesMockData } from '../../data/routesMock';

export default class TestMap extends Component {

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
    
    this.map.on("load", () => {

      let routes = {
        "type": "FeatureCollection",
        "features": []
      };

      routesMockData.map( (route) => {
        const feature = {
          "type" : "Feature",
          "properties": {"mode" : route.mode},
          "geometry" : {
            "type": "LineString",
            "coordinates" : route.coordinates
          }
        };
        routes.features.push(feature)
      });

      this.map.addSource("routes", {
        "type": "geojson",
        "data": routes
      });

      const layers =[
        {mode:"WALK", color:"#000"},
        {mode:"BUS", color:"#007ac9"}
      ];
      
      layers.map((layer, i)=>{
        console.log("layer:",layer),
        console.log("i",i);

        this.map.addLayer({
          "id": "route-" + i,
          "type": "line",
          "source": "routes",
          "layout": {
            "line-join": "round",
            "line-cap": "round"
          },
          "paint": {
            "line-color": layer.color,
            "line-width": 2
          }
        });
        this.map.setFilter("route-" + i, ['==', 'mode', layer.mode])
      });
      
    })



  }

  render(){
    return(
      <div>
        <div id='map'></div>
      </div>
    )
  }
}