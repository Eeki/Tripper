import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import NumberOfTravellers from './components/numberOfTraveller';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


import Paper from 'material-ui/Paper'

import {
cyan500, cyan700,
grey100, grey300, grey400, grey500,
pinkA200,
white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

export const fields = [ 'arrivalDate', 'arrivalTime', 'departureDate', 'departureTime', 'numberOfTravelers' ];

const validate = values => {
  const errors = {};
  if (!values.arrivalDate) errors.arrivalDate = 'Required';
  if (!values.arrivalTime) errors.arrivalTime = 'Required';
  if (!values.departureDate) errors.departureDate = 'Required';
  if (!values.departureTime) errors.departureTime = 'Required';
  if (!values.numberOfTravelers || values.numberOfTravelers<1) errors.numberOfTravelers = 'Required';
  return errors
};

const muiTheme = getMuiTheme ({
  spacing: {
  },
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: "#f092cd",
    primary2Color: "#f092cd",
    primary3Color: "#f092cd",
    accent1Color: "#f092cd",
    accent2Color: "#f092cd",
    accent3Color: "#f092cd",
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  timePicker: {
    primary1Color: "#f092cd",
    primary2Color: "#f092cd",
    primary3Color: "#f092cd",
    accent1Color: "#f092cd",
    accent2Color: "#f092cd",
    accent3Color: "#f092cd",
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  }
});

class InfoForm extends Component {

  render() {
    const {
      fields: { arrivalDate, arrivalTime, departureDate, departureTime, numberOfTravelers},
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    const style = {dateTimePicker: {width: 50+"px"}
    };

    return (
      <div className="container">
        <h1>Tripper</h1>
        <p className="lead">Make the best of your trip. Find hotels based on the attractions you’ll see.</p>
        <form onSubmit={handleSubmit} id="infoForm">
          <div>
            <label className="formLabel">Arrival</label>
            <Row>
              <Col xs={4}>
                <MuiThemeProvider muiTheme={muiTheme}>
                  <DatePicker
                    className="dateOrTimePicker"
                    hintText="Date"
                    value={arrivalDate.value}
                    {...arrivalDate}
                    onChange = {(event, date) => arrivalDate.onChange(date)}
                    errorText={ arrivalDate.touched && arrivalDate.error ? arrivalDate.error : ''}
                    style = {{width: 100}}
                  />
                </MuiThemeProvider>
              </Col>
              <Col xs={4}>
                <MuiThemeProvider muiTheme={muiTheme}>
                  <TimePicker
                    className="dateOrTimePicker"
                    hintText="Time"
                    onChange = {(event, date) => arrivalTime.onChange(date)}
                    errorText={ arrivalTime.touched && arrivalTime.error ? arrivalTime.error : ''}
                  />
                </MuiThemeProvider>
              </Col>
            </Row>
          </div>
          <label className="formLabel">Departure</label>
          <Row>
            <Col xs={4}>
              <MuiThemeProvider muiTheme={muiTheme}>
                <DatePicker
                  hintText="Date"
                  value={departureDate.value}
                  {...departureDate}
                  onChange = {(event, date) => departureDate.onChange(date)}
                  errorText={ departureDate.touched && departureDate.error ? departureDate.error : ''}
                />
              </MuiThemeProvider>
            </Col>
            <Col xs={4}>
              <MuiThemeProvider muiTheme={muiTheme}>
                <TimePicker
                  hintText="Time"
                  onChange = {(event, date) => departureTime.onChange(date)}
                  errorText={ departureTime.touched && departureTime.error ? departureTime.error : ''}
                />
              </MuiThemeProvider>
            </Col>
          </Row>
          <div>
            <NumberOfTravellers  numberOfTravelers={numberOfTravelers}/>
          <span style={{color: "red"}}>{ numberOfTravelers.touched && numberOfTravelers.error ? numberOfTravelers.error : ''} </span>
        </div>
      </form>

      <button form="infoForm" type="submit" className="fixed-bottom next-button">
        Next
      </button>

      </div>
    )
  }
}

InfoForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  touchOnBlur: false,
  form: 'travelInfoForm',
  fields,
  destroyOnUnmount: false,
  validate
})(InfoForm)
