import React from 'react';
import InfoList from '../components/InfoList';

export const InfoListPage = ({info}) => {
 

  return (
    <div className="info_container">
      <div className="list">
        <h1>Song List</h1>
      </div>
      <div>
        <InfoList info={info} />
      </div>
    </div>
  );
};


