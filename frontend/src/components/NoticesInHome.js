import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

function NoticesInHome() {
  const [notices, setNotices] = useState([]);
  const noticesUrl = `${baseUrl}/notices`;

  useEffect(() => {
    axios.get(noticesUrl)
      .then(response => {
        setNotices(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the notices!", error);
      });
  }, [noticesUrl]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Notices</h1>
      <div className="row">
        {notices.map(notice => (
          <div key={notice.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={`${imageUrl}${notice.image}`} className="card-img-top" alt={notice.title} />
              <div className="card-body">
                <h5 className="card-title">{notice.title}</h5>
                <p className="card-text">{notice.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoticesInHome;