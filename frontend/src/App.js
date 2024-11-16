import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Home from './pages/Home'; // Import the Home component
import Footer from './components/Footer'; // Import the Footer component
// Import other page components as needed
import Introduction from './pages/About/Introduction';
import MessageFromDirector from './pages/About/MessageFromDirector';
import BoardOfDirectors from './pages/About/BoardOfDirectors';
import OurTeam from './pages/About/OurTeam';
import OurFinancial from './pages/About/OurFinancial';
import AnnualReport from './pages/About/AnnualReport';



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/message-from-director" element={<MessageFromDirector />} />
            <Route path="/board-of-directors" element={<BoardOfDirectors />} />
            <Route path="/our-teams" element={<OurTeam />} />
            <Route path="/our-financials" element={<OurFinancial />} />
            <Route path="/barsik-pratibedan-2081" element={<AnnualReport />} />

            
            {/* Add more routes as needed */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;