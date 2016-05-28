import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import NumberOfTravellers from './components/numberOfTraveller';
import RaisedButton from 'material-ui/RaisedButton';


export const fields = [ 'arrivalDate', 'arrivalTime', 'departureDate', 'departureTime', 'numberOfTravelers' ];

const validate = values => {
  const errors = {};
  if (!values.arrivalDate) errors.arrivalDate = 'Please enter your arrival date';
  if (!values.arrivalTime) errors.arrivalTime = 'Please enter your arrival time';
  if (!values.departureDate) errors.departureDate = 'Please enter your departure date';
  if (!values.departureTime) errors.departureTime = 'Please enter your departure time';
  if (!values.numberOfTravelers || values.numberOfTravelers<1) errors.numberOfTravelers = 'Please enter the number of travellers';
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

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <DatePicker
            hintText="Arrival Date"
            value={arrivalDate.value}
            {...arrivalDate}
            onChange = {(event, date) => arrivalDate.onChange(date)}
            errorText={ arrivalDate.touched && arrivalDate.error ? arrivalDate.error : ''}
          />
          <TimePicker
            hintText="Arrival Time"
            onChange = {(event, date) => arrivalTime.onChange(date)}
            errorText={ arrivalTime.touched && arrivalTime.error ? arrivalTime.error : ''}
          />
        </div>

        <div>
          <DatePicker
            hintText="Departure Date"
            value={departureDate.value}
            {...departureDate}
            onChange = {(event, date) => departureDate.onChange(date)}
            errorText={ departureDate.touched && departureDate.error ? departureDate.error : ''}
          />
          <TimePicker
            hintText="Departure Time"
            onChange = {(event, date) => departureTime.onChange(date)}
            errorText={ departureTime.touched && departureTime.error ? departureTime.error : ''}
          />
        </div>

        <div>
          <NumberOfTravellers  numberOfTravelers={numberOfTravelers}/>
          <span style={{color: "red"}}>{ departureTime.touched && departureTime.error ? departureTime.error : ''} </span>
        </div>

        <div>
          <RaisedButton type="submit" label="Next" primary={true} />
        </div>
      </form>
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