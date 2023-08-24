/*
AudioUpload

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




import React, { useState } from "react";
import { Button } from "./button";
import { useNavigate } from 'react-router-dom';

const AudioUpload = ({ onFileUpload }) => {
  const [audioInput, setAudioInput] = useState(null);
  const [fileInfo, setFileInfo] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate(); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const info = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModifiedDate: file.lastModifiedDate.toLocaleTimeString(),
// lastModifiedDate: file.lastModifiedDate.toLocaleDateString(),
    };
    if (file) {
      setAudioInput(file);
      setFileInfo(info);
      setError(false);
    }
  };

  const handleUpload = (event) => {
   event.preventDefault();
    if (!audioInput) {
      setError(true);
      return;
    }

    onFileUpload(audioInput, fileInfo);
    // setAudioInput(null); // cleans the form
    event.target.reset();
    navigate('/audio-visualizer');
  };

  return (
    <div>

      <form onSubmit={handleUpload}>
        <label className="upload-label">
          <input
            type="file"
            accept=".mp3"
            onChange={handleFileChange}
            placeholder="Choose an MP3 file"
          />
          <p className="message_to_user">UPLOAD AN MP3 FILE</p>
          <Button className="button_upload" type="submit">
            Upload
          </Button>
        </label>
      </form>
        {error ? <p className="error"> "Invalid format. Please upload an MP3 file" </p> : ""}
        
    </div>
  );
};

export default AudioUpload;
