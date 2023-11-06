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



  const [infoFrequency, setInfoFrequency] = useState(null);
  const [pitchNotes, setPitchNotes] = useState([]);
  const [pitchValue, setPitchValue] = useState(null);
  const [baseFrequency, setBaseFrequency] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(400);
 
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
    
    }
  };

  const handleFastDecrease = () => {
    let decrease = fastFourierValueRef.current / 2;
    if (decrease >= 32) {

    //  setFastFourierValue(decrease);
      fastFourierValueRef.current = decrease;
      console.log("fastFourierValueRef.current", fastFourierValueRef.current);
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
    const analizer = audioConstextRef.current.createAnalyser();
    analyserRef.current = analizer;
    analyserRef.current.fftSize = fastFourierValueRef.current;

    console.log("analyserRef.current", analyserRef.current);
    console.log("analyserRef.current.fftSize", analyserRef.current.fftSize);
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

  const draw = () => {
  
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
     
  //  console.log("let see if it's playing");
   
     

    const bufferLength = analyserRef.current.frequencyBinCount;
   
    dataArrayInfoRef.current = new Uint8Array(bufferLength);
   
  //  console.log("dataArrayInfoRef.current", dataArrayInfoRef.current);
 // console.log("bufferLength", bufferLength);
    const barWidth = (canvasWidth / bufferLength) * 2.5;
    let x = 0;
    let pitcNotesArray = [];

    for (let i = 0; i < bufferLength; i++) {
      
      const barHeight = dataArrayInfoRef.current[i];
      const frequency = i * (audioConstextRef.current.sampleRate / fastFourierValueRef.current );
      setInfoFrequency(frequency);

      const pitch = frequencyToNote(frequency);
      setPitchValue(pitch);
      pitcNotesArray.push(pitch);

      canvasCtx.fillStyle = `rgb(${barHeight + 30}, 50, 50)`;
      canvasCtx.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight / 2);
      x += barWidth + 1;
    }
    setPitchNotes(pitcNotesArray);
    requestAnimationFrame(draw);
  };


  







  const frequencyToNote = (infoFrequency) => {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const A4Frequency = 440;
    const semitoneRatio = 2 ** (1 / 12);
    const semitonesFromA4 = 12 * Math.log2(infoFrequency/ A4Frequency);
    const noteIndex = Math.round(semitonesFromA4) % 12;
    const octave = Math.floor((semitonesFromA4 + 9) / 12) + 4;
    return `${noteNames[noteIndex]}${octave}`;
  };

  

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
            <li>Pitch - {pitchValue} </li>
            <li>Base Frequency - {baseFrequency}</li>
            </ol>
            </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default AudioVisualizer;
