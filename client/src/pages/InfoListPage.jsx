import React from "react";
//import InfoList from './components/InfoList';
import { useNavigate } from "react-router-dom";
import AudioUpload from "../components/AudioUpload";

export const InfoListPage = (info) => {
  const navigate = useNavigate();

  const handleSubmit = async (info) => {
    await fetch("/app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    navigate("/app");
  };

  return (
    <div>
      <h1>Create a student</h1>
      <AudioUpload onSubmit={handleSubmit} />
    </div>
  );
};
