import React from 'react';

const MobileBanking = () => {
  const features = [
    "Saving Statement",
    "Loan Statement",
    "Share Statement",
    "Account to Account Transfer",
    "Mobile Top-up",
    "Landline Bill payment",
    "NEA Bill Payment",
    "Internet Bill Payment",
    "DISH HOME, and other TV Network bill payment",
    "Load fund from ESEWA and KHALTI wallet",
    "Transaction save option enabled",
    "QR Pay enabled",
    "NTC Fiber net payment",
    "E-Teller transaction"
  ];

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Features of Manakamana Mobile Banking App</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Features</h5>
              <ul className="list-group list-group-flush">
                {features.map((feature, index) => (
                  <li className="list-group-item" key={index}>
                    {index + 1}. {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileBanking;