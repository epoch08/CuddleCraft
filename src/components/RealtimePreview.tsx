import React, { useState, useEffect } from 'react';
import { Zap, Heart, Star, Crown, Sparkles } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';
import styles from './RealtimePreview.module.css';

interface RealtimePreviewProps {
  size: string;
  color: string;
  material: string;
  accessories: Array<{ name: string; icon: string; }>;
  template: string;
}

const RealtimePreview: React.FC<RealtimePreviewProps> = ({ 
  size, 
  color, 
  material, 
  accessories, 
  template 
}) => {
  const [previewState, setPreviewState] = useState('idle');
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; }>>([]);
  const { playSound } = useSound();

  // Trigger preview animation when props change
  useEffect(() => {
    setPreviewState('updating');
    playSound('select');
    
    setTimeout(() => {
      setPreviewState('complete');
    }, 800);

    // Generate floating hearts for nice changes
    if (Math.random() > 0.7) {
      generateHearts();
    }
  }, [size, color, material, accessories, template, playSound]);

  const generateHearts = () => {
    const newHearts = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 2000);
  };

  const getColorPreview = () => {
    const colorMap: Record<string, string> = {
      'Classic Brown': '#8B4513',
      'Soft Pink': '#FFB6C1',
      'Sky Blue': '#87CEEB',
      'Mint Green': '#98FB98',
      'Lavender': '#E6E6FA',
      'Sunshine Yellow': '#FFD700',
      'Coral': '#FF7F50',
      'Snow White': '#FFFAFA',
      'Charcoal Gray': '#36454F',
      'Purple': '#800080',
      'Forest Green': '#228B22',
      'Ruby Red': '#E0115F'
    };
    return colorMap[color] || '#8B4513';
  };

  const getMaterialTexture = () => {
    const textureMap: Record<string, string> = {
      'Bamboo Fiber': '🌿',
      'Organic Cotton': '☁️',
      'Memory Foam': '🛏️',
      'Recycled Polyester': '♻️'
    };
    return textureMap[material] || '🌿';
  };

  return (
    <div className={styles.previewContainer}>
      <div className={`${styles.previewFrame} ${styles[previewState]}`}>
        {/* Main plushie visualization */}
        <div className={styles.plushieContainer}>
          <div 
            className={styles.plushieBody}
            style={{ backgroundColor: getColorPreview() }}
          >
            <div className={styles.plushieFace}>
              <div className={styles.eye}>•</div>
              <div className={styles.eye}>•</div>
              <div className={styles.mouth}>‿</div>
            </div>
            
            {/* Accessories overlay */}
            {accessories.map((accessory, index) => (
              <div 
                key={accessory.name}
                className={styles.accessory}
                style={{
                  top: `${20 + index * 15}%`,
                  right: `${10 + index * 10}%`
                }}
              >
                {accessory.icon}
              </div>
            ))}
          </div>
          
          {/* Material indicator */}
          <div className={styles.materialIndicator}>
            <span className={styles.materialIcon}>{getMaterialTexture()}</span>
            <span className={styles.materialName}>{material}</span>
          </div>
        </div>

        {/* Floating hearts */}
        {hearts.map(heart => (
          <div
            key={heart.id}
            className={styles.floatingHeart}
            style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
          >
            💖
          </div>
        ))}

        {/* Update indicator */}
        {previewState === 'updating' && (
          <div className={styles.updateIndicator}>
            <Sparkles className={styles.sparkleIcon} />
            <span>Updating preview...</span>
          </div>
        )}
      </div>

      {/* Preview stats */}
      <div className={styles.previewStats}>
        <div className={styles.stat}>
          <Crown size={16} />
          <span>{size}</span>
        </div>
        <div className={styles.stat}>
          <Zap size={16} />
          <span>{color}</span>
        </div>
        {accessories.length > 0 && (
          <div className={styles.stat}>
            <Star size={16} />
            <span>{accessories.length} accessory{accessories.length > 1 ? 'ies' : ''}</span>
          </div>
        )}
      </div>

      {/* Fun facts */}
      <div className={styles.funFact}>
        <Heart size={14} />
        <span>
          {template === 'Classic Teddy Bear' && "Perfect for cozy cuddles!"}
          {template === 'Cute Panda' && "Bamboo-powered cuteness!"}
          {template === 'Arctic Penguin' && "Cool as ice, warm as love!"}
          {template === 'Magic Unicorn' && "Sprinkled with fairy dust!"}
          {template === 'Fluffy Bunny' && "Hop into happiness!"}
          {template === 'Sleepy Cat' && "Purr-fect for nap time!"}
          {!template && "Your unique creation awaits!"}
        </span>
      </div>
    </div>
  );
};

export default RealtimePreview;