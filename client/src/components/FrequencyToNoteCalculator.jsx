
import { notes } from './MusicScales';


export const frequencyToNoteCalculator = (frequency) => {
   
    if (frequency === 0) {
      return 'No sound';
    }
  
    console.log("FRECUENCIA RECIBIDA", frequency)
  
    // For Western Music:
    const noteCountFromBaseNoteC0 = 12 * (Math.log2(frequency / 16.351597831287414) + 1);
    const noteIndex = (Math.floor(noteCountFromBaseNoteC0) + 9) % 12; // Adjusting for potential negative indices
    const octave = Math.floor(noteCountFromBaseNoteC0 / 12);
  
    const pitchWesternMusic = `${notes[noteIndex]}${octave}`;
    const notesAndIndex = `${notes[noteIndex]}`;
    const scaleArray = [notesAndIndex];
    scaleArray.push(scaleArray.filter((x) =>  x !== notesAndIndex));
    const baseFrequencyWesternMusic = 16.351597831287414 * (2 ** (octave + (noteIndex - 9) / 12));
    console.log("pitchWesternMusic", pitchWesternMusic);
    console.log("baseFrequencyWesternMusic", baseFrequencyWesternMusic);
    console.log("scaleArray", scaleArray);
   // For Non Western Music:



    return { pitchWesternMusic , baseFrequencyWesternMusic, scaleArray };
   
  };
  
