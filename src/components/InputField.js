import React from 'react';
import './InputField.css';

export default function InputField({type,placeholder,name,handleChange,style}){
    return(
        <input 
            name={name} 
            style={style} 
            type={type} 
            placeholder={placeholder} 
            onChange={handleChange} 
        />
    )
}
