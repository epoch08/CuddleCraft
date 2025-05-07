import React from 'react';
import styles from './Features.module.css';

type FeatureProps = {
  icon: string;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className={styles.featureCard}>
    <div className={styles.icon}>{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: '🌱',
      title: 'Eco-friendly Bamboo Fiber',
      description: 'Our plushies are filled with renewable, biodegradable, hypoallergenic bamboo fibers.'
    },
    {
      icon: '📏',
      title: 'Multiple Sizes',
      description: 'Choose the perfect plushie size for you or your loved one.'
    },
    {
      icon: '🎨',
      title: 'Customization Galore',
      description: 'Pick a template, upload your art, or work with our professional designers.'
    },
    {
      icon: '🧑‍🎨',
      title: 'Professional Designer Support',
      description: 'Get expert help to bring your plushie vision to life.'
    },
    {
      icon: '🖼️',
      title: 'Upload Your Own Art',
      description: 'Make it truly yours by uploading your own drawing or photo.'
    }
  ];

  return (
    <section className={styles.features} id="features">
      <h2>Features</h2>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;