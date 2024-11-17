import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const noticesUrl = `${baseUrl}/notices`;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(noticesUrl)
      .then(response => {
        setNotices(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the notices!", error);
      });
  }, [noticesUrl]);

  const handleViewNotice = (id) => {
    navigate(`/notice/${id}`);
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Notices</h2>
      <div className="row">
        {notices.map((notice, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 d-flex flex-column">
              <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                <img src={`${imageUrl}${notice.image}`} className="card-img-top h-100 w-100" alt={notice.title} style={{ objectFit: 'cover' }} />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{notice.title}</h5>
                <p className="card-text flex-grow-1">{notice.description}</p>
                <p className="card-text"><small className="text-muted">Posted on: {new Date(notice.created_at).toLocaleDateString()}</small></p>
                <button className="btn btn-primary mt-auto" onClick={() => handleViewNotice(notice.id)}>View Notice</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;