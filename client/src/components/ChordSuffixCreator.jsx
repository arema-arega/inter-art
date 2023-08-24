/*
ChordSuffixCreator component is rendered
on the ChordsVisualizerPage for Selecting the type of Chord
minor, mayor...etc



*/



import React, { useState } from 'react';

//import guitar from '../chords-db/lib/guitar';
//import suffixes from '../chords-db/src/db/guitar/suffixes';

const ChordSuffixCreator = () => {
    //console.log(guitar);
    const theSufFixes = [
        'major',
        'minor',
        'dim',
        'dim7',
        'sus2',
        'sus4',
        'sus2sus4',
        '7sus4',
        '7/G',
        'alt',
        'aug',
        '5',
        '6',
        '69',
        '7',
        '7b5',
        'aug7',
        '9',
        '9b5',
        'aug9',
        '7b9',
        '7#9',
        '11',
        '9#11',
        '13',
        'maj7',
        'maj7b5',
        'maj7#5',
        'maj9',
        'maj11',
        'maj13',
        'm6',
        'm69',
        'm7',
        'm7b5',
        'm9',
        'm11',
        'mmaj7',
        'mmaj7b5',
        'mmaj9',
        'mmaj11',
        'add9',
        'madd9',
        '/E',
        '/F',
        '/F#',
        '/G',
        '/G#',
        '/A',
        '/Bb',
        '/B',
        '/C',
        '/C#',
        'm/B',
        'm/C',
        'm/C#',
        '/D',
        'm/D',
        '/D#',
        'm/D#',
        'm/E',
        'm/F',
        'm/F#',
        'm/G',
        'm/G#'
      ];
      
    console.log(theSufFixes);

    const [selectedSuffix, setSelectedSuffix] = useState('');

    const handleSuffixSelection = (event) => {
        const selectedValue = event.target.value;
        setSelectedSuffix(selectedValue);
        console.log('Selected suffix:', selectedValue);
       
    };

    return (
        <div>
        <div className="Suffixes_design">
            <label>SELECT QUALITY  / suffix:</label>
            <select className="select_Chord" onChange={handleSuffixSelection}>
                <option value="">Select</option>
                {theSufFixes.map((suffixValue) => (
                    <option key={suffixValue} value={suffixValue}>
                      
                                {suffixValue}
                          
                    </option>
                ))}
            </select>
            {selectedSuffix && (
                <button className="button_chords">{selectedSuffix}</button> 
            )}
        </div>
    </div>
    );
};

export default ChordSuffixCreator;
