import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class HotelDrawer extends React.Component {

  render() {
    return(
      <Drawer
        docked={false}
        width={200}
        open={true}
      >
        <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
        <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
      </Drawer>
    )
  }
}