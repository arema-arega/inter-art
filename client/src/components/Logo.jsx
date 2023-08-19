import React from 'react';
import { clsx } from 'clsx'; 
import { Image } from "@nextui-org/react";


const Logo = ({ children, currentScreenSize }) => {
    // Calculate the percentage based on the currentScreenSize
    const percentage = Math.min(currentScreenSize / 12, 100); // Adjust the divisor as needed

    return (
        <div>
            <Image
                className={clsx("logo-class-name", "other-class-names")}
                src="/logoInterArt.svg"
                alt="Logo"
                isZoomed
                sizes={`(max-width: ${currentScreenSize}px) 20vw, 5vw`}
                width={percentage + '%'}
                height={percentage + '%'}
                radius='full'
                shadow='lg'
                
                layout="responsive"
                
            />




            {children}
        </div>
    );
}

export default Logo;
