import React, { useState } from 'react';
import AudioUpload from './components/AudioUpload';
import AudioPlayer from './components/AudioPlayer';
import CanvasVisualizer from './components/CanvasVisualizer';
//import ImageUploader from './components/ImageUploader';
import './App.css'; // Correct way to import a CSS file in React


function App() {
  const [audio, setAudio] = useState(null);
 // const [images, setImages] = useState([]);
  const [info, setInfo] = useState([]);
 // console.log(`this is the ${info}`);
  
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

 /* const handleImageUpload = (imageUploaded) => {
    console.log(imageUploaded.value);
    setImages([...images, imageUploaded]);
  };

  const deleteImage = (imageId) => {
    const filteredImages = images.filter((image) => image.id !== imageId);
    setImages(filteredImages);
  };
*/
  //const imageLink = Logo && URL.createObjectURL(Logo);
  return (
    <div>

      <div className='App'>
      {/*<img className='logo' alt='logo' src={imageLink} />*/}

      <div>
        <AudioUpload onFileUpload={handleFileUpload} />
      </div>

      <AudioPlayer />

      <div>
        <CanvasVisualizer audioLink={audioLink} />
      </div>

      <div>
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



      {/*
        <div>
          <ImageUploader onImgUpload={handleImageUpload} />
          {images.map((image) => (
            <img
              key={image.id} // Use image.id instead of images.id
              className="imagen"
              src={URL.createObjectURL(image)}
              onClick={() => deleteImage(image.id)} // Call deleteImage with the correct argument
            />
          ))}
        </div>
          */}
    </div>
    </div>
  )
};


export default App;
