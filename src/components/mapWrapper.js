/**
 * Created by eliel on 28/05/2016.
 */
import React, { Component } from 'react';
import Map from './map';
import HotelSelector from './hotelSelector';
import { connect } from 'react-redux';


class MapWrapper extends Component{

  renderHotelSelector() {
    if(this.props.hotels && this.props.hotelTrips){
      return (
        <HotelSelector
          hotels={this.props.hotels}
          hotelTrips={this.props.hotelTrips}
        />
      )
    }
  }

  renderMap() {
    if(this.props.attractions && this.props.hotelTrips && this.props.trips){
      return (
        <Map
          attractions={this.props.attractions}
          trips={this.props.trips}
          hotelTrips={this.props.hotelTrips}
        />
      )
    }
    return <p>Loading...</p>
  }

  

  render(){
    return (
      <div>
        {this.renderMap()}
        {this.renderHotelSelector()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    attractions: state.attractions,
    trips: state.trips,
    hotelTrips: state.hotelTrips,
    hotels: state.hotels
  };
};

export default connect(mapStateToProps)(MapWrapper);