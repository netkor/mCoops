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
      <div className="row">
        {downloads.map((download, index) => (
          <div className="mb-3 card" key={index}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={`${fileUrl}${download.cover}`} className="img-fluid rounded-start h-100" alt={download.title} style={{ objectFit: 'cover' }} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{download.title}</h5>
                  <p className="card-text">{download.description}</p>
                  <p className="card-text"><small className="text-body-secondary">{download.created_at}</small></p>
                  <a href={`${fileUrl}${download.file}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Download;