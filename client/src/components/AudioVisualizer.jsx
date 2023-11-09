import React, { useEffect, useRef, useState } from 'react';

const AudioVisualizer = ({ audioLink, currentScreenSize, currentScreenWidth }) => {





  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const audioConstextRef = useRef(null);
  const analyserRef = useRef(null);
  const pausedAudioTimeRef = useRef(0);
  const sourceNodeRef = useRef(null);
  const dataArrayInfoRef = useRef(null);
  const fastFourierValueRef = useRef(32);
  const pitchValueRef = useRef(null);
  const bufferLengthRef = useRef(null);
  const baseFrequencyRef = useRef(null);


  const [infoFrequency, setInfoFrequency] = useState(null);
  const [pitchNotes, setPitchNotes] = useState([]);
 const [baseFrequency, setBaseFrequency] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(400);
  const [selectedNonWesternScale, setSelectedNonWesternScale] = useState(null);
  const [selectedWestern, setSelectedWestern] = useState(null);
  const [showWesternScale, setShowWesternScale] = useState(false);
 // console.log("audioLink", audioLink);

 const notes = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B'
]; 
  
 
  
const nonWesternScales = {
  "Indian (Hindustani) Raag Bilawal": [0, 1, 2, 3, 4, 5, 6],
  "Indian (Hindustani) Raag Bhairav": [0, 1, -1, 3, 4, -1, -2],
  "Indian (Hindustani) Raag Kafi": [0, -1, 2, 3, 4, -1, 6],
  "Indian (Hindustani) Raag Bhairavi": [0, -1, -2, 3, 4, -1, -2],
  "Indian (Carnatic) Mayamalavagowla": [0, 1, -1, 3, 4, 5, 6],
  "Indian (Carnatic) Shankarabharanam": [0, 1, 2, 3, 4, 5, 6],
  "Indian (Carnatic) Kharaharapriya": [0, 1, 2, 3.5, 4, 5, 6],
  "Indian (Carnatic) Keeravani": [0, -1, 2, 4, -1, 6],
  "Arabic Maqam Rast": [0, 1, -1, 3, 4, 5, 6],
  "Arabic Maqam Bayati": [0, -1, 2, 3, 4, -1, 6],
  "Arabic Maqam Hijaz": [0, -1, 2, 3, 4, -1, 6],
  "Arabic Maqam Hijaz Kar": [0, -1, 2, 3, 4, -1, 6],
  "Arabic Maqam Kurd": [0, -1, 3, 4, -1, 6],
  "Persian Dastgah Shur": [0, 1, -1, 3, 4, -1, 6],
  "Persian Dastgah Mahur": [0, 1, -1, 3, 4, 5, 6],
  "Persian Dastgah Chahargah": [0, -1, 2, 3, 4, -1, 6],
  "Persian Dastgah Homayun": [0, 1, 2, 3, 4, -1, 6],
  "Chinese (Pentatonic) Gong Mode": [0, 1, 2, 4, 5],
  "Chinese (Pentatonic) Shang Mode": [0, 1, 3, 4, 5],
  "Chinese (Pentatonic) Jue Mode": [0, 2, 3, 5, 6],
  "Japanese (Ritsu Scale)": [0, 1, 3, 4, 5],
  "Japanese (Ryo Scale)": [0, 1, -1, 4, 5],
  "Japanese (Ritsu Scale, Honchoshi)": [0, 1, 2, 4, 5],
  "Japanese (Ritsu Scale, Iwato)": [0, -1, 3, 4, -2],
  "Indonesian (Pelog Scale)": [0, -1, 2, 4, -1],
  "Indonesian (Slendro Scale)": [0, 1, -1, 4, -2]
  };
  
  
  
  const actulizedAudioRef = () => {
    audioRef.current = new Audio(audioLink);
    console.log("audioLink =", audioLink);
    console.log("audioRef.current =", audioRef.current);
  };


  // _________________FAST FOURIER VALUE
  const handleFastIncrease = () => {
    let increase = fastFourierValueRef.current * 2;
    if (increase <= 4096) {
      
     fastFourierValueRef.current = increase;
  
      console.log("fastFourierValueRef.current", fastFourierValueRef.current);
      createAnalyserAndDraw();
    }
  };

  const handleFastDecrease = () => {
    let decrease = fastFourierValueRef.current / 2;
    if (decrease >= 32) {

    //  setFastFourierValue(decrease);
      fastFourierValueRef.current = decrease;
      console.log("fastFourierValueRef.current", fastFourierValueRef.current);
      createAnalyserAndDraw();
    }
  };


  const createAnalyserAndDraw = () => {
    
      if (audioConstextRef.current && audioRef.current) {
        if (sourceNodeRef.current) {
          sourceNodeRef.current.disconnect();
          analyserRef.current.disconnect();
        }
    
        createAnalyser(); // Update the analyser with the new FFT size
    
        if (audioConstextRef.current.state === 'running') {
          sourceNodeRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioConstextRef.current.destination);
        }
    
      draw();
    }
  };

  // ______________________CANVAS SIZE
  const handleCanvasIncrease = () => {
    let increaseWidth = canvasWidth * 2;
    let increaseHeight = canvasHeight * 2;
    const PercentOfScreenWidth = 0.9 * currentScreenWidth;
    const PercentOfScreenhight = 0.8 * currentScreenWidth;
    console.log(PercentOfScreenhight);
    
    
    if (increaseWidth < (PercentOfScreenWidth) && increaseHeight < PercentOfScreenhight ) {
      setCanvasWidth(increaseWidth);
      setCanvasHeight(increaseHeight);
    } else {
      setCanvasWidth(PercentOfScreenWidth);
      setCanvasHeight(PercentOfScreenhight);
    }
    
    
    };
    const handleCanvasDecrease = () => {
    let decreaseWidth = canvasWidth / 2;
    let decreaseHeight = canvasHeight / 2;
    
    
    if (decreaseWidth > 100 && decreaseHeight > 50 ) {
       setCanvasWidth(decreaseWidth);
      setCanvasHeight(decreaseHeight);
    } else {
      setCanvasWidth(100)
      setCanvasHeight(50)
    }
    
    
    };
    
    

  // ____________   AUDIO CONTEXT
  // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createAnalyser

  const createAudioContext = () => {
    audioConstextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    
  };


  const handlePlay = () => {
    if (!audioConstextRef.current) {
      createAudioContext();
      actulizedAudioRef();
      createAnalyser();
      createSourceNode();
    }
    if (audioRef.current.currentTime !== 0) {
      audioRef.current.currentTime = pausedAudioTimeRef.current
    }
 
    draw();
    handleIsPlaying();
  }

  const createAnalyser = () => {
 
    if (audioConstextRef.current) {
      const analyser = audioConstextRef.current.createAnalyser();
      analyser.fftSize = fastFourierValueRef.current;
      analyserRef.current = analyser;
      bufferLengthRef.current = analyser.frequencyBinCount;
      dataArrayInfoRef.current = new Uint8Array(bufferLengthRef.current);
    }
  };

  const handleIsPlaying = async () => {
    
    try {
      
      
       
      
      if (sourceNodeRef.current && analyserRef.current && audioConstextRef.current) {
        sourceNodeRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioConstextRef.current.destination);
      } else {
        console.error('Invalid sourceNode, analyser, or audio context.');
      }
       
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
      
        

      audioRef.current.addEventListener('canplaythrough', () => {
       
        audioRef.current.play();
     
      });
      
    } catch (error) {
      console.error("Error starting audio playback:", error);
    }
  };

  


  

  const createSourceNode = () => {
    if (!audioRef.current) {
      actulizedAudioRef();
    }
    if (audioConstextRef.current && audioRef.current) {
      sourceNodeRef.current = audioConstextRef.current.createMediaElementSource(audioRef.current);
      return sourceNodeRef.current;
    } else {
      console.error('Audio context or audio element is not available.');
      console.log("audioConstextRef.current", audioConstextRef.current);
      console.log("audioRef.current", audioRef.current);
      return null;
    }
  };
  



  const handleStop = () => {
    if (audioRef.current && audioConstextRef.current && audioConstextRef.current.state === 'running') {
      audioRef.current.pause();
      console.log(" Audio ref Current time: ",audioRef.current.currentTime);
      pausedAudioTimeRef.current = audioRef.current.currentTime


    }
   
   
  };

  const filterUniqueElements = (arr) => {
    return [...new Set(arr)];
}
  

  const draw = () => {
  
  const canvas = canvasRef.current;
  const canvasCtx = canvas.getContext('2d');
  canvasCtx.fillStyle = 'rgb(0, 0, 0)';
  canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
     
  //  console.log("let see if it's playing");
 
     
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      dataArrayInfoRef.current = dataArray;
      bufferLengthRef.current = dataArray.length;
    }

    console.log("bufferLengthRef.current" , bufferLengthRef.current);
    const barWidth = (canvasWidth / bufferLengthRef.current) * 2.5;
    console.log("barWidth", barWidth);
    let x = 0;
    let pitchNotesArray = [];
    

    for (let i = 0; i < bufferLengthRef.current; i++) {
      console.log("dataArrayInfoRef.current", dataArrayInfoRef.current);
      const barHeight = dataArrayInfoRef.current[i];
      console.log("barHeight", barHeight);
      const frequency = i * (audioConstextRef.current.sampleRate / fastFourierValueRef.current);
     // console.log("audioConstextRef.current.sampleRate", audioConstextRef.current.sampleRate);
      setInfoFrequency(frequency);
      const pitchAndBaseFrequency = frequencyToNote(frequency)
      pitchValueRef.current = pitchAndBaseFrequency.pitchWesternMusic;
      baseFrequencyRef.current = pitchAndBaseFrequency.baseFrequencyWesternMusic;
      pitchNotesArray.push(pitchValueRef.current);
      setBaseFrequency(pitchAndBaseFrequency.baseFrequencyWesternMusic);
     
     
     
      canvasCtx.fillStyle = `rgb(${barHeight + 30}, 50, 50)`;
      canvasCtx.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight / 2);
      x += barWidth + 1;
    }
    const pitchNotesArrayFiltered = filterUniqueElements(pitchNotesArray)
    setPitchNotes(pitchNotesArrayFiltered);
    requestAnimationFrame(draw);
  };

