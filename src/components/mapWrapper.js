/**
 * Created by eliel on 28/05/2016.
 */
import React, { Component } from 'react';
import Map from './map';
import OptionsBar from './optionsBar';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import HotelSelector from './hotelSelector';
class MapWrapper extends Component{


  render(){
    return (
      <div>
        <Map />
      </div>
    )
  }
}

export default MapWrapper;


/*
<div >
  <GridList
    cols={1}
    cellHeight={400}
    padding={0}
  >
    <GridTile>
      <Map />
    </GridTile>

    <GridTile>
      <OptionsBar />
    </GridTile>

  </GridList>
</div>*/
