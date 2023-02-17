import React, { useState, Component, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";
import Photos from "./Photos";
import Love from './Love';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Routing() {

    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [love, setLove] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailIsValid, setEmailIsValid] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {

        const emailStore = localStorage.getItem("email");
        const passwordStore = localStorage.getItem("password");
        const usersStore = JSON.parse(localStorage.getItem("users"))["users"];

        if (emailStore && passwordStore) {
            setUser({ emailStore, passwordStore });
        }
        
        if (Array.isArray(usersStore)) {
            setUsers(usersStore);
        }

    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<Login
                        users={users}
                        setUsers={setUsers}
                        user={user}
                        setUser={setUser}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        emailIsValid={emailIsValid}
                        setEmailIsValid={setEmailIsValid}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        error={error}
                        setError={setError}
                        isLoaded={isLoaded}
                        albums={albums}
                    />}
                />
                <Route 
                    path="/register"
                    element={<Registration 
                        users={users}
                        setUsers={setUsers}
                        user={user}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        setEmailIsValid={setEmailIsValid}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        error={error}
                        setError={setError}
                        setUser={setUser}
                        isLoaded={isLoaded}
                        albums={albums}
                    />}
                />
                <Route
                    path="/love"
                    element={<Love
                        love={love}
                        setLove={setLove}
                        />}
                />
                <Route
                    path={'/photos/:id'}                    
                    element={<Photos 
                        setPhotos={setPhotos}
                        albums={albums}
                        love={love}
                        setLove={setLove}
                        photos={photos}
                        user={user}
                        />}
                />
                <Route
                    path="/"
                    element={<Home
                        albums={albums}
                        user={user}
                        setAlbums={setAlbums}
                        isLoaded={isLoaded} 
                        setIsLoaded={setIsLoaded} 
                    />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Routing />
    </React.StrictMode>
);
