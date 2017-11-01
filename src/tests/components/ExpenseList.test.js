import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';
// When we are testing react components with redux
// We actually want to test the UNCONNECTED version
// because we want to actually provide a set of dynamic props
// so we don't want these props from the store INSTEAD we are just going to
// provide expenses directly

// Since we want to be able to test the unconnected version we first want to
// export it. So we are now gonna have 2 components in our Expenselist.js file
// one unconnected one used for testing
// one connected version which is used inside of the actual application

// Snapshot testing - passing data in to make sure it works as expected

test('should render ExpenseList with expenses' , () => {
  const wrapper = shallow(<ExpenseList expenses={expenses}/>);
  // ExpenseList expect props with expense array ,
  // we are passing expenses data so it can be used

  // set up snapshot
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with empty message', () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);

  expect(wrapper).toMatchSnapshot();
});

