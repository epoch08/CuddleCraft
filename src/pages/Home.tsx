import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import DrawingToReality from '../components/DrawingToReality';

const Home: React.FC = () => {
  React.useEffect(() => {
    document.title = 'CuddleCraft - Custom Eco-Friendly Plushies';
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Features />
      <DrawingToReality />
    </>
  );
};

export default Home;