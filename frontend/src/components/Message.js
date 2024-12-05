import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Message = () => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const teamsUrl = `${baseUrl}/teams`;

  useEffect(() => {
    axios
      .get(teamsUrl)
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the team data!", error);
      });
  }, [teamsUrl]);

  useEffect(() => {
    const featuredTeams = teams
      .filter((team) => team.is_message_featured)
      .sort((a, b) => a.message_order_by - b.message_order_by);
    setFilteredTeams(featuredTeams);
  }, [teams]);

  const handleShowModal = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };

  return (
    <div className="container my-4">
      <h2 className="text-center">Message</h2>
      <div className="row">
        {filteredTeams.map((team, index) => (
          <div className="mb-2 col-md-4" key={index}>
            <div className="text-center shadow card h-100" style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}>
              <div className="mt-4 card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                <img
                  src={`${imageUrl}${team.image}`}
                  className="cimg-fluid rounded-start h-100"
                  alt={team.name}
                  style={{ objectFit: "fill", borderRadius: "50px 0 50px 0",border: "1px solid #008000" }}
                />
              </div>
              <div className="card-body">
                {/* <h5 className="card-title">{team.title}</h5> */}
                <h5 className="mb-2 card-subtitle text-muted">{team.name}</h5>
                <h6 className="mb-2 card-subtitle text-muted">{team.position}</h6>
                <p className="card-text">
                  {team.message.length > 200
                    ? `${team.message.substring(0, 200)}...`
                    : team.message}
                </p>
                <span className="btn btn-primary" onClick={() => handleShowModal(team)}>
                  थप पढ्नुहोस्
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {selectedTeam && (
            <div>
              <img src={`${imageUrl}${selectedTeam.image}`} alt={selectedTeam.name} className="img-fluid mb-1" style={{objectFit: "fill", borderRadius: "50px 0 50px 0" }} />
              <Modal.Title className="text-center">{selectedTeam?.name}</Modal.Title>
              <Modal.Title className="text-center">{selectedTeam?.position}</Modal.Title>
              <p>{selectedTeam.message}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Message;