import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { NextUIProvider } from "@nextui-org/react";
import AudioUpload from './components/AudioUpload';
import Logo from './components/Logo';
import CanvasVisualizer from './components/CanvasVisualizer';

import ScreenSize from './components/ScreenSize';
import './App.css'; 
import { AudioUploadPage }  from './pages/AudioUploadPage';
import InfoList from './components/InfoList';
import { InfoListPage } from './pages/InfoListPage';

function App() {
  const [currentScreenSize, setCurrentScreenSize] = useState('');
  const [audio, setAudio] = useState(null);
  const [info, setInfo] = useState({});

  const handleScreenSizeChange = (newSize) => {
    setCurrentScreenSize(newSize);
  };

  const handleFileUpload = (loaded, infoTrack) => {
    console.log(infoTrack);
    setInfo({ ...infoTrack, size: Math.round(infoTrack.size / 1000000) }); // 2048 mega
    console.log({...infoTrack, size: Math.round(infoTrack.size / 1000000)});

    setAudio(loaded);
  };

  const audioLink = audio && URL.createObjectURL(audio);

  return (
    <div className="background">
      <NextUIProvider>
        <div className='App'>
          <Logo screenSize={currentScreenSize} />

          <header className="app__header">
            <div className="app__header-container">
              <Link className="app__header-link" to="/audio-upload">
                Audio Upload
              </Link>
              <Link className="app__header-link" to="/info-list">
                Info List
              </Link>
            </div>
          </header>

          <main className="app__main">
            <Routes>
            <Route path="/audio-upload" element={<AudioUploadPage onFileUpload={handleFileUpload} />} />
              <Route path="/info-list" element={<InfoListPage info={info}/>} />
            </Routes>
          </main>

          <div>
            <ScreenSize onScreenSizeChange={handleScreenSizeChange} />
        


          </div>

          <div>
            <CanvasVisualizer audioLink={audioLink} />
          </div>

         </div>
      </NextUIProvider>
    </div>
  );
}

export default App;
