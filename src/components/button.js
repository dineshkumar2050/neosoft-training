import React from 'react';
import './button.css';

export default function Button({content,children,type,className,onClick,...props}){
    return(
        <button onClick={onClick} type={type} className={className}>
            {content || children}
        </button>
    )
}
