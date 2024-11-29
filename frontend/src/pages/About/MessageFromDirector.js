import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

function MessageFromDirector() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const teamsUrl = `${baseUrl}/teams`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(teamsUrl);
        setTeams(response.data);
        setLoading(false);
      } catch (error) {
        setError("There was an error fetching the teams!");
        setLoading(false);
      }
    };

    fetchData();
  }, [teamsUrl]);
  console.log(teams);

  const director = teams.find(
    (team) => team.team_type.some(type => type.order_by === 1) && team.order_by === 1
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {director ? (
        <div className="container my-4">
      <div className="row">
          <div className="col-md-12">
            <div className="card h-100 text-center shadow">
              <div className="mt-3">
                <img
                  src={`${imageUrl}${director.image}`}
                  className="rounded-circle shadow"
                  alt={director.name}
                  style={{
                    width: "240px",
                    height: "240px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{director.title}</h5>
                <h6 className="card-subtitle mb-4 text-muted">{director.name}</h6>
                <p className="card-text" style={{ textAlign: "justify" }}>{director.message}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
      ) : (
        <div>No director message found.</div>
      )}
    </div>
  );
}

export default MessageFromDirector;