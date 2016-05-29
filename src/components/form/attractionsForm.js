import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import Avatar from 'material-ui/Avatar'

import { toggleAttraction } from '../../actions/attractions'
import { fetchTrips } from '../../actions/trips'

class AttractionsForm extends Component {
  render() {
    const {
      attractions,
      hotels,
      calculate,
      toggleAttraction
    } = this.props;

    return (
      <div>
        <h2>Choose attractions</h2>
        <List>
          {attractions.map((attraction) =>
            <ListItem
              style={{
                height: "80px",
                color: "#000",
                fontFamily: "Roboto",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "20px",
                margin: "0 0 20px 0",
                padding: "5px 50px 0px 140px"
              }}
              className="item-attraction"
              key={attraction.id}
              primaryText={attraction.name}
              secondaryText={
                <p
                  style={{
                    color: "#000",
                    fontFamily: "Roboto",
                    fontSize: "18px",
                    fontWeight: "200",
                    marginTop: "8px"
                  }}>
                  {attraction.minDuration} min
                </p>
              }
              rightToggle={
                <Checkbox
                  style={{
                    height: "auto",
                    width: "22px",
                    top: "none",
                    bottom: "30px",
                    right: "10px"
                  }}
                  onClick={() => toggleAttraction(attraction.id)}
                  checked={attraction.selected}
                />}
              leftAvatar={
                <Avatar
                  style={{
                    height: "100%",
                    width: "120px",
                    top: "0px",
                    left: "10px",
                    fontSize: "20px",
                    lineHeight: "40px",
                    border: "none",
                    borderRadius: 0,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                  src={attraction.thumbnailUrl}
                />}
            />
          )}
        </List>
        <Paper rounded={false} className="fixed-bottom">

          <Link to='/infoForm'>
            <FlatButton style={{float: 'left'}} label="Previous" primary={false} />
          </Link>

          <Link to='/map'>
            <FlatButton style={{float: 'right'}} label="Next" primary={true} />
          </Link>
          <FlatButton 
            style={{float: 'right'}}
            label="Calculate" secondary={true}
            onClick={() => calculate(attractions.filter(a => a.selected), hotels)}
          />
        </Paper>
      </div>
    )
  }
}

AttractionsForm.propTypes = {
  attractions: PropTypes.array.isRequired,
  hotels: PropTypes.array.isRequired,
  calculate: PropTypes.func.isRequired,
  toggleAttraction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    attractions: state.attractions,
    hotels: state.hotels
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAttraction: (id) => {
      dispatch(toggleAttraction(id));
    },
    calculate: (attractions, hotels) => {
      dispatch(fetchTrips(attractions, hotels));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttractionsForm);
