import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './productItem.scss';
import Chair from '../assets/chair.webp';
import PropTypes from 'prop-types';
import Ratings from './Ratings';
import { connect } from 'react-redux';
import { addProductToCart, getCartProducts } from '../actions/cart';
import BootstrapSpinner from '../layout/BootstrapSpinner';
import AddRemoveButton from './AddRemoveButton';

const ProductItem = ({ cartData, addProductToCart, getCartProducts, item, keyVal, name, src, price, rating, className }) => {
    const [loading, setLoading] = useState(null);
    const { allProductsQuantity, products } = cartData;
    const [productCount, setProductCount] = useState(null || 0);
    const addToCart = async (e,id,type=null,quantity=null) => {
        e.preventDefault();
        setLoading(true);
        if(type === 'increment'){
            await addProductToCart({ productId: id, quantity: quantity + 1 })
        } else if(type === 'decrement'){
            await addProductToCart({ productId: id, quantity: quantity - 1 })
        } else {
            await addProductToCart({ productId: id, quantity: 1 })
        }
        getCartProducts();
        setLoading(false);
    }
    useEffect(() => {
        let product = products && products.length > 0 && products.find(product => product.productId._id === keyVal);
        console.log('product',product);
        if(product){
            setProductCount(product.quantity);
        }
    },[allProductsQuantity]);
    console.log('cartData -> ',cartData,products,keyVal);
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
                            productCount > 0 ?
                            <AddRemoveButton
                                quantity={productCount} 
                                loading={loading} 
                                setQuantity={addToCart}
                                productId={keyVal}
                                containerClass={'justify-content-center'}
                            /> : 
                            <>
                                {
                                    loading ? 
                                    <BootstrapSpinner /> : 
                                    <button 
                                        onClick={e => addToCart(e,keyVal)} 
                                        type='button' 
                                        className='py-2 px-4 my-1 btn-primary'>Add to Cart
                                    </button>
                                }
                            </>
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
