import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="z-50 w-11/12 p-6 bg-white rounded-lg shadow-lg md:w-1/2 lg:w-1/3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            &times;
          </button>
        </div>
        <div>{children}</div>
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