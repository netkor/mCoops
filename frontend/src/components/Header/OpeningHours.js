// OpeningHours.js
import React from 'react';

const OpeningHours = ({ hours }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11 (0 = January, 11 = December)
  const currentDay = currentDate.getDate();

  const isWinterSeason = (currentMonth === 10 && currentDay >= 1) || // November
                         (currentMonth === 11) || // December
                         (currentMonth === 0) || // January
                         (currentMonth === 1 && currentDay <= 31); // January

  return (
    <div className="d-flex flex-column">
      <p className="mb-0 fw-bold text-dark" style={{ fontSize: "20px" }}>
        Opening Hours
      </p>
      {isWinterSeason ? (
        <span className="text-muted fw-bold d-block" style={{ fontSize: "15px" }}>
          Tue-Sun: 9am - 4pm <br /> Mon: 9am - 12pm
        </span>
      ) : (
        <span className="text-muted d-block" style={{ fontSize: "15px" }}>
          Tue-Sun: 9am - 5pm <br /> Mon: 9am - 12pm
        </span>
      )}
    </div>
  );
};

export default OpeningHours;