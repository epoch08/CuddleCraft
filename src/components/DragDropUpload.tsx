import React, { useState, useRef, useCallback } from 'react';
import { Upload, Image, X, RotateCw, Crop, Download } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';
import styles from './DragDropUpload.module.css';

interface DragDropUploadProps {
  onImageUpload: (imageData: string) => void;
  uploadedImage: string | null;
}

const DragDropUpload: React.FC<DragDropUploadProps> = ({ onImageUpload, uploadedImage }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playSound } = useSound();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!isDragOver) {
      setIsDragOver(true);
      playSound('select');
    }
  }, [isDragOver, playSound]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragOver(false);
    }
  }, []);

  const processImage = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('Image size should be less than 10MB.');
      return;
    }

    setIsProcessing(true);
    playSound('add');

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        onImageUpload(e.target.result);
        setIsProcessing(false);
        playSound('success');
      }
    };
    reader.readAsDataURL(file);
  }, [onImageUpload, playSound]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processImage(files[0]);
    }
  }, [processImage]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processImage(files[0]);
    }
  }, [processImage]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
    playSound('click');
  }, [playSound]);

  const removeImage = useCallback(() => {
    onImageUpload('');
    playSound('remove');
    setShowEditor(false);
    setRotation(0);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  }, [onImageUpload, playSound]);

  const applyFilters = useCallback(() => {
    if (!uploadedImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas size
      canvas.width = img.width;
      canvas.height = img.height;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply rotation
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      // Apply filters
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      
      // Draw image
      ctx.drawImage(img, 0, 0);
      ctx.restore();

      // Convert to data URL and update
      const editedImageData = canvas.toDataURL('image/png');
      onImageUpload(editedImageData);
    };
    img.src = uploadedImage;
  }, [uploadedImage, rotation, brightness, contrast, saturation, onImageUpload]);

  return (
    <div className={styles.dragDropContainer}>
      {!uploadedImage ? (
        <div
          className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''} ${isProcessing ? styles.processing : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className={styles.fileInput}
          />
          
          {isProcessing ? (
            <div className={styles.processingIndicator}>
              <div className={styles.spinner} />
              <p>Processing your image...</p>
            </div>
          ) : (
            <div className={styles.dropZoneContent}>
              <div className={styles.uploadIcon}>
                {isDragOver ? <Image size={40} /> : <Upload size={40} />}
              </div>
              <h3>
                {isDragOver ? 'Drop your image here!' : 'Upload Your Drawing or Photo'}
              </h3>
              <p>
                Drag & drop an image here, or click to browse
              </p>
              <div className={styles.fileTypes}>
                <span>Supports JPG, PNG, GIF up to 10MB</span>
              </div>
              <div className={styles.uploadTips}>
                <div className={styles.tip}>
                  <span>💡</span>
                  <span>Best results with clear, high-contrast drawings</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.imagePreview}>
          <div className={styles.imageContainer}>
            <img 
              src={uploadedImage} 
              alt="Uploaded" 
              className={styles.uploadedImage}
              style={{
                transform: `rotate(${rotation}deg)`,
                filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
              }}
            />
            <div className={styles.imageActions}>
              <button
                className={styles.actionBtn}
                onClick={() => setShowEditor(!showEditor)}
                title="Edit image"
              >
                <Crop size={16} />
              </button>
              <button
                className={styles.actionBtn}
                onClick={removeImage}
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {showEditor && (
            <div className={styles.imageEditor}>
              <h4>Edit Your Image</h4>
              
              <div className={styles.editorControls}>
                <div className={styles.controlGroup}>
                  <label>Rotation</label>
                  <div className={styles.rotationButtons}>
                    <button
                      onClick={() => setRotation(rotation - 90)}
                      className={styles.rotateBtn}
                      title="Rotate left"
                    >
                      <RotateCw size={16} style={{ transform: 'scaleX(-1)' }} />
                    </button>
                    <span>{rotation}°</span>
                    <button
                      onClick={() => setRotation(rotation + 90)}
                      className={styles.rotateBtn}
                      title="Rotate right"
                    >
                      <RotateCw size={16} />
                    </button>
                  </div>
                </div>

                <div className={styles.controlGroup}>
                  <label>Brightness: {brightness}%</label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className={styles.slider}
                  />
                </div>

                <div className={styles.controlGroup}>
                  <label>Contrast: {contrast}%</label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className={styles.slider}
                  />
                </div>

                <div className={styles.controlGroup}>
                  <label>Saturation: {saturation}%</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                    className={styles.slider}
                  />
                </div>

                <div className={styles.editorActions}>
                  <button
                    onClick={applyFilters}
                    className={styles.applyBtn}
                  >
                    <Download size={16} />
                    Apply Changes
                  </button>
                  <button
                    onClick={() => {
                      setRotation(0);
                      setBrightness(100);
                      setContrast(100);
                      setSaturation(100);
                    }}
                    className={styles.resetBtn}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      <canvas ref={canvasRef} className={styles.hiddenCanvas} />
    </div>
  );
};

export default DragDropUpload;