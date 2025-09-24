import React from 'react';
import { Template } from '../types';
import styles from './TemplateGallery.module.css';

type TemplateGalleryProps = {
  selectedTemplate: Template | null;
  onTemplateSelect: (template: Template) => void;
  isVisible: boolean;
};

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ 
  selectedTemplate, 
  onTemplateSelect, 
  isVisible 
}) => {
  const templates: Template[] = [
    {
      id: 'teddy',
      name: 'Classic Teddy Bear',
      image: 'https://github.com/epoch08/CuddleCraft/blob/main/src/mah.jpeg?raw=true',
      category: 'Bears',
      price: 0
    },
    {
      id: 'panda',
      name: 'Cute Panda',
      image: 'https://github.com/epoch08/CuddleCraft/blob/main/src/par.jpeg?raw=true',
      category: 'Bears',
      price: 5
    },
    {
      id: 'penguin',
      name: 'Arctic Penguin',
      image: 'https://github.com/epoch08/CuddleCraft/blob/main/src/anv.jpeg?raw=true',
      category: 'Birds',
      price: 8
    },
    {
      id: 'unicorn',
      name: 'Magic Unicorn',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      category: 'Fantasy',
      price: 12
    },
    {
      id: 'bunny',
      name: 'Fluffy Bunny',
      image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop',
      category: 'Animals',
      price: 6
    },
    {
      id: 'cat',
      name: 'Sleepy Cat',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop',
      category: 'Animals',
      price: 7
    }
  ];

  const categories = [...new Set(templates.map(t => t.category))];

  if (!isVisible) return null;

  return (
    <div className={styles.templateGallery}>
      <h3 className={styles.title}>Choose Your Template</h3>
      
      {categories.map(category => (
        <div key={category} className={styles.categorySection}>
          <h4 className={styles.categoryTitle}>{category}</h4>
          <div className={styles.templateGrid}>
            {templates
              .filter(template => template.category === category)
              .map(template => (
                <div
                  key={template.id}
                  className={`${styles.templateCard} ${
                    selectedTemplate?.id === template.id ? styles.selected : ''
                  }`}
                  onClick={() => onTemplateSelect(template)}
                >
                  <div className={styles.templateImage}>
                    <img 
                      src={template.image} 
                      alt={template.name}
                      onError={(e) => {
                        e.currentTarget.src = 'https://github.com/epoch08/CuddleCraft/blob/main/src/zzz.png?raw=true';
                      }}
                    />
                    {selectedTemplate?.id === template.id && (
                      <div className={styles.selectedOverlay}>
                        <span className={styles.checkIcon}>✓</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.templateInfo}>
                    <h5 className={styles.templateName}>{template.name}</h5>
                    <span className={styles.templatePrice}>
                      {template.price === 0 ? 'Free' : `+$${template.price}`}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGallery;