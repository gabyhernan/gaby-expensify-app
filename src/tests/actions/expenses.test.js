// Testing Action generators
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense,addExpense, removeExpense, editExpense, setExpenses, startSetExpenses, startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';


// we are creating the config so we can allow the test cases to all
// create THE SAME mock store
// we can optionally add an array that configures the middleware
const createMockStore = configureMockStore([thunk]);

//lifecycle method to write some data to firebase
beforeEach((done) => {
// beforeEach is not going to wait ffor this to complete before it allows
// the test cases to run , which means that some test cases are going to run
// before the data gets saved, to fix this we can use done
  const expensesData = {};
  expenses.forEach( ({id, description, note, amount, createdAt}) => {
    expensesData[id] = { description, note, amount, createdAt }


  })
  database.ref('expenses').set(expensesData).then( () => done());
  // won't allow test cases to run until firebase has synced up the data
})

// toEqual(val) - when u want to check 2 objects or arrays  have the same value
// toBe - when u want to check booleans, numbers or strings have same value
test('should set up remove expense action object', () => {
  const action = removeExpense( {id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
})


test('should remove expense from database', (done) => {
    const store = createMockStore({});
    const id = expenses[2].id;

    store.dispatch(startRemoveExpense({id})).then( () => {
       const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'REMOVE_EXPENSE',
          id: id
        });

        // check if expense removed from db
    return database.ref(`expenses/${id}`).once('value');
  }).then( (snapshot) => {
        expect(snapshot.val()).toBeFalsy(); // null is cosnidered falsy so use toBeFalsy
        done();
    });
    });

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

// Testing async redux actions
// 1. We have to learn how to create a Mock Redux store
// 2. There is a test module for redux that makes it easy to mock
// we have to force Jest to wait for asynchronous, we have to provide arg called done
test('should add expense to database and store', (done) => {
  const store = createMockStore({}); // provide default data as args, empty object in this case
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
   }
// now we can use store.dispatch on it to dispatch our async
store.dispatch(startAddExpense(expenseData)).then( () => {
  // getActions dispatched from our mock store using mock store
  const actions = store.getActions(); // returns an array of all the actions
  expect(actions[0]).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  });  // we also want to check if the data was saved to db successfully
  // query DB
  return  database.ref(`expenses/${actions[0].expense.id}`).once('value');
}).then( (snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();   // forcing Jest to wait
  });
// now our asynchronous code is now gonna run, but how do do something
// when its done running, to get this done we are going to need to use
// promise chaining, know that the data shouldve been saved to firebase
// and the action shouldve been dispatched
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({}); // provide default data as args, empty object in this case
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
   }
// now we can use store.dispatch on it to dispatch our async
store.dispatch(startAddExpense({})).then( () => {
  // getActions dispatched from our mock store using mock store
  const actions = store.getActions(); // returns an array of all the actions
  expect(actions[0]).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseDefaults
    }
  });  // we also want to check if the data was saved to db successfully
  // query DB
  return  database.ref(`expenses/${actions[0].expense.id}`).once('value');
}).then( (snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();   // forcing Jest to wait
  });

});

// Add Expense
test('should setup add expense action object with provided values', () => {
  // instead of making up data here we can access our fixture data

  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]

   // commented it out since we now use setAddExpense generator
      // {...expenseData,
      // id: expect.any(String)}
      // id is an example of dynamic data, to test dynamic data
      // we can use .any (constructor) inside toEqual or toBeCalledWith
      // instead of a literal value , just have to specify type expected
      // since we don't know what it would be
  });
})

test('should set up set expense action object with data ', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });

});

test('should fetch data from database and get expenses ', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then( () => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  })

})

// test('should set up add expense action object with default values', () =>{
//   const action = addExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//        description: '',
//        note: '',
//        amount: 0,
//        createdAt: 0,
//        id: expect.any(String)
//     }
//   });
// })
