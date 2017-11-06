import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage }from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;

// Jest lifecyclemethod
beforeEach( () => {
  // spies
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
// wrapper
  wrapper = shallow(
    <EditExpensePage
    startEditExpense={startEditExpense}
    startRemoveExpense={startRemoveExpense}
    history={history}
    expense={expenses[2]}
     />);
    }
);

// should render EditExpensePage
test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

// should handle start editExpense
test('should handle start editExpense when submitted' , () =>{
  // call the function that gets passed into expense form
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  // make assertion
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

// should handle removeExpense
test('should handle start removeExpense on button click' , () =>{
  // call the function that gets passed into expense form
  wrapper.find('button').simulate('click');
  // make assertion
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemoveExpense).toHaveBeenLastCalledWith({
    id: expenses[2].id
   });
});
