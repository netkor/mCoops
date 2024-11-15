import React from 'react';
import IntroductionMessage from '../components/IntroductionMessage'; // Adjust the path as necessary
import Goals from '../components/Goals'; // Adjust the path as necessary
import Mission from '../components/Mission'; // Adjust the path as necessary
import Objective from '../components/Objective'; // Adjust the path as necessary
import Vision from '../components/Vision'; // Adjust the path as necessary

const Introduction = () => {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8">
          <IntroductionMessage />
        </div>
        <div className="col-md-4">
          <div className="row mb-4">
            <div className="col-12">
              <Vision />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12">
              <Mission />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Goals />
            </div>
          </div>
          <div className="row">
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