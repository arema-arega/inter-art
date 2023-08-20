import React from "react";
import AudioVisualizer from "../components/AudioVisualizer";

export const AudioVisualizerPage = ({ audioLink,currentScreenSize, currentScreenWidth }) => {
  return (
    <div>

      <AudioVisualizer audioLink={audioLink} currentScreenSize={currentScreenSize}currentScreenWidth={currentScreenWidth} />
    </div>
  );
};
