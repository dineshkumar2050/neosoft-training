import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HorizontalTimeline from './HorizontalTimeline';
import './CartProducts.css';
import Button from './button';
import { getCartProducts } from '../actions/cart';
import { connect } from 'react-redux';
import Chair from '../assets/chair.webp';
import AddRemoveButton from './AddRemoveButton';

function CartProducts({ data,getCartProducts,...props }) {
    const [cartData, setCartData] = useState([]);
    const [screenSize, setScreenSize] = useState()
    let [quantity, setQuantity] = useState(3);
    useEffect(() => {
        const resizeEvent = () => {
            setScreenSize(window.innerWidth);
        }
        window.addEventListener('resize', resizeEvent);
        resizeEvent();
        return () => window.removeEventListener('resize', resizeEvent);
    },[window.innerWidth]);
    useEffect(() => {
        getCartProducts();
    },[]);
    useEffect(() => {
        if(data && data.data && data.data.data && data.data.data.orders && data.success && !data.loading && !data.error){
            setCartData([...data.data.data.orders]);
        }
    },[cartData]);
    const proceedToPay = e => {
        e.preventDefault();
    }
    const deleteBtn = e => {
        e.preventDefault();
    }
    console.log('cartdata', cartData, screenSize);
    return (
        <div className={'cart-products'}>
            <div className={'container'}>
                <HorizontalTimeline timeline={['Cart','Delivery Address','Orders']} />
                <div className='content'>
                    <div className={'row'}>
                        <div className={'left-section col-lg-9 mb-sm-0 mb-5'}>
                            {
                                screenSize > 575 ?
                                <div className={'inner-content '}>
                                    <div style={{ borderBottom: '1px solid #888' }} className={'p-3'}>
                                        <ul className={'labels'}>
                                            <li style={{ minWidth: '250px' }}>Product</li>
                                            <li>Quantity</li>
                                            <li>Price</li>
                                            <li>Total</li>
                                            <li>Action</li>
                                        </ul>
                                    </div>
                                    <div className={'all-products p-3'}>
                                        <ul className={'list-of-products'}>
                                            <li className={'list-of-products-item'}>
                                                <div style={{ minWidth: '250px' }} className={'product-main-info d-flex align-items-center'}>
                                                    <img src={Chair} onError={e => e.target.src=`${Chair}`} alt={'chair'} />
                                                    <div className={'product-info'} style={{ marginLeft: '15px' }}>
                                                        <div className={'product-name'}>Winchester Fabric Sofa</div>
                                                        <div className={'added-by'}>by Winchester Pvt. Ltd</div>
                                                        <div className={'status'}>
                                                            {'Status : '}
                                                            <span className={'status-info'}>In stock</span>    
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={'product-quantity d-flex align-items-center'}>
                                                    <AddRemoveButton setQuantity={setQuantity} quantity={quantity} />
                                                </div>
                                                <div className={'price d-flex align-items-center'}>
                                                    {'59999'}
                                                </div>
                                                <div className={'total d-flex align-items-center'}>
                                                    {'119998'}
                                                </div>
                                                <div className={'del-button d-flex align-items-center'}>
                                                    <Button 
                                                        type={'button'} 
                                                        onClick={deleteBtn}
                                                        children={<span className="iconify" data-icon="ant-design:delete-outlined" data-inline="false"></span>}    
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div> :
                                <div className={'inner-content '}>
                                    <h2 className={'p-3 ml-3'}>Products</h2>
                                    <div className={'all-products p-3'}>
                                        <ul className={'list-of-products'}>
                                            <li className={'list-of-products-item d-flex justify-content-between align-items-center'}>
                                                <div style={{ minWidth: '250px' }} className={'product-main-info d-flex align-items-center'}>
                                                    <img src={Chair} onError={e => e.target.src=`${Chair}`} alt={'chair'} />
                                                    <div className={'product-info'} style={{ marginLeft: '15px' }}>
                                                        <div className={'product-name'}>Winchester Fabric Sofa</div>
                                                        <div className={'added-by'}>by Winchester Pvt. Ltd</div>
                                                        <div className={'status'}>
                                                            {'Status : '}
                                                            <span className={'status-info'}>In stock</span>    
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={'product-quantity '}>
                                                    <AddRemoveButton setQuantity={setQuantity} quantity={quantity} />
                                                    <div className={'price'}>
                                                        {'59999'}
                                                    </div>
                                                    <div className={'total'}>
                                                        {'119998'}
                                                    </div>
                                                    {/* <div className={'del-button d-flex align-items-center'}>
                                                        <Button 
                                                            type={'button'} 
                                                            onClick={deleteBtn}
                                                            children={<span className="iconify" data-icon="ant-design:delete-outlined" data-inline="false"></span>}    
                                                        />
                                                    </div> */}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            }                            
                        </div>
                        <div className={'right-section col-lg-3'}>
                            <div className={'inner-content'}>
                                <h2 className={'p-3 ml-3'}>Review Order</h2>
                                <div style={{ borderBottom: '1px solid #888' }} className={'subtotal px-3 pb-3 mb-2 info d-flex justify-content-between align-items-center'}>
                                    <span>Subtotal</span>
                                    <span>159998</span>
                                </div>
                                <div className={'subtotal p-3 my-2 info d-flex justify-content-between align-items-center'}>
                                    <span>GST(5%)</span>
                                    <span>8000</span>
                                </div>
                                <div className={'subtotal px-3 pb-2 my-2 info d-flex justify-content-between align-items-center'}>
                                    <span>Order Total</span>
                                    <span>167998</span>
                                </div>
                                <div className={'p-3'}>
                                    <Button 
                                        content={'Proceed To Buy'} 
                                        type={'button'} 
                                        onClick={proceedToPay}
                                        className={'btn-primary btn-lg w-100'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CartProducts.propTypes = {
    getCartProducts: PropTypes.func,
    data: PropTypes.object
}

const mapStateToProps = (state) => ({
    data: state.cart
})

export default connect( mapStateToProps ,{ getCartProducts })(CartProducts);
