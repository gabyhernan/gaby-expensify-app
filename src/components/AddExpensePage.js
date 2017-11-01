import React from 'react';
import {connect } from 'react-redux';
import { addExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {   // props.dispatch(addExpense(expense));
      this.props.addExpense(expense);
 // on ReactRouter we have history methods, inside we .push is how we can
// programatically change pages , takes single string args which is ur path
      this.props.history.push('/');
    }

  render() {
  return (
  <div>
    <ExpenseForm
    onSubmit={this.onSubmit} /> {/* the add expense page needs to be able to actually dispatch the
    given action to the redux store  */}

    This is from my add expense page component
  </div>
  );
  }


}




// very similar to mapStateToProps
// but instead of working with state, it works with dispatch
const mapDispatchToProps = (dispatch) => ({
  // goal is to return an object
 // define props that are going to call dispatch
    addExpense: (expense) => dispatch(addExpense(expense))
 // now we have the same functionality, but we have a compoment that
  // is now more testable
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
// first arg is map state to props , pass as undefined since we dont need for this one

// second function is called mapDispatchToProps -
// it is a way to return your dispatcher functions allowing you to abstract
// them away from the component itself
