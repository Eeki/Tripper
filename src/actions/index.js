import { browserHistory } from 'react-router'
import { SAVE_PLAN } from './const';

export function savePlan(props) {
  console.log("props",props);
  browserHistory.push('/map')

}