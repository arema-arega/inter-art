import React from 'react';
import InfoList from '../components/InfoList';

export const InfoListPage = ({info}) => {
 

  return (
    <div>
      <h1>Song List</h1>
      <InfoList info={info} />
    </div>
  );
};


