import React from "react";

import GuitarChords from "../components/GuitarChords";
import KeyCreator from "../components/KeyCreator";
import ChordSuffixCreator from "../components/ChordSuffixCreator";


export const ChordsVisualizerPage = (selectedKeyValue, selectedSuffix) => {
  return (
    <div>
      
     
      <GuitarChords selectedKeyValue= {(selectedKeyValue)} selectedSuffix={(selectedSuffix)} />
      <div className= "Chord">
      <KeyCreator/>
      <ChordSuffixCreator />  
      </div>
        
   
    </div>
  );
};