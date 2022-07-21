
import React from 'react'

import Home from './containers/homePage/Home'
import Login from './containers/Login/Login';
import ProductDetail from './containers/productdetail/ProductDetail';
import Cart from './containers/Cart/Cart';
import CartInfo from './containers/Cart/CartInfo';
import SearchBook from "./components/Elements/SearchBook";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import SignUp from './containers/SignUp/SignUp';
import AdminDashBoard from './containers/adminDashBoard/AdminDashBoard';
import authService from './services/auth.service';
import ColDashBoard from './components/DashBoard/ColDashBoard';
function App() {
  const checkRoles=()=>{
    const currentUser = authService.getCurrentUser();
    let role = currentUser.roles
    return role.includes("ROLE_ADMIN"); 
}
  return (
    <Router >
      <Link to="/home"></Link>
      <div>
        <Switch>
          <Route path='/Login'  >
            <Login />
          </Route>
          <Route path='/AdminDashBoard' render={()=>(checkRoles()? (<AdminDashBoard />) : (<Home/>))}  />
          <Route path='/SignUp' component={SignUp} />
          <Route path='/ProductDetail/:id' component={ProductDetail} />
          <Route path='/Search/:search' component={SearchBook} />

          <Route path={["/home", "/"]} >
            <Home />
            <Route path='/Cart' component={Cart} />
            <Route path='/CartInfo' component={CartInfo} />
          </Route>

          <Route path='/ColDashBoard' component={ColDashBoard} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
