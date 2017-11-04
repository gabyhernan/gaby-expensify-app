import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage }from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

// if you find yourself with a lot of duplicate code on your test cases
// Jest provides lifecycle methods like afterAll, afterEach.
// beforeAll, beforeEach

// using these lifecycle methods we are to able to set up the
// spies & component, then each test case can worry about
// just using those

let startAddExpense, history, wrapper;
// going to be using beforeEach to run some code before each test case
beforeEach(() => {
   startAddExpense = jest.fn();
   history = { push: jest.fn() };
   wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
}); // we can now use spies & wrappers throughtout all test cases
// without writing them every single time

test('should render AddExpensePage correctly', () => {
  // set up some spies for props

  expect(wrapper).toMatchSnapshot();

});

// test that when the form gets submitted both of our spies get passed with correct info
test('should handle addExpense onSubmit', () => {


  // call the function that gets passed into expense form
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);

  // make some assertions
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});
