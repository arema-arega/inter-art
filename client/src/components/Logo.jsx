/*
the Logo component is rendered on the app component
so it appears on all the other pages.

When the Logo Image is clicked the user is taken to the AudioUpload Page:
const handleLogoClick = () => {
    navigate("/audio-upload"); 
  };

  the logo uses the library:
  https://nextui.org/docs/components/image
  (it's the only component using it on the app)

  The Logo component uses the 
  currentScreenSize prop sent from the app parent component

  Objectives that need implementation:
  I need to put a max and min condition on the rendering of the logo
 on the percentage value:
 const percentage = Math.min(currentScreenSize / 12, 50);





*/



import React from 'react';
import { Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


const Logo = ( currentScreenWidth) => {
  
  console.log("currentScreenSize", currentScreenWidth.screenSize);
  const percentage = (currentScreenWidth.screenSize / 12);
  
  console.log("percentage", percentage);

  const navigate = useNavigate(); // Initialize the navigation function

  // Handle the click event
  const handleLogoClick = () => {
    navigate("/audio-upload"); // Navigate to the AudioUpload page when the logo is clicked
  };

  return ( <div>
   
      <Image
       
        src="https://raw.githubusercontent.com/arema-arega/inter-art/d0c2c83fab96f4ff333e0ad4f5a0420b5e1840a0/logoInterArt.svg"
        alt="Logo"
        isZoomed
        width={percentage + '%'}
        height={(percentage * 1.2) + '%'}
        shadow="lg"
        radius="full"
        onPointerDown={handleLogoClick} // Use the custom click handler
        layout="responsive"
    />
    
    
       </div>
     
  );
};

export default Logo;
