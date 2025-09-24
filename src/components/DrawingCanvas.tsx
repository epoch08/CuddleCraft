import React, { useState, useRef, useEffect } from 'react';
import { Brush, Eraser, Undo, Download, Palette } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';
import styles from './DrawingCanvas.module.css';

interface DrawingCanvasProps {
  isVisible: boolean;
  onClose: () => void;
  onSaveDrawing: (drawing: string) => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ isVisible, onClose, onSaveDrawing }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#FF6781');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [history, setHistory] = useState<ImageData[]>([]);
  const { playSound } = useSound();

  const colors = [
    '#FF6781', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C',
    '#FFA07A', '#20B2AA', '#FF69B4', '#32CD32', '#FF4500'
  ];

  useEffect(() => {
    if (isVisible && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveToHistory(ctx);
      }
    }
  }, [isVisible]);

  const saveToHistory = (ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    setHistory(prev => [...prev.slice(-9), imageData]);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    if (tool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = brushColor;
    } else {
      ctx.globalCompositeOperation = 'destination-out';
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    if (isDrawing && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        saveToHistory(ctx);
      }
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory(ctx);
    playSound('click');
  };

  const undo = () => {
    if (history.length <= 1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousState = history[history.length - 2];
    ctx.putImageData(previousState, 0, 0);
    setHistory(prev => prev.slice(0, -1));
    playSound('click');
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    onSaveDrawing(dataUrl);
    playSound('success');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.canvasContainer}>
        <div className={styles.header}>
          <h3>🎨 Draw Your Design</h3>
          <button onClick={onClose} className={styles.closeBtn}>×</button>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.tools}>
            <button
              className={`${styles.toolBtn} ${tool === 'brush' ? styles.active : ''}`}
              onClick={() => { setTool('brush'); playSound('select'); }}
            >
              <Brush size={16} />
            </button>
            <button
              className={`${styles.toolBtn} ${tool === 'eraser' ? styles.active : ''}`}
              onClick={() => { setTool('eraser'); playSound('select'); }}
            >
              <Eraser size={16} />
            </button>
          </div>

          <div className={styles.colors}>
            <Palette size={16} />
            {colors.map(color => (
              <button
                key={color}
                className={`${styles.colorBtn} ${brushColor === color ? styles.active : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => { setBrushColor(color); playSound('select'); }}
              />
            ))}
          </div>

          <div className={styles.brushSize}>
            <label>Size:</label>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className={styles.slider}
            />
            <span>{brushSize}px</span>
          </div>

          <div className={styles.actions}>
            <button onClick={undo} className={styles.actionBtn}>
              <Undo size={16} />
              Undo
            </button>
            <button onClick={clearCanvas} className={styles.actionBtn}>
              Clear
            </button>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className={styles.canvas}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={saveDrawing} className={styles.saveBtn}>
            <Download size={16} />
            Use This Drawing
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;