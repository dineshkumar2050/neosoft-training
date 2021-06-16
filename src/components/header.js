import React from 'react';
import './header.css';

const Header = () => {
    return(
        <header>
            <div className="brand">
                <h2>Neo<span className="highlight">STORE</span></h2>
            </div>
            <div className="navbar">
                <ul>
                    <li>Home</li>
                    <li>Products</li>
                    <li>Order</li>
                </ul>
            </div>
            <div className="last d-flex justify-content-between align-items-center">
                <div className="search">
                    <form>
                        <input type="search" className="search" placeholder="search.." />
                    </form>
                </div>
                <div className="cart d-sm-inline-block d-none">
                    <span className="iconify" data-icon="ant-design:shopping-cart-outlined" data-inline="false"></span><span>cart</span>
                </div>
                <div className="dropdown d-sm-inline-block d-none">
                    <span className="iconify" data-icon="ic:sharp-perm-contact-calendar" data-inline="false"></span><span className="iconify" data-icon="ic:outline-keyboard-arrow-down" data-inline="false"></span>
                </div>
            </div>
        </header>
    )
}

export default Header;
