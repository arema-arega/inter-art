import React from 'react';
import { findClosestInterval, findExactInterval, calculateHigherFrequency } from './IntervalsCreator'; 

const Intervals = () => {
  // baseFrequency and higherFrequency
  const baseFrequency = 440;
  const higherFrequency = 880;

  // Call Functions 
  const closestInterval = findClosestInterval(baseFrequency, higherFrequency);
  const exactInterval = findExactInterval(baseFrequency, higherFrequency);
  const higherFrequencyInfo = calculateHigherFrequency(baseFrequency, [3, 4]); // Example interval

  return (
    <div>
      <p>Closest Interval: {closestInterval}</p>
      <p>Exact Interval: {exactInterval}</p>
      <p>Higher Frequency Info: {JSON.stringify(higherFrequencyInfo)}</p>
     
    </div>
  );
};

export default Intervals;
