import React, { useState } from "react";

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
        <label>
          <input type="file" accept=".mp3" onChange={handleFileChange} />
          <button className="AudioUpload" type="submit">
            Upload
          </button>
        </label>
      </form>
      {error ? <p className="error"> "Invalid format. Please upload an MP3 file" </p> : ""}
    </div>
  );
};

export default AudioUpload;
