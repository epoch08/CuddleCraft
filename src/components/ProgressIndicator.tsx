import React from 'react';
import { Check } from 'lucide-react';
import styles from './ProgressIndicator.module.css';

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps }) => {
  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className={styles.progressIndicator}>
      <div className={styles.progressHeader}>
        <h3>Customization Progress</h3>
        <div className={styles.progressStats}>
          <span className={styles.stepCounter}>
            {completedSteps} of {steps.length} steps completed
          </span>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className={styles.stepsList}>
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`${styles.step} ${
              step.completed ? styles.completed : 
              step.current ? styles.current : 
              styles.pending
            }`}
          >
            <div className={styles.stepIndicator}>
              {step.completed ? (
                <div className={styles.checkIcon}>
                  <Check size={16} />
                </div>
              ) : (
                <div className={styles.stepNumber}>
                  {index + 1}
                </div>
              )}
            </div>
            
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>{step.title}</h4>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>

            {step.current && (
              <div className={styles.currentIndicator}>
                <div className={styles.pulse} />
              </div>
            )}
          </div>
        ))}
      </div>

      {completedSteps === steps.length && (
        <div className={styles.completionMessage}>
          <div className={styles.celebrationIcon}>🎉</div>
          <h4>Perfect! Your plushie is ready to order!</h4>
          <p>All customization steps completed. Add to cart when you're ready!</p>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;