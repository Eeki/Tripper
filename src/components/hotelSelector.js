import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Carousel from 'nuka-carousel';

export default class HotelSelector extends Component {

  findHotelInfo(id) {
    let findHotel;
     this.props.hotels.map((hotel) => {
      if(id == hotel.id) {
        findHotel = hotel
      }
    });
    return findHotel
  }

  renderHotels() {
    if(this.props.hotelTrips){
      return this.props.hotelTrips.map( (hotelTrip) => {
        const hotel = this.findHotelInfo(hotelTrip.hotelId);
        if(hotel){
          //console.log("hotel",hotel);
          return (
            <div key={hotel.name}>
              <div  style={
          {backgroundImage: 'url(' + hotel.thumbnailUrl + ')',
          height: 20+"vh",
          backgroundSize: "cover",
          backgroundPosition: "center"
          }
          }></div>
            </div>
          );
        }
      });
    }

  }


  render() {
    return(
      <div className="hotel-selector">
        <Carousel slideWidth={0.9} cellAlign="center">
          {this.renderHotels()}
        </Carousel>
      </div>
    )
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

export default connect(mapStateToProps)(HotelSelector);
