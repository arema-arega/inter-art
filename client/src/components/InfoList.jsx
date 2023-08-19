import React from 'react';

const InfoList = ({ info }) => {
  if (!info) {
    return null; // Return nothing if info is not provided
  }

  // POST para Database y en otro componente mostrar lista GET Usefeect
  const keys = Object.keys(info);

  return (
    <div className='list'>
      {keys.length > 0 ? (
        <ol>
          {keys.map((key) => (
            <li key={key}>{info[key]}</li>
          ))}
        </ol>
      ) : (
        <p> No Track</p>
      )}
    </div>
  );
};

export default InfoList;

