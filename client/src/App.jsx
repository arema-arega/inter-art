import React, { useState } from 'react';
import AudioUpload from './components/AudioUpload';
import Logo from './components/Logo';
import CanvasVisualizer from './components/CanvasVisualizer';
import InfoMusic from './components/InfoMusic';
import { NextUIProvider } from "@nextui-org/react";
import ScreenSize from './components/ScreenSize';
import './App.css'; 
import { Routes, Route, Link } from "react-router-dom";
import { AudioUploadPage } from './pages/AudioUploadPage';
import InfoList from './components/InfoList';
import { InfoListPage } from './pages/InfoListPage';


function App() {
  const [currentScreenSize, setCurrentScreenSize] = useState('');

  const handleScreenSizeChange = (newSize) => {
      setCurrentScreenSize(newSize);
  };


  const [audio, setAudio] = useState(null);
  const [info, setInfo] = useState({});
  const keys = Object.keys(info)

  const handleFileUpload = (loaded, infoTrack) => {
  console.log(infoTrack);
  setInfo(infoTrack);
  setAudio(loaded);
};


  
  // <audio preload="auto" src="blob:http://localhost:5173/59f3b0a3-e93a-41c7-8a08-6454ea42047b"></audio>

  const audioLink = audio && URL.createObjectURL(audio);

 
  return (
    <div>
<NextUIProvider>
        <div className='App'>
          <Logo screenSize={currentScreenSize} />
          


          <header className="app__header">
        <div className="app__header-container">
          <Link className="app__header-link" to="./AudioUploadPage">
            Logo
          </Link>
          <Link className="app__header-link" to="/InfoListPage">
           Info
          </Link>
         
        </div>
          </header>
          


          <main className="app__main">
        <Routes>
        <Route path="/app" element={<AudioUploadPage />} />

              <Route path="/app" element={<InfoListPage />} />
          
        </Routes>
      </main>


          
          
          
          <div>

        <ScreenSize onScreenSizeChange={handleScreenSizeChange} />    



        <AudioUpload onFileUpload={handleFileUpload} />
      </div>

      {/*<AudioPlayer />*/}

      <div>
        <CanvasVisualizer audioLink={audioLink} />
      </div>

      <div className='list'>
      
      </div>
      <InfoList info={info} />
          
      <div>
        <InfoMusic/>
      </div>

        </div>
        
        </NextUIProvider>
    </div>
  )
};


export default App;
