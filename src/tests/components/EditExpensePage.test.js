import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage }from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

// Jest lifecyclemethod
beforeEach( () => {
  // spies
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
// wrapper
  wrapper = shallow(
    <EditExpensePage
    editExpense={editExpense}
    removeExpense={removeExpense}
    history={history}
    expense={expenses[2]}
     />);
    }
);

// should render EditExpensePage
test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

// should handle editExpense
test('should handle editExpense when submitted' , () =>{
  // call the function that gets passed into expense form
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  // make assertion
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

// should handle removeExpense
test('should handle removeExpense on button click' , () =>{
  // call the function that gets passed into expense form
  wrapper.find('button').simulate('click');
  // make assertion
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({
    id: expenses[2].id
   });
});
