import React, { useState } from 'react';
import AudioUpload from './components/AudioUpload'



function App() {
  const [audio, setAudio] = useState(null);
  const handleFileUpload = (loaded) => {
    console.log(loaded.type);
    setAudio(loaded);
    
  };

  const audiolink =  audio && URL.createObjectURL(audio); // para crear url
  return (
    
      <div>
      <AudioUpload onFileUpload={handleFileUpload} />
      <audio
        controls
        src={audiolink}>
            
           
    </audio>
       
      </div>
      
    
  )
};

export default App
