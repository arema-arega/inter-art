import React, { useEffect, useRef, useState } from 'react';
import { nonWesternScales, WesternMusicScales, notes } from './MusicScales';
import { frequencyToNoteCalculator } from './FrequencyToNoteCalculator';



// NON WESTERN SCALE CREATOR
  
export const  NonWesternScaleCreator = (scaleArrayWestern) => {

const [selectedNonWesternScale, setSelectedNonWesternScale] = useState(null);
const [selectedNonWestern, setSelectedNonWestern] = useState(null);
const [showNonWesternScale, setShowNonWesternScale] = useState(false);


const theNoteref = useRef("C");



const onSelectedNonWesternScale = (event) =>{
    const selected = event.target.value;
  
    const selectedScaleArray = nonWesternScales[selected];
    console.log(" selectedScaleArray", selectedScaleArray);
    nonWesternScaleCreator(selectedScaleArray);
    
    console.log(" USER selected Scale", selected);
    const firstSpaceIndex = selected.indexOf(" "); // Find the index of the first space
  
    const result = firstSpaceIndex !== -1 ? selected.substring(0, firstSpaceIndex) : selected;
    console.log(result);
  
  
    setSelectedNonWestern(result);
  }
  
  
  const onSelectNote = (event) => {
    theNoteref.current = event.target.value;
   
    console.log("theNoteref",theNoteref);

  }
  
  
  
  
    function circularPermutation(arr, startNote) {
      
      const index = arr.indexOf(startNote);
      console.log("index", index);
      console.log("startNote", startNote);
  
  
    if (index === -1) {
        return "Starting point not found in the array.";
    }
  
  
    const newArr = arr.slice(index).concat(arr.slice(0, index));
    return newArr;
  }
  
  /* notePlacer FUNTION is used to know if the Note is in the same register of the Tonic Note 
  or in one register below.
   EXAMPLE:
  "Arabic Maqam Hijaz Kar": [0, -1, 2, 3, 4, -1, 6],
  
  Using C4 as the 0 interval
  [0, -1, 2, 3, 4, -1, 6]  = [C4, B3, C#4, D4, D#4, B3, F4]
  
  
  */
  const notePlacer = (arr, index) => {
    if (index % 1 === 0.5) {
      const lowerNoteIndex = Math.floor(index);
      const upperNoteIndex = Math.ceil(index);
      return `(${arr[lowerNoteIndex]} & ${arr[upperNoteIndex]})`;
    }
  
    if (index < 0) {
      return arr[arr.length + index];
    }
  
    return arr[index];
  };
  
  
    const nonWesternScaleCreator = (selected) => {
      console.log("selected", selected);
      
      let start = theNoteref.current; 

      console.log("start", start);
      
     
      if (scaleArrayWestern.scaleArrayWestern.length !== 0) {
        console.log("scaleArrayWestern", scaleArrayWestern);
        start = scaleArrayWestern.scaleArrayWestern[0];
           
      }
      
      
      // insert the Noote default C 
      console.log("start", start);
      let orgaizedNotes = circularPermutation(notes, start);
      
      console.log("orgaizedNotes", orgaizedNotes);
      let nonWesternScale = [];
      for (let i = 0; i < selected.length; i++) {

        console.log("orgaizedNotes[i]", orgaizedNotes[i]);
        console.log("selected[i]", selected[i]);

        let note = notePlacer(orgaizedNotes, selected[i]);
        let noteMusicalRegister = selected[i] >= 0 ? 4 : 3;
        nonWesternScale.push(`${note} ${noteMusicalRegister}`);
        
      }
  
      setSelectedNonWesternScale(nonWesternScale);
        console.log("nonWesternScale", nonWesternScale);
    }
    
    
    const onShowNonWesternScale = () => {
      setShowNonWesternScale(true);
    }
    
    
    
    
    
    return <div>
        <div className="select_Chord">
            <label>SCALE SELECTORS</label>
        </div>

      <div>
        

      





        <div className="Chord">

        <label>NOTE</label>
<select className="select_Chord" onChange={onSelectNote}>
    <option value="C">Select</option>
    {notes.map((note) => (
        <option key={note} value={note}>
         
                    {note}
             
        </option>
    ))}
                </select>


<label>NON WESTERN MUSIC </label>
<select className="select_Chord" onChange={onSelectedNonWesternScale}>
    <option value="Indian (Hindustani) Raag Bilawal">Select</option>
    {Object.keys(nonWesternScales).map((nonWesternScale) => (
        <option key={nonWesternScale} value={nonWesternScale}>
         
                    {nonWesternScale}
             
        </option>
    ))}
                </select>
                
                
  <div className="select_Chord">            
{selectedNonWestern && (
    <button className="button_chords" onClick={onShowNonWesternScale}>{selectedNonWestern}</button> 
      )}
      
      {showNonWesternScale && (
        <label > {selectedNonWesternScale.join(', ')} </label>
      )
      
      
                    }
                    
                    </div>  
            </div>
        </div>
        

    </div>
}