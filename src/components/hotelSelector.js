import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Carousel from 'nuka-carousel';

import { changeHotel } from '../actions/hotels'

export default class HotelSelector extends Component {

  findHotelInfo(id) {
    let findHotel;
    this.props.hotels.map((hotel) => {
      if (id == hotel.id) {
        findHotel = hotel
      }
    });
    return findHotel;
  }

  renderHotels() {
    return this.props.hotelTrips.map( (hotelTrip) => {
      const hotel = this.findHotelInfo(hotelTrip.hotelId);
      if (hotel) {
        console.log("hotel",hotel);
        return (
          <div key={hotel.id}>
            <div style={
              {
                backgroundImage: 'url(' + hotel.thumbnailUrl + ')',
                height: 20+"vh",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }
            }/>
          </div>
        );
      }
    });
  }


  render() {
    return (
      <div className="hotel-selector">
        <Carousel 
          slideWidth={0.9}
          cellAlign="center"
          beforeSlide={(previous, id) => {
            this.props.changeHotel(this.props.hotelTrips[id].hotelId);
          }}
        >
          {this.renderHotels()}
        </Carousel>
      </div>
    );
  }

}

HotelSelector.propTypes = {
  hotels: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    hotels: state.hotels,
    hotelTrips: state.hotelTrips
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeHotel: (id) => {
      dispatch(changeHotel(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelSelector);
