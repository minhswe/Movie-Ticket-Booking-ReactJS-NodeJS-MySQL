import React from 'react';
import "./Home.css"

const Home = () => {
  return (
    <>
    <div className='home-container'>
    <img className='home-banner' src={`${process.env.REACT_APP_API_URL}/posters/banner.jpg`} alt="Banner"/>

    </div>
    </>
  );
};

export default Home;
