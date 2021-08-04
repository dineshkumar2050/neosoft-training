import React,{ useState, useEffect } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useHistory, Redirect } from 'react-router-dom';
import store from '../store';
import { LOGOUT } from '../actions/types';
import { connect } from 'react-redux';
import { getCartProducts } from '../actions/cart';

const Header = ({ login: { isAuthenticated },cart: { allProductsQuantity }, getCartProducts }) => {
    const history = useHistory();
    const [isOpen,setIsOpen] = useState(true);
    const menuOpen = e => {
        e.preventDefault();
        setIsOpen(!isOpen);
        const ele = document.getElementsByTagName('body');
        ele[0].classList.toggle('hide');
    }
    const logout = e => {
        e.preventDefault();
        store.dispatch({ type: LOGOUT });
        return <Redirect to={'/'} />
    }
    const redirect = type => {
        if(isAuthenticated){
            if(type === 'home'){
                history.push({ pathname: '/dashboard' });
            } else if(type === 'products'){
                history.push({ pathname: '/products' });
                // return <Redirect to={'/products'} />
            } else if(type === 'order'){
                history.push({ pathname: '/account/orders' });
            }
        } else {
            history.push({ pathname: '/' });
        }
    }
    useEffect(() => {
        if(isAuthenticated){
            getCartProducts();
        }
    },[isAuthenticated])
    console.log('cart -> ',allProductsQuantity);
    return(
        <header>
            <div className="brand">
                <h2>Neo<span className="highlight">STORE</span></h2>
            </div>
            <div className="navbar">
                <ul id='menu-list' className={`show-on-mobile ${isOpen ? '' : 'shift-left'}`}>
                    <li><a onClick={() => redirect('home')}>Home</a></li>
                    <li><a onClick={() => redirect('products')}>Products</a></li>
                    <li><a onClick={() => redirect('order')}>Order</a></li>
                </ul>
                <button onClick={menuOpen} type='button' className={`d-sm-none ${isOpen ? 'open-button' : 'close-button'}`}>
                    <span className='top-icon'></span>
                    <span className='middle-icon my-2'></span>
                    <span className='top-icon bottom-icon'></span>
                </button>
            </div>
            <div className="last d-flex justify-content-between align-items-center">
                <div className="search">
                    <form>
                        <input type="search" className="search" placeholder="search.." />
                    </form>
                </div>
                {
                    isAuthenticated &&
                    <>
                        <Link to='/cart-products'>
                            <div className="cart d-sm-inline-block d-none">
                                <span className="iconify" data-icon="ant-design:shopping-cart-outlined" data-inline="false"></span>
                                <span className={'cart-content'}>cart</span>
                                <span className={'cart-products-count'}>{allProductsQuantity}</span>
                            </div>
                        </Link>
                        <div className="dropdown d-sm-inline-block d-none btn-group">
                            <button className="btn p-0 dropdown-toggle d-flex align-items-center py-1" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="iconify" data-icon="ic:sharp-perm-contact-calendar" data-inline="false"></span>
                                {/* <span className="iconify" data-icon="ic:outline-keyboard-arrow-down" data-inline="false"></span> */}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a onClick={() => history.push({ pathname: '/account' })} className="dropdown-item" href="#">Profile</a></li>
                                <li><a onClick={logout} className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </div>
                    </>
                }
            </div>
        </header>
    )
}

Header.propTypes = {
    productsInCart: PropTypes.number,
    cart: PropTypes.object,
    getCartProducts: PropTypes.func
}

const mapStateToProps = state => ({
    login: state.login,
    cart: state.cart    
})

export default connect( mapStateToProps, { getCartProducts } )(Header);
