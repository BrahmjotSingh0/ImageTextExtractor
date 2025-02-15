import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p style={{alignItems: 'center', textAlign:"center"}}> &copy; {new Date().getFullYear()} ImageTextExtractor. All rights reserved.
        <br />
        Created by <a href="https://github.com/BrahmjotSingh0">Brahmjot Singh</a>
      </p>
      <div className="footer-links">
      </div>
    </footer>
  );
};

export default Footer;