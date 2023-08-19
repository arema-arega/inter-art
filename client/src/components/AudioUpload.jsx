import React, { useState } from "react";
import { Button } from "./button";

export const AudioUpload = ({ onFileUpload }) => {
  const [audioInput, setAudioInput] = useState(null);
  const [fileInfo, setFileInfo] = useState({});
  const [error, setError] = useState(false);

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
