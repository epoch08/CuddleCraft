import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>
          Design Your Own <span>Custom Plushie</span>
        </h1>
        <p>
          Bring your imagination to life with CuddleCraft! Eco-friendly custom plushies filled with sustainable bamboo fibers.
        </p>
        <Link to="/customize" className="btn big">
          Get Started
        </Link>
      </div>
      <img 
        src="./zzz.png" 
        alt="Custom Plushie" 
        className={`${styles.heroImg} float`} 
      />
    </section>
  );
};

export default Hero;