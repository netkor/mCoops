import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { fa42Group } from "@fortawesome/free-brands-svg-icons";

const baseUrl = process.env.REACT_APP_API_URL + "/settings";
const imageUrl = process.env.REACT_APP_IMAGE_URL;

function Information() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        console.log("API response:", response.data); // Debugging log
        if (response.data.length > 0) {
          setSettings(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the settings!", error);
      });
  }, []);

  return (
    <div className="container px-4 mx-auto mt-5">
      <h1 className="mb-4 text-3xl font-bold text-center">About Us</h1>
      {settings ? (
        <div className="row">
          <div className="col-md-8">
            <div className="p-2 mb-3 card" style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}>
              <div className="container py-4">
                {/* Main Section */}
                <div className="mb-5 row">
                  <div className="col-md-12">
                    <h2 className="text-primary fw-bold ">हाम्रो बारेमा</h2>
                    <div className="clearfix">
                      <img
                        src={`${imageUrl}${settings.image}`}
                        alt="Building"
                        className="mb-3 rounded img-fluid float-md-start me-3"
                        style={{ maxWidth: "300px" }}
                      />
                      <p style={{ textAlign: "justify" }}>
                        {settings.about}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row g-0">
              {settings.vision && (
                <div className="mt-1 mb-1 card text-bg-primary" style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}>
                  <div className="card-header">
                    <strong>Vision</strong>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2">
                        <FontAwesomeIcon icon={faEye} size="2x" />
                      </div>
                      <div className="col-md-10">
                        <div dangerouslySetInnerHTML={{ __html: settings.vision }} />

                        {/* <p className="card-text">{settings.vision}</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {settings.mission && (
                <div className="mt-1 mb-1 card text-bg-danger" style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}>
                  <div className="card-header">
                    <strong>Mission</strong>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2">
                        <FontAwesomeIcon icon={faBullseye} size="2x" />
                      </div>
                      <div className="col-md-10">
                        <div dangerouslySetInnerHTML={{ __html: settings.mission }} />
                        {/* <p className="card-text">{settings.mission}</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {settings.goal && (
                <div className="mt-1 mb-1 card text-bg-warning" style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}>
                  <div className="card-header">
                    <strong>Goals</strong>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2">
                        <FontAwesomeIcon icon={faHeart} size="2x" />
                      </div>
                      <div className="col-md-10">
                        <div dangerouslySetInnerHTML={{ __html: settings.goal }} />
                        {/* <p className="card-text">{settings.goal}</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {settings.objective && (
                <div className="mt-1 mb-1 card text-bg-secondary" style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}>
                  <div className="card-header">
                    <strong>Objective</strong>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2">
                        <FontAwesomeIcon icon={fa42Group} size="2x" />
                      </div>
                      <div className="col-md-10">
                        <div dangerouslySetInnerHTML={{ __html: settings.objective }} />
                        {/* <p className="card-text">{settings.objective}</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
}

export default Information;
