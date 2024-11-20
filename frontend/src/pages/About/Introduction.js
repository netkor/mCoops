import React from 'react';
import IntroductionMessage from '../../components/About/IntroductionMessage'; // Adjust the path as necessary
import Goals from '../../components/About/Goals'; // Adjust the path as necessary
import Mission from '../../components/About/Mission'; // Adjust the path as necessary
import Objective from '../../components/About/Objective'; // Adjust the path as necessary
import Vision from '../../components/About/Vision'; // Adjust the path as necessary

const Introduction = () => {
  return (
    <div className="container my-4" style={{  backgroundImage: 'url(https://wallpapercave.com/wp/wp3589868.jpg)' }}>
      <div className="row">
        <div className="col-md-8">
          <IntroductionMessage  />
        </div>
        <div className="col-md-4">
          <div className="mb-4 row">
            <div className="col-12">
              <Vision />
            </div>
          </div>
          <div className="mb-4 row">
            <div className="col-12">
              <Mission />
            </div>
          </div>
          <div className="mb-4 row">
            <div className="col-12">
              <Goals />
            </div>
          </div>
          <div className="mb-4 row">
            <div className="col-12">
              <Objective />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;