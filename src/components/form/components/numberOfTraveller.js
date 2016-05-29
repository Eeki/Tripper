import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';

export default class NumberOfTravellers extends Component{

  addOneTraveller() {
    let plusOne;
    if(this.props.numberOfTravelers.value){
      plusOne = parseInt(this.props.numberOfTravelers.value) + 1;
    }else {
      plusOne = 1
    }
    this.props.numberOfTravelers.onChange(plusOne)
  }

  decreaseOneTraveller() {
    console.log("decrese");
    if(this.props.numberOfTravelers.value>1 && (this.props.numberOfTravelers.value)){
      this.props.numberOfTravelers.onChange(parseInt(this.props.numberOfTravelers.value) -1)
    }else {
      this.props.numberOfTravelers.onChange(1)
    }
  }

  render() {
    const buttonStyle = {
      margin: 30,
      color: "white"
    };
    const textFieldStyle = {
      fontSize: 30,
      width: 35,
      margin: 10
    };


    return(
      <div className="center-block">
        <FloatingActionButton
          mini={true}
          style={buttonStyle}
          onTouchStart={(event) => {this.decreaseOneTraveller()}}
          onMouseUp={(event) => {this.decreaseOneTraveller()}}
          backgroundColor="#f092cd"
        >
          -
        </FloatingActionButton>

        <TextField
          {...this.props.numberOfTravelers}
          id="numberOfTravellersTextField"
          hintText="1"
          style={textFieldStyle}/>

        <FloatingActionButton
          mini={true}
          style={buttonStyle}
          onTouchStart={(event) => {this.addOneTraveller()}}
          onMouseUp={(event) => {this.addOneTraveller()}}
          backgroundColor="#f092cd"
        >
          +
        </FloatingActionButton>

      </div>
    )
  }
}
