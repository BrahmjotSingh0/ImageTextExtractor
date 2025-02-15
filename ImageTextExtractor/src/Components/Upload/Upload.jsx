import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import './Upload.css';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (selectedFile) {
      setLoading(true);
      try {
        const { data: { text } } = await Tesseract.recognize(
          URL.createObjectURL(selectedFile),
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

  return (
    <div className="upload-container">
      <div
        className="upload-dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.querySelector('.upload-input').click()}
      >
        <input type="file" className="upload-input" onChange={handleFileChange} />
        <p>Drag and drop a file here, click to select a file, or paste an image using Ctrl+V
            <br />
            (Supported formats: jpg, png, bmp, tiff, pdf)
        </p>
      </div>
      {selectedFile && (
        <div className="uploaded-file">
          {loading && <p>Loading...</p>}
          <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" className="uploaded-image-small" />
          <button className="extract-button" onClick={handleExtractText}>Extract Text</button>
        </div>
      )}
      {extractedText && (
        <textarea className="extracted-text" value={extractedText} readOnly />
      )}
    </div>
  );
};

export default Upload;