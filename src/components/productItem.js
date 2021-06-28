import React from 'react';
import { Link } from 'react-router-dom';
import './productItem.scss';
import Chair from '../assets/chair.webp';
import PropTypes from 'prop-types';
import Ratings from './Ratings';

const ProductItem = ({item, keyVal, name, src, price, rating, className}) => {
    const addToCart = (e) => {
        e.preventDefault();
    }
    return(
        <>
        {
            item &&
            <Link key={keyVal} to={{ pathname: `/product/${keyVal}`, state: { data: item } }}>
                <div className={`card text-center py-2 px-3 ${className}`}>
                    <div className='top-part mb-2'>
                        <div className='img'>
                            <img src={src} onError={e => e.target.src=`${Chair}`} alt={name} />
                        </div>
                        <h4 className={'item-price'}>{name}</h4>
                    </div>
                    <div className='bottom-part'>
                        <h4>&#x20B9;{price}</h4>
                        <button onClick={addToCart} type='button' className='py-2 px-4 my-1 btn-primary'>Add to Cart</button>
                        <Ratings rating={rating} />
                    </div>
                </div>
            </Link>
        }
        </>
    )
}

ProductItem.propTypes = {
    keyVal: PropTypes.string,
    name: PropTypes.string,
    src: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number, 
    className: PropTypes.string,
    item: PropTypes.object
}

export default ProductItem;
