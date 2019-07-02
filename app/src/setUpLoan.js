import React, { Component } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./setUpLoan.css";
import ReactNumeric from "react-numeric";

class SetUpLoan extends Component {
  constructor() {
    super();
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      loanAmount: 0,
      selectedDay: null,
      autoPay: false
    };
  }

  handleDayClick(day, { selected }) {
    this.setState({
      ...this.state,
      selectedDay: selected ? undefined : day
    });
  }

  handleChanges = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCheckbox() {
    let checkBox = document.getElementById("myCheck");

    if (checkBox.checked == true) {
      this.setState({ ...this.state, autoPay: true });
    } else {
      this.setState({ ...this.state, autoPay: true });
    }
  }

  render() {
    return (
      <div className="center" name>
        <p>Loan Amount:</p>
        <ReactNumeric
          value={this.state.loanAmount}
          preDefined={{
            allowDecimalPadding: false,
            currencySymbol: "$",
            decimalPlaces: 0,
            decimalPlacesRawValue: 0,
            maximumValue: "1000",
            minimumValue: "0",
            outputFormat: "number",
            unformatOnSubmit: true
          }}
          onChange={(event, value) =>
            this.setState({
              ...this.state,
              loanAmount: value
            })
          }
        />
        <p>{this.state.loanAmount}</p>
        <p>Loan Pay Back Date:</p>
        <DayPicker
          month={new Date(2019, 6)}
          fromMonth={new Date(2019, 6)}
          toMonth={new Date(2020, 7)}
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
        />
        <div className="checkBox">
          <p>Have loan automatically paid back on selected date?</p>
          <input type="checkbox" id="myCheck" onclick="myFunction()" />
        </div>
        <button>Continue</button>
      </div>
    );
  }
}

export default SetUpLoan;
