import React from 'react';
import { Color } from '../types';
import styles from './ColorPicker.module.css';

type ColorPickerProps = {
  selectedColor: Color;
  onColorChange: (color: Color) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
  const colors: Color[] = [
    { name: 'Classic Brown', value: '#8B4513' },
    { name: 'Soft Pink', value: '#FFB6C1' },
    { name: 'Sky Blue', value: '#87CEEB' },
    { name: 'Mint Green', value: '#98FB98' },
    { name: 'Lavender', value: '#E6E6FA' },
    { name: 'Sunshine Yellow', value: '#FFD700' },
    { name: 'Coral', value: '#FF7F50' },
    { name: 'Snow White', value: '#FFFAFA' },
    { name: 'Charcoal Gray', value: '#36454F' },
    { name: 'Purple', value: '#9370DB' },
    { name: 'Forest Green', value: '#228B22' },
    { name: 'Ruby Red', value: '#E0115F' }
  ];

  return (
    <div className={styles.colorPicker}>
      <label className={styles.label}>Choose Color</label>
      <div className={styles.colorGrid}>
        {colors.map((color) => (
          <button
            key={color.value}
            type="button"
            className={`${styles.colorSwatch} ${
              selectedColor.value === color.value ? styles.selected : ''
            }`}
            style={{ backgroundColor: color.value }}
            onClick={() => onColorChange(color)}
            title={color.name}
            aria-label={`Select ${color.name} color`}
          >
            {selectedColor.value === color.value && (
              <span className={styles.checkmark}>✓</span>
            )}
          </button>
        ))}
      </div>
      <p className={styles.selectedColor}>
        Selected: <strong>{selectedColor.name}</strong>
      </p>
    </div>
  );
};

export default ColorPicker;