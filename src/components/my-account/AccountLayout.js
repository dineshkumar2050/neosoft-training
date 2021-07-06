import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AccountLayout.css';
import Chair from '../../assets/chair.webp';
import { Link } from 'react-router-dom';

function AccountLayout({ children, ...props }) {
    let elem = document.getElementsByClassName('profile-image');
    let [elementWidth, setElementWidth] = useState(elem && elem[0] && elem[0].offsetWidth);
    useEffect(() => {
        const resizeEvent = () => {
            setElementWidth(elem && elem[0] && elem[0].offsetWidth);
        }
        window.addEventListener('resize', resizeEvent);
        resizeEvent();
        return () => window.removeEventListener('resize', resizeEvent);
    },[]);
    return (
        <div className={'orders'}>
            <div className={'container'}>
                <h2 className={'account-heading py-3'}>My Account</h2>
                <div className={'order-content mt-4'}>
                    <div className='row'>
                        <div className='col-sm-3 mb-sm-0 mb-4'>
                            <div className='profile-section text-center'>
                                <div className='top-section'>
                                    <div style={{ height: elementWidth }} className={'profile-image mb-3'}>
                                        <img src={Chair} alt={'profile-pic'} onError={e => e.target.src=`${Chair}`} />
                                    </div>
                                    <span className={'person-name'}>Shubham Soni</span>
                                </div>
                                <div className='bottom-section'>
                                    <ul className={'account-options'}>
                                        <li className={'d-flex mb-2 justify-content-center align-items-center'}>
                                            <Link to={'/account/orders'}>
                                                <span className="iconify" data-icon="ri:order-play-fill" data-inline="false"></span>
                                                <span className={'option ml-2'}>Order</span>
                                            </Link>
                                        </li>
                                        <li className={'d-flex mb-2 justify-content-center align-items-center'}>
                                            <Link to={'/account/'}>
                                                <span className="iconify" data-icon="gg:profile" data-inline="false"></span>
                                                <span className={'option ml-2'}>Profile</span>
                                            </Link>                                            
                                        </li>
                                        <li className={'d-flex mb-2 justify-content-center align-items-center'}>
                                            <Link to={'/account/address'}>
                                                <span className="iconify" data-icon="fa:address-card" data-inline="false"></span>
                                                <span className={'option ml-2'}>Address</span>
                                            </Link>                                            
                                        </li>
                                        <li className={'d-flex justify-content-center align-items-center'}>
                                            <Link to={'/forgot-password'}>
                                                <span className="iconify" data-icon="carbon:arrows-horizontal" data-inline="false"></span>
                                                <span className={'option ml-2'}>Change Password</span>
                                            </Link>                                            
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={'col-sm-9'}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

AccountLayout.propTypes = {
    children: PropTypes.node
}

export default AccountLayout
