/**
 * Created by eliel on 28/05/2016.
 */
import React, { Component } from 'react';
import Map from './map';
import HotelSelector from './hotelSelector';


class MapWrapper extends Component{

  render(){
    return (
      <div>
        <Map />
        <HotelSelector />
      </div>
    )
  }
}

export default MapWrapper;
