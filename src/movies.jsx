import React, { useEffect, useState } from 'react';
import './App.css';

export default function Movies({ user }) {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [watchedMovies, setWatchedMovies] = useState({});

    const fetchRandomMovie = () => {
        setLoading(true);
        fetch('https://swapi.dev/api/films/')
            .then((response) => response.json())
            .then((data) => {
                const randomIndex = Math.floor(Math.random() * data.results.length);
                setMovie(data.results[randomIndex]);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setError(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchRandomMovie();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>There was an error!</div>;
    }

    const containerStyle = {
        backgroundImage: 'url(https://www.pixelstalk.net/wp-content/uploads/images6/Star-Wars-Space-Desktop-Background.jpg)',
        // using image from https://www.pixelstalk.net/star-wars-space-backgrounds-hd/
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

    const movieImages = {
        "The Phantom Menace": {
            url: "https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
            height: '340px',
            width: '250px',
        },
        "Attack of the Clones": {
            url: "https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg",
            height: '340px',
            width: '250px',
        },
        "Revenge of the Sith": {
            url: "https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_FMjpg_UX1000_.jpg",
            height: '340px',
            width: '250px',
        },
        "A New Hope": {
            url: "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_.jpg",
            height: '340px',
            width: '250px',
        },
        "The Empire Strikes Back": {
            url: "https://upload.wikimedia.org/wikipedia/en/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg",
            height: '340px',
            width: '250px',
        },
        "Return of the Jedi": {
            url: "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
            height: '340px',
            width: '250px',
        },
        'The Force Awakens': {
            url: "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_.jpg",
            height: '340px',
            width: '250px',
        },
    };


    const handleWatchedToggle = (movieTitle) => {
        setWatchedMovies((prevWatchedMovies) => ({
            ...prevWatchedMovies,
            [movieTitle]: !prevWatchedMovies[movieTitle],
        }));
    };

    return (
        <div className="App" style={containerStyle}>
            <h1>Star Wars Movies</h1>
            <div className="movie-list">
                {Object.keys(movieImages).map((movieTitle) => (
                    <div className="movie-item" key={movieTitle}>
                        <img
                            src={movieImages[movieTitle].url}
                            alt={movieTitle}
                            style={{ height: movieImages[movieTitle].height, width: movieImages[movieTitle].width }}
                        />
                        <h4>{movieTitle}</h4>
                        <label>
                            Watched:
                            <input
                                type="checkbox"
                                checked={watchedMovies[movieTitle] || false}
                                onChange={() => handleWatchedToggle(movieTitle)}
                            />
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );


};
