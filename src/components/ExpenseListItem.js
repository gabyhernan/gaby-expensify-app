import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';


//  destructuring props object & get indivual things off from it
 const ExpenseListItem = ({ description, amount, createdAt , id}) => (
  <div>
    <Link to={`/edit/${id}`}>
    <h3> {description} </h3>     </Link>
    <p> {numeral(amount / 100).format('$0,0.00')}
        -
      {moment(createdAt).format('MMMM Do, YYYY')} </p>

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
