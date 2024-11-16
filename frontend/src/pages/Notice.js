import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Notice = () => {
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
    <div className="container my-4">
      <h2 className="text-center mb-4">Notices</h2>
      <div className="row">
        {notices.map((notice, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <img src={`${imageUrl}${notice.image}`} className="card-img-top" alt={notice.title} />
              <div className="card-body">
                <h5 className="card-title">{notice.title}</h5>
                <p className="card-text">{notice.description}</p>
                <p className="card-text"><small className="text-muted">Posted on: {new Date(notice.created_at).toLocaleDateString()}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;