/*
The ScreenSize component is used as a prop
that the app parent sends to:
- AudioVisualizer component
- to the Logo component



Here's a list of common screen sizes used for responsive design breakpoints:

Mobile Phones:

Extra Small (XS): Less than 576px
Small (SM): 576px to 767px
Tablets:

Medium (MD): 768px to 991px
Large (LG): 992px to 1199px
Desktops:

Extra Large (XL): 1200px and above
Wide Screen (WS): 1400px and above

*/

import React, { useState, useEffect } from 'react';

const ScreenSize = ({ onScreenSizeChange }) => {
    const [screenSize, setScreenSize] = useState();
    const [breakpoint, setBreakpoint] = useState();
    const [width, setWidth] = useState();
    const breakpoints = {
        XS: 576,
        SM: 767,
        MD: 991,
        LG: 1199,
        XL: 1200,
        WS: 1400
    };

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            console.log(screenWidth);
            setWidth(screenWidth);
            setBreakpoint(screenWidth);
            setScreenSize(Object.keys(breakpoints).find(
                key => screenWidth <= breakpoints[key]
            ));
        };

        handleResize(); // Check on initial render
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);

    useEffect(() => {
        onScreenSizeChange(screenSize, width); // Call the prop function to send back the value
    }, [screenSize, width, onScreenSizeChange]);

    return null;
};

export default ScreenSize;
