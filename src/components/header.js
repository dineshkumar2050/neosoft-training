import React,{ useState } from 'react';
import './header.css';

const Header = () => {
    const [isOpen,setIsOpen] = useState(true);
    const menuOpen = e => {
        e.preventDefault();
        setIsOpen(!isOpen);
        const ele = document.getElementsByTagName('body');
        ele[0].classList.toggle('hide');
    }
    return(
        <header>
            <div className="brand">
                <h2>Neo<span className="highlight">STORE</span></h2>
            </div>
            <div className="navbar">
                <ul id='menu-list' className={`show-on-mobile ${isOpen ? '' : 'shift-left'}`}>
                    <li>Home</li>
                    <li>Products</li>
                    <li>Order</li>
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
