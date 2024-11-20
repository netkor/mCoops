import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Message = () => {
  const [teams, setTeams] = useState([]);
  const teamsUrl = `${baseUrl}/teams`;

  useEffect(() => {
    axios.get(teamsUrl)
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the team data!", error);
      });
  }, [teamsUrl]);

  return (
    <div className="container my-4">
      <div className="row">
        {teams.map((team, index) => (
          <div className="mb-2 col-md-4" key={index}>
            <div className="text-center shadow card h-100">
              <div className="mt-3">
                <img
                  src={`${imageUrl}${team.image}`}
                  className="shadow rounded-circle"
                  alt={team.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{team.title}</h5>
                <h6 className="mb-2 card-subtitle text-muted">{team.name}</h6>
                <p className="card-text">
                  {team.message.length > 200 ? `${team.message.substring(0, 200)}...` : team.message}
                </p>
                <a href="/test" className="btn btn-primary">
                  थप पढ्नुहोस्
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;