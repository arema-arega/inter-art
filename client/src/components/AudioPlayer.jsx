import React, { useRef } from 'react';

const AudioPlayer = ({ audioLink }) => {
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.play().then(() => {
      // Playback started successfully or resumed
    }).catch(error => {
      // Handle any errors that occurred during playback
      console.error('Error playing audio:', error);
    });
  };
  
  const handleStop = () => {
    audioRef.current.pause();
  };

  return (
    <div>
      <audio ref={audioRef} src={audioLink}></audio>
      <button onClick={handlePlay}>Play</button> 
      <button onClick={handleStop}>Stop</button> 
    </div>
  );
};

export default AudioPlayer;

