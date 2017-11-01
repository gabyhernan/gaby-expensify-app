// Testing Action generators
import {addExpense, removeExpense, editExpense } from '../../actions/expenses';

// toEqual(val) - when u want to check 2 objects or arrays  have the same value

// toBe - when u want to check booleans, numbers or strings have same value
test('should set up remove expense action object', () => {
  const action = removeExpense( {id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
})

// editExpense
test('should set up edit expense action object', () => {
  const action = editExpense( '123cat', { description: 'rent'});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123cat',
    updates: {
      description: 'rent'
    }
  });
})

// Add Expense
test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'rent',
    amount: 120000 ,
    createdAt: 1000,
    note: 'November'
  };

  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
      // id is an example of dynamic data, to test dynamic data
      // we can use .any (constructor) inside toEqual or toBeCalledWith
      // instead of a literal value , just have to specify type expected
      // since we don't know what it would be
    }
  });

})

test('should set up add expense action object with default values', () =>{
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
       description: '',
       note: '',
       amount: 0,
       createdAt: 0,
       id: expect.any(String)
    }
  });
})
