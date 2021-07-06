import React from 'react';
import PropTypes from 'prop-types';

function BootstrapSpinner({ ...props }) {
    return (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

BootstrapSpinner.propTypes = {

}

export default BootstrapSpinner;
