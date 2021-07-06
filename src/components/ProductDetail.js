import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './ProductDetail.scss';
import Ratings from './Ratings';
import './ProductDetail.scss';
import Button from './button';
import MagnifyImage from './MagnifyImage';
import { addProductToCart, getCartProducts } from '../actions/cart';
import { connect } from 'react-redux';

function ProductDetail({match,getCartProducts,cart, addProductToCart, ...props}) {
    const params = useParams();
    const location = useLocation();
    const { params : { id } } = match;
    const { state } = location;
    const { description, avgRating, price, color, features, name, mainImage, subImages, subImagesUrl } = state && state.data;
    const addToCart = (e) => {
        e.preventDefault();
        addProductToCart({ productId: id, quantity: 1 });
    };
    const rateProduct = e => {
        e.preventDefault();
    };
    return (
        <div id={id} className='product-detail container'>
            <div className='row'>
                <div className='top-section row'>
                    <div className='left-section text-md-right col-md-6'>
                        <div className='carousel text-center'>
                            <Carousel>
                                {
                                    subImages && subImages.length > 0 && subImages.map((item,index) => {
                                        return(
                                            <div className='text-center' key={index}>
                                                {
                                                    item &&
                                                    <MagnifyImage 
                                                        src={item}
                                                        onError={ e => e.target.src=`${mainImage}`} 
                                                        alt={name} 
                                                    />
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>  
                    </div>
                    <div className='right-section col-md-6'>
                        <h2 className='product-name '>{name}</h2>
                        <Ratings rating={avgRating} className={'pb-2 mb-2 border-bt'} />
                        <div className='price-info d-flex align-items-center'>
                            <span className='label'>{'Price : '}</span>
                            <span className='price'>&#8377;{` ${price}`}</span>
                        </div>
                        <div className='color-info mb-3 d-flex align-items-center'>
                            <span className='label'>{'Color  : '}</span>
                            <span className='color'></span>
                        </div>
                        <div className='d-flex align-items-center mr-2 share'>
                            <span className={'text-lg label'}>{'Share  '}</span>
                            <span className="iconify" data-icon="bx:bxs-share-alt" data-inline="false"></span>
                        </div>
                        <div className='social-icons d-flex align-items-center flex-wrap mb-3'>
                            <span className='icon facebook mb-3'>
                                <span className="iconify" data-icon="ant-design:facebook-filled" data-inline="false"></span>
                            </span>
                            <span className='icon google mb-3'>
                                <span className="iconify" data-icon="ant-design:google-outlined" data-inline="false"></span>
                            </span>
                            <span className='icon whatsapp mb-3'>
                                <span className="iconify" data-icon="logos:whatsapp" data-inline="false"></span>
                            </span>
                            <span className='icon pinterest mb-3'>
                                <span className="iconify" data-icon="bx:bxl-pinterest-alt" data-inline="false"></span>
                            </span>
                            <span className='icon twitter mb-3'>
                                <span className="iconify" data-icon="openmoji:twitter" data-inline="false"></span>
                            </span>
                        </div>
                        <div className='buttons d-flex align-items-center flex-wrap'>
                            <Button className={'add-to-cart px-3 py-2 mb-2'} content={'ADD TO CART'} type='button' onClick={addToCart} />
                            <Button className={'rate-product px-3 py-2 mb-2'} content={'RATE PRODUCT'} type='button' onClick={rateProduct} />
                        </div>
                    </div>
                </div>
                <div className='bottom-section'>
                    <ul className="nav nav-tabs navlist" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active nav-button" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab" aria-controls="description" aria-selected="true">Description</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link nav-button" id="features-tab" data-bs-toggle="tab" data-bs-target="#features" type="button" role="tab" aria-controls="features" aria-selected="false">Features</button>
                        </li>
                    </ul>
                    <div className="tab-content mt-3" id="myTabContent">
                        <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                            {description}
                        </div>
                        <div className="tab-pane fade" id="features" role="tabpanel" aria-labelledby="features-tab">
                            {features}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart
})

ProductDetail.propTypes = {
    match: PropTypes.object,
    addProductToCart: PropTypes.func,
    getCartProducts: PropTypes.func,
    cart: PropTypes.object
}

export default connect( mapStateToProps , { addProductToCart })(ProductDetail);
