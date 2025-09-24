import React from 'react';
import { CustomizerState } from '../types';
import PlushieRotator from './PlushieRotator';
import RealtimePreview from './RealtimePreview';
import styles from './PlushiePreview.module.css';

type PlushiePreviewProps = {
  customizer: CustomizerState;
};

const PlushiePreview: React.FC<PlushiePreviewProps> = ({ customizer }) => {
  const getPreviewImage = () => {
    // Use uploaded image if available
    if (customizer.uploadedImage) {
      return customizer.uploadedImage;
    }
    
    // Use template image if selected
    if (customizer.selectedTemplate) {
      return customizer.selectedTemplate.image;
    }
    
    // Default preview image
    return 'https://github.com/epoch08/CuddleCraft/blob/main/src/zzz.png?raw=true';
  };

  return (
    <div className={styles.preview}>
      {/* Enhanced Rotatable Preview */}
      <PlushieRotator
        currentImage={getPreviewImage()}
        alt="Plushie Preview"
        size={customizer.selectedSize.label}
        color={customizer.selectedColor.name}
      />
      
      {/* Real-time Preview Animation */}
      <RealtimePreview
        size={customizer.selectedSize.label}
        color={customizer.selectedColor.name}
        material={customizer.selectedMaterial.name}
        accessories={customizer.selectedAccessories}
        template={customizer.selectedTemplate?.name || ''}
      />
      
      {/* Enhanced Details */}
      <div className={styles.previewDetails}>
        <div className={styles.previewService} id="preview-service">
          {customizer.selectedService.label}
        </div>
        
        <div className={styles.previewMaterial}>
          <span className={styles.materialIcon}>🌿</span>
          {customizer.selectedMaterial.name}
        </div>
        
        {customizer.selectedAccessories.length > 0 && (
          <div className={styles.previewAccessories}>
            <div className={styles.accessoryTitle}>Accessories:</div>
            <div className={styles.accessoryIcons}>
              {customizer.selectedAccessories.map(accessory => (
                <span key={accessory.id} className={styles.accessoryIcon} title={accessory.name}>
                  {accessory.icon}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className={styles.previewPrice}>
          <span className={styles.priceLabel}>Total:</span>
          <span className={styles.priceValue}>${customizer.totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default PlushiePreview;