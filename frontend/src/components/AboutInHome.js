import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

const baseUrl = process.env.REACT_APP_API_BASE_URL+'/settings';

function Home() {
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    axios.get(baseUrl)
      .then(response => {
        setSettings(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the settings!", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">About Us</h1>
      {settings.length > 0 && (
        <div className="card p-4">
          <p>{settings[0].about}</p>
          <div className="row text-center mt-4">
            <div className="col-md-4">
              <FontAwesomeIcon icon={faBullseye} size="2x" />
              <h3 className="mt-2">Mission</h3>
              <p>{settings[0].mission}</p>
            </div>
            <div className="col-md-4">
              <FontAwesomeIcon icon={faEye} size="2x" />
              <h3 className="mt-2">Vision</h3>
              <p>{settings[0].vision}</p>
            </div>
            <div className="col-md-4">
              <FontAwesomeIcon icon={faHeart} size="2x" />
              <h3 className="mt-2">Core Values</h3>
              <p>{settings[0].core_values}</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <a href="/about" className="btn btn-primary">Read More</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;