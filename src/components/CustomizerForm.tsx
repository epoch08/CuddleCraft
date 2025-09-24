import React, { useState } from 'react';
import { Size, Service, Color, Material, Accessory, Template, CustomizerState } from '../types';
import ColorPicker from './ColorPicker';
import MaterialSelector from './MaterialSelector';
import AccessorySelector from './AccessorySelector';
import TemplateGallery from './TemplateGallery';
import PriceCalculator from './PriceCalculator';
import DrawingCanvas from './DrawingCanvas';
import { useSound } from '../contexts/SoundContext';
import { Brush } from 'lucide-react';
import styles from './CustomizerForm.module.css';

type CustomizerFormProps = {
  customizer: CustomizerState;
  onSizeChange: (size: Size) => void;
  onServiceChange: (service: Service) => void;
  onColorChange: (color: Color) => void;
  onMaterialChange: (material: Material) => void;
  onAccessoryToggle: (accessory: Accessory) => void;
  onTemplateSelect: (template: Template) => void;
  onSubmit: (event: React.FormEvent) => void;
};

const CustomizerForm: React.FC<CustomizerFormProps> = ({
  customizer,
  onSizeChange,
  onServiceChange,
  onColorChange,
  onMaterialChange,
  onAccessoryToggle,
  onTemplateSelect,
  onSubmit
}) => {
  const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
  const { playSound } = useSound();
  
  const sizes: Size[] = [
    { label: 'Small (10")', value: 'small', price: 35 },
    { label: 'Medium (15")', value: 'medium', price: 55 },
    { label: 'Large (22")', value: 'large', price: 75 },
    { label: 'Extra Large (30")', value: 'xl', price: 95 }
  ];

  const services: Service[] = [
    { label: 'Choose from Template', value: 'template', price: 0 },
    { label: 'Work with Designer', value: 'designer', price: 25 },
    { label: 'Upload Drawing/Photo', value: 'upload', price: 10 }
  ];

  const handleDrawingCanvas = () => {
    setShowDrawingCanvas(true);
    playSound('click');
  };

  const handleSaveDrawing = (drawing: string) => {
    // This would integrate with the existing upload system
    // For now we'll just close the canvas
    setShowDrawingCanvas(false);
    playSound('success');
  };

  return (
    <div className={styles.customizerForm}>
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
              <span className={styles.sizeLabel}>{size.label}</span>
              <span className={styles.sizePrice}>${size.price}</span>
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
              <span className={styles.serviceLabel}>{service.label}</span>
              <span className={styles.servicePrice}>
                {service.price === 0 ? 'Free' : `+$${service.price}`}
              </span>
            </button>
          ))}
        </div>
      </div>

      <ColorPicker 
        selectedColor={customizer.selectedColor}
        onColorChange={onColorChange}
      />

      {/* Add Drawing Canvas Button */}
      <div className={styles.formGroup}>
        <label>Create Your Own Design</label>
        <div className={styles.drawingCanvasSection}>
          <p className={styles.drawingDescription}>
            ✨ Unleash your creativity! Draw your own design directly on the canvas
          </p>
          <button
            type="button"
            onClick={handleDrawingCanvas}
            className={styles.drawingCanvasBtn}
          >
            <Brush size={20} />
            <span>Open Drawing Canvas</span>
            <span className={styles.newFeature}>NEW!</span>
          </button>
        </div>
      </div>

      <MaterialSelector
        selectedMaterial={customizer.selectedMaterial}
        onMaterialChange={onMaterialChange}
      />

      <AccessorySelector
        selectedAccessories={customizer.selectedAccessories}
        onAccessoryToggle={onAccessoryToggle}
      />

      <TemplateGallery
        selectedTemplate={customizer.selectedTemplate}
        onTemplateSelect={onTemplateSelect}
        isVisible={customizer.selectedService.value === 'template'}
      />
      
      <PriceCalculator customizer={customizer} />
      
      <button 
        type="submit" 
        className={`btn big primary fullwidth ${styles.orderButton}`}
        onClick={onSubmit}
      >
        <span className={styles.buttonIcon}>🛒</span>
        Add to Cart - ${customizer.totalPrice}
      </button>
      
      {/* Drawing Canvas Modal */}
      <DrawingCanvas
        isVisible={showDrawingCanvas}
        onClose={() => setShowDrawingCanvas(false)}
        onSaveDrawing={handleSaveDrawing}
      />
    </div>
  );
};

export default CustomizerForm;