import React, { useEffect, useRef, useState } from 'react';
//import AudioPlayer from './AudioPlayer';

//Import React and the necessary hooks
//useRef is a React hook that provides a way to create a mutable object 
//that persists between renders.
//It can be used to hold a reference to a DOM element, 
//manage a value that won't trigger a re-render, 
//or store any mutable value that needs to be accessed across renders 
//without causing a re - render.
const CanvasVisualizer = ({ audioLink }) => {
  const canvasRef = useRef(null);
 
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
    
  const [infoFrecuency, setInfoFrequency] = useState(null);
  const [pitchNotes, setPitchNotes] = useState([]);
  const [baseFrequency, setBaseFrequency] = useState(null);
  const [fastFourierValue, setFastFourierValue] = useState(32);
  const [canvasWidth, setcanvasWidth] = useState(100);
  const [canvasHeight, setcanvasHeight] = useState(50);
  const [visualAudioElement, setVisualAudioElement] = useState(null);


 
   
    /*
The useRef hook to create three refs: 
canvasRef, audioRef, and analyserRef. 
These refs will be used to store references 
to the canvas element, audio element, and analyser node, respectively.

    */
  
  
  const handlePlay = () => {
    audioRef.current?.play();
   setIsAudioPlaying(true);
    console.log("playing")
   
   
};
// If user interacts then the visualizer will start
 //https://stackoverflow.com/questions/67764413/react-js-audio-elements-src-is-updating-on-setstate-but-the-audioref-is-not 
 /*
 useRef will not get re-initialized on every render.

So it will stay the same as it was initialized the very first time.

So whenever you are switching your track you have to update the audioRef too.

Change your toPrevTrack and toNextTrack

const toPrevTrack = () => {
   const prevIndex = trackIndex - 1 < 0 ? tracks.length - 1 : trackIndex - 1;
   const { audioSrc } = tracks[prevIndex]
   audioRef.current = new Audio(audioSrc);
}

const toNextTrack = () => {
   const nextIndex = trackIndex < tracks.length - 1 ? trackIndex + 1 : 0;
   const { audioSrc } = tracks[nextIndex]
   audioRef.current = new Audio(audioSrc);
}

 */
 
 
 
const handleStop = () => {
  console.log("The user has pressed STOP")
  audioContext.close();
  console.log(audioRef.current.pause);
  audioRef.current.pause();
  audioRef.current.currentTime = 0;
 setIsAudioPlaying(false);
  
  
  

};
   

    useEffect(() => {
      // useEffect from React to perform side effects in function components. 
      //Side effects include things like data fetching, subscriptions, 
      //or manually interacting with the DOM.
    //Takes two arguments: a function and a dependency array. 
    //The function passed to useEffect will be executed after the component has rendered.
    //The second argument, the dependency array, is optional 
    //and specifies which values the effect depends on.
    //If the dependency array is not provided, 
    //the effect will be executed after every render.
   
    //__AUDIO CONEXT____________________________________________________________________________
     /*Create an audioContext using the AudioContext API,
      which provides methods and properties for working with audio in the browser.
      */
      
      const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(newAudioContext);
    if (!isAudioPlaying) return;
      
       console.log(audioContext);
      
      
   //___ANALIZER____PROP AUDIOCONTEXT___________________________________________________________________
      /*
      Create an analyser node using audioContext.createAnalyser(). 
      The analyser node is used to analyze the audio data.
      */
      const analyser = audioContext.createAnalyser();

      console.log(analyser);
        
      analyser.fftSize = fastFourierValue;

      console.log(fastFourierValue);
      /*
      We set the fftSize property of the analyser to 256, 
      which determines the size of the Fast Fourier Transform used for audio analysis.
32: Low frequency resolution, few frequency bins.
64: Low frequency resolution, more frequency bins.
128: Balanced frequency resolution and number of frequency bins.
256: Balanced frequency resolution and more frequency bins.
512: Good frequency resolution, many frequency bins.
1024: High frequency resolution, even more frequency bins.
2048: Higher frequency resolution, even more frequency bins.
4096: Very high frequency resolution, even more frequency bins.
     */
    
  //_____CANVAS CREATION_______________________________________________________________________________

  const canvas = canvasRef.current;
  // Gets the reference to the canvas element using the canvasRef.current.
   console.log(canvas);
   const canvasCtx = canvas.getContext('2d');
   //Obtains the 2D context of the canvas 
   //using canvas.getContext('2d'), 
   //which allows us to draw on the canvas.

    
   //_AUDIO ELEMENT_____PROP AUDIOLINK__/ ANALYSER___________________________________________________________________________  
    const audioElement = new Audio(audioLink);
    //Creates a new Audio object with the provided audioLink,
    //representing the audio file to be visualized.
      
      /*
    const audio = new Audio(audioSrc)
    const audioRef = useRef(audio)

      */
      audioRef.current = audioElement;
      setVisualAudioElement(audioElement);
      analyserRef.current = analyser;
    //Store the audio element and analyser node references
    //in their respective refs for later use.
      
      console.log(`esto es audioelement ${audioElement}`)
      
      
//_____SOURCE NODE______________________________________________________________________________
      const sourceNode = audioContext.createMediaElementSource(audioElement);
    // create a sourceNode using audioContext.createMediaElementSource(audioElement). 
    //The sourceNode represents the audio source 
    //and connects the audio element to the audio context.
      sourceNode.connect(analyser);
    // connect the sourceNode to the analyser node using sourceNode.connect(analyser). 
    //This connection allows the audio data to be analyzed by the analyser.  
      analyser.connect(audioContext.destination);
    //connect the analyser node to the audio context's destination (i.e., audio output) 
    //using analyser.connect(audioContext.destination). 
    //This is necessary for the audio to be audible during visualization.
    
//_____BUFFER LENGHT____________________________________________________________________________
      const bufferLength = analyser.frequencyBinCount;
      console.log(`buffer length ${bufferLength} number of data points received` )
    //Gets the number of data points to be received 
    //from the analyser using analyser.frequencyBinCount.
    //This determines the length of the array used to store frequency data.
      const dataArray = new Uint8Array(bufferLength);
      //Creates a new Uint8Array called dataArray
      //with a length equal to the bufferLength.
  
      
 


//_____________________________________________________________________________
      const draw = () => {
    //define the draw function, 
    //which will be used to continuously 
   // update the canvas with the audio visualization.
 // console.log("Inside drawing")
   // if the user doesn't interact the canvas will not be displayed  
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;
    // WIDTH and HEIGHT variables represent
    //the width and height of the canvas, respectively.
         
        analyser.getByteFrequencyData(dataArray);
      //  console.log(`DataArray ${dataArray}`)

//_____BASE FRECUENCY  PROPS /DATA ARRAY / FASTFOURIERVALUE _______________________________________________________________        
const findBaseFrequency = () => {
  analyser.getByteFrequencyData(dataArray);
  // use analyser.getByteFrequencyData(dataArray)
  //to retrieve the audio frequency data and store it in the dataArray
    // Find the index with the highest amplitude in the dataArray
    let maxAmplitudeIndex = 0;
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i] > dataArray[maxAmplitudeIndex]) {
        maxAmplitudeIndex = i;
      }
    }
 console.log(`maxAplitude frecuency ${maxAmplitudeIndex}`)
    const sampleRate = audioContext.sampleRate;
    const frequencyBinWidth = sampleRate / fastFourierValue; //analyser.fftSize;
    const baseFrequency = maxAmplitudeIndex * frequencyBinWidth;    
      
    setBaseFrequency(baseFrequency);
  requestAnimationFrame(findBaseFrequency); // DRAW
};  
      





        
        
    //______________________________________________________________________________      

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    // We clear the canvas using canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    //and set a black background using canvasCtx.fillStyle = 'rgb(0, 0, 0)'.
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    // iterate through the dataArray, representing each data point as a bar 
    //on the canvas using canvasCtx.fillRect().
    

          const barWidth = (WIDTH / bufferLength) * 2.5;
          // calculate the barWidth based on the canvas width (WIDTH) 
          //and the number of data points in the dataArray(bufferLength).
          //This will determine the width of each bar on the canvas.
          
          let barHeight;
         
          let x = 0;
          const pitchNotes = [];

          for (let i = 0; i < bufferLength; i++) {
              // Inside the loop, we iterate through the dataArray, 
               //which contains frequency data from the audio.
              barHeight = dataArray[i];
               // We retrieve the barHeight from the current data point in the dataArray. 
              //The barHeight represents the intensity of the audio signal 
              //at the corresponding frequency.
           // console.log(barHeight);
            const frequency = i * (audioContext.sampleRate / fastFourierValue); // analyser.fftSize
          //  console.log(frequency);
              const pitch = frequencyToNote(frequency);
              pitchNotes.push(pitch);
          //  console.log(pitch);
                  canvasCtx.fillStyle = `rgb(${barHeight +30}, 50, 50)`;
              
              // set the canvasCtx.fillStyle to a color value that depends on the barHeight. 
              //In this case, the color is represented as rgb(${ barHeight }, 50, 50), 
              //where the red component(barHeight) varies based on the audio intensity.
             
        canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

              x += barWidth + 1;
              
              // use canvasCtx.fillRect() to draw a rectangle on the canvas.
              //The parameters of fillRect are:

              //x: The starting horizontal position of the rectangle. 
              //x is initialized to 0 and then incremented by barWidth + 1 in each iteration, 
              //which creates gaps between the bars.
              
              //y: The starting vertical position of the rectangle. 
              //In this case, we use HEIGHT - barHeight / 2 to position the bars 
              //from the bottom of the canvas, leaving space for the canvas to render other elements.
              
              // width: The width of the rectangle, which is barWidth.
              
              // height: The height of the rectangle, which is barHeight / 2. 
              //We divide it by 2 to scale down the bars (visually more appealing)
              
              // After drawing each bar, 
              //we increment x by barWidth + 1 to position the next bar horizontally 
              //with a gap.
              
             
          }
          
          setPitchNotes(pitchNotes.join(', '));
          setInfoFrequency(dataArray.join(', '));  
      requestAnimationFrame(draw); // DRAW
      };
      





