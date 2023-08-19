import React, { useState } from "react";
import { AudioUpload } from "../components/AudioUpload";
import { useNavigate } from "react-router-dom";

export const AudioUploadPage = () => {
  const navigate = useNavigate();
  const [audioInput, setAudioInput] = useState(null);
  const [fileInfo, setFileInfo] = useState({});
  const [error, setError] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
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

  const handleUpload = () => {
    if (!audioInput) {
      setError(true);
      return;
    }

    // Call the appropriate prop to pass data back to parent component
    onFileUpload(audioInput, fileInfo);
    navigate("/app");
  };

  return (
    <div>
      <AudioUpload
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
        error={error}
      />
    </div>
  );
};
