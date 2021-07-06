import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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

function AllRoutes({ isAuthenticated, ...props }) {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/register' component={Registration} />
                    <Route exact path={'/forgot-password' || '/recover-password'} component={ForgotPassword} />
                    {
                        isAuthenticated ?
                        <> 
                        <Route exact path='/dashboard' component={Dashboard} />                    
                        <Route exact path='/products' component={Products} />
                        <Route exact path={'/product/:id'} component={ProductDetail} />
                        <Route exact path={'/cart-products'} component={CartProducts} />
                        <Route exact path={'/orders'} component={Orders} />
                        <Route exact path={'/account/'} component={Profile} />
                        <Route exact path={'/account/orders'} component={Orders} />
                        <Route exact path={'/account/address'} component={Address} />
                        </> : 
                        <Redirect to={'/'} />
                    }  
                </Switch>    
            </Router>   
        </>
    )
}

AllRoutes.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated
})

export default connect( mapStateToProps )(AllRoutes);
