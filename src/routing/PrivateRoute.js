import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({
  component: Component,
  login: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      loading ? 
        <Spinner />
      : isAuthenticated ? 
        <Component {...props} />
      : 
        <Redirect to="/" />      
    }
  />
);

PrivateRoute.propTypes = {
  login: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps)(PrivateRoute);
