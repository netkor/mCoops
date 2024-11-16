import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const BoardOfDirectors = () => {
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

  const filteredTeamTypes = teamTypes
    .filter((type) => type.name !== "Staff")
    .sort((a, b) => a.id - b.id);

  const groupedTeams = filteredTeamTypes.map((type) => ({
    type,
    members: teams
      .filter((team) => team.team_type === type.id)
      .sort((a, b) => a.order_by - b.order_by),
  }));

 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-4">
      {groupedTeams.map((group, index) => (
        <div key={index}>
          <h3 className="my-4 text-center">{group.type.name}</h3>
          <div className="row justify-content-center">
            {group.members.map((team, index) => (
              <div className="col-md-3 mb-2" key={index}>
                <div className="card h-100 text-center shadow">
                  <div className="mt-3">
                    <img
                      src={`${imageUrl}${team.image}`}
                      className="rounded-circle shadow"
                      alt={team.name}
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title"><strong>{team.name}</strong></h5>
                    <h6 className="card-subtitle mb-2 text-muted">{team.position}</h6>
                    <p className="card-text">{team.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardOfDirectors;