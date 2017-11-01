
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense} from './actions/expenses';
import { setTextFilter } from './actions/filters';
import { getVisibleExpenses} from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';


const store = configureStore();

// use connect for every single component that needs to connect to the Redux store

// React-redux library
// we are going to be using <Provider store> once at the root of our application
// Provider will allow us to provde the store to all of the components
const jsx = (
  <Provider store={store}>
    <AppRouter />
   </Provider>
  );

ReactDOM.render(jsx, document.getElementById('app'));

