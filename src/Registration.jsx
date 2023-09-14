import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            // Registration successful
            setRegistrationSuccess(true);

            setFormData({
                username: '',
                password: '',
            });

            navigate('/whats-your-movie-today');

        } catch (err) {
            console.error(err);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Registration</h2>
            {error && <p>{error}</p>}
            {registrationSuccess && <p>Registration successful!</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;
