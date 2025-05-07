import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomizerForm from '../components/CustomizerForm';
import PlushiePreview from '../components/PlushiePreview';
import { Size, Service, CustomizerState } from '../types';
import styles from './Customize.module.css';

const Customize: React.FC = () => {
  // Update document title
  React.useEffect(() => {
    document.title = 'CuddleCraft - Customize Your Plushie';
  }, []);

  const [customizer, setCustomizer] = useState<CustomizerState>({
    selectedSize: { label: 'Small (8")', value: 'small' },
    selectedService: { label: 'Choose from Template', value: 'template' },
    uploadedImage: null
  });

  const handleSizeChange = (size: Size) => {
    setCustomizer(prev => ({ ...prev, selectedSize: size }));
  };

  const handleServiceChange = (service: Service) => {
    setCustomizer(prev => ({ ...prev, selectedService: service }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setCustomizer(prev => ({ ...prev, uploadedImage: e.target.result }));
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real application, this would handle order submission
    alert('Order placed! (Order logic to be added)');
  };

  return (
    <>
      <Link to="/" className="back-link">&larr; Back to Home</Link>
      <section className={styles.customizer}>
        <h1>Customize Your Plushie</h1>
        <div className={styles.customizerWrap}>
          <CustomizerForm 
            customizer={customizer}
            onSizeChange={handleSizeChange}
            onServiceChange={handleServiceChange}
            onImageUpload={handleImageUpload}
            onSubmit={handleSubmit}
          />
          <PlushiePreview customizer={customizer} />
        </div>
      </section>
    </>
  );
};

export default Customize;