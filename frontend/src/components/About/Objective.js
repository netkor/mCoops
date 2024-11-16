import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const Objective = () => {
  const [objective, setObjective] = useState('');
  const settingsUrl = `${baseUrl}/settings`;

  useEffect(() => {
    axios.get(settingsUrl)
      .then(response => {
        if (response.data.length > 0) {
          setObjective(response.data[0].objective);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the settings!", error);
      });
  }, [settingsUrl]);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Objective</h5>
        <p className="card-text">{objective}</p>
      </div>
    </div>
  );
};

export default Objective;