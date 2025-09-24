import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomizerForm from '../components/CustomizerForm';
import PlushiePreview from '../components/PlushiePreview';
import ProgressIndicator from '../components/ProgressIndicator';
import InteractiveFeedback from '../components/InteractiveFeedback';
import DragDropUpload from '../components/DragDropUpload';
import { useCart } from '../contexts/CartContext';
import { useSound } from '../contexts/SoundContext';
import { Size, Service, Color, Material, Accessory, Template, CustomizerState } from '../types';
import styles from './Customize.module.css';

const Customize: React.FC = () => {
  // Update document title
  React.useEffect(() => {
    document.title = 'CuddleCraft - Customize Your Plushie';
  }, []);

  const { addToCart } = useCart();
  const { playSound } = useSound();
  const [totalCustomizations, setTotalCustomizations] = useState(1);

  const [customizer, setCustomizer] = useState<CustomizerState>({
    selectedSize: { label: 'Small (10")', value: 'small', price: 35 },
    selectedService: { label: 'Choose from Template', value: 'template', price: 0 },
    selectedColor: { name: 'Classic Brown', value: '#8B4513' },
    selectedMaterial: { 
      name: 'Bamboo Fiber', 
      value: 'bamboo', 
      description: 'Eco-friendly, hypoallergenic, and incredibly soft',
      price: 0 
    },
    selectedAccessories: [],
    selectedTemplate: null,
    uploadedImage: null,
    totalPrice: 35
  });

  // Progress tracking
  const getProgressSteps = () => [
    {
      id: 'size',
      title: 'Choose Size',
      description: 'Select the perfect size for your plushie',
      completed: true, // Always completed since we have a default
      current: false
    },
    {
      id: 'color',
      title: 'Pick Color',
      description: 'Choose your favorite color',
      completed: customizer.selectedColor.name !== 'Classic Brown',
      current: customizer.selectedColor.name === 'Classic Brown'
    },
    {
      id: 'material',
      title: 'Select Material',
      description: 'Choose the filling material',
      completed: customizer.selectedMaterial.name !== 'Bamboo Fiber',
      current: customizer.selectedMaterial.name === 'Bamboo Fiber' && customizer.selectedColor.name !== 'Classic Brown'
    },
    {
      id: 'design',
      title: 'Add Design',
      description: 'Choose a template or upload your own image',
      completed: customizer.selectedTemplate !== null || customizer.uploadedImage !== null,
      current: customizer.selectedTemplate === null && customizer.uploadedImage === null && customizer.selectedMaterial.name !== 'Bamboo Fiber'
    }
  ];

  // Calculate total price whenever customizer state changes
  useEffect(() => {
    const calculateTotal = () => {
      const basePrice = customizer.selectedSize.price;
      const servicePrice = customizer.selectedService.price;
      const materialPrice = customizer.selectedMaterial.price;
      const accessoryPrice = customizer.selectedAccessories.reduce(
        (total, accessory) => total + accessory.price, 
        0
      );
      const templatePrice = customizer.selectedTemplate?.price || 0;

      return basePrice + servicePrice + materialPrice + accessoryPrice + templatePrice;
    };

    setCustomizer(prev => ({ ...prev, totalPrice: calculateTotal() }));
  }, [
    customizer.selectedSize,
    customizer.selectedService,
    customizer.selectedMaterial,
    customizer.selectedAccessories,
    customizer.selectedTemplate
  ]);

  const handleSizeChange = (size: Size) => {
    setCustomizer(prev => ({ ...prev, selectedSize: size }));
    playSound('select');
  };

  const handleServiceChange = (service: Service) => {
    setCustomizer(prev => ({ ...prev, selectedService: service }));
    playSound('select');
  };

  const handleColorChange = (color: Color) => {
    setCustomizer(prev => ({ ...prev, selectedColor: color }));
    playSound('select');
  };

  const handleMaterialChange = (material: Material) => {
    setCustomizer(prev => ({ ...prev, selectedMaterial: material }));
    playSound('select');
  };

  const handleAccessoryToggle = (accessory: Accessory) => {
    setCustomizer(prev => {
      const exists = prev.selectedAccessories.find(a => a.id === accessory.id);
      if (exists) {
        playSound('remove');
        return {
          ...prev,
          selectedAccessories: prev.selectedAccessories.filter(a => a.id !== accessory.id)
        };
      } else {
        playSound('add');
        return {
          ...prev,
          selectedAccessories: [...prev.selectedAccessories, accessory]
        };
      }
    });
  };

  const handleTemplateSelect = (template: Template) => {
    setCustomizer(prev => ({ ...prev, selectedTemplate: template }));
    playSound('select');
  };

  const handleImageUpload = (imageData: string) => {
    setCustomizer(prev => ({ ...prev, uploadedImage: imageData }));
    if (imageData) {
      playSound('success');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Add to cart instead of just showing alert
    addToCart(customizer);
    setTotalCustomizations(prev => prev + 1);
    playSound('success');
    
    // Reset form for next customization
    setCustomizer({
      selectedSize: { label: 'Small (10")', value: 'small', price: 35 },
      selectedService: { label: 'Choose from Template', value: 'template', price: 0 },
      selectedColor: { name: 'Classic Brown', value: '#8B4513' },
      selectedMaterial: { 
        name: 'Bamboo Fiber', 
        value: 'bamboo', 
        description: 'Eco-friendly, hypoallergenic, and incredibly soft',
        price: 0 
      },
      selectedAccessories: [],
      selectedTemplate: null,
      uploadedImage: null,
      totalPrice: 35
    });
  };

  return (
    <>
      <Link to="/" className="back-link">&larr; Back to Home</Link>
      <section className={styles.customizer}>
        <h1>Customize Your Plushie</h1>
        
        {/* Interactive Feedback */}
        <InteractiveFeedback 
          totalCustomizations={totalCustomizations}
          templatesUsed={customizer.selectedTemplate ? 1 : 0}
          accessoriesAdded={customizer.selectedAccessories.length}
        />
        
        {/* Progress Indicator */}
        <ProgressIndicator steps={getProgressSteps()} />
        
        <div className={styles.customizerWrap}>
          <div className={styles.formSection}>
            <CustomizerForm 
              customizer={customizer}
              onSizeChange={handleSizeChange}
              onServiceChange={handleServiceChange}
              onColorChange={handleColorChange}
              onMaterialChange={handleMaterialChange}
              onAccessoryToggle={handleAccessoryToggle}
              onTemplateSelect={handleTemplateSelect}
              onSubmit={handleSubmit}
            />
            
            {/* Enhanced Upload Component */}
            {customizer.selectedService.value === 'upload' && (
              <DragDropUpload 
                onImageUpload={handleImageUpload}
                uploadedImage={customizer.uploadedImage}
              />
            )}
          </div>
          
          <PlushiePreview customizer={customizer} />
        </div>
      </section>
    </>
  );
};

export default Customize;