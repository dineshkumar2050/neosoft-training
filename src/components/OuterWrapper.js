import React from 'react';
import PropTypes from 'prop-types';

export default function OuterWrapper({ children, isGridLayout, containerClass }) {
    return (
        <div className={containerClass || 'container'}>
            {
                isGridLayout ?
                <div className='row'>
                    {children}
                </div> :
                {children}
            }
        </div>
    )
}

OuterWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    isGridLayout: PropTypes.bool,
    containerClass: PropTypes.string
}
