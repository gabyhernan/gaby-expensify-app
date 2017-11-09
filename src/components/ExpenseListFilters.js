import React from 'react';
import {DateRangePicker} from 'react-dates';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount , setStartDate, setEndDate } from '../actions/filters';
// we are gonna learn how to write to the store

// the goal here is going to try to get the old value of the store
// because remember that there is a value being set behind the scenes,
// and we have a set timeOut that changes that value

// it is important that the input always matches up with the CURRENT text value
// on the redux store, so if that changes via a dispatch call we want to make sure
// we're reading that value & using it inside

// how do we get this done?? by connecting ExpenseListFilter component to the store

// we are then going to create a connected version of expense list filters
// which means we're not going to be exporting by default the regular version
// instead we're going to call connecter right here

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null //

  };

  onDatesChange = ({startDate, endDate}) => { // going to be called by react dates library
  // setDates using action generators & dispatch
  this.props.setStartDate(startDate);
  this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocusedVal) => {
    this.setState( () => ({ calendarFocused: calendarFocusedVal }));
  };

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
    // console.log(e.target.value);
  };

  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
      // console.log(e.target.value);
  }

  render () {
    return (
  <div className="content-container">
    <div className="input-group">
       <div className="input-group__item">
      <input
        type="text"
        placeholder="Search expenses"
        className="text-input"
        value={this.props.filters.text}
         onChange={this.onTextChange} />
        </div>
  {/* onChange takes a function and EVERY single time the input changes
the function FIRES. To fix getting the correct value shown on the screen

We need to change the redux store here which means that we need to use dispatch
in order to update the store. So our keystrokes actually result in a change

We have access to dispatch from inside of our connected components which means
that we can call it  directly to dispatch actions
  */}
       <div className="input-group__item">
          <select
      value={this.props.filters.sortBy}
      onChange={this.onSortChange}
      className="select"
      >
        <option value="date"> Date </option>
        <option value="amount"> Amount </option>
       </select>
        </div>

{/* when we set up our form inputs things like our text inputs & our select dropdowns
& we use value & on change we're creating what is commonly known as a CONTROLLED INPUT
it just means an input where the value is controlled by JS  */}
       <div className="input-group__item">
     <DateRangePicker
      startDate={this.props.filters.startDate}
      endDate={this.props.filters.endDate}
      onDatesChange={this.onDatesChange}
      focusedInput={this.state.calendarFocused}
      onFocusChange={this.onFocusChange}
      numberOfMonths={1}
      showClearDates={true} // show "X" button in calendar picker
      isOutsideRange={ () => false } // set to false to be able to go
     // set back to previous days that already passed
     />
         </div>
    </div>



  </div>
  );
  }
};


// connect to the store
const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

// dispatch to props
const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate:   (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
