import React, { useEffect, useState } from 'react';
import './App.css';

export default function Planets() {
    const [planet, setPlanet] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchRandomPlanet = () => {
        setLoading(true);
        fetch('https://swapi.dev/api/planets/')
            .then((response) => response.json())
            .then((data) => {
                const randomIndex = Math.floor(Math.random() * data.results.length);
                setPlanet(data.results[randomIndex]);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setError(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchRandomPlanet();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>There was an error!</div>;
    }

    const containerStyle = {
        backgroundImage: 'url(https://www.pixelstalk.net/wp-content/uploads/images6/Star-Wars-Space-Desktop-Background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'beige',
        fontFamily: 'sans-serif',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px #000000',

    };

    return (
        <div className="App" style={containerStyle}>
            <h1>Star Wars Planets</h1>
            {planet && (
                <div className="card">
                    <img src={planet.image}></img>
                    <h3>{planet.name}</h3>
                    <p>Climate: {planet.climate}</p>
                    <p>Terrain: {planet.terrain}</p>
                    <p>Population: {planet.population}</p>
                </div>
            )}
            <button onClick={fetchRandomPlanet}>Get Random Planet</button>
        </div>
    );
}
