/*
the SongList Component is rendered on the InfoList Page

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

*/



import React, { useEffect, useState } from 'react';

const SongList = (props) => {
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState("");

    const postsongs = async (info) => {
        try {
            if (!props.info) {
                console.log("No song info provided");
                return; // Exit the function if info is null
            }

            const { name, size } = info;
            const response = await fetch("/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    size: size,
                }),
            });

            if (!response.ok) {
                console.error("Failed to post song. Server response:", response.status, response.statusText);
                // You might want to throw an error or handle this case more specifically
                return;
            }

            // Handle successful response or any other necessary actions
        } catch (error) {
            console.error("Error posting song:", error);
            // Handle client-side error
        }
    };

    useEffect(() => {
        console.log("props.info in useEffect:", props.info);
        getsongs();
        if (props.info !== null && Object.keys(props.info).length !== 0) {
          console.log("Calling postsongs with info:", props.info);
          postsongs(props.info);
           
            
        }
          
     }, [props.info]);
    

    const getsongs = async () => {
        try {
            const response = await fetch("/api");
            const songs = await response.json();
            setSongs(songs);
        } catch (error) {
            setError(error.message)
        }
    };

    const handleDelete = async (songId) => {
        try {
            const response = await fetch(`/api/${songId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete song");
            }

            // Refresh the song list after deletion
            getsongs();
        } catch (error) {
            console.error("Error deleting song:", error);
        }
    };

    return (
        <div className="list">
            <h1>Song List</h1>
            {error && <p>Error: {error}</p>}
            {songs.length > 0 ? (
                <ul>
                    {songs.map(song => (
                        <li key={song.id}>
                            {song.id} - {song.name} / {song.size} MB
                            <button className="delete" onClick={() => handleDelete(song.id)}>X</button>
                        </li>
                    ))}
                </ul>
            ) :(
                <h3>No songs available</h3>
            )}
           
            


        </div>
    );
};

export default SongList;
