import React from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <section className={styles.about} id="about">
      <h2>About Us</h2>
      <p>
        At CuddleCraft, we believe everyone deserves a plushie as unique as they are! Our mission is to help you create your dream plush—designed by you, made with love, and stuffed with planet-friendly bamboo fiber.
      </p>
    </section>
  );
};

export default About;