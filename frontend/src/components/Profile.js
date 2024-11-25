import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const data = [
    { title: "Members", value: "1,73,265", icon: "bi-people" },
    { title: "Staff", value: "468", icon: "bi-gear" },
    { title: "Branch", value: "82", icon: "bi-buildings" },
    { title: "Savings", value: "12,75,52,25,286", icon: "bi-cash-stack" },
    { title: "Loan", value: "10,93,54,61,397", icon: "bi-piggy-bank" },
    { title: "Share", value: "1,67,86,12,700", icon: "bi-pie-chart" },
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Organization Profile</h2>
      <div className="text-center row">
        {data.map((item, index) => (
          <div className="mb-4 col-md-4" key={index}>
            <div className="border-0 shadow card">
              <div className="card-body">
                <div className="mb-2">
                  <i className={`bi ${item.icon} fs-2`}></i>
                </div>
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text fs-4 fw-bold">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
