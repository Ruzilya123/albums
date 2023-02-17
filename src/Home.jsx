import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const gettingAPI = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

function Home({ isLoaded, setIsLoaded, albums, setAlbums, user, setUser }) {
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setTimeout(async () => {
      await gettingAPI("https://jsonplaceholder.typicode.com/albums").then(
        (data) => {
          setAlbums(data);
          setIsLoaded(true);
          setLoading(false);
        }
      );
    }, 1000);
  };

  useEffect(() => {
    if (!isLoaded) {
      fetchData();
    }
  }, []);

  function logout() {
    setUser(null);
  }


  return (
    <div>
      {loading ? (
        <>
          <h1>Home Albums</h1>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          {user ? (
            <>
              <div className="links">
                  <Link to="/">Home</Link>
                  <Link to="/love">Likes</Link>
                  <Link to="/login" onClick={logout}>Logout</Link>
              </div>
              <h1>Home Albums</h1>
              {albums.map((album) => (
                <li key={album.id}>
                  <p>{album.userId}</p>
                  <p>{album.title}</p>
                  <Link to={`/photos/` + album.id}>Photos</Link>
                </li>
              ))}
            </>
          ) : (
            <>
              <div className="links">
                  <Link to="/">Home</Link>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Registration</Link>
              </div>
              <h1>Home Albums</h1>
              {albums.map((album) => (
                <li key={album.id}>
                  <p>{album.userId}</p>
                  <p>
                    <b>{album.title}</b>
                  </p>
                </li>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
