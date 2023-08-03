import React, { useState } from 'react';
import AudioUpload from './components/AudioUpload';
//import AudioPlayer from './components/AudioPlayer';
import CanvasVisualizer from './components/CanvasVisualizer';
import './App.css'; 


function App() {
  const [audio, setAudio] = useState(null);
  const [info, setInfo] = useState([]);
 
  
 const handleFileUpload = (loaded, infoTrack) => {
   console.log(`this is the ${Object.values(infoTrack)}`);
   console.log(`this is the OBJECT ${infoTrack}`);
   const infoArray = [];
   let value = "";
   let v = "";
  for (let key in infoTrack) {
    value = Object.values(infoTrack[key]).join("");
    if (value !== Object) {
      infoArray.push(`${key} - ${value}`);
    } else {
      for (let i in value) {
        v = Object.values(value[i]).join("");
        infoArray.push(`${key} - ${v}`);
      }
      
    }
    
   };

  setInfo(prevInfo => [...prevInfo, ...infoArray]);

  setAudio(loaded);
};


  
  

  const audioLink = audio && URL.createObjectURL(audio);

 
  return (
    <div>

      <div className='App'>
      

      <div>
        <AudioUpload onFileUpload={handleFileUpload} />
      </div>

      {/*<AudioPlayer />*/}

      <div>
        <CanvasVisualizer audioLink={audioLink} />
      </div>

      <div className='list'>
        {info.length > 0 ?
      (<ol>
          {info.map((key) => (
            <li key={key}>
              {key} 
            </li>
          ))};
          </ol>
          ) :
          (<p> No Track</p>)}
      </div>

    </div>
    </div>
  )
};


export default App;
