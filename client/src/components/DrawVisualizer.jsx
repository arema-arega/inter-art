














//_____________________________________________________________________        
const findBaseFrequency = () => {
    analyser.getByteFrequencyData(dataArray);

    // Find the index with the highest amplitude in the dataArray
    let maxAmplitudeIndex = 0;
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i] > dataArray[maxAmplitudeIndex]) {
        maxAmplitudeIndex = i;
      }
    }

    const sampleRate = audioContext.sampleRate;
    const frequencyBinWidth = sampleRate / fastFourierValue; //analyser.fftSize;
    const baseFrequency = maxAmplitudeIndex * frequencyBinWidth;    
      
    setBaseFrequency(baseFrequency);
  requestAnimationFrame(findBaseFrequency); // DRAW
};  
      
//______________________________________________________________________________ 