/*
x: The x-coordinate of the upper-left corner of the rectangle.
y: The y-coordinate of the upper-left corner of the rectangle.
w: The width of the rectangle.
h: The height of the rectangle.


x and y define the starting point (top-left corner) of the rectangle.
w is the width of the rectangle.
h is the height of the rectangle.
The method CanvasRect.fillRect() will draw a filled rectangle on the canvas starting from the (x, y) position and extending w units to the right and h units downwards.

For example:

canvasCtx.fillRect(10, 20, 100, 50);
This line of code will draw a filled rectangle on the canvas starting at coordinates (10, 20) with a width of 100 units and a height of 50 units.


*/
  

const frequencyToNote = (infoFrequency) => {
  if (infoFrequency === 0) {
    return 'No sound';
  }

  

  // For Western Music:
  const noteCountFromC0 = 12 * (Math.log2(infoFrequency / 16.351597831287414) + 1);
  const noteIndex = Math.floor(noteCountFromC0 % 12);
  const octave = Math.floor(noteCountFromC0 / 12);

  const pitchWesternMusic = `${notes[noteIndex]}${octave}`;

  const baseFrequencyWesternMusic = 16.351597831287414 * (2 ** (octave + (noteIndex - 9) / 12));
 // const noteBaseFrequencyWesternMusic = 
  console.log("pitchWesternMusic", pitchWesternMusic);
  return { pitchWesternMusic , baseFrequencyWesternMusic };
 
};


  

