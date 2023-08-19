import React from "react";
import AudioUpload from "../components/AudioUpload"; 

export const AudioUploadPage = ({ onFileUpload }) => {
  return (
    <div>

      <AudioUpload onFileUpload={onFileUpload} />
    </div>
  );
};


