import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


// now the big picture goal here is to use local component state
// to track the changes to all of these inputs

// only when the user ACTUALLY SUBMITS the form will we do something with the info
// when the submit the form we send it off to rudux store to either edit or create
// a new expense

// we use moment.js library to work with date & time
const now = moment();
console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
  // so the goal is to  take these four state values & ONLY use the defaults
  // seen here if no EXPENSE was passed down, thar's going to make sure the add
  // expense page still works , but if an expense was PASSED DOWN we want
  // to start these off at those values in the EditExpensePage
  // to get that done we have to look to the props, so we have to define our
  // state in the constructor function to access the props

  constructor(props) {
    super(props);

    this.state = {
   description: props.expense ? props.expense.description : '' ,
 // makes sure that page works if we are editing an expense or if we are adding
    note: props.expense ? props.expense.note : '',
    amount: props.expense ? (props.expense.amount / 100).toString() : '',
// it's a number we want a string and we want it in cents so we divide by 100
// then we convert it to a string
    createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
   // we call moment since if it was created we want the time and date
 // when it was created now the current time
    calendarFocused: false,// setting it as not focused initially
    error: ''
    }
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState( () => ({ description }))
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }))
  }

  onAmountChange = (e) => {
    const amount = e.target.value;
    // set number validation for form
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) { // .match takes our regex expression in
   // !amount allows user to clear the value if they write the wrong amount initally
     this.setState(() => ({ amount }));
    }
  }

  onDateChange = (createdAt) => {
    if (createdAt) { // putting it in if statement to prevents user for being
      // able to clear date value which is bad UX experience
    this.setState( () => ({ createdAt }));
    }
  }

  onFocusChange = ( {focused }) => {
    this.setState( () => ({ calendarFocused: focused }));
  }


  onSubmit = (e) => { // for our forms we want to access e
    // to preventDefault and that full page refresh
    e.preventDefault();

  if(!this.state.description || !this.state.amount) {
   // set error state equal to 'please provide description & amount'
   this.setState( () => ({ error: 'Please provide description & amount' }));
  } else {
    // clear the error
    this.setState ( () => ({ error: '' }));
    console.log('submitted'); // set up action when the form is submitted
    this.props.onSubmit({
      description: this.state.description,
      amount: parseFloat(this.state.amount, 10) * 100 ,// since we are working with cents
      //setting it in right format parseFloat keeps ddecimals in place
      createdAt: this.state.createdAt.valueOf(), // currently a moments object
      // valueOf is a moments method that changes it to unix timestamp which JS works
      // in milliseconds
      note: this.state.note
    });
  }

  }

  render () {
   return (
    <div>
 { this.state.error && <p> {this.state.error} </p> }

      <form onSubmit={this.onSubmit}>
        <input
          className="text-input"
          type="text"
          placeholder="description"
          autoFocus
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          className="text-input"
          type="text"
        // have to set  our own validation for numbers
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
         />

        <SingleDatePicker
          date={this.state.createdAt} // moment object represents where you want to start
          onDateChange={this.onDateChange} // function we create with moment instance when someone picks
          // new date from calendar
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1} // shows 1 month at a time
          isOutsideRange={ () => false } // if we had an extensive lodging app we
          // could set a function specify the days but since we just want to be
          // able to go back to the days we set it as false
           />


         <textarea
          placeholder="Add a note for your expense (optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
         >
          </textarea>

          <button > Add Expense </button>
      </form>
    </div>
    );
  }
}
