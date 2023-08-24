/*
Renders the AudioVisualizer component

"For Musicians and sound enthusiasts"



Objectives that need implementation:

The fast fourier it's not been recognized 
within the UseEffect on the Audiovisalizer component 
So the frequency analyzer  and the canvas render are affected

The stop function it's not working its got do with the audio content creation within the useeffect

Live Frequency

BPM analyzer

Root note

To connect the obtained data to the chord creation component so the user will be able to receive chord suggestions.




Functions:
The user uploads an audio on the AudioVisualizer component to obtain the data from it:

Each capture Frequency is transformed into notes and saved in the data array to be shown after

Sound bits that are rendered into colors inside the canvas 
with a draw function, while it's being played live.

The user can select the frequency and the canvas size of the visualizer





*/


import React from "react";
import AudioVisualizer from "../components/AudioVisualizer";


export const AudioVisualizerPage = ({ audioLink, currentScreenSize, currentScreenWidth }) => {
  return (
    <div>
      
      <AudioVisualizer audioLink={audioLink} currentScreenSize={currentScreenSize} currentScreenWidth={currentScreenWidth} />
      <div>
       

      </div>
    </div>
  );
};
