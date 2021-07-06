import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Alert from '../layout/Alert';
import Registration from '../components/registration';
import Login from '../components/login';
import Dashboard from '../components/dashboard';
import ForgotPassword from '../components/forgotPassword';
import Products from '../components/products';
import ProductDetail from '../components/ProductDetail';
import CartProducts from '../components/CartProducts';
import Address from '../components/my-account/Address';
import Orders from '../components/my-account/Orders';
import Profile from '../components/my-account/Profile';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = props => {
  return (
    <section className="container">
      {/* <Alert /> */}
      <Switch>
        <Route exact path="/register" component={Registration} />
        <Route exact path="/" component={Login} />
        <Route exact path={'/forgot-password' || '/recover-password'} component={ForgotPassword} />
        <PrivateRoute exact path='/products' component={Products} />
        <PrivateRoute exact path={'/product/:id'} component={ProductDetail} />
        <PrivateRoute exact path={'/cart-products'} component={CartProducts} />
        <PrivateRoute exact path={'/orders'} component={Orders} />
        <PrivateRoute exact path={'/account/'} component={Profile} />
        <PrivateRoute exact path={'/account/orders'} component={Orders} />
        <PrivateRoute exact path={'/account/address'} component={Address} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} /> 
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
