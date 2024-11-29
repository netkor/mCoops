import React, { useState, useEffect } from 'react';
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
import Loan from './pages/Product/Loan';
import Deposit from './pages/Product/Deposit';
import Remittance from './pages/Product/Remittance';
import MobileBanking from './pages/Product/MobileBanking';
import SavingInterestRate from './pages/Interest/SavingInterestRate';
import LoanInterestRate from './pages/Interest/LoanInterestRate';
import Branch from './pages/Branch';
import Download from './pages/Download';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Notice from './pages/Notice';
import ProductDetails from './pages/Product/ProductDetails';
import NoticeDetails from './pages/NoticeDetails';
import PoweredBy from './components/PoweredBy';
import Modal from './components/Modal'; // Import the Modal component

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('isFirstVisit');
    if (!isFirstVisit) {
      setIsModalOpen(true);
      localStorage.setItem('isFirstVisit', 'true');
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-5">
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Notice">
            <p>This is a pop-up notice.</p>
          </Modal>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/message-from-director" element={<MessageFromDirector />} />
            <Route path="/board-of-directors" element={<BoardOfDirectors />} />
            <Route path="/our-teams" element={<OurTeam />} />
            <Route path="/our-financials" element={<OurFinancial />} />
            <Route path="/barsik-pratibedan-2081" element={<AnnualReport />} />
            <Route path="/loan" element={<Loan />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/remittance" element={<Remittance />} />
            <Route path="/mobile-banking" element={<MobileBanking />} />
            <Route path="/saving-interest-rate" element={<SavingInterestRate />} />
            <Route path="/loan-interest-rate" element={<LoanInterestRate />} />
            <Route path="/branches" element={<Branch />} />
            <Route path="/download" element={<Download />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/notice/:id" element={<NoticeDetails />} />
          </Routes>
        </div>
        <Footer />
        <PoweredBy />
      </div>
    </Router>
  );
}

export default App;