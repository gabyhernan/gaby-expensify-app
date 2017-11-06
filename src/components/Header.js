import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';



export const Header = ({ startLogout}) => (
  <header>
    <h1> Expensify </h1>
    <NavLink to="/" activeClassName="is-active" exact={true}> Dashboard </NavLink>
  {/* activeClassName lets us provide a class that is only going to get applied
  to the link when we are on that page  */}
     <NavLink to="/create" activeClassName="is-active" > Create Expense </NavLink>
     <button onClick={startLogout}> Logout </button>
   </header>
  );

const mapDispatchToProps = (dispatch) => ({
  startLogout: () =>  dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
