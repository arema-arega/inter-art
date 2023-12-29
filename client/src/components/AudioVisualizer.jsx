import React, { useEffect, useRef, useState } from 'react';
import { NonWesternScaleCreator } from './MusicalScaleCreator';
import { frequencyToNoteCalculator } from './FrequencyToNoteCalculator';
import { IntervalsComponents } from './IntervalsComponents';

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
  const [scaleArrayWestern, setScaleArrayWestern] = useState([]);
  
 // console.log("audioLink", audioLink);

 
 
  

  
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
    const barWidth = (canvasWidth / bufferLengthRef.current) * 0.5;
    console.log("barWidth", barWidth);
    let x = 0;
    let pitchNotesArray = [];
    

    for (let i = 0; i < bufferLengthRef.current; i++) {
      console.log("dataArrayInfoRef.current", dataArrayInfoRef.current);
      //const barHeight = dataArrayInfoRef.current[i] !== 0 ?  dataArrayInfoRef.current[i] + 200  : 0 ;
      const barHeight = dataArrayInfoRef.current[i];
      console.log("barHeight", barHeight);
      const frequency = i * (audioConstextRef.current.sampleRate / fastFourierValueRef.current);
     // console.log("audioConstextRef.current.sampleRate", audioConstextRef.current.sampleRate);
      setInfoFrequency(frequency);
      const pitchAndBaseFrequency = frequencyToNoteCalculator(frequency)
      pitchValueRef.current = pitchAndBaseFrequency.pitchWesternMusic;
      baseFrequencyRef.current = pitchAndBaseFrequency.baseFrequencyWesternMusic;
      pitchNotesArray.push(pitchValueRef.current);
      setBaseFrequency(pitchAndBaseFrequency.baseFrequencyWesternMusic);
      setScaleArrayWestern(pitchAndBaseFrequency.scaleArray)
     
      canvasCtx.fillStyle = `rgb(${barHeight + 60}, 50, 50)`;
      canvasCtx.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight / 2);
      x += barWidth + 2;
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
  


const intervalsToShow = IntervalsComponents(baseFrequency, pitchValueRef.current)


  
  




  useEffect(() => {
    if (audioConstextRef.current) {
      audioConstextRef.current.resume().then(() => {
       
      
      });
    }
  }, [audioConstextRef.current]);

  return (
    <div>

      <div>
<div className="general_audio_visualizer_controlers">
<div className="audio_visualizer_controlers">
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

      </div> 




      <div className="audio_visualizer_controlers">
        

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

        </div>

        </div>



        
       
        






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

</div> 

      { /* <NonWesternScaleCreator scaleArrayWestern={scaleArrayWestern} />*/}

      <p> {intervalsToShow.closestInterval} </p>
      <p> {intervalsToShow.exactInterval}</p>
      <p>{intervalsToShow.higherFrequencyInfo}</p>

    </div>
  );
};

export default AudioVisualizer;
