import React from 'react';
//import guitar from '../chords-db/lib/guitar';
import Chord from '@tombatossals/react-chords/lib/Chord'


const GuitarChords = (selectedKeyValue, selectedSuffix) => {
    if (!selectedKeyValue && !selectedSuffix) {
        return null;
      }
    
    console.log(selectedKeyValue);
    console.log(selectedSuffix);
      // Get the chord data from the guitar.js file
      //const chordData = guitar.chords[selectedKeyValue]?.find(
      //  chord => chord.suffix === selectedSuffix);
    // console.log(chordData);
  
    const chord = {
      frets: [1, 3, 3, 2, 1, 1],
      fingers: [1, 3, 4, 2, 1, 1],
      barres: [1],
      capo: false,
  }
    
      const instrument = {
        strings: 6,
        fretsOnChord: 4,
          name: 'Guitar',
         
        tunings: {
            standard: ['E', 'A', 'D', 'G', 'B', 'E'],
        },
    };
    
    
      // Return the chord data if found, otherwise return null
      const lite = false;
    
      return (
        <div className="Chord_design">
            <h1>GUITAR</h1>
           
                <Chord chord={chord} instrument={instrument} lite={lite} />
           
        </div>
    );
};

export default GuitarChords;
