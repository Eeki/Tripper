import React, {Component} from 'react';
import InfoForm from './infoForm';
import { savePlan } from '../../actions/index';

export default class FormWrapper extends Component {
  render() {
    return(
      <InfoForm onSubmit={ savePlan }/>
    )
  }
}