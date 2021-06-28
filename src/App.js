import React, { Fragment } from 'react';
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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Registration} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path={'/forgot-password' || '/recover-password'} component={ForgotPassword} />
            <Route exact path='/products' component={Products} />
            <Route exact path={'/product/:id'} component={ProductDetail} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
