import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Orders.css';
import Chair from '../../assets/chair.webp';
import Button from '../button';
import { connect } from 'react-redux';
import { getOrders } from '../../actions/orders';
import AccountLayout from './AccountLayout';

function Orders({ data, getOrders, ...props }) {
    const [orderData, setOrderData] = useState([]);
    useEffect(() => {
        getOrders();
    },[]);
    useEffect(() => {
        if(data && data.data && data.data.data && data.data.data.orders && data.success && !data.loading && !data.error){
            setOrderData([...data.data.data.orders]);
        }
    },[orderData]);
    const downloadPDF = e => {
        e.preventDefault();
    };
    return(
        <AccountLayout>
            <ul className={'orders'}>
                <li className={'single-order p-3 mb-3'}>
                    <div className={'top-order-section py-3'}>
                        <div className={'top-single-order-section mb-2 d-flex align-items-center justify-content-between'}>
                            <div className={'transit d-flex'}>
                                <h3 style={{ color: 'orange', fontWeight: 'bold' }} className={'text-uppercase'}>{'Transit : '}</h3>
                                <span className={'transit value'}>Pending</span>
                            </div>
                            <div className={'order-by'}>
                                <span className={'label'}>{'Order By : '}</span>
                                <span className={'value'}>Dinesh</span>
                            </div>
                            <div className={'order-num'}>
                                <span className={'text-uppercase'}>{'order No : '}</span>
                                <span className={'value'}>1</span>
                            </div>
                        </div>
                        <div className={'bottom-single-order-section'}>
                            <span className={'placed-label'}>{'Placed on : '}</span>
                            <span className={'placed-value'}>
                                {`28/08/2018 / `}
                                <span 
                                    style={{ color: 'green' }} 
                                    className={'green-text'}>
                                        &#8377;69978
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className={'middle-order-section py-3'}>
                        <img src={Chair} alt={'profile-pic'} onError={e => e.target.src=`${Chair}`} />
                    </div>
                    <div className={'bottom-order-section mt-5'}>
                        <Button 
                            content={'Download invoices as PDF'} 
                            className={'btn-primary px-4 py-2'}
                            onClick={downloadPDF}
                            type={'button'}
                        />
                    </div>
                </li>
            </ul>
        </AccountLayout>
    )
}

Orders.propTypes = {
    getOrders: PropTypes.func,
    data: PropTypes.object
}

const mapStateToProps = state => ({
    data: state.Orders
})

export default connect( mapStateToProps, { getOrders } )(Orders);
