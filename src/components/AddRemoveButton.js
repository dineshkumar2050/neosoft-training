import React from 'react';
import PropTypes from 'prop-types';
import './AddRemoveButton.css';
import Button from './button';

function AddRemoveButton({ quantity, setQuantity ,...props }) {
    const addProduct = (e,type) => {
        e.preventDefault();
        if(type === 'increment'){
            setQuantity(++quantity);
        } else if(type === 'decrement'){
            if(quantity > 0) setQuantity(--quantity);
        }
    }
    return (
        <div className={'d-flex align-items-center'}>
            <Button 
                className={'change-button'} 
                content={'-'} 
                type={'button'} 
                onClick={e => addProduct(e,'decrement')} 
            />
            <span className={'quantity px-2 mx-2'}>{quantity}</span>
            <Button 
                className={'change-button'} 
                content={'+'} 
                type={'button'} 
                onClick={e => addProduct(e,'increment')} 
            />
        </div>
    )
}

AddRemoveButton.propTypes = {
    quantity: PropTypes.number,
    setQuantity: PropTypes.func
}

export default AddRemoveButton;
