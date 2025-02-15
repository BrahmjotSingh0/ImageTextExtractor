import React from 'react';
import Header from './Components/Utilities/Header.jsx';
import Footer from './Components/Utilities/Footer.jsx';
import Upload from './Components/Upload/Upload.jsx';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
       <Upload />
      </main>
      <Footer />
    </div>
  );
}

export default App;