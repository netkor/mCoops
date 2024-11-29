import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const noticesUrl = `${baseUrl}/notices`;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(noticesUrl)
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the notices!", error);
      });
  }, [noticesUrl]);

  const handleViewNotice = (id) => {
    navigate(`/notice/${id}`);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Notices</h2>
      <div className="row justify-content-center">
        {notices.map((notice, index) => (
          <div
            className="mb-3 card"
            key={index}
            style={{
              maxWidth: "1200px",
              height: "200px",
              borderRadius: "50px 0 50px 0",
            }}
          >
            <div className="row g-0 h-100">
              <div className="col-md-2 h-100">
                <img
                  src={`${imageUrl}${notice.image}`}
                  className="img-fluid h-100"
                  alt={notice.title}
                  style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}
                />
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <h5 className="card-title">{notice.title}</h5>
                  {/* <p className="card-text">{notice.description}</p> */}
                  <p className="text-sm text-gray-500">
                    <span>Published at: </span>
                    {new Date(notice.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="col-md-1 d-flex align-items-center">
                <button
                  className=" btn btn-success"
                  onClick={() => handleViewNotice(notice.id)}
                >
                  View{" "}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;
