import React, { Component } from 'react';

export default class MapMurica extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWVraSIsImEiOiJjaW5kMXljMG0wMDUxd3pseWE3dnhmejYyIn0.dJu3Q0_7d37lXkRBvWLiow';
    const map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/eeki/ciouyp1ce003zdinouuohsu30' //stylesheet location
    });
    map.getCanvas().style.cursor = 'default';
    map.fitBounds([[-133.2421875, 16.972741], [-47.63671875, 52.696361]]);

    map.on('load', () => {
      const layers = ['0-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+'];


      layers.map((layer) => {
        var color = map.getPaintProperty(layer, 'fill-color');
        var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        var value = document.createElement('span');
        value.innerHTML = layer;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
      });

      map.on('mousemove', function (e) {
        var states = map.queryRenderedFeatures(e.point, {
          layers: layers
        });

        if (states.length > 0) {
          document.getElementById('pd').innerHTML = "<h3><strong>" + states[0].properties.name + "</strong></h3><p><strong><em>" + states[0].properties.density + "</strong> people per square mile</em></p>";
        } else {
          document.getElementById('pd').innerHTML = '<p>Hover over a state!</p>';
        }
      });
    });

  }

  render(){
    return(
      <div>
        <div id='map'></div>
        <div className='map-overlay' id='features'><h2>US population density</h2><div id='pd'><p>Hover over a state!</p></div></div>
        <div className='map-overlay' id='legend'></div>
      </div>
    )
  }
}