import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import OptionsIcon from 'material-ui/svg-icons/action/build';
import Slider from 'material-ui/Slider';
import Col from 'react-bootstrap/lib/Col';

class OptionsBar extends Component{

  render(){
    const style = {
      noPadding: {padding: 0}

    };

    return (
      <div>
        <Col xs={2} style={style.noPadding}>
          <IconButton tooltip="bottom-right" touch={true} tooltipPosition="bottom-right">
            <OptionsIcon />
          </IconButton>
        </Col>

        <Col xs={6} style={style.noPadding}>
          <Slider defaultValue={0.5} />
        </Col>




      </div>
    )
  }
}

export default OptionsBar;