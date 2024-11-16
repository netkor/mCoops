import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const Remittance = () => {
  const [loanInterestRates, setLoanInterestRates] = useState([]);
  const loanInterestRatesUrl = `${baseUrl}/loan-interest-rates`;

  useEffect(() => {
    axios.get(loanInterestRatesUrl)
      .then(response => {
        setLoanInterestRates(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the loan interest rates!", error);
      });
  }, [loanInterestRatesUrl]);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Loan Interest Rates</h2>
      <div className="row">
        {loanInterestRates.map((rate, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{rate.name}</h5>
                <p className="card-text">Interest Rate: {rate.interest_rate}%</p>
                <p className="card-text">Description: {rate.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Remittance;