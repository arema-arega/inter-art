/*
App is the parent component of all the pages:-AudioUploadPage-AudioVisualizerPage-InfoListPage-ChordsVisualizerPage- StartPage (that hasn't been used)
Handles:
The the changes of the Screensize coming from the ScreenSize component and sends the props:- currentScreenSize (to Logo Component and to AudioVisualizer component)
- currentScreenWidth (to AudioVisualizer component)
The the changes of the audio input coming from the AudioUpload component and extracts the information to be sent as prop:
audio (Passed to the AudioVisualizerPage as {audiolink} and sent again as a prop to the Audiovisualizer component)info (Passed to the InforListPageused as {info} and sent again as a prop to the infolist component and the songlist component)
Structure:
constants
return:
- <Logo>
- <header> (links)
- <main> (rutes)



*/


import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import Logo from './components/Logo';
import { AudioVisualizerPage } from './pages/AudioVisualizerPage';
import ScreenSize from './components/ScreenSize';
import { AudioUploadPage } from './pages/AudioUploadPage';
import { InfoListPage } from './pages/InfoListPage';
import { StartPage } from './pages/StartPage';
import { ChordsVisualizerPage } from './pages/ChordsVisualizerPage';

import './App.css';

function App() {
  const [currentScreenSize, setCurrentScreenSize] = useState('');
  const [currentScreenWidth, setCurrentScreenWidth] = useState('');
  const [audio, setAudio] = useState(null);
  const [info, setInfo] = useState({});
 

  const handleScreenSizeChange = (newSize,newWidth) => {
    setCurrentScreenSize(newSize);
    setCurrentScreenWidth(newWidth);
    console.log(newSize)
    console.log(newWidth)
  };

  const handleFileUpload = (loaded, infoTrack) => {
    setInfo({ ...infoTrack, size: Math.round(infoTrack.size / 1000000) });
    setAudio(loaded);
  };

  const audioLink = audio && URL.createObjectURL(audio);

  return (
    <div className="background">
      <NextUIProvider>
        <div className="App">
         
            <Logo screenSize={currentScreenSize} />
         

          
            <header className="app__header">
              <div className="app__header-container">
                <Link className="app__header-link" to="/audio-upload">
                  AUDIO UPLOAD
                </Link>
                <Link className="app__header-link" to="/audio-visualizer">
                  AUDIO VISUALIZER
                </Link>
                <Link className="app__header-link" to="/info-list">
                  SONG LIST
              </Link>
              
              <Link className="app__header-link" to="/chord-visualizer">
                  CHORD VISUALIZER
                </Link>
              </div>
            </header>
        

          <main className="app__main">
            <Routes>
              
              <Route path="/start" element={<StartPage />} />
              <Route path="/audio-upload" element={<AudioUploadPage onFileUpload={handleFileUpload} />} />
              <Route path="/audio-visualizer" element={<AudioVisualizerPage
                audioLink={audioLink}
                currentScreenSize={currentScreenSize}
                currentScreenWidth={currentScreenWidth}
              />} />

              <Route path="/chord-visualizer" element={<ChordsVisualizerPage />} />

              <Route path="/info-list" element={<InfoListPage info={info} />} />
            </Routes>
          </main>

          <div>
            <ScreenSize onScreenSizeChange={handleScreenSizeChange} />
          </div>
        </div>
      </NextUIProvider>
    </div>
  );
}

export default App;