// WESTERN SCALES __________________


const onSelectedNonWesternScale = (event) =>{
  const selected = event.target.value;

  const selectedScaleArray = nonWesternScales[selected];
  console.log(" selectedScaleArray", selectedScaleArray);
  nonWesternScaleCreator(selectedScaleArray);
  
  console.log(" USER selected Scale", selected);
  const firstSpaceIndex = selected.indexOf(" "); // Find the index of the first space

  const result = firstSpaceIndex !== -1 ? selected.substring(0, firstSpaceIndex) : selected;
  console.log(result);


  setSelectedWestern(result);
}






function circularPermutation(arr, start) {
  const index = arr.indexOf(start);


  if (index === -1) {
      return "Starting point not found in the array.";
  }


  const newArr = arr.slice(index).concat(arr.slice(0, index));
  return newArr;
}


const notePlacer = (arr, index) =>{
const length = arr.length;
let nota = null;
if (index < 0){ 
nota = arr[length + index]
};
if (index >= 0){ 
nota = arr[index]
};


return nota  
}

  const nonWesternScaleCreator = (selected) => {
    console.log("selected", selected);
  
    if (pitchValueRef.current) {
      let start = notes.find((n) => n === pitchValueRef.current)
    }
    let start = notes[0]; // C
    
    let orgaizedNotes = circularPermutation(notes, start);
    console.log("orgaizedNotes", orgaizedNotes);
    let nonWesternScale = [];
    for (let i = 0; i < selected.length; i++) {
      console.log("Organized Notes", orgaizedNotes[i]);
      let note = notePlacer(orgaizedNotes, i);
      let noteMusicalRegister = selected[i] > 1 ? 4 : 3;
      nonWesternScale.push(`${note} ${noteMusicalRegister}`);
      
    }

    setSelectedNonWesternScale(nonWesternScale);
      console.log("nonWesternScale", nonWesternScale);
  }
  
  
  const onShowWesternScale = () => {
    setShowWesternScale(true);
  }
  
  
  
  


  useEffect(() => {
    if (audioConstextRef.current) {
      audioConstextRef.current.resume().then(() => {
       
      
      });
    }
  }, [audioConstextRef.current]);

  return (
    <div>
      <div className="audio_visualizer_controlers">
        <label className="play_stop">
          <button className="button_play" onClick={handlePlay}>
            PLAY
          </button>
          <button className="button_stop" onClick={handleStop}>
            STOP VISUALIZER
          </button>
        </label>
      </div>

      <div className="audio_visualizer_canvas">
        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      </div>

      <div className="audio_visualizer_controlers">
        <label className="canvas_info">
          Canvas Size
          <button className="button_increase" onClick={handleCanvasIncrease}>
            +
          </button>
          <button className="button_decrease" onClick={handleCanvasDecrease}>
            -
          </button>
          <p>
            Canvas Width {canvasWidth} - Canvas Height {canvasHeight}
          </p>
          <p>
            Screen Width {currentScreenWidth} - Screen Size {currentScreenSize}
          </p>
        </label>

        <label className="frequency">
          Set Frequency
          <button className="button_increase" onClick={handleFastIncrease}>
            +
          </button>
          <button className="button_decrease" onClick={handleFastDecrease}>
            -
          </button>
          
          <h2>{(fastFourierValueRef.current)}</h2>
         
        </label>
       
      </div>

      <div >
        {infoFrequency !== null ? (
          <div className="InfoFrecuency">
          <ol >
            <li>Frequency - {infoFrequency} </li>
            <li>NOTES - {pitchNotes.join(', ')} </li>
            <li>Pitch - {pitchValueRef.current} </li>
            <li>Base Frequency - {baseFrequency}</li>
            </ol>
            </div>
        ) : (
          ''
        )}
      </div>

      <div>
<div className="Chord">
    <label>SELECT WESTERN MUSIC SCALE:</label>
    <select className="select_Chord" onChange={onSelectedNonWesternScale}>
        <option value="Indian (Hindustani) Raag Bilawal">Select</option>
        {Object.keys(nonWesternScales).map((westernScale) => (
            <option key={westernScale} value={westernScale}>
             
                        {westernScale}
                 
            </option>
        ))}
    </select>
    {selectedWestern && (
        <button className="button_chords" onClick={onShowWesternScale}>{selectedWestern}</button> 
          )}
          
          {showWesternScale && (
            <label > {selectedNonWesternScale.join(', ')} </label>
          )
          
          
          }
</div>
</div> 




    </div>
  );
};

export default AudioVisualizer;
