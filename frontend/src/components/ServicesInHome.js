import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const baseUrl = process.env.REACT_APP_API_URL;

function ServicesInHome() {
  const [services, setServices] = useState([]);
  const servicesUrl = `${baseUrl}/services`;

  useEffect(() => {
    axios.get(servicesUrl)
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the services!", error);
      });
  }, [servicesUrl]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Our Services</h1>
      <div className="row">
        {services.map(service => (
          <div key={service.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <FontAwesomeIcon icon={faCog} size="3x" className="mb-3" />
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesInHome;