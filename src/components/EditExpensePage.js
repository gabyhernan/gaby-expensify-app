import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

// Refactor to be a class based comp
// Setup mapDispatchToProps - editExpense, removeExpense


export class EditExpensePage extends React.Component {

  onSubmit = (expense) => {
// Dispatch the action to edit the expense,Then redirect to dashboard page
      this.props.startEditExpense(this.props.expense.id, expense);
// console.log('updated', expense);
 // on ReactRouter we have history methods, inside we .push is how we can
// programatically change pages , takes single string args which is ur path
      this.props.history.push('/');
          }

  onClickRemoveExpense = () => {
     this.props.startRemoveExpense({ id: this.props.expense.id});
     this.props.history.push('/');
    }

  render () {
      return (
  <div>
        <ExpenseForm
   // we expect that the previous data we created in AddExpense page to be here
// to get that done we have to take the expense and pass it down
          expense={this.props.expense}
          onSubmit={this.onSubmit}
          />

    <button onClick={this.onClickRemoveExpense} > Remove </button>


  </div>
  );

  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
  startEditExpense: (id, expense) =>  dispatch(startEditExpense(id, expense)) ,
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
  }

};
// this time we want to set up a mapStateToProps
// we want to be able to give the compo the current expense object
const mapStateToProps = (state, props) => {
  // we are searching the expenses array for an expense whose ID matches
  // this props.match.params.id

  // we have access to the props right here as the second argument
  // we can take some of the current props that were passed into the HOC comp
  // & we can use them to calculate the props that we want to add on
  return {
    expense: state.expenses.find( (expense) => expense.id === props.match.params.id)
 // only return the object IF their ids match
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
