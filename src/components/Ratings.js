import React from 'react';
import PropTypes from 'prop-types';

function Ratings({ rating, className, ...props }) {
    let arr = [1,2,3,4,5];
    const val = Math.floor(rating);
    return (
        <div className={`ratings ${className}`}>
            {
                arr.map((item,index) => {
                    return(
                        <>
                        {
                            val >= item ?
                            <span key={index} className="iconify mr-2" data-icon="emojione:star" data-inline="false"></span> :
                            <span key={index} className="iconify" data-icon="ant-design:star-outlined" data-inline="false"></span>
                        }
                        </>
                    )
                })
            }
        </div>
    )
}

Ratings.propTypes = {
    rating: PropTypes.number,
    className: PropTypes.string
}

export default Ratings
