/*
Infolist page renders renders:

-Songlist Component
-InfoList Component


Objectives that need implementation:

The post on the SongList component it's been triggered 
even after using a condition
 if (!info) {
                console.log("No song info provided");
                return; // Exit the function if info is null
 };

 and also within the UseEffect, so this need to be solved

Functions:
-The user can see and delete the info from the list 
made out of the uploaded audio {info}
that have been sent automatically by the Songlist Component
to the table songs located inside the database music:

Default info on the table songs:
+----+-------------------------+------+
| id | name                    | size |
+----+-------------------------+------+
|  1 | Maria - Dana Hill       |   20 |
|  2 | Hold me - Eleonor       |   15 |
|  3 | Donwn down - Nora Hagse |   21 |
+----+-------------------------+------+

- - on the InfoList Component the user can see the {info} of the audio that it's been played




*/



import React from 'react';
import InfoList from '../components/InfoList';
import SongList from '../components/SongList';

export const InfoListPage = ({ info }) => {
  
 

  return (
    <div className="info_container">
      <div className="list">
      {info !== null ? <SongList info={info} /> : <> </>}

      </div>
      <div>
        <InfoList info={info} />
      </div>
    </div>
  );
};


