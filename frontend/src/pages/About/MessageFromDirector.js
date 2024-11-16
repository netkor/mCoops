import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const MessageFromDirector = () => {
  const [teams, setTeams] = useState([]);
  const [teamTypes, setTeamTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const teamsUrl = `${baseUrl}/teams`;
  const teamTypesUrl = `${baseUrl}/team-types`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsResponse, teamTypesResponse] = await Promise.all([
          axios.get(teamsUrl),
          axios.get(teamTypesUrl),
        ]);
        setTeams(teamsResponse.data);
        setTeamTypes(teamTypesResponse.data);
        setLoading(false);
      } catch (error) {
        setError("There was an error fetching the data!");
        setLoading(false);
      }
    };

    fetchData();
  }, [teamsUrl, teamTypesUrl]);

  const directorType = teamTypes.find(
    (type) => type.order_by === 1
  );

  const director = teams.filter(
    (team) => team.team_type === directorType?.id && team.order_by === 1
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="row">
        {director.map((team, index) => (
          <div className="col-md-12" key={index}>
            <div className="card h-100 text-center shadow">
              <div className="mt-3">
                <img
                  src={`${imageUrl}${team.image}`}
                  className="rounded-circle shadow"
                  alt={team.name}
                  style={{
                    width: "240px",
                    height: "240px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{team.title}</h5>
                <h6 className="card-subtitle mb-4 text-muted">{team.name}</h6>
                <p className="card-text">{team.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageFromDirector;