/**
 * Created by eliel on 28/05/2016.
 */

import React, { Component } from 'react';

export default class Map extends Component {

  componentDidMount() {
    //Setting up mapboxGl map
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWVraSIsImEiOiJjaW5kMXljMG0wMDUxd3pseWE3dnhmejYyIn0.dJu3Q0_7d37lXkRBvWLiow';
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/eeki/cio1636cn004cd8nvbc0bgwfb', //stylesheet location
      center: [24.942432, 60.163694], // starting position
      zoom: 11 // starting zoom
    });
  }

  render(){
    return(
      <div>
        <div id="map"></div>
      </div>
      )

  }
}