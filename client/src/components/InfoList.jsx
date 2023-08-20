import React from 'react';

const InfoList = ({ info }) => {
  if (!info) {
    return null; // Return nothing if info is not provided
  }

  // POST para Database y en otro componente mostrar lista GET Usefeect
  const keys = Object.keys(info);
  /*
File {name: '01 Sai Sai.mp3', 
lastModified: 1690824795222, 
lastModifiedDate: Mon Jul 31 2023 19:33:15 GMT+0200 (hora de verano de Europa central), 
webkitRelativePath: '', 
size: 15797528, …}


  */

  return (
    <div className='list'>
      {keys.length > 0 ? (
        <ol>
          {keys.map((key) => (
            <li key={key}>{info[key]}</li>
          ))}
        </ol>
      ) : (
          <div className="inside">
            <p> No Track</p>
            </div>
      )}
    </div>
  );
};

export default InfoList;

