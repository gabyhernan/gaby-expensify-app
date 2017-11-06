// action generators for expenses
import uuid from 'uuid';
import database from '../firebase/firebase';


// Steps of action generators
// 1. Component calls action generator
// 2. Action generator returns an object
// 3.  Component takes objct & passes it to dispatch
// 4. Redux store runs the reducers & it changes

// We need to tweak how our action generators work to integrate with db
// With asynchronous actions things look a little bit different
// 1. Component calls action generator
// 2. Action generator returns a FUNCTION
// 3. Component dispatches FUNCTION
// 4. Funcion runs (has the ability to dispatch other actions
// & do whatever it wants, so we put DB code here, and we have ability
// to dispatch another action, a standard one that returns an object ,
// and that will manipulate the redux store)

//  By default Redux DOES NOT allow you to dispatch functions.
// This is why you have to set up a module which is a piece of redux middleware
// that adds support for this behavior

// ADD_EXPENSE /
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
   expense
});

// change defaults to our db call
export const startAddExpense = ( expenseData = {}) => {
  // NOTE: we could set up defaults in function arg but we are
  // gonna do it in a different way so u know that it can be done like this also

  // we ar going to return a function
  return (dispatch) => {  // only works cuz the middleware has been setup
    // gets called internally by redux
    const {
      description = '',
      note = '',
      amount = 0, // destructuring from expenseData
      createdAt = 0
    } = expenseData

    const expense = { description, note, amount, createdAt };
    // 1. writing some data to firebase
    // returning this so we can start a promise chain
  return database.ref('expenses').push(expense).then( (ref) =>{
 // we have to dispatch action from up above otherwise store WONT CHANGE eva
    dispatch(addExpense({
      id: ref.key,
      ...expense
    }));
    }) // Note that you have to dispatch this guy now instead of addExpense
    // wherever u were using it in ur app

  };
};


// REMOVE_EXPENSE
export const removeExpense = ( {id} = {} ) => ({
    type: 'REMOVE_EXPENSE',
      id
});


// START REMOVE EXPENSE
export const startRemoveExpense = ( {id } = {} ) => {
  return (dispatch) => {
      return database.ref(`expenses/${id}`).remove().then( (ref) =>{
          dispatch(removeExpense({ id }));
      }).catch( (e) => console.log('Error fetching data', e));
  }
}


// EDIT_EXPENSE
export const editExpense = ( id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = ( id, updates) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).update(updates).then( () => {
      dispatch(editExpense(id, updates));

    }).catch( (e) => console.log('Error fetching data', e));
  }
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

// START_SET_EXPENSES - asynchronous action that will fetch data
// 1. fetch all expense data once
// 2. parse that data into an array
// 3. Dispatch SET_EXPENSES
// 4.
export const startSetExpenses = () => {
  return (dispatch) => {

   return database.ref('expenses').once('value')
  .then( (snapshot) => {
   const expenses = [];
    // iterate over all of the child snapshots & toss them in this array
    snapshot.forEach( (childSnapshot) => {
      // every snapshot has access to key which is that uniqueId firebase creates
      expenses.push({
        id: childSnapshot.key,
        // spreads out what comes back from child snapshot
        // so we dont have to write it every single time
        ...childSnapshot.val()
      });

      dispatch(setExpenses(expenses));
    })
  })
  .catch( (e) => {
    console.log('error fetching data', e);
  });

  };
};
