import React from 'react';
import { CustomizerState } from '../types';
import styles from './PriceCalculator.module.css';

type PriceCalculatorProps = {
  customizer: CustomizerState;
};

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ customizer }) => {
  const calculateTotal = () => {
    const basePrice = customizer.selectedSize.price;
    const servicePrice = customizer.selectedService.price;
    const materialPrice = customizer.selectedMaterial.price;
    const accessoryPrice = customizer.selectedAccessories.reduce(
      (total, accessory) => total + accessory.price, 
      0
    );

    return basePrice + servicePrice + materialPrice + accessoryPrice;
  };

  const total = calculateTotal();

  return (
    <div className={styles.priceCalculator}>
      <h3 className={styles.title}>Price Breakdown</h3>
      
      <div className={styles.priceItem}>
        <span className={styles.itemName}>
          {customizer.selectedSize.label}
        </span>
        <span className={styles.itemPrice}>${customizer.selectedSize.price}</span>
      </div>

      <div className={styles.priceItem}>
        <span className={styles.itemName}>
          {customizer.selectedService.label}
        </span>
        <span className={styles.itemPrice}>
          {customizer.selectedService.price === 0 ? 'Free' : `$${customizer.selectedService.price}`}
        </span>
      </div>

      <div className={styles.priceItem}>
        <span className={styles.itemName}>
          {customizer.selectedMaterial.name}
        </span>
        <span className={styles.itemPrice}>
          {customizer.selectedMaterial.price === 0 ? 'Included' : `+$${customizer.selectedMaterial.price}`}
        </span>
      </div>

      {customizer.selectedAccessories.length > 0 && (
        <div className={styles.accessorySection}>
          <div className={styles.sectionTitle}>Accessories</div>
          {customizer.selectedAccessories.map(accessory => (
            <div key={accessory.id} className={styles.priceItem}>
              <span className={styles.itemName}>
                {accessory.icon} {accessory.name}
              </span>
              <span className={styles.itemPrice}>+${accessory.price}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.divider}></div>
      
      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalPrice}>${total}</span>
      </div>

      <div className={styles.estimatedTime}>
        <span className={styles.timeIcon}>⏰</span>
        <span>Estimated completion: 7-10 business days</span>
      </div>
    </div>
  );
};

export default PriceCalculator;