/*

ChordVisualizer page renders: 
- KeyCreator for Selecting the Key of ChordC, D , Eb...etc
- ChordSuffixCreator for Selecting the type of Chordmenor, mayor...etc
- Both combined (KeyCreator & ChordSuffixCreator) create the Actual Chord that should be used for rendering the:
- GuitarChords to show a guitar chart with the selected chord position


Objectives that need implementation:
To be able to select the root note and suffix of the chord to see it on the guitar chart above.
To give the possibility to the user to move the position of the notes on the guitar chartand obtain the name of the chord
To play a chord and to obtain its name and possible positions on a guitar chart from the audio input.

*/
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