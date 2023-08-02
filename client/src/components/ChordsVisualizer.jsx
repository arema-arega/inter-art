// Define arrays for chord names and qualities
const chordNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const chordQualities = ['maj', 'min', 'dim', 'aug'];

// Function to generate all chord combinations
const getAllChordCombinations = () => {
  const combinations = [];

  // Loop through chord names and qualities to create combinations
  for (const name of chordNames) {
    for (const quality of chordQualities) {
      const chord = name + quality;
      combinations.push(chord);
    }
  }

  return combinations;
};

// Get the list of all chord combinations
const allChords = getAllChordCombinations();

console.log(allChords);







//<script async type="text/javascript" src="https://www.scales-chords.com/api/scales-chords-api.js"></script>


//<ins class="scales_chords_api" chord="Cmaj" instrument="piano" output="sound" width="100px" height="150px" nolink="true"></ins>
