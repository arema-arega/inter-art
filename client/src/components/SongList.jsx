import React, { useEffect, useState } from 'react';

const SongList = (props) => {
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState("");

    const postsongs = async (info) => {
        try {
            if (!info) {
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
                throw new Error("Failed to post song");
            }
        } catch (error) {
            console.error("Error posting song:", error);
        }
    };


    useEffect(() => {
        getsongs();
        if (props.info !== null) {
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
            <h2>Song List</h2>
            {error && <p>Error: {error}</p>}
            <ul>
                {songs.map(song => (
                    <li key={song.id}>
                        {song.id} - {song.name} / {song.size} MB
                        <button className="delete" onClick={() => handleDelete(song.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongList;
