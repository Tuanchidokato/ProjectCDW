
import React from 'react'

import Home from './containers/homePage/Home'
import Login from './containers/Login/Login';
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
      <div>
        <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
          <Route  path='/Login'  component={Login} />
          <Route path='/SignUp'  component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
