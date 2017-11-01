import moment from 'moment'
import {filtersReducer} from '../../reducers/filters';

// test to make sure the default values get set up correcly when the
// redux store first kicks off

// now redux actually dispatches a special action for that, which we can actually
// this is used internally by redux , but can use it in our test cases
// @@init can be used to make sure that the reducers sets itself up correctly

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type:'@@INIT' });
  // first one is current state hence undefiend, since we are testing
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sort by to amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = {
    // going to define the state before we call reducer
     text: '',
     startDate: undefined,
     endDate: undefined ,
     sortBy: 'amount' // we start it at amount , so we can watch it change to date

  };

// what type of action are we dispatching
  const action = { type: 'SORT_BY_DATE' };

// pass everything into reducer
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

// should set text filter
// actual filter text get set
test('should set text filter', () => {
    const textVal = 'hello';
  // type of action are we dispatching
  const action = {
    type: 'SET_TEXT_FILTER',
    text:  textVal
  };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(textVal);
});

// should set Start date
test('should set start date', () => {
  const startDateVal = moment()

  const action = {
    type: 'SET_START_DATE',
    startDate : startDateVal
  };

  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(startDateVal);
});

// should set endDate
test('should set end date', () => {
  const endDate = moment()

  const action = {
    type: 'SET_END_DATE',
    endDate
  };

  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(endDate);
});



