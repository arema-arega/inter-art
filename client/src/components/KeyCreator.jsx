/*
KeyCreator component is rendered
on the ChordsVisualizerPage for Selecting the Key of Chord
C, D , Eb...etc


//https://github.com/tombatossals/react-chords



For using the database:

Database:
https://github.com/tombatossals/chords-db#chords-db
1- git clone https://github.com/tombatossals/chords-db.git
2- cd chords-db

https://en.wikipedia.org/wiki/Chord_notation


your-app/
  ├── src/
  │   ├── components/
  │   ├── ...other components
  │   └── chords-db/
  │       ├── src/
  │       │   ├── guitar/
  │       │   ├── ukulele/
  │       │   └── ...other instruments
  │       └── ...other files
  ├── ...other app files
  └── package.json


*/

import React, { useState } from 'react';


//import keys from '../chords-db/src/db/guitar/keys';

const KeyCreator = () => {

   const theKeys = [
  'C',
  'C#',
  'D',
  'Eb',
  'E',
  'F',
  'F#',
  'G',
  'Ab',
  'A',
  'Bb',
  'B'
  ];
  
    
    console.log(theKeys);

    

    const [selectedKeyValue, setSelectedKeyValue] = useState("")

    const handleKeySelection = (event) => {
        const selectedKey = event.target.value;
      
        setSelectedKeyValue(selectedKey)
        console.log('Selected key:', selectedKey);
        
    };

   

    return (       
        
<div>
<div className="Chord">
    <label>SELECT KEY / root:</label>
    <select className="select_Chord" onChange={handleKeySelection}>
        <option value="C">Select</option>
        {theKeys.map((keyValue) => (
            <option key={keyValue} value={keyValue}>
             
                        {keyValue}
                 
            </option>
        ))}
    </select>
    {selectedKeyValue && (
        <button className="button_chords">{selectedKeyValue}</button> 
    )}
</div>
</div> 
        
        
        
        
    );
};

export default KeyCreator;
