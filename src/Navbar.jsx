import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/who-are-you-today" className="nav-link">
                        People
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/whats-your-planet-today" className="nav-link">
                        Planets
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/whats-your-movie-today" className="nav-link">
                        Movies
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
                {user ? (
                    <li className="nav-item">
                        <button className="nav-link" onClick={onLogout}>
                            Logout
                        </button>
                    </li>
                ) : (
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
