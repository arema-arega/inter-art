// OXILATOR______________________________________________
// Inside your component or function
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an OscillatorNode
const oscillator = audioContext.createOscillator();

// Connect the oscillator to the audio context's destination
oscillator.connect(audioContext.destination);

// Function to create and start the oscillator with the given frequency
const startOscillator = (frequency) => {
  // Set the frequency of the oscillator
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  // Start the oscillator
  oscillator.start();
};

// Function to stop the oscillator
const stopOscillator = () => {
  // Stop the oscillator
  oscillator.stop();
};

// Use the startOscillator and stopOscillator functions based on your data
// For instance, in your draw function or event handler:

// Inside the draw function or event handler where you have the frequency data
const frequency = i * (audioContext.sampleRate / fastFourierValueRef.current);

// Start the oscillator with the given frequency
startOscillator(frequency);

// Stop the oscillator when necessary
// stopOscillator();



