import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import Avatar from 'material-ui/Avatar'

import { toggleAttraction } from '../../actions/attractions'

class AttractionsForm extends Component {
  render() {
    const {
      attractions,
      onClick
    } = this.props;

    return (
      <div>
        <h2>Choose attractions</h2>
        <List>
          {attractions.map((attraction) =>
            <ListItem 
              key={attraction.id}
              primaryText={attraction.name} 
              rightToggle={<Checkbox onClick={() => onClick(attraction.id)} checked={attraction.selected}/>} 
              leftAvatar={<Avatar style={{borderRadius: 0}} src={attraction.thumbnailUrl} />}
            />
          )}
        </List>
        <Paper rounded={false} className="fixed-bottom">
          <Link to='/infoForm'><FlatButton label='Previous'/></Link>
        </Paper>
      </div>
    )
  }
}

AttractionsForm.propTypes = {
  attractions: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    attractions: state.attractions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (id) => {
      dispatch(toggleAttraction(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttractionsForm);
