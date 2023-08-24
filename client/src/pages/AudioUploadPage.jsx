/*
Renders: AudioUpload component

Objectives that need implementation:

More ways to input the sound:
- Live sound (through sound card prefered ex: band playing, djs, mic)
- links from 3rd parties // taking into account that on the app there is a html element creation for the sound
 const audioLink = audio && URL.createObjectURL(audio) that doesn't need to be used in this case

Allowing more file types to be inputed like wav, flac,  midi, etc

Functions:

- handles the upload and obtains the data from an audiofile object, 
that will be passed to the app parent component that then will send it to:
AudioVisualizer => that may passed in the future to the Chord Visualizer
InfoListPage (Song List) / the DataBase Music (table songs)

*/


import React from "react";
import AudioUpload from "../components/AudioUpload"; 

export const AudioUploadPage = ({ onFileUpload }) => {
  return (
    <div>

      <AudioUpload onFileUpload={onFileUpload} />
    </div>
  );
};