//____________________________________________________________________________________________
    audioElement.addEventListener('ended', () => {
      
      setIsAudioPlaying(false);
      
      });
  
      audioElement.addEventListener('canplaythrough', () => {
        if (audioElement.play()) {
          draw(); // DRAW
        }
      });
   //_______________________________________________________________________________________   
      const frequencyToNote = (frequency) => {
        const noteNames = [
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
          'B',
        ];
      
        const A4Frequency = 440; // Frequency of the A4 note in Hz
        const semitoneRatio = 2 ** (1 / 12);
        const semitonesFromA4 = 12 * Math.log2(frequency / A4Frequency);
      
        const noteIndex = Math.round(semitonesFromA4) % 12;
        const octave = Math.floor((semitonesFromA4 + 9) / 12) + 4;
      
        return `${noteNames[noteIndex]}${octave}`;
      };
      




    //__________________________________________________________________________________  

      return () => {
       
      audioElement.pause();
      audioElement.currentTime = 0;
      setUserInteracted(false);
     setIsAudioPlaying(false);
        
    };
  }, [audioLink, isAudioPlaying, fastFourierValue, canvasWidth, canvasHeight, visualAudioElement ]); // uses the changes of the audioLink to re-start

    /* Inside the useEffect hook,
    set up the audio context, 
    create an AnalyserNode, 
    and connect it to the audio source
   */
    
  
     
     
  
    

    const handleFastIncrease = () => {
        let increase = fastFourierValue * 2;

        if (increase < 4096) {
            setFastFourierValue(increase);  
        } else {
            setFastFourierValue(4096)
        }

        
    };

    const handleFastDecrease = () => {
        const decrease = fastFourierValue / 2;

        if (decrease > 32) {
            setFastFourierValue(decrease);  
        } else {
            setFastFourierValue(32)
        }

        
  };
  


  const handleCanvasIncrease = () => {
    let increaseWidth = canvasWidth * 2;
    let increaseHeight = canvasHeight * 2;

    if (increaseWidth < 7680 && increaseHeight < 4320 ) {
      setcanvasWidth(increaseWidth);
      setcanvasHeight(increaseHeight);
    } else {
      setcanvasWidth(7680);
      setcanvasHeight(4320);
    }

  };
  const handleCanvasDecrease = () => {
    let decreaseWidth = canvasWidth / 2;
    let decreaseHeight = canvasHeight / 2;
  
    if (decreaseWidth > 100 && decreaseHeight > 50 ) {
       setcanvasWidth(decreaseWidth);
      setcanvasHeight(decreaseHeight);
    } else {
      setcanvasWidth(100)
      setcanvasHeight(50)
    }

  };


/*
Standard Web Banner Sizes:

728 x 90 pixels (Leaderboard)
300 x 250 pixels (Medium Rectangle)
336 x 280 pixels (Large Rectangle)
160 x 600 pixels (Wide Skyscraper)
300 x 600 pixels (Half-Page Ad)
Standard Screen Resolutions:

1920 x 1080 pixels (Full HD)
2560 x 1440 pixels (2K)
3840 x 2160 pixels (4K)
5120 x 2880 pixels (5K)
7680 x 4320 pixels (8K)
Social Media Graphics:

1200 x 630 pixels (Facebook Link Post)
1080 x 1080 pixels (Instagram Square)
1200 x 675 pixels (LinkedIn Link Post)
1500 x 500 pixels (Twitter Header)
Responsive Web Design:

Varies based on the layout and breakpoints of your design.
Common breakpoints include 320px, 768px, 1024px, and 1440px.
Custom Sizes:

Custom canvas sizes tailored to your specific visualization needs.

*/
    
    return (

        <div>
            <div>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />

            </div>
        <div>
        <button className='Play' onClick={handlePlay}> PLAY </button>
        </div> 
          
           <div>
           <button className= "Stop" onClick={handleStop}> STOP VISUALIZER </button> 
           </div>
        
        <div>
                   <label>
                    Canvas Size
                    <button className= "Increase" onClick={handleCanvasIncrease}>+</button>
                    <button className= "Decrease" onClick={handleCanvasDecrease}>-</button>
                    <p> Canvas Width {canvasWidth} - Canvas Height {canvasHeight}</p>
                    </label>
            </div>




            <div className= "InfoFrecuency">
            {infoFrecuency !== null ? (
      <ol>
              <li>Frecuency - {infoFrecuency} </li>
              <li> Pitch - {pitchNotes} </li>
              <li> Base Frecuency - {baseFrequency}</li>
      </ol>
            ) : ''}
            </div>

            <div>
                   <label className='frecuency'>
                    Set Frecuency
                    <button className= "Increase" onClick={handleFastIncrease}>+</button>
                    <button className= "Decrease" onClick={handleFastDecrease}>-</button>
                    <p>{fastFourierValue}</p>
                    </label>
            </div>

        {/*<div>
          <AudioPlayer visualAudioElement={visualAudioElement} audioContext={audioContext} isAudioPlaying={isAudioPlaying} />
            </div>*/} 
        


        </div>
    )
};

export default CanvasVisualizer;
