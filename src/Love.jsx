import React from 'react';
import { Link } from 'react-router-dom';
import MyButton from './button/MyButton';

function Love({ love, setLove }) {

    const handleRemoveFromLove = (album) => {
      setLove(love.filter((a) => a.id !== album.id));
    };

    return (
        <div>
            <Link to="/">Home</Link>
            <h1>Likes</h1>
            <p style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                {love.map((album) => (
                    <div key={album.id}>
                        <img src={album.thumbnailUrl} alt={album.title} />
                        <p>{album.title}</p>
                        <MyButton onClick={() => handleRemoveFromLove(album)}>Remove from love</MyButton>
                    </div>
                ))}
            </p>
        </div>
    )
}

export default Love;