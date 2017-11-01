// Filters Action Generators
import moment from 'moment';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../../actions/filters';

// set Textfilter
test('should generate set text filter action object with text value', () => {
  const action = setTextFilter('bill');
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'bill'
  });
});

// setTextFilter default
test('should generate set text filter default action object', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

// sortByDate
test('should generate sortByDate filter action object', () => {
  const action = sortByDate();
  expect(action).toEqual({ type: 'SORT_BY_DATE' });
});

// sortByAmount
test('should generate sortByAmount filter action object', () => {
  const action = sortByAmount();
  expect(action).toEqual({type: 'SORT_BY_AMOUNT'});
});

// we want to make sure we are passing the same data as we
// are in the real world which we know is a moment instance , so we need to import it
test('should generate set start date action object', () => {
  const action = setStartDate(moment(0)); // starting at 1970
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
});

test('should generate set end date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
});

// one for sort by amount, one for sort by date ,
// two fpr set text , one that tests default , other one that tests other values
