/*
Button: 
This Component is used through all the app components
it is using a CSS file "./button.css"
with the different customizations  

*/

import { clsx } from 'clsx';
import React from 'react';
import "./button.css";



export const Button = ({ children, className}) => {
    return (
        <div className="div_butoon">
        <button className={clsx("button", className)}>
            {children}
       </button>
            
            </div> 
    );
}
