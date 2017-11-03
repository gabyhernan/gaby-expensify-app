// selectors - aka the one we show to the screen
import moment from 'moment';

// timestamps - dates
// are any positive or negative integer value ex. 204, -30, 2000

// like our year system the'yre counting based off some metric
// timestamps are counting in milliseconds

// what does time stamp 0 represent
// It represents January 1st, 1970 midnight (known as unix epic or epoch)
// this specific date is the starting point for all of our timestamps

// so positive numbers are gonna come afterwards
// negative numbers are going to be before

// we are going to be using timestamps as a way to store t
//imezone independent time data


// GET VISIBLE EXPENSES
// we are just going to pass the data into a single function
// it is going to filter & sort the data returning the visible expenses
// & thats what we will be able to show to the screen

// we have to destructure the filters creating vars for the invidual ones
 const getVisibleExpenses = (expenses, {text = '', sortBy, startDate,endDate}) => {
  // use .filter to return a subset of all the expenses
  return expenses.filter( (expense) => { //
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
// check if user provided startDate, return true if there isnt since we dont want
// filtering to occur
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true ;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    //  includes method checks a given match inside of strings
    // convert both strings to lower case to create a case insensitive search

// we use sort on arrays
// ok to use sort directly when it comes to sorting simple strings
// but for arrays of more complex data like objext there is no inherent sorting value
// we are going to need to define whats known as a compare function
// this lets us write a lil code to determine which item should come first
// we return -1 if a shold come first
// we return 1 if b should come first
// sort like filter gets called on the array and it returns the array

    // if all of these are true, we have a complete match & we want to return
    // true from filter
    return startDateMatch && endDateMatch && textMatch
    // if all these are true then the item will be kept in the array
  }).sort((a, b) => {
    if (sortBy === 'date') {
      // if a.createdAt is less than b.created we can go ahead and toss b first
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      // put the ones with a greater amount first
      return a.amount >= b.amount ? -1 : 1;
    }
  })
};


export default getVisibleExpenses;
