import React from 'react';
import styles from './DrawingToReality.module.css';

type ExampleItem = {
  id: number;
  image: string;
  alt: string;
  description: string;
};

const DrawingToReality: React.FC = () => {
  const examples: ExampleItem[] = [
    {
      id: 1,
      image: "./anv.jpeg",
      alt: "Penguin plushie with drawing",
      description: "A cute penguin plushie brought to life from a simple sketch"
    },
    {
      id: 2,
      image: "./par.jpeg",
      alt: "Panda plushie with drawing",
      description: "An adorable panda with bamboo transformed from artwork"
    },
    {
      id: 3,
      image: "./mah.jpeg",
      alt: "Teddy bear plushie with drawing",
      description: "A heartwarming teddy bear created from a charming sketch"
    }
  ];

  return (
    <section className={styles.drawingToReality} id="examples">
      <h2>From Drawing to Reality</h2>
      <p className={styles.description}>
        Watch your artwork come alive! Our skilled craftspeople transform your drawings into huggable plushies that capture every detail of your vision.
      </p>
      <div className={styles.examples}>
        {examples.map((example) => (
          <div key={example.id} className={styles.exampleCard}>
            <img 
              src={example.image} 
              alt={example.alt} 
              className={styles.exampleImage} 
            />
            <p className={styles.exampleDescription}>{example.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DrawingToReality;