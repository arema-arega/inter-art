import React, { useEffect, useRef, useState } from 'react';


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
    const [counter, setCounter] = useState(0);
   
    /*
The useRef hook to create three refs: 
canvasRef, audioRef, and analyserRef. 
These refs will be used to store references 
to the canvas element, audio element, and analyser node, respectively.

    */

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
    if (!userInteracted) return;
    // If user interacts then the visualizer will start
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      /*Create an audioContext using the AudioContext API, 
      which provides methods and properties for working with audio in the browser.
      */
       
        
      const analyser = audioContext.createAnalyser();
      /*
      create an audioContext using the AudioContext API, 
      which provides methods and properties for working with audio in the browser.
      */
      analyser.fftSize = 512;
      /*
      Create an analyser node using audioContext.createAnalyser(). 
      The analyser node is used to analyze the audio data.
      
      We set the fftSize property of the analyser to 256, 
      which determines the size of the Fast Fourier Transform used for audio analysis.
     */
      
      const canvas = canvasRef.current;
     // Gets the reference to the canvas element using the canvasRef.current.
     
      const canvasCtx = canvas.getContext('2d');
      //Obtains the 2D context of the canvas 
      //using canvas.getContext('2d'), 
      //which allows us to draw on the canvas.
    const audioElement = new Audio(audioLink);
    //Creates a new Audio object with the provided audioLink, 
    //representing the audio file to be visualized.
    audioRef.current = audioElement;
      analyserRef.current = analyser;
    //Store the audio element and analyser node references 
    //in their respective refs for later use.

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

      const bufferLength = analyser.frequencyBinCount;
    //Gets the number of data points to be received 
    //from the analyser using analyser.frequencyBinCount.
    //This determines the length of the array used to store frequency data.
      const dataArray = new Uint8Array(bufferLength);
      //Creates a new Uint8Array called dataArray 
      //with a length equal to the bufferLength.

      const draw = () => {
    //define the draw function, 
    //which will be used to continuously 
   // update the canvas with the audio visualization.
  
   // if the user doesn't interact the canvas will not be displayed  
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;
    // WIDTH and HEIGHT variables represent 
    //the width and height of the canvas, respectively.
          analyser.getByteFrequencyData(dataArray);
    // use analyser.getByteFrequencyData(dataArray) 
    //to retrieve the audio frequency data and store it in the dataArray

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

          for (let i = 0; i < bufferLength; i++) {
              // Inside the loop, we iterate through the dataArray, 
               //which contains frequency data from the audio.
              barHeight = dataArray[i];
               // We retrieve the barHeight from the current data point in the dataArray. 
              //The barHeight represents the intensity of the audio signal 
              //at the corresponding frequency.

              canvasCtx.fillStyle = `rgb(${barHeight}, 50, 50)`;
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

      requestAnimationFrame(draw);
    };

      audioElement.addEventListener('canplay', () => {
        // add an event listener to the audioElement for the 'canplay' event.
        // Inside the event listener, we call audioElement.play() to start playing the audio 
          if (audioElement.play()) {
              //This event is triggered when the audio is ready to play. 
              draw();
              //and then call the draw function to update the canvas visualization continuously.
          };

         
        
      });
        
        
      audioElement.addEventListener('stopplaying', () => {
        // add an event listener to the audioElement for the 'canplay' event.
        // Inside the event listener, we call audioElement.play() to start playing the audio 
          if (audioElement.pause()) {
              //This event is triggered when the audio is ready to play. 
              return audioElement.currentTime = 0;
              //and then call the draw function to update the canvas visualization continuously.
          };

         
        
    });
      
     
      
      

    return () => {
      audioElement.pause();
        audioElement.currentTime = 0;
        
    };
  }, [audioLink, userInteracted]); // uses the changes of the audioLink to re-start

    /* Inside the useEffect hook,
    set up the audio context, 
    create an AnalyserNode, 
    and connect it to the audio source
   */
    
    const handleUserInteraction = () => {
       
       setUserInteracted(true);
       if (counter % 2 === 0) {
            setUserInteracted(false);
        };
        setCounter(counter + 1);
      };
    
    return (

        <div>
            <div>
        <canvas ref={canvasRef} />
            </div>
            <div>
            <button onClick={handleUserInteraction}>Start Visualizer</button>
            </div> 
        </div>
    )
};

export default CanvasVisualizer;
