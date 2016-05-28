import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import Paper from 'material-ui/Paper'

export const fields = [ 'arrivalDate', 'arrivalTime', 'departureDate', 'departureTime', 'numberOfTravelers' ];

class InfoForm extends Component {

  render() {
    const {
      fields: { arrivalDate, arrivalTime, departureDate, departureTime, numberOfTravelers},
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <DatePicker
              hintText="Arrival Date"
              value={arrivalDate.value}
              {...arrivalDate}
              onChange = {(event, date) => arrivalDate.onChange(date)}
            />
            <TimePicker {...arrivalTime}/>
          </div>

          <div>
            <DatePicker
              hintText="Departure Date"
              value={departureDate.value}
              {...departureDate}
              onChange = {(event, date) => departureDate.onChange(date)}
            />

          </div>

          <div>
            <input type="text" placeholder="Number of Travellers" {...numberOfTravelers}/>
          </div>


          {/*<div>
            <button type="submit" disabled={submitting}>
              {submitting ? <i/> : <i/>} Submit
            </button>
            <button type="button" disabled={submitting} onClick={resetForm}>
              Clear Values
            </button>
          </div>*/}
        </form>
        <Paper className="fixed-bottom">
          <Link to="/attractionsForm"><FlatButton label="Next" primary={true}/></Link>
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
  form: 'travelInfoForm',
  fields
})(InfoForm)