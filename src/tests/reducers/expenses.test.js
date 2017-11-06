// Expenses Reducer
import { expensesReducer } from '../../reducers/expenses';
import expenses from '../fixtures/expenses'; // importing dummy data



test('should set default state' , () => {
  const state = expensesReducer(undefined, {type:'@@INIT'});

  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ expenses[0], expenses[2] ]);
});

test('should NOT remove expenses if ID not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses); // expecting an array that has been unchanged
  // since a fake id was provided
});

// should add an expense
test('should add an expense', () => {
  const expense = {
    id: '4',
    description: 'Coffee',
    note: '',
    amount: 450,
    createdAt: 20000
};

  const action = {
    type: 'ADD_EXPENSE',
    expense
  }

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);

});

// should edit an expense(
test('should edit an expense', () => {
  const amount = 122000;

  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      amount
    }
  }

  const state = expensesReducer(expenses, action);
  expect(state[1].amount).toBe(amount);
  // specificying item & grabbing property
});

// should not edit expense if expense not found
test('should not edit an expense if expense NOT found', () => {
  const amount = 122000;

  const action = {
    type: 'EDIT_EXPENSE',
    id: '-2', // intentionally mess with id
    updates: {
      amount
    }
  }

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
  // state should be the same
});

test('should set expenses ', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);

});
