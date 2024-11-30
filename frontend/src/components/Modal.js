import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Modal = ({ isOpen, onClose }) => {
  const [popups, setPopups] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const popupsUrl = `${baseUrl}/popups/`;

  useEffect(() => {
    if (isOpen) { 
      axios.get(popupsUrl)
        .then(response => {
          if (response.data.length > 0) {
            const sortedPopups = response.data.sort((a, b) => a.display_order - b.display_order);
            setPopups(sortedPopups);
            setCurrentIndex(0); // Reset to the first popup when modal opens
          }
        })
        .catch(error => {
          console.error('Error fetching popup data:', error);
        });
    }
  }, [isOpen, popupsUrl]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % popups.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + popups.length) % popups.length);
  };

  return (
    <div 
      className="modal fade show" 
      style={{ display: 'block' }} 
      tabIndex="-1" 
      aria-labelledby="popup1" 
      aria-modal="true" 
      role="dialog"
      onClick={handleOverlayClick}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal" 
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body text-center">
            {popups.length > 0 && (
              <div>
                <img src={`${imageUrl}${popups[currentIndex].image}`} alt="Popup" className="img-fluid mb-4" />
                <div>
                  <button className="btn btn-secondary me-2" onClick={handlePrev} disabled={currentIndex === 0}>
                    Previous
                  </button>
                  <button className="btn btn-primary" onClick={handleNext} disabled={currentIndex === popups.length - 1}>
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;