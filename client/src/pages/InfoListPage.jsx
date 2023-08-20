import React from 'react';
import InfoList from '../components/InfoList';
import SongList from '../components/SongList';

export const InfoListPage = ({ info }) => {
  
 

  return (
    <div className="info_container">
      <div className="list">
      <SongList info={info}  />
      </div>
      <div>
        <InfoList info={info} />
      </div>
    </div>
  );
};


