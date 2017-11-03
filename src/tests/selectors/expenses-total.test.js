import { selectExpensesTotal } from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

// test cases
// should return  0 for no expenses
// should correctly add up a single expense
// should correcly add up multiple expenses

test('should return 0 if no expenses', () => {
  const noExpenses = [];
  const result = selectExpensesTotal(noExpenses);
  expect(result).toEqual(0);
});

test('should correctly add up a single expense', () => {
  const result = selectExpensesTotal([expenses[0]]);
  expect(result).toEqual(result);
});

test('should correctly add up multiple expenses', () => {
  const result = selectExpensesTotal(expenses);
  expect(result).toEqual(result);
});
