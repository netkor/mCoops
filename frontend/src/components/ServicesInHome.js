import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faHandHoldingUsd, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

function ServicesInHome() {
  const navigate = useNavigate();

  const services = [
    { name: 'Deposit', icon: faPiggyBank, path: '/deposit' },
    { name: 'Loan', icon: faHandHoldingUsd, path: '/loan' },
    { name: 'Remittance', icon: faMoneyBillWave, path: '/remittance' },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container mt-5">
      <h2 className='text-center'>Our Services</h2>
      <div className="row">
        {services.map((service, index) => (
          <div className="mb-4 col-md-4" key={index}>
            <div className="text-center shadow card h-100" onClick={() => handleCardClick(service.path)}  style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}>
              <div className="card-body">
                <FontAwesomeIcon icon={service.icon} size="3x" className="mb-3" color='green' />
                <h5 className="card-title">{service.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesInHome;