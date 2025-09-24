import React from 'react';
import { Material } from '../types';
import styles from './MaterialSelector.module.css';

type MaterialSelectorProps = {
  selectedMaterial: Material;
  onMaterialChange: (material: Material) => void;
};

const MaterialSelector: React.FC<MaterialSelectorProps> = ({ selectedMaterial, onMaterialChange }) => {
  const materials: Material[] = [
    {
      name: 'Bamboo Fiber',
      value: 'bamboo',
      description: 'Eco-friendly, hypoallergenic, and incredibly soft',
      price: 0
    },
    {
      name: 'Organic Cotton',
      value: 'organic_cotton',
      description: 'Premium organic cotton filling for extra fluffiness',
      price: 15
    },
    {
      name: 'Memory Foam',
      value: 'memory_foam',
      description: 'Holds shape perfectly and provides excellent hugging comfort',
      price: 25
    },
    {
      name: 'Recycled Polyester',
      value: 'recycled_poly',
      description: 'Made from recycled plastic bottles - eco and durable',
      price: 10
    }
  ];

  return (
    <div className={styles.materialSelector}>
      <label className={styles.label}>Material & Filling</label>
      <div className={styles.materialGrid}>
        {materials.map((material) => (
          <div
            key={material.value}
            className={`${styles.materialCard} ${
              selectedMaterial.value === material.value ? styles.selected : ''
            }`}
            onClick={() => onMaterialChange(material)}
          >
            <div className={styles.materialHeader}>
              <h4 className={styles.materialName}>{material.name}</h4>
              <span className={styles.materialPrice}>
                {material.price === 0 ? 'Included' : `+$${material.price}`}
              </span>
            </div>
            <p className={styles.materialDescription}>{material.description}</p>
            <div className={styles.selectionIndicator}>
              {selectedMaterial.value === material.value && (
                <span className={styles.selectedIcon}>✓</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialSelector;