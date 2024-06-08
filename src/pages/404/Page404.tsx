import React from 'react';
import './Page404.css';

type Page = () => JSX.Element;

const Home: Page = () => {

  return (
    <div className="container">
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <p>Congrats, you played with the URL and found out</p>
    </div>
  );
}

export default Home;
