import React, { useState } from 'react';
import AudioUpload from './components/AudioUpload';
//import AudioPlayer from './components/AudioPlayer';
import CanvasVisualizer from './components/CanvasVisualizer';
import {NextUIProvider} from "@nextui-org/react";
import './App.css'; 


function App() {
  const [audio, setAudio] = useState(null);
  const [info, setInfo] = useState({});
 
  const keys = Object.keys(info)

  
 const handleFileUpload = (loaded, infoTrack) => {
  
 
  setInfo(infoTrack);

  setAudio(loaded);
};


  
  // <audio preload="auto" src="blob:http://localhost:5173/59f3b0a3-e93a-41c7-8a08-6454ea42047b"></audio>

  const audioLink = audio && URL.createObjectURL(audio);

 
  return (
    <div>
<NextUIProvider>
      <div className='App'>
      

      <div>
        <AudioUpload onFileUpload={handleFileUpload} />
      </div>

      {/*<AudioPlayer />*/}

      <div>
        <CanvasVisualizer audioLink={audioLink} />
      </div>

      <div className='list'>
        {keys.length > 0 ?
      (<ol>
          {keys.map((key) => (
            <li key={key}>
              {info[key]} 
            </li>
          ))};
          </ol>
          ) :
          (<p> No Track</p>)}
      </div>

        </div>
        
        </NextUIProvider>
    </div>
  )
};


export default App;
