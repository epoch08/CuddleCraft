import React, { useState } from 'react';
import { RotateCcw, RotateCw, Maximize2 } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';
import styles from './PlushieRotator.module.css';

interface PlushieRotatorProps {
  currentImage: string;
  alt: string;
  size: string;
  color: string;
}

const PlushieRotator: React.FC<PlushieRotatorProps> = ({ currentImage, alt, size, color }) => {
  const [rotation, setRotation] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { playSound } = useSound();

  const rotateLeft = () => {
    setRotation(prev => prev - 90);
    playSound('click');
  };

  const rotateRight = () => {
    setRotation(prev => prev + 90);
    playSound('click');
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    playSound('select');
  };

  return (
    <div className={styles.rotatorContainer}>
      <div className={styles.imageContainer}>
        <img 
          src={currentImage} 
          alt={alt}
          className={`${styles.plushieImage} ${isZoomed ? styles.zoomed : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        <div className={styles.sizeLabel}>{size}</div>
        <div className={styles.colorLabel}>{color}</div>
        
        <div className={styles.controls}>
          <button
            onClick={rotateLeft}
            className={styles.controlBtn}
            title="Rotate left"
            aria-label="Rotate plushie left"
          >
            <RotateCcw size={16} />
          </button>
          
          <button
            onClick={toggleZoom}
            className={styles.controlBtn}
            title={isZoomed ? "Zoom out" : "Zoom in"}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            <Maximize2 size={16} />
          </button>
          
          <button
            onClick={rotateRight}
            className={styles.controlBtn}
            title="Rotate right"
            aria-label="Rotate plushie right"
          >
            <RotateCw size={16} />
          </button>
        </div>
      </div>
      
      {/* Interactive sparkles */}
      <div className={styles.sparkles}>
        <div className={styles.sparkle} style={{ top: '20%', left: '20%' }}>✨</div>
        <div className={styles.sparkle} style={{ top: '30%', right: '25%' }}>⭐</div>
        <div className={styles.sparkle} style={{ bottom: '25%', left: '30%' }}>💫</div>
      </div>
    </div>
  );
};

export default PlushieRotator;