import { createStore, combineReducers } from 'redux';
import {expensesReducer} from '../reducers/expenses';
import {filtersReducer} from '../reducers/filters';


export default () => {
  const store = createStore(
  combineReducers({ // combineRedcuers takes an argument which is an object
expenses: expensesReducer,  // the key is going to be the root state name
filters: filtersReducer
  }),  // & the value is going to be the reducer that is supposed to manage that
// & by using combineReducer we are notputting our object or array on the root
// we are putting the array on the expenses property
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};

// now this means that when we import the function the default export from
// configure store, we get the store back and just use it

// Combined reducers lets you combine multiple reducers to create a single store
// as opposed to one gigantic reducer you can have multiple smaller ones
// const store = createStore(expensesReducer);

// set up store configuration

