import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Heart className={styles.logo} fill="#FF6781" color="#FF6781" />
        <span className={styles.brand}>CuddleCraft</span>
      </div>
      <div className={styles.navRight}>
        <Link to="/#about">About Us</Link>
        <Link to="/#features">Features</Link>
        <Link to="/#examples">Examples</Link>
        <Link to="/customize" className="btn primary">Create</Link>
      </div>
    </nav>
  );
};

export default Navbar;