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
      calculate,
      toggleAttraction
    } = this.props;

    return (
      <div>
        <h2>Choose attractions</h2>
        <List>
          {attractions.map((attraction) =>
            <ListItem 
              key={attraction.id}
              primaryText={attraction.name} 
              rightToggle={<Checkbox onClick={() => toggleAttraction(attraction.id)} checked={attraction.selected}/>} 
              leftAvatar={<Avatar style={{borderRadius: 0}} src={attraction.thumbnailUrl} />}
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
            onClick={() => calculate(attractions.filter(a => a.selected))}
          />
        </Paper>
      </div>
    )
  }
}

AttractionsForm.propTypes = {
  attractions: PropTypes.array.isRequired,
  calculate: PropTypes.func.isRequired,
  toggleAttraction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    attractions: state.attractions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAttraction: (id) => {
      dispatch(toggleAttraction(id));
    },
    calculate: (attractions) => {
      dispatch(fetchTrips(attractions));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttractionsForm);
