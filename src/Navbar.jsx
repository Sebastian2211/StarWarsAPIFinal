import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/Who are you today?" className="nav-link">Pick Person</Link>
                </li>
                <li className="nav-item">
                    <Link to="/What's your planet today?" className="nav-link">Pick Planet</Link>
                </li>
            </ul>
        </nav>
    );
}

