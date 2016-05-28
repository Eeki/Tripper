/**
 * Created by eliel on 28/05/2016.
 */
import React, { Component } from 'react';
import Map from './map';
import HotelSelector from './hotelSelector';
import HotelDrawer from './hotelDrawer';
class MapWrapper extends Component{


  render(){
    return (
      <div>
        <Map />
        <HotelDrawer />
      </div>
    )
  }
}

export default MapWrapper;
