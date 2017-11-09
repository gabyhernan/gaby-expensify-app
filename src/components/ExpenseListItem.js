import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';


//  destructuring props object & get indivual things off from it
 const ExpenseListItem = ({ description, amount, createdAt , id}) => (
    <Link to={`/edit/${id}`} className="list-item">
    <div> {/* left side of table */}
    <h3 className="list-item__title"> {description} </h3>
    <span className="list-item__sub-title"> {moment(createdAt).format('MMMM Do, YYYY')} </span>
    </div>

     <h3 className="list-item__data"> {/* right side of table */}
     {numeral(amount / 100).format('$0,0.00')}
     </h3>

      </Link>
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
