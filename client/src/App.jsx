import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import Logo from './components/Logo';
import { AudioVisualizerPage } from './pages/AudioVisualizerPage';
import ScreenSize from './components/ScreenSize';
import { AudioUploadPage } from './pages/AudioUploadPage';
import { InfoListPage } from './pages/InfoListPage';
import { StartPage } from './pages/StartPage';
import { LogoPage } from './pages/LogoPage';
import './App.css';

function App() {
  const [currentScreenSize, setCurrentScreenSize] = useState('');
  const [currentScreenWidth, setCurrentScreenWidth] = useState('');
  const [audio, setAudio] = useState(null);
  const [info, setInfo] = useState({});
  const [currentPage, setCurrentPage] = useState('logo');

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
          {currentPage === 'logo' ? (
            <Logo
              screenSize={currentScreenSize}
              onClick={() => setCurrentPage('start')}
            />
          ) : null}

          {currentPage !== 'start' ? (
            <header className="app__header">
              <div className="app__header-container">
                <Link className="app__header-link" to="/audio-upload">
                  AUDIO UPLOAD
                </Link>
                <Link className="app__header-link" to="/audio-visualizer">
                  AUDIO VISUALIZER
                </Link>
                <Link className="app__header-link" to="/info-list">
                  INFO LIST
                </Link>
              </div>
            </header>
          ) : null}

          <main className="app__main">
            <Routes>
              <Route path="/logo" element={<LogoPage />} />
              <Route path="/start" element={<StartPage />} />
              <Route path="/audio-upload" element={<AudioUploadPage onFileUpload={handleFileUpload} />} />
              <Route path="/audio-visualizer" element={<AudioVisualizerPage
                audioLink={audioLink}
                currentScreenSize={currentScreenSize}
                currentScreenWidth={currentScreenWidth}
              />} />
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
