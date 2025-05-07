import React from 'react';
import { CustomizerState } from '../types';
import styles from './PlushiePreview.module.css';

type PlushiePreviewProps = {
  customizer: CustomizerState;
};

const PlushiePreview: React.FC<PlushiePreviewProps> = ({ customizer }) => {
  return (
    <div className={styles.preview}>
      <div className={styles.previewImgWrap}>
        <img 
          src={'https://github.com/epoch08/CuddleCraft/blob/main/src/zzz.png?raw=true'} 
          alt="Plushie Preview" 
          id="preview-img" 
          className={styles.previewImg}
        />
        <span className={styles.previewSize} id="preview-size">
          {customizer.selectedSize.label}
        </span>
      </div>
      <div className={styles.previewService} id="preview-service">
        {customizer.selectedService.label}
      </div>
    </div>
  );
};

export default PlushiePreview;