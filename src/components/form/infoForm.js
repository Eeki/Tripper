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
      <div>
      <form onSubmit={handleSubmit} id="infoForm">
        <div>
          <label>Arrival</label>
          <Row>
            <Col xs={4}>
              <DatePicker
                className="dateOrTimePicker"
                hintText="Date"
                value={arrivalDate.value}
                {...arrivalDate}
                onChange = {(event, date) => arrivalDate.onChange(date)}
                errorText={ arrivalDate.touched && arrivalDate.error ? arrivalDate.error : ''}
                style = {{width: 100}}
              />
            </Col>
            <Col xs={4}>
              <TimePicker
                className="dateOrTimePicker"
                hintText="Time"
                onChange = {(event, date) => arrivalTime.onChange(date)}
                errorText={ arrivalTime.touched && arrivalTime.error ? arrivalTime.error : ''}
              />
            </Col>
          </Row>

        </div>
        <label>Departure</label>
        <Row>
          <Col xs={4}>
            <DatePicker
              hintText="Date"
              value={departureDate.value}
              {...departureDate}
              onChange = {(event, date) => departureDate.onChange(date)}
              errorText={ departureDate.touched && departureDate.error ? departureDate.error : ''}
            />
          </Col>
          <Col xs={4}>
            <TimePicker
              hintText="Time"
              onChange = {(event, date) => departureTime.onChange(date)}
              errorText={ departureTime.touched && departureTime.error ? departureTime.error : ''}
            />
          </Col>

        </Row>

        <div>
          <NumberOfTravellers  numberOfTravelers={numberOfTravelers}/>
          <span style={{color: "red"}}>{ numberOfTravelers.touched && numberOfTravelers.error ? numberOfTravelers.error : ''} </span>
        </div>
      </form>

        <Paper rounded={false} className="fixed-bottom">
          <FlatButton style={{float: 'right'}} form="infoForm" type="submit" label="Next" primary={true}/>
        </Paper>
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