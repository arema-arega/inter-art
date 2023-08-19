import { clsx } from 'clsx';
import React from 'react';
import "./button.css";



export const Button = ({ children,className}) => {
    return (
        <div className="div_butoon">
        <button className={clsx("button", className)}>
            {children}
       </button>
            
            </div> 
    );
}
