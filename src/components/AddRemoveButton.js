import React from 'react';
import PropTypes from 'prop-types';
import './AddRemoveButton.css';
import Button from './button';
import BootstrapSpinner from '../layout/BootstrapSpinner';

function AddRemoveButton({ quantity, containerClass, productId, loading, setQuantity ,...props }) {
    const addProduct = (e,id,type,quantity) => {
        e.preventDefault();
        if(type === 'increment'){
            setQuantity(e,id,type,quantity);
        } else if(type === 'decrement'){
            if(quantity > 0) setQuantity(e,id,type,quantity);
        }
    }
    return (
        <div className={`d-flex align-items-center ${containerClass}`}>
            <Button 
                className={'change-button'} 
                content={'-'} 
                type={'button'} 
                onClick={e => addProduct(e,productId,'decrement',quantity)} 
            />
            {
                loading ? 
                <BootstrapSpinner /> :
                <span className={'quantity px-2 mx-2'}>{quantity}</span>
            }
            <Button 
                className={'change-button'} 
                content={'+'} 
                type={'button'} 
                onClick={e => addProduct(e,productId,'increment',quantity)} 
            />
        </div>
    )
}

AddRemoveButton.propTypes = {
    quantity: PropTypes.number,
    setQuantity: PropTypes.func,
    loading: PropTypes.bool,
    productId: PropTypes.string,
    containerClass: PropTypes.string
}

export default AddRemoveButton;
