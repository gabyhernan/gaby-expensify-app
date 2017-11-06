

// Expenses Reducer

const expensesReducerDefaultState = [];

export const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
     return  [ // ...state refers to all of the existing items in array
     ...state ,
     action.expense // adding on this new item to a NEW array
     ];
     case 'REMOVE_EXPENSE':
     return state.filter(( {id}) => id !== action.id);
  // if they are not equal it will result in true meaning id will be kept
// if they are equal , will result in false & item will be discarded
    case 'EDIT_EXPENSE':  // want go through every expense in array
    // when we find match we want to edit it
    return state.map((expense) => {
      if (expense.id === action.id){
        return {
          // grab all properties of existing one using spread operator
          ...expense,
          ...action.updates // overwrites existing properties
          // with the ones user passes in
        }
      }
       else {
        return expense;
      }
    });

     case 'SET_EXPENSES':
    return action.expenses;


    default:
      return state;
  }
};
