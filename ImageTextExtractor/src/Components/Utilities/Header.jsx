import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <h1 className="site-title">ImageTextExtractor</h1>
      <nav className="navigation">
        <ul>
          <li><a href="#pdf-extractor">PDF Extractor</a></li>
          <li><a href="#image-extractor">Image Extractor</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;