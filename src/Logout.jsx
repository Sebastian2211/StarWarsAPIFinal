// Logout.js

import React from 'react';

export default function Logout({ onLogout }) {
    const handleLogout = () => {
        onLogout();
        console.log('Logout button clicked.');
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
