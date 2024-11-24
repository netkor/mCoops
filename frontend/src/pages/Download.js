import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const fileUrl = process.env.REACT_APP_IMAGE_URL;

const Download = () => {
  const [downloads, setDownloads] = useState([]);
  const downloadsUrl = `${baseUrl}/downloads`;

  useEffect(() => {
    axios.get(downloadsUrl)
      .then(response => {
        setDownloads(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the downloads!", error);
      });
  }, [downloadsUrl]);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Downloadable Files</h2>
      <div className="row justify-content-center">
        {downloads.map((download, index) => (
          <div className="mb-3 card" key={index} style={{ maxWidth: '1200px', height: '200px', borderRadius: '50px 0 50px 0' }}>
            <div className="row g-0 h-100">
              <div className="col-md-3 h-100">
                <img src={`${fileUrl}${download.cover}`} className="img-fluid h-100" alt={download.title} style={{ objectFit: 'fill', borderRadius: '50px 0 50px 0' }} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{download.title}</h5>
                  <p className="card-text">{download.description}</p>
                  <p className="text-sm text-gray-500">{new Date(download.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="col-md-1 d-flex align-items-center">
                <a href={`${fileUrl}${download.file}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Download;