import React, { Component } from "react";
import DayPicker from "react-day-picker";

class setUpLoan extends Component {
  constructor() {
    super();
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null
    };
  }

  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? undefined : day
    });
  }

  handleChanges = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        hi
        <DayPicker
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
        />
        <p>
          {this.state.selectedDay
            ? this.state.selectedDay.toLocaleDateString()
            : "Please select a day 👻"}
        </p>
      </div>
    );
  }
}

export default setUpLoan;
