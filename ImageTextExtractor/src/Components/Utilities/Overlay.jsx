import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './Overlay.css';

const Overlay = ({ imageSrc, onClose, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1); // Default to 1:1 aspect ratio
  const [cropSize, setCropSize] = useState({ width: 200, height: 200 }); // Initial crop size
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => setCrop(crop);

  const onZoomChange = (zoom) => setZoom(zoom);

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = () => {
    onCropComplete(croppedAreaPixels);
    onClose();
  };

  const handleFreeAspectRatio = () => {
    setAspect(null); // Allow free resizing
  };

  const handleAspectChange = (newAspect) => {
    setAspect(newAspect); // Set predefined aspect ratio
    setCropSize(null); // Reset crop size to default
  };

  const handleDragCorner = (corner, e) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX || e.touches[0].clientX;
    const startY = e.clientY || e.touches[0].clientY;

    const initialWidth = cropSize.width;
    const initialHeight = cropSize.height;

    const onMouseMove = (moveEvent) => {
      const currentX = moveEvent.clientX || moveEvent.touches[0].clientX;
      const currentY = moveEvent.clientY || moveEvent.touches[0].clientY;

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      let newWidth = initialWidth;
      let newHeight = initialHeight;

      // Adjust crop size based on the corner being dragged
      if (corner === 'bottom-right') {
        newWidth += deltaX;
        newHeight += deltaY;
      } else if (corner === 'bottom-left') {
        newWidth -= deltaX;
        newHeight += deltaY;
      } else if (corner === 'top-right') {
        newWidth += deltaX;
        newHeight -= deltaY;
      } else if (corner === 'top-left') {
        newWidth -= deltaX;
        newHeight -= deltaY;
      }

      // Enforce minimum size
      newWidth = Math.max(50, newWidth);
      newHeight = Math.max(50, newHeight);

      setCropSize({ width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onMouseMove);
    window.addEventListener('touchend', onMouseUp);
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropSize={cropSize}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropCompleteHandler}
          showGrid={true}
          restrictPosition={false}
        />
        {aspect === null && (
          <div className="crop-handles">
            <div
              className="crop-handle top-left"
              onMouseDown={(e) => handleDragCorner('top-left', e)}
              onTouchStart={(e) => handleDragCorner('top-left', e)}
            />
            <div
              className="crop-handle top-right"
              onMouseDown={(e) => handleDragCorner('top-right', e)}
              onTouchStart={(e) => handleDragCorner('top-right', e)}
            />
            <div
              className="crop-handle bottom-left"
              onMouseDown={(e) => handleDragCorner('bottom-left', e)}
              onTouchStart={(e) => handleDragCorner('bottom-left', e)}
            />
            <div
              className="crop-handle bottom-right"
              onMouseDown={(e) => handleDragCorner('bottom-right', e)}
              onTouchStart={(e) => handleDragCorner('bottom-right', e)}
            />
          </div>
        )}
        <div className="overlay-buttons">
          <button className="overlay-button" onClick={() => handleAspectChange(1)}>1:1 Aspect Ratio</button>
          <button className="overlay-button" onClick={() => handleAspectChange(16 / 9)}>16:9 Aspect Ratio</button>
          <button className="overlay-button" onClick={handleFreeAspectRatio}>Free Aspect Ratio</button>
        </div>
        <div className="overlay-buttons">
          <button className="overlay-button" onClick={handleCrop}>Crop</button>
          <button className="overlay-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
