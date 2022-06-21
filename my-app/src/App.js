
import React from 'react'

import Home from './containers/homePage/Home'
import Login from './containers/Login/Login';
import ProductDetail from './containers/productdetail/ProductDetail';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import SignUp from './containers/SignUp/SignUp';
function App() {

  return (
    <Router >
      <Link to="/home"></Link>
      <div>
        <Switch>
          <Route path='/Login' component={Login} />
          <Route path='/SignUp' component={SignUp} />
          <Route path='/ProductDetail/:id' component={ProductDetail} />
          <Route path={["/home", "/"]} >
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
