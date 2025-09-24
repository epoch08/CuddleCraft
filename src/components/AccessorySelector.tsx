import React from 'react';
import { Accessory } from '../types';
import styles from './AccessorySelector.module.css';

type AccessorySelectorProps = {
  selectedAccessories: Accessory[];
  onAccessoryToggle: (accessory: Accessory) => void;
};

const AccessorySelector: React.FC<AccessorySelectorProps> = ({ 
  selectedAccessories, 
  onAccessoryToggle 
}) => {
  const accessories: Accessory[] = [
    { id: 'bow', name: 'Cute Bow', price: 8, icon: '🎀' },
    { id: 'hat', name: 'Mini Hat', price: 12, icon: '👒' },
    { id: 'scarf', name: 'Cozy Scarf', price: 10, icon: '🧣' },
    { id: 'glasses', name: 'Tiny Glasses', price: 6, icon: '👓' },
    { id: 'heart', name: 'Heart Patch', price: 5, icon: '❤️' },
    { id: 'flower', name: 'Flower Pin', price: 7, icon: '🌸' },
    { id: 'star', name: 'Star Badge', price: 5, icon: '⭐' },
    { id: 'bell', name: 'Jingle Bell', price: 4, icon: '🔔' }
  ];

  const isSelected = (accessory: Accessory) => 
    selectedAccessories.some(selected => selected.id === accessory.id);

  return (
    <div className={styles.accessorySelector}>
      <label className={styles.label}>Add Accessories (Optional)</label>
      <div className={styles.accessoryGrid}>
        {accessories.map((accessory) => (
          <div
            key={accessory.id}
            className={`${styles.accessoryCard} ${
              isSelected(accessory) ? styles.selected : ''
            }`}
            onClick={() => onAccessoryToggle(accessory)}
          >
            <div className={styles.accessoryIcon}>{accessory.icon}</div>
            <div className={styles.accessoryInfo}>
              <h5 className={styles.accessoryName}>{accessory.name}</h5>
              <span className={styles.accessoryPrice}>+${accessory.price}</span>
            </div>
            {isSelected(accessory) && (
              <div className={styles.selectedBadge}>✓</div>
            )}
          </div>
        ))}
      </div>
      {selectedAccessories.length > 0 && (
        <div className={styles.selectedSummary}>
          <h6>Selected Accessories:</h6>
          <div className={styles.selectedList}>
            {selectedAccessories.map(accessory => (
              <span key={accessory.id} className={styles.selectedItem}>
                {accessory.icon} {accessory.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessorySelector;