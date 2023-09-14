const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;

app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

const JWT_KEY = process.env.JWT_KEY;

app.use(express.json());

// User Registration Endpoint
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                res.status(500).json({ error: 'Error registering user' });
            } else {
                res.status(201).json({ message: 'User registered successfully' });
            }
        }
    );
});

// User Login Endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error finding user' });
        } else if (results.length === 0) {
            res.status(401).json({ error: 'User not found' });
        } else {
            const hashedPassword = results[0].password;
            const match = await bcrypt.compare(password, hashedPassword);

            if (match) {
                const token = jwt.sign({ username: results[0].username }, JWT_KEY);
                res.json({ token });
            } else {
                res.status(401).json({ error: 'Incorrect password' });
            }
        }
    });
});

// Endpoint for sending watched movies data to the server
app.post('/api/watched-movies', (req, res) => {
    const { userId, movieTitle, watched } = req.body;

    db.query(
        'INSERT INTO watched_movies (user_id, movie_title, watched) VALUES (?, ?, ?)',
        [userId, movieTitle, watched],
        (err, result) => {
            if (err) {
                console.error('Error inserting watched movie:', err);
                res.status(500).json({ error: 'Error inserting watched movie' });
            } else {
                res.status(201).json({ message: 'Watched movie added successfully' });
            }
        }
    );
});

// Endpoint for retrieving a user's watched movies
app.get('/api/watched-movies/:userId', (req, res) => {
    const userId = req.params.userId;

    db.query(
        'SELECT movie_title, watched FROM watched_movies WHERE user_id = ?',
        [userId],
        (err, results) => {
            if (err) {
                console.error('Error retrieving watched movies:', err);
                res.status(500).json({ error: 'Error retrieving watched movies' });
            } else {
                const watchedMovies = results.map((row) => ({
                    movieTitle: row.movie_title,
                    watched: row.watched,
                }));
                res.json(watchedMovies);
            }
        }
    );
});

app.get('/api/users', (req, res) => {
    db.query('SELECT id, username, password FROM users', (err, results) => {
        if (err) {
            console.error('Error retrieving user data:', err);
            return res.status(500).json({ error: 'Error retrieving user data' });
        }
        return res.json({ users: results });
    });
});


// Start the Express server
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
