import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Affiliations = () => {
  const [affiliations, setAffiliations] = useState([]);
  const socialLinksUrl = `${baseUrl}/social-links`;

  useEffect(() => {
    const fetchAffiliations = async () => {
      try {
        const response = await axios.get(socialLinksUrl);
        const affiliationLinks = response.data.filter(link => link.is_affiliation);
        setAffiliations(affiliationLinks);
      } catch (error) {
        console.error("There was an error fetching the social links!", error);
      }
    };

    fetchAffiliations();
  }, [socialLinksUrl]);

  return (
    <div className="container my-4">
      <h2 className="text-center">Affiliations</h2>
      <div className="row">
        {affiliations.map((link) => (
          <div className="col-md-2 mb-4" key={link.id}>
            <div className="h-100">
            <a href={link.url} target="_blank" rel="noreferrer">
              <img
                src={`${imageUrl}${link.icon}`}
                className="card-img-top"
                alt={link.platform}
                style={{ objectFit: "contain", height: "150px" }}
              />
            </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Affiliations;