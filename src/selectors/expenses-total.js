// hadd arrays of expenses
// look into map and reduce
// default of 0 for no expenses

export const selectExpensesTotal = (expenses) => {
return expenses
    .map((expense) => expense.amount)
    .reduce( (sum, currentExpense) => sum + currentExpense ,0); // setting 0 as initial accumulator/ default
};


