import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import './productItem.scss';
import Chair from '../assets/chair.webp';
import PropTypes from 'prop-types';
import Ratings from './Ratings';
import { connect } from 'react-redux';
import { addProductToCart, getCartProducts } from '../actions/cart';
import BootstrapSpinner from '../layout/BootstrapSpinner';

const ProductItem = ({ cartData, addProductToCart, getCartProducts, item, keyVal, name, src, price, rating, className }) => {
    const [loading, setLoading] = useState(null);
    const addToCart = async (e,id) => {
        e.preventDefault();
        setLoading(true);
        await addProductToCart({ productId: id, quantity: 1 })
        getCartProducts();
        setLoading(false);
    }
    console.log('cartData -> ',cartData)
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
                        {
                            loading ? 
                            <BootstrapSpinner /> : 
                            <button 
                                onClick={e => addToCart(e,keyVal)} 
                                type='button' 
                                className='py-2 px-4 my-1 btn-primary'>Add to Cart
                            </button>
                        }                        
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
    item: PropTypes.object,
    addProductToCart: PropTypes.func,
    getCartProducts: PropTypes.func,
    cartData: PropTypes.array
}

const mapStateToProps = state => ({
    cartData: state.cart
})

export default connect( mapStateToProps, { addProductToCart, getCartProducts } )(ProductItem);
