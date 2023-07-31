import React, { useState } from "react";

export const AudioUpload = ({onFileUpload}) => {
  const [audioInput, setAudioInput] = useState(null);
  const [error, setError] = useState(false);
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioInput(file)
      setError(false)
    }
    };
   
  const handleUpload = () => {
    if (!audioInput ) {
      setError(true);
      return;
     };
    
    onFileUpload(audioInput);
   setAudioInput(null); // cleans the form
  }



    return (
      <div>

        <label>
          <input type="file" accept=".mp3" onChange={handleFileChange} />
          <button className="AudioUpload" onClick={handleUpload}>Upload</button>
          </label>
        
        {error ? <p className="error"> "Invalid format. Please upload an MP3 file" </p> : ""}
      </div>
      );
    };
    
export default AudioUpload;