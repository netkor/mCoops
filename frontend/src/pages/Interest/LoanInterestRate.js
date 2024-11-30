import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const LoanInterestRate = () => {
  const [loanInterestRates, setLoanInterestRates] = useState([]);
  const productsUrl = `${baseUrl}/products`;
  const productDetailsUrl = `${baseUrl}/product-details`;
  const interestRatesUrl = `${baseUrl}/interest-rates`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, productDetailsResponse, interestRatesResponse] = await Promise.all([
          axios.get(productsUrl),
          axios.get(productDetailsUrl),
          axios.get(interestRatesUrl)
        ]);

        const products = productsResponse.data;
        const productDetails = productDetailsResponse.data;
        const interestRates = interestRatesResponse.data;

        const loanInterestRates = interestRates.filter(rate => {
          const productDetail = productDetails.find(detail => detail.id === rate.product_type);
          const product = products.find(prod => prod.id === productDetail.product);
          return product.name === 'कर्जा' && rate.end_date === null;
        }).map(rate => {
          const productDetail = productDetails.find(detail => detail.id === rate.product_type);
          return {
            ...rate,
            name: productDetail.name,
            minimum_deposit: productDetail.minimum_deposit,
            term_length: productDetail.term_length
          };
        });

        setLoanInterestRates(loanInterestRates);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, [productsUrl, productDetailsUrl, interestRatesUrl]);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Loan Interest Rates for "कर्जा"</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Loan Product</th>
            <th>Limit</th>
            <th>Time Period</th>
            <th>Interest</th>
          </tr>
        </thead>
        <tbody>
          {loanInterestRates.map((rate, index) => (
            <tr key={rate.id}>
              <td>{index + 1}</td>
              <td>{rate.name}</td>
              <td>{rate.minimum_deposit}</td>
              <td>{rate.term_length}</td>
              <td>{rate.interest_rate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanInterestRate;