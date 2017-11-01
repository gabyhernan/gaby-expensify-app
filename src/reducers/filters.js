import moment from 'moment'
// Filters Reducer
const filtersReducerDefaultState = {
  text : '',
  sortBy : 'date',
   startDate : moment().startOf('month') , // set default to be at the current month
   endDate : moment().endOf('month')
};

export const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch(action.type){
    case 'SET_TEXT_FILTER': // be able to add new text to
   return { // return a new object since u dont want overwrite existing one
      ...state, // grabs all values of current filter object
      text: action.text // overwriting text
   };
   case 'SORT_BY_DATE':
   return { // new object that represents filters
    ...state, // grabbing values of  current
    sortBy: 'date'
   }
   case 'SORT_BY_AMOUNT':
   return {
    ...state,
    sortBy: 'amount'
   }
   case 'SET_START_DATE':
   return { // new object
    ...state, // grabbing current state
    startDate: action.startDate
   }
   case 'SET_END_DATE':
   return {
    ...state,
    endDate: action.endDate
   }
    default:
    return state;
  }
};

