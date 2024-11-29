import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Modal = ({ isOpen, onClose }) => {
  const [popup, setPopup] = useState(null);
  const popupsUrl = `${baseUrl}/popups/`;

  useEffect(() => {
    if (isOpen) {
      axios.get(popupsUrl)
        .then(response => {
          if (response.data.length > 0) {
            setPopup(response.data[0]); // Assuming you want to show the first popup
          }
        })
        .catch(error => {
          console.error("There was an error fetching the popups!", error);
        });
    }
  }, [isOpen, popupsUrl]);

  if (!isOpen || !popup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="z-50 w-11/12 p-6 bg-white rounded-lg shadow-lg md:w-1/2 lg:w-1/3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{popup.title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            &times;
          </button>
        </div>
        <div className="mb-4">
          <img src={`${imageUrl}${popup.image}`} alt={popup.title} className="w-full h-auto rounded-lg" />
        </div>
        <div className="text-gray-700">{popup.content}</div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;