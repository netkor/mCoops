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
      <h2 className="text-center mb-4">Downloadable Files</h2>
      <div className="row">
        {downloads.map((download, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{download.title}</h5>
                <p className="card-text">{download.description}</p>
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