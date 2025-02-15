import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import './Overlay.css';

const Overlay = ({ imageSrc, onClose, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = () => {
    onCropComplete(croppedAreaPixels);
    onClose();
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={2 / 2} // Set default aspect ratio to 2/2
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropCompleteHandler}
          showGrid={true} // Show grid for better cropping experience
        />
        <div className="overlay-buttons">
          <button className="overlay-button" onClick={handleCrop}>Crop</button>
          <button className="overlay-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;