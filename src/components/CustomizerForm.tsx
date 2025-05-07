import React from 'react';
import { Size, Service, CustomizerState } from '../types';
import styles from './CustomizerForm.module.css';

type CustomizerFormProps = {
  customizer: CustomizerState;
  onSizeChange: (size: Size) => void;
  onServiceChange: (service: Service) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
};

const CustomizerForm: React.FC<CustomizerFormProps> = ({
  customizer,
  onSizeChange,
  onServiceChange,
  onImageUpload,
  onSubmit
}) => {
  const sizes: Size[] = [
    { label: 'Small (10")', value: 'small' },
    { label: 'Medium (15")', value: 'medium' },
    { label: 'Large (22")', value: 'large' },
    { label: 'Extra Large (30")', value: 'xl' }
  ];

  const services: Service[] = [
    { label: 'Choose from Template', value: 'template' },
    { label: 'Work with Designer', value: 'designer' },
    { label: 'Upload Drawing/Photo', value: 'upload' }
  ];

  return (
    <form id="customizer-form" className={styles.customizerForm} onSubmit={onSubmit}>
      <div className={styles.formGroup}>
        <label>Select Size</label>
        <div className={styles.btnGroup}>
          {sizes.map((size) => (
            <button
              key={size.value}
              type="button"
              className={`${styles.selectBtn} ${
                customizer.selectedSize.value === size.value ? styles.selected : ''
              }`}
              onClick={() => onSizeChange(size)}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label>Customization Service</label>
        <div className={styles.btnGroup}>
          {services.map((service) => (
            <button
              key={service.value}
              type="button"
              className={`${styles.selectBtn} ${styles.serviceBtn} ${
                customizer.selectedService.value === service.value ? styles.selected : ''
              }`}
              onClick={() => onServiceChange(service)}
            >
              {service.label}
            </button>
          ))}
        </div>
      </div>
      
      {customizer.selectedService.value === 'upload' && (
        <div className={styles.formGroup} id="upload-group">
          <label>Upload Drawing/Photo</label>
          <input 
            type="file" 
            accept="image/*" 
            id="upload-input" 
            onChange={onImageUpload}
            className={styles.fileInput}
          />
        </div>
      )}
      
      <button type="submit" className="btn big primary fullwidth">
        Place Order
      </button>
    </form>
  );
};

export default CustomizerForm;