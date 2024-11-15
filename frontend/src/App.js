import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Home from './pages/Home'; // Import the Home component
import Footer from './components/Footer'; // Import the Footer component
// Import other page components as needed
import Introduction from './pages/Introduction';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/introduction" element={<Introduction />} />

            
            {/* Add more routes as needed */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;