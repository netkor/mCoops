import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const Goals = () => {
  const [goals, setGoals] = useState('');
  const settingsUrl = `${baseUrl}/settings`;

  useEffect(() => {
    axios.get(settingsUrl)
      .then(response => {
        if (response.data.length > 0) {
          setGoals(response.data[0].goals);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the settings!", error);
      });
  }, [settingsUrl]);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Goals</h5>
        <p className="card-text">{goals}</p>
      </div>
    </div>
  );
};

export default Goals;