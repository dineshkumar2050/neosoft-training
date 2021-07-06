import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import Address from './Address';
import Orders from './Orders';

import './Orders.css';
import Chair from '../../assets/chair.webp';
import Button from '../button';
import { connect } from 'react-redux';
import { getOrders } from '../../actions/orders';
import { Link } from 'react-router-dom';

function Account({ ...props }) {
    return (    
        <>
        <h2>All account routes running</h2>    
        {/* <Router> */}
            <Switch>
                <Route exact path={'/'} component={Profile} />
                <Route exact path={'/orders'} component={Orders} />
                <Route exact path={'/address'} component={Address} />
                <Route exact path={'/change-password'} component={ChangePassword} />
            </Switch>
        {/* </Router> */}
        </>        
    )
}

Account.propTypes = {

}

export default Account

