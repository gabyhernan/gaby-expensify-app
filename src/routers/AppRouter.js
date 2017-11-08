import React from 'react';
import { Router, Route, Switch , Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import Header from "../components/Header";
import PrivateRoute from './PrivateRoute';




// set up Private Route in place of Route for pages user not allowed
// if they are not logged in

export const history = createHistory();



const AppRouter = () => (
    <Router history={history}>
  <div>
  <Header />
  <Switch>
  <Route path="/" component={LoginPage} exact={true} />
  <Route path="/dashboard" component={ExpenseDashboardPage}/>
  <Route path="/create" component={AddExpensePage}  />
  <Route path="/edit/:id" component={EditExpensePage}  />
  <Route path="/help" component={HelpPage} />
  <Route component={NotFoundPage} />
  </Switch>
  </div>
  </Router>

  );

export default AppRouter;



// React router isn't going to render anything visible when we use it
// Have to specify individual Routes inside of Router component

