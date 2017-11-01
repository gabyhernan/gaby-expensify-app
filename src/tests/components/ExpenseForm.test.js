import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

// Mocking Libraries with Jest
// we are going to create a fake version of the moment library that is going to
// allow us to define what happens when the code actually calls this &
// we are going to return a momemnt at a specific point in time

// because right now it is creating an error because it is taking the current
// date & time which is going to change every single time the test gets runned
// this is what mock libraries are useful for



test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

// simulate user interaction & events
// we are going to write a test case that makes sure an error gets rendered
// when the form is submitted without a description or without an amount
test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
   expect(wrapper).toMatchSnapshot(); // taking snapshot before
  // find the form & then we have to simulate submit
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  }); // first arg is the event could be 'click', or 'change'
  // verify that things changed as expected
  // we need to define the e argument of preventDefault or else we will get error

  // fetching the state to verify change
  // .state() allows us to fetch the state for that component
  // expect statement that fetches the state & makes sure that its not empty string
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot(); // snapshot after
});

test('should set description on input change', () => {
  const value = 'new description';
    // 1. render expense form
  const wrapper = shallow(<ExpenseForm />);
  // 2. submit the change event , to change the input
  wrapper.find('input').at(0).simulate('change', {
    // we have multiple inputs, at() lets you specity the index you want
    // what object do we want to pass in
    target: {value}
  }); // we want the first one that is the input for desc

  // 3. make an assertion cheking that the description state was set
  expect(wrapper.state('description')).toBe(value);
} )

// should set note on textarea change
test ('should set note on textarea change', () => {
  const value = 'waddup world';
  const wrapper = shallow(<ExpenseForm />);

  // simulate event change
  wrapper.find('textarea').simulate('change', {
    target : {value}
  });

  // make assertion
  expect(wrapper.state('note')).toBe(value);
});

// should set amount if valid input
// 23.50
test('should set amount if valid input', () => {
  const value = '23.50';
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  // make assertion
  expect(wrapper.state('amount')).toBe(value);
});


test('should not set amount if invalid input', () => {
  const value = '23.501';
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  // make assertion
  expect(wrapper.state('amount')).toBe('');
});

// Mocked Functions also known as spies
  // 1. render expense form with our fixture data
  // 2. simulate the submission
  // 3. make an assertion that checks state was cleared
  // 4. We need to make sure that the on submit prop was called with
  // the correctly formatted information object

test('should call onSubmit prop for valid form submission', () => {
  // the whole goal of spies is to create these functions that are
  // 'fake' functions, they're created by Jest for us & we cam make assertions
  // about them
  const onSubmitSpy = jest.fn(); // creates a new spy
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />); // passing in expenses
  // so when the form is submitted there is valid data
  // onSubmit calling that on submitspy

  // simulate the form
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });

  expect(wrapper.state('error')).toBe('');

  // check if our spy was called
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
 // making sure that spy was called with the correct data
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

// onDate change -
// going to pass a moment instance into createdAt and I'm going to expect
// that it gets set on the state

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
// how to trigger the prop from that child component SingleDatePicker
// to do this we first have to find SingleDatePicker
wrapper.find('SingleDatePicker').prop('onDateChange')(now);
// we need to get a prop from SingleDatepicker
// then we can call this handler with whatever data it expects to be called with
// in this case it is a new moment instance

// now we can make the assertion that state was correct
expect(wrapper.state('createdAt')).toEqual(now);
});

//
test('should set calendar focus on change', () => {
  const focused = true;


  const wrapper = shallow(<ExpenseForm />);
  // trigger prop from child component
  wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});

  expect(wrapper.state('calendarFocused')).toEqual(focused);
});
