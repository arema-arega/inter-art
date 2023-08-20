import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Logo = ({ currentScreenSize }) => {
  const percentage = Math.min(currentScreenSize / 12, 50);
  const navigate = useNavigate(); // Initialize the navigation function

  // Handle the click event
  const handleLogoClick = () => {
    navigate('/start'); // Navigate to the StartPage when the logo is clicked
  };

  return (
    <div>
      <Image
        className={clsx('logo-class-name')}
        src="/logoInterArt.svg"
        alt="Logo"
        isZoomed
        sizes={`(max-width: ${currentScreenSize}px) 20vw, 5vw`}
        width={percentage + '%'}
        height={percentage + '%'}
        radius="full"
        shadow="lg"
        onPointerDown={handleLogoClick} // Use the custom click handler
        layout="responsive"
      />
    </div>
  );
};

export default Logo;
