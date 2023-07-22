import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/Who are you today?" className="nav-link">
                        People
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/What's your planet today?" className="nav-link">
                        Planets
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/What's your movie today?" className="nav-link">
                        Movies
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
