import React from 'react';
import PropTypes from 'prop-types';
import AccountLayout from './AccountLayout';
import './Address.css';
import Button from '../button';

function Address({ ...props }) {
    const addAddress = e => {
        e.preventDefault();
    }
    const editAddress = e => {
        e.preventDefault();
    }
    const deleteAddress = e => {
        e.preventDefault();
    }
    return (
        <AccountLayout>
            <div className={'address p-3'}>
                <div className={'top-order-section pb-2'}>
                    <h2>Addresses</h2>
                </div>
                <div className={'middle-order-section py-3'}>
                    <div className={'addresses p-3'}>
                        <div className={'top-section mb-4 d-flex justify-content-between'}>
                            <div className={'left-section d-flex flex-wrap'} style={{ maxWidth: '150px' }}>
                                302 Abhishek Avenue Indore-452010 India
                            </div>
                            <div className={'right-section'}>
                                <Button 
                                    children={<span className="iconify" data-icon="emojione:cross-mark-button" data-inline="false"></span>} 
                                    className={'cross-button'}
                                    onClick={deleteAddress}
                                    type={'button'}
                                />
                            </div>
                        </div>
                        <Button 
                            content={'Edit'} 
                            className={'btn-primary px-4 py-2'}
                            onClick={editAddress}
                            type={'button'}
                        />
                    </div>
                </div>
                <div className={'bottom-order-section mt-5'}>
                    <Button 
                        content={'Add Address'} 
                        className={'btn-primary px-4 py-2'}
                        onClick={addAddress}
                        type={'button'}
                    />
                </div>
            </div>
        </AccountLayout>
    )
}

Address.propTypes = {

}

export default Address
