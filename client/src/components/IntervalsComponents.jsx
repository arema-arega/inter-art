import React from 'react';
import { findClosestInterval, findExactInterval, calculateHigherFrequency } from './IntervalsCreator'; 

export const IntervalsComponents = (baseFrequency, higherFrequency ) => {
  
  // Call Functions 
  const closestInterval = findClosestInterval(baseFrequency, higherFrequency);
  const exactInterval = findExactInterval(baseFrequency, higherFrequency);
  const higherFrequencyInfo = calculateHigherFrequency(baseFrequency, [3, 4]); // Example interval

  return closestInterval, exactInterval, higherFrequencyInfo
  
  
};


