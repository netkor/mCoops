import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Branch = () => {
  const [branches, setBranches] = useState([]);
  const [collectionCenters, setCollectionCenters] = useState([]);
  const settingsUrl = `${baseUrl}/settings`;

  useEffect(() => {
    axios.get(settingsUrl)
      .then(response => {
        const branchOffices = response.data.filter(setting => setting.office_type === 'branch_office');
        const collectionCenters = response.data.filter(setting => setting.office_type === 'collection_center');
        setBranches(branchOffices);
        setCollectionCenters(collectionCenters);
      })
      .catch(error => {
        console.error("There was an error fetching the settings!", error);
      });
  }, [settingsUrl]);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Branch Offices</h2>
      <div className="row justify-content-center">
        {branches.map((branch, index) => (
          <div className="mb-4 col-md-4" key={index}>
            <div className="card h-100">
              <div className="row no-gutters">
                <div className="col-md-5">
                  <img src={`${imageUrl}${branch.image}`} className="img-fluid rounded-start" alt={branch.name} style={{ objectFit: 'fill',height: '210px', borderRadius: '15px 0 15px 0' }} />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title">{branch.name}</h5>
                    <p className="card-text">Location: {branch.address}</p>
                    <p className="card-text">Phone: {branch.phone}</p>
                    {branch.map_url && (
                      <a href={branch.map_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        Locate on Map
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-center">Collection Centers</h2>
      <div className="row">
        {collectionCenters.map((center, index) => (
          <div className="mb-4 col-md-4" key={index}>
            <div className="card h-100">
              <div className="row no-gutters">
                <div className="col-md-5">
                  <img src={`${imageUrl}${center.image}`} className="img-fluid rounded-start" alt={center.name} style={{ objectFit: 'fill',height: '210px', borderRadius: '15px 0 15px 0' }} />
                </div>
                
                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title">{center.name}</h5>
                    <p className="card-text">Location: {center.address}</p>
                    <p className="card-text">Phone: {center.phone}</p>
                    {center.map_url && (
                      <a href={center.map_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        Locate on Map
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Branch;