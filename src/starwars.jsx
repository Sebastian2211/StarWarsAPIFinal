import React, { useEffect, useState } from 'react';
import './App.css';

export default function StarWars() {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    // fetches a random person from the Star Wars API
    const fetchRandomPerson = () => {
        setLoading(true);
        fetch('https://swapi.dev/api/people/')
            .then((response) => response.json())
            .then((data) => {
                const randomIndex = Math.floor(Math.random() * data.results.length);
                setPerson(data.results[randomIndex]);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setError(true);
                setLoading(false);
            });
    };


    // fetches a random person when the component mounts
    useEffect(() => {
        fetchRandomPerson();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>There was an error!</div>;
    }

    // styling for the container
    const containerStyle = {
        backgroundImage: 'url(https://e1.pxfuel.com/desktop-wallpaper/266/147/desktop-wallpaper-high-resolution-star-wars-backgrounds-scarif-star-wars.jpg)',
        // using image from https://www.pxfuel.com/en/desktop-wallpaper-hppdi
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '70vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'beige',
        fontFamily: 'sans-serif',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textShadow: '0.5px 0.5px 1px #000000',
    };

    // styling for the card
    return (
        <div className="App" style={containerStyle}>
            <h1>Star Wars Characters</h1>
            {person && (
                <div className="card">
                    <img src={person.image}></img>
                    <h3>{person.name}</h3>
                    <p>Height: {person.height}</p>
                    <p>Mass: {person.mass}</p>
                    <p>Hair Color: {person.hair_color}</p>
                    <p>Eye Color: {person.eye_color}</p>
                    <p>Birth Year: {person.birth_year}</p>
                </div>
            )}
            <button onClick={fetchRandomPerson}>Get Random Person</button>
        </div>
    );
}

