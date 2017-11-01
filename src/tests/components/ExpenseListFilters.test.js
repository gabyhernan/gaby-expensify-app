import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters }from '../../components/ExpenseListFilters';
import {filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

// lifecycle method
beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(<ExpenseListFilters
                      filters={filters}
                      setTextFilter={setTextFilter}
                      sortByDate={sortByDate}
                      sortByAmount={sortByAmount}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
   />);
})

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

// how do we change the props for one of the components we are testing
// for example if we want to test altFilters
test('should render ExpenseListFilters with alt data correctly', () => {
  // change the prop with setProps() enzyme method
  wrapper.setProps({filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

// should handle text change
test('shouuld handle text change', ( ) => {
  const value = 'rent';
  wrapper.find('input').simulate('change', { // simulate event
    target : { value: value }
  });
  // make assertion
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

// should sort by date
test('should sort by date', () => {
  const value = 'date';
  wrapper.setProps({ filters: altFilters}); // want the initial sortBy to be amount
  wrapper.find('select').simulate('change', {
    target: { value: value }
  });
// make assertion
  expect(sortByDate).toHaveBeenCalled();
});
// should sort by amount
test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', {
    target: { value }
  });

  expect(sortByAmount).toHaveBeenCalled();
});

// should handle date changes
test('should handle date changes', () => {
  const startDate = moment(0).add(4, 'years');
  const endDate = moment(0).add(8, 'years');
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});

  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

// should handle date focus changes  - simulate the state
test('should handle date focus changes', () => {
  const calendarFocused = 'startDate'; // from date picker value could be null,
  //  startdate or end date

  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toEqual(calendarFocused);
});

