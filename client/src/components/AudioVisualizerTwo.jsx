import React, { useEffect, useRef, useState } from 'react';

// Component for controlling the audio visualization
const AudioVisualizertwo = ({ audioLink }) => {
  // ... your existing code ...

  useEffect(() => {
    // ... your existing code for setting up audio context and visualization ...

    return () => {
      // Cleanup when component unmounts or dependencies change
      audioElement.pause();
      audioElement.currentTime = 0;
      setUserInteracted(false);
      setIsAudioPlaying(false);
    };
  }, [audioLink, isAudioPlaying, fastFourierValue, canvasWidth, canvasHeight, visualAudioElement]);

  // ... rest of your component ...

  return (
    <div>
      <VisualizerCanvas canvasRef={canvasRef} canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
      <AudioControls
        handlePlay={handlePlay}
        handleStop={handleStop}
        handleCanvasIncrease={handleCanvasIncrease}
        handleCanvasDecrease={handleCanvasDecrease}
        handleFastIncrease={handleFastIncrease}
        handleFastDecrease={handleFastDecrease}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        fastFourierValue={fastFourierValue}
      />
      <VisualizationInfo infoFrecuency={infoFrecuency} pitchNotes={pitchNotes} baseFrequency={baseFrequency} />
    </div>
  );
};

// Component for rendering the canvas
const VisualizerCanvas = ({ canvasRef, canvasWidth, canvasHeight }) => {
  return (
    <div className="audio_visualizer_canvas">
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
    </div>
  );
};

// Component for audio controls
const AudioControls = ({
  handlePlay,
  handleStop,
  handleCanvasIncrease,
  handleCanvasDecrease,
  handleFastIncrease,
  handleFastDecrease,
  canvasWidth,
  canvasHeight,
  fastFourierValue,
}) => {
  return (
    <div className="audio_visualizer_controlers">
      <label className="play_stop">
        <button className="button_play" onClick={handlePlay}> PLAY </button>
        <button className="button_stop" onClick={handleStop}> STOP VISUALIZER </button> 
      </label>
      <label>
        Canvas Size
        <button className="button_increase" onClick={handleCanvasIncrease}>+</button>
        <button className="button_decrease" onClick={handleCanvasDecrease}>-</button>
        <p> Canvas Width {canvasWidth} - Canvas Height {canvasHeight}</p>
      </label>
      <label className="frecuency">
        Set Frequency
        <button className="button_increase" onClick={handleFastIncrease}>+</button>
        <button className="button_decrease" onClick={handleFastDecrease}>-</button>
        <p>{fastFourierValue}</p>
      </label>
    </div>
  );
};

// Component for displaying visualization information
const VisualizationInfo = ({ infoFrecuency, pitchNotes, baseFrequency }) => {
  return (
    <div>
      {infoFrecuency !== null ? (
        <ol className="InfoFrecuency">
          <li>Frecuency - {infoFrecuency} </li>
          <li> Pitch - {pitchNotes} </li>
          <li> Base Frecuency - {baseFrequency}</li>
        </ol>
      ) : ''}
    </div>
  );
};

export default AudioVisualizerTwo;
