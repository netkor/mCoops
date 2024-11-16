import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const Mission = () => {
  const [mission, setMission] = useState('');
  const settingsUrl = `${baseUrl}/settings`;

  useEffect(() => {
    axios.get(settingsUrl)
      .then(response => {
        if (response.data.length > 0) {
          setMission(response.data[0].mission);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the settings!", error);
      });
  }, [settingsUrl]);


  return (
    <div className="col-md-12">
    <div className="border p-3 rounded h-100">
      <div className="bg-light p-3 rounded-circle mx-auto" style={{ width: '30px', height: '30px' }}>
        <i className="bi bi-cash fs-4 text-primary"></i>
      </div>
      <h5 className="text-primary fw-bold">Mission</h5>
      <p>
        {mission}
      </p>
    </div>
  </div>
  );
};

export default Mission;