import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

const baseUrl = process.env.REACT_APP_API_URL;

const Profile = () => {
  const [profile, setProfiles] = useState([]);
  const profilesUrl = `${baseUrl}/company-profiles`;

  useEffect(() => {
    axios
      .get(profilesUrl)
      .then((response) => {
        if (response.data.length > 0) {
          setProfiles(response.data[0]);
          console.log("API response:", response.data[0]); // Debugging log
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the profiles!", error);
      });
  }, [profilesUrl]);

  if (profile.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="container mt-5">

      <h2 className="mb-4 text-center">Organization Profile</h2>
      <div className="text-center row">
        <div className="mb-4 col-md-4">
          <div className="border-0 shadow card">
            <div className="card-body">
              <div className="mb-2">
                {/* <i className={`bi ${item.icon} fs-2`}></i> */}
              </div>
              <h5 className="card-title">Members</h5>
              <p className="card-text fs-4 fw-bold">{profile.customers}</p>
            </div>
          </div>
        </div>
        <div className="mb-4 col-md-4">
          <div className="border-0 shadow card">
            <div className="card-body">
              <div className="mb-2">
                {/* <i className={`bi ${item.icon} fs-2`}></i> */}
              </div>
              <h5 className="card-title">Staffs</h5>
              <p className="card-text fs-4 fw-bold">{profile.staffs}</p>
            </div>
          </div>
        </div>
        <div className="mb-4 col-md-4">
          <div className="border-0 shadow card">
            <div className="card-body">
              <div className="mb-2">
                {/* <i className={`bi ${item.icon} fs-2`}></i> */}
              </div>
              <h5 className="card-title">Branches</h5>
              <p className="card-text fs-4 fw-bold">{profile.branches}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center row">
        <div className="mb-4 col-md-4">
          <div className="border-0 shadow card">
            <div className="card-body">
              <div className="mb-2">
                {/* <i className={`bi ${item.icon} fs-2`}></i> */}
              </div>
              <h5 className="card-title">Savings</h5>
              <p className="card-text fs-4 fw-bold">{profile.savings}</p>
            </div>
          </div>
        </div>
        <div className="mb-4 col-md-4">
          <div className="border-0 shadow card">
            <div className="card-body">
              <div className="mb-2">
                {/* <i className={`bi ${item.icon} fs-2`}></i> */}
              </div>
              <h5 className="card-title">Loans</h5>
              <p className="card-text fs-4 fw-bold">{profile.loans}</p>
            </div>
          </div>
        </div>
        <div className="mb-4 col-md-4">
          <div className="border-0 shadow card">
            <div className="card-body">
              <div className="mb-2">
                {/* <i className={`bi ${item.icon} fs-2`}></i> */}
              </div>
              <h5 className="card-title">Shares</h5>
              <p className="card-text fs-4 fw-bold">{profile.shares}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
