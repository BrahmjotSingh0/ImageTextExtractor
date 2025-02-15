import React, { useState } from 'react';
import './Upload.css';

const Upload = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleUpload = () => {
    // Handle the upload logic here
    console.log('File uploaded');
  };

  return (
    <div className="upload-container">
      <select className="upload-dropdown" value={selectedOption} onChange={handleOptionChange}>
        <option value="" disabled>Select an option</option>
        <option value="pdf">PDF Extractor</option>
        <option value="image">Image Extractor</option>
      </select>
      <input type="file" className="upload-input" />
      <button className="upload-button" onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;