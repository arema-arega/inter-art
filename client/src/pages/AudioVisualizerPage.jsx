import React from "react";
import AudioVisualizer from "../components/AudioVisualizer";

export const AudioVisualizerPage = ({ audioLink }) => {
  return (
    <div>

      <AudioVisualizer audioLink={audioLink} />
    </div>
  );
};
