import React from 'react';
import { NavLink } from 'react-router-dom';



const Header = () => (
  <header>
    <h1> Expensify </h1>
    <NavLink to="/" activeClassName="is-active" exact={true}> Dashboard </NavLink>
  {/* activeClassName lets us provide a class that is only going to get applied
  to the link when we are on that page  */}
     <NavLink to="/create" activeClassName="is-active" > Create Expense </NavLink>

   </header>
  );

export default Header;
