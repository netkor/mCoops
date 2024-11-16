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
    <div className="container py-4">
      {/* Main Section */}
      <div className="row mb-5">
        <div className="col-md-12">
          <h2 className="text-primary fw-bold ">हाम्रो बारेमा</h2>
          <div className="clearfix">
            <img
              src="https://lh3.googleusercontent.com/d/1MvLrQNe8XjRC0jvXJtAyAWUDNmlZUV5h=w2048?authuser=0"
              alt="Building"
              className="img-fluid rounded float-md-start me-3 mb-3"
              style={{ maxWidth: '300px' }}
            />
            <p style={{ textAlign: 'justify' }}>{about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroductionMessage;