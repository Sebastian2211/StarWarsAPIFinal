import React, { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(true);

  function clickHandler() {
    setImage(!image);
  }

  return (
    <div className='container'>
      <div className='header-title'>
        <h1>Where are you Xur?</h1>
      </div>

      <div className="Xur">
        {image && (
          <img src='https://www.bungie.net/img/destiny_content/pgcr/conceptual_xur.jpg' alt='Xur' className='Xur' />
        )}
      </div>

      <button onClick={clickHandler}>Show me where he is today</button>
    </div>
  );
}

export default App;
