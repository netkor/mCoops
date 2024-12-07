import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

function NoticesInHome() {
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
    <div className="container mt-8 mb-14">
      <h1 className="mb-4 text-center">Notices</h1>
      <div className="row">
        {notices.map(notice => (
          <div key={notice.id} className="mb-4 col-md-4">
            <div className="card h-100"  style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}>
              <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                <img src={`${imageUrl}${notice.image}`} className="card-img-top h-100 w-100" alt={notice.title} style={{ objectFit: 'cover' }} />
              </div>              
              <div className="card-body">
                <h5 className="card-title">{notice.title}</h5>
                {/* <p className="card-text">{notice.description}</p> */}
                <button className="mt-auto btn btn-primary" onClick={() => handleViewNotice(notice.id)}>View Notice</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoticesInHome;