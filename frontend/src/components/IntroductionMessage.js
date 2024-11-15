import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const IntroductionMessage = () => {
  const [about, setAbout] = useState('');
  const settingsUrl = `${baseUrl}/settings`;

  useEffect(() => {
    axios.get(settingsUrl)
      .then(response => {
        if (response.data.length > 0) {
          setAbout(response.data[0].about);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the settings!", error);
      });
  }, [settingsUrl]);

  return (
    <div>
      <h2>Hamro Barema</h2>
      <p>{about}</p>
    </div>
  );
};

export default IntroductionMessage;