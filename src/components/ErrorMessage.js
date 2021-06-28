import React from 'react';
import './ErrorMessage.css';

export default function ErrorMessage({message,className,style,...props}){
    return(
        <span className={`error ${className}`} style={style}>
            {message}
        </span>
    )
}
