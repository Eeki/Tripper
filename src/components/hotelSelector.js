import React, { Component, PropTypes } from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton';
import OptionsIcon from 'material-ui/svg-icons/action/build';

export default class HotelSelector extends Component {

  render() {

    console.log(this.props.hotels)

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 500,
        height: 500,
        overflowY: 'auto',
        marginBottom: 24,
      },
    };

    const {
      hotels
    } = this.props;

    return(
      <div style={styles.root}>
        <GridList
          cols={1}
          cellHeight={100}
          style={styles.gridList}
          padding={1}
        >
          {hotels.map((hotel) =>
            <GridTile
              key={hotel.name}
              title={hotel.name}
              cols={1}
              rows={1}
            >
              <img src={name.thumbnailUrl} />
              </GridTile>
          )}
        </GridList>
      </div>
    )
  }
}

HotelSelector.propTypes = {
  hotels: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    hotels: state.hotels
  };
};

export default connect(mapStateToProps)(HotelSelector);
