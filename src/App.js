import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/header';
import Footer from './components/footer';
import Registration from './components/registration';
import Login from './components/login';
import Dashboard from './components/dashboard';
import ForgotPassword from './components/forgotPassword';
import Products from './components/products';
import ProductDetail from './components/ProductDetail';
import CartProducts from './components/CartProducts';
import Address from './components/my-account/Address';
import Orders from './components/my-account/Orders';
import Profile from './components/my-account/Profile';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';
import Routes from './routing/Routes';
// import AllRoutes from './routing/AllRoutes';

function App() {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Switch>    
            <Route exact path="/" component={Login} />
            <Route component={Routes} /> 
            {/* <AllRoutes />        */}
            {/* {/* <Route exact path="/" component={Login} />*} */}
            {/* <Route component={Routes} />
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Registration} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path={'/forgot-password' || '/recover-password'} component={ForgotPassword} />
            <Route exact path='/products' component={Products} />
            <Route exact path={'/product/:id'} component={ProductDetail} />
            <Route exact path={'/cart-products'} component={CartProducts} />
            <Route exact path={'/orders'} component={Orders} />
            <Route exact path={'/account/'} component={Profile} />
            <Route exact path={'/account/orders'} component={Orders} />
            <Route exact path={'/account/address'} component={Address} /> */}
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
