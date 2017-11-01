import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';


// Export a stateless functional component
// description , amount, createdAt
// map through items in ExpenseList


// i can destructure props object & het indivual things off from it
 const ExpenseListItem = ({ description, amount, createdAt , id}) => (
  <div>
    <Link to={`/edit/${id}`}>
    <h3> Description  {description} </h3>     </Link>
    <p> {amount} -  {createdAt} </p>

   </div>
  );

// make remove button work
// going to need to import correct action generator
// gonna have to connect this comp to store to access dispatch
// then gonna have to wire up on click to get everything working

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses
  }
}


export default ExpenseListItem;
