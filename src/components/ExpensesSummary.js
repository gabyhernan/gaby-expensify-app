import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import getVisibleExpenses from '../selectors/expenses';
import { selectExpensesTotal } from '../selectors/expenses-total';



// 1. Create Expenses Summary Comp

export const ExpensesSummary = ( {expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00')

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title"> Viewing <span> {expenseCount} </span> {expenseWord} totaling <span> {formattedExpensesTotal} </span>  </h1>
          <div className="page-header__actions">
            <Link className="button blue" to="/create"> Add Expense </Link>
          </div>

      </div>
  </div>
  );

};

const mapStateToProps = (state) => {
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  return {
     expenseCount: visibleExpenses.length,
     expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};


export default connect(mapStateToProps)(ExpensesSummary);

