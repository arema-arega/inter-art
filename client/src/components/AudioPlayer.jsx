import React, { useRef } from 'react';
import CanvasVisualizer from './CanvasVisualizer';

const AudioPlayer = ({ visualAudioElement, audioContext,isAudioPlaying }) => {
  const audioRef = useRef();

  const handlePlay = (isAudioPlaying) => {
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
      <audio ref={audioRef} src={visualAudioElement}></audio>
      <button onClick={handlePlay}>Play</button> 
      <button onClick={handleStop}>Stop</button> 
    </div>
  );
};

export default AudioPlayer;

