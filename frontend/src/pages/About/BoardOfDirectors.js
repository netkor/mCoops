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
    .filter((type) => type.name !== "कर्मचारी")
    .sort((a, b) => a.order_by - b.order_by);

  const groupedTeams = filteredTeamTypes.map((type) => ({
  type,
  members: teams
    .filter((team) => team.team_type.some((t) => t.id === type.id))
    .sort((b, a) => b.order_by - a.order_by)
    .map((team, index) => {
      if (type.name !== 'संञ्चालक समिति' && type.name !=='सल्लाहकार') {
        return {
          ...team,
          position: index === 0 ? 'संयोजक' : 'सदस्य'
        };
      }
      return team;
    }),
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
                      // className="shadow"
                      alt={team.name}
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "Fill",
                        borderRadius: "50px 0 50px 0",
                        border: "1px solid #008000",
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        
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