import React from "react";
import AudioVisualizer from "../components/AudioVisualizer";
import ChordVisualizationComponent from "../components/GuitarChords";

export const AudioVisualizerPage = ({ audioLink,currentScreenSize, currentScreenWidth }) => {
  return (
    <div>
      
      <AudioVisualizer audioLink={audioLink} currentScreenSize={currentScreenSize} currentScreenWidth={currentScreenWidth} />
      <div>
        <ChordVisualizationComponent />

      </div>
    </div>
  );
};
