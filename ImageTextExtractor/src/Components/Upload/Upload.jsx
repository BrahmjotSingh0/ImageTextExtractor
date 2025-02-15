import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import Overlay from '../Utilities/Overlay';
import './Upload.css';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleExtractText = async () => {
    if (croppedImage) {
      setLoading(true);
      try {
        const { data: { text } } = await Tesseract.recognize(
          croppedImage,
          'eng',
          {
            logger: (m) => console.log(m),
          }
        );
        setExtractedText(text);
      } catch (error) {
        console.error('Error extracting text from image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePaste = (event) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        const file = items[i].getAsFile();
        setSelectedFile(file);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, crop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, 'image/jpeg');
    });
  };

  const handleCropComplete = async (croppedAreaPixels) => {
    const croppedImageUrl = await getCroppedImg(URL.createObjectURL(selectedFile), croppedAreaPixels);
    setCroppedImage(croppedImageUrl);
  };

  return (
    <div className="upload-container">
      <div
        className="upload-dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.querySelector('.upload-input').click()}
      >
        <input type="file" className="upload-input" onChange={handleFileChange} />
        <p>Drag and drop a file here, click to select a file, or paste an image using Ctrl+V</p>
      </div>
      {selectedFile && (
        <div className="uploaded-file">
          {loading && <p>Loading...</p>}
          <img
            src={croppedImage || URL.createObjectURL(selectedFile)}
            alt="Uploaded"
            className="uploaded-image-small"
            onClick={() => setShowOverlay(true)}
          />
          <button className="extract-button" onClick={handleExtractText}>Extract Text</button>
        </div>
      )}
      {extractedText && (
        <textarea className="extracted-text" value={extractedText} readOnly />
      )}
      {showOverlay && (
        <Overlay
          imageSrc={URL.createObjectURL(selectedFile)}
          onClose={() => setShowOverlay(false)}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
};

export default Upload;