import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import {getVisibleExpenses} from '../selectors/expenses'

export const ExpenseList = (props) => (
  <div>
    {
      props.expenses.length === 0 ? (
          <p> No expenses </p>
        ) : (
          props.expenses.map( (expense) => {
      return <ExpenseListItem key={expense.id} {...expense}/>
    })
        )
    }
    <h1> Expense List </h1>



   </div>
  );

const mapStateToProps = (state) => {
// maps the component state  to the component props
  return {
    expenses: getVisibleExpenses(state.expenses, state.filters)
    // use the selector so our data is actually changing
  };
};

// creating a new const for the higher order component
// not a commont pattern to name your higher order comp
export default connect(mapStateToProps)(ExpenseList);
// the first argment is where provide the information about what we want to connect
// the component doesn't need everything from the store usually needs a subset

// so we define a function that lets us determine what info from the store
// we want our component to have
// store's state gets passed in as first arg
// we then return an object , in which we can put any key value pairs


// IMP TO KNOW
// When you connect a component to the redux store it's reactive which means
// that as the store changes your component is going to get re-rendered with those
// new values

// This is great cause it allows to create very simple compoonents
// the component doesn't need to worry about store.subscribe or store.getState
// it doesn't have to manage any component state to manage that data ,
// it's all done for us by react redux

