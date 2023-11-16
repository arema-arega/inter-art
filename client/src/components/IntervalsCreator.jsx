import { Intervals } from './MusicalIntervals';
import { frequencyToNoteCalculator} from './FrequencyToNoteCalculator';

// User Selects 2 notes baseFrequency & higherFrequency and receives the name of the Closest interval
export const findClosestInterval = (baseFrequency, higherFrequency) => {
    let closestInterval = null;
    let closestDifference = Number.MAX_VALUE;
  
    for (const [intervalName, [numerator, denominator]] of Object.entries(Intervals)) {
      const expectedHigherFrequency = (baseFrequency * numerator) / denominator;
      const frequencyDifference = Math.abs(higherFrequency - expectedHigherFrequency);
  
      if (frequencyDifference < closestDifference) {
        closestDifference = frequencyDifference;
        closestInterval = intervalName;
      }
    }
  
    return closestInterval;
};
  
// User Selects 2 notes baseFrequency & higherFrequency and receives the name of the Exact interval or Non if it's not found
export const findExactInterval = (baseFrequency, higherFrequency) => {
    const baseFrequencyNote = frequencyToNoteCalculator(baseFrequency);
    const higherFrequencyNote =  frequencyToNoteCalculator(higherFrequency);
   
    for (const [intervalName, [numerator, denominator]] of Object.entries(Intervals)) {
     
        if (higherFrequency / baseFrequency === numerator / denominator) {
            return intervalName;
        }
    }
    // If no match is found, return null or an appropriate value
    return "Not match Interval found for the selected Frequencies"
  
};
  
  
  
  
// User selects baseFrequency/Tónica and can go trough intervals to find the hight note per each interval
export const calculateHigherFrequency = (baseFrequency, interval) => {
    const numerator = interval[0];
    const denominator = interval[1];
    const higherFrequency = (baseFrequency * numerator) / denominator;
    const resultFrequencyToNoteCalculations = frequencyToNoteCalculator(higherFrequency);
    //  return { pitchWesternMusic , baseFrequencyWesternMusic, scaleArray };
    const intervalHightNote = resultFrequencyToNoteCalculations.pitchWesternMusic;
    
    return { higherFrequency, intervalHightNote }
      
          
};